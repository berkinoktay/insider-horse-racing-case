import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useHorseStore } from './horse'
import { shuffle } from '@/utils'
import { HORSES_PER_RACE, RACE_DISTANCES, TOTAL_ROUNDS } from '@/constants/race'
import type { Race } from '@/types/race'
import { ProgramStatus, RaceState } from '@/types/enums'
import type { RaceParticipant } from '@/types/horse'

export const useRaceStore = defineStore('race', () => {
  const horseStore = useHorseStore()

  // State
  const program = ref<Race[]>([])
  const currentRound = ref(1)
  const raceState = ref<RaceState>(RaceState.IDLE)
  const isGenerating = ref(false)
  const autoMode = ref(false)

  // Getters
  const completedRounds = computed(() => program.value.filter((r) => r.status === ProgramStatus.COMPLETED).length)
  const progressPercentage = computed(() => Math.round((completedRounds.value / TOTAL_ROUNDS) * 100))
  const hasRaceBeenRun = computed(() => completedRounds.value > 0)
  const currentRace = computed(() => program.value[currentRound.value - 1])

  // Actions

  const generateProgram = () => {
    isGenerating.value = true
    const newProgram = []

    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      const availableHorses = shuffle([...horseStore.horseList])
      const participants: RaceParticipant[] = []

      for (let j = 0; j < HORSES_PER_RACE; j++) {
        const randomIndex = Math.floor(Math.random() * availableHorses.length)
        const horse = availableHorses.splice(randomIndex, 1)[0]
        participants.push({
          ...horse,
          position: 0,
          finishTime: 0,
          totalRunTime: 0,
          animationFrameId: null,
        })
      }

      newProgram.push({
        round: i + 1,
        distance: RACE_DISTANCES[i],
        participants,
        status: i === 0 ? ProgramStatus.CURRENT : ProgramStatus.UPCOMING,
        winner: null,
        results: [],
      })
    }
    program.value = newProgram
    currentRound.value = 1
    raceState.value = RaceState.READY
    setTimeout(() => {
      isGenerating.value = false
    }, 1000)
  }

  function startRace() {
    if (raceState.value !== RaceState.READY || !currentRace.value) return
    raceState.value = RaceState.RACING
    currentRace.value?.participants.forEach((horse) => {
      horse.animationFrameId = runHorse(horse)
    })
  }

  function pauseRace() {
    if (raceState.value !== RaceState.RACING) return
    raceState.value = RaceState.PAUSED
    currentRace.value?.participants.forEach((horse) => {
      if (horse.animationFrameId) {
        cancelAnimationFrame(horse.animationFrameId)
        horse.animationFrameId = null
      }
    })
  }

  function resumeRace() {
    if (raceState.value !== RaceState.PAUSED) return
    raceState.value = RaceState.RACING
    currentRace.value?.participants.forEach((horse) => {
      horse.animationFrameId = runHorse(horse)
    })
  }

  function runHorse(horse: RaceParticipant) {
    let startTs: number | null = null
    const { conditionScore } = horse
    if (!currentRace.value) return 0

    const step = (ts: number) => {
      if (!startTs) startTs = ts
      const elapsedSec = (ts - startTs) / 1000
      horse.totalRunTime += elapsedSec

      const speedFactor = 1 + (conditionScore / 100) * 1 + Math.random() * 0.5
      const distanceCovered = horse.position + speedFactor

      horse.position = Math.min(distanceCovered, currentRace.value!.distance)

      if (horse.position >= currentRace.value!.distance) {
        horse.finishTime = horse.totalRunTime
        checkAllFinished()
      } else {
        horse.animationFrameId = requestAnimationFrame(step)
      }
    }

    return requestAnimationFrame(step)
  }

  function checkAllFinished() {
    if (!currentRace.value || raceState.value !== RaceState.RACING) return

    const allFinished = currentRace.value.participants.every((p) => p.position >= currentRace.value.distance)

    if (allFinished) {
      raceState.value = RaceState.READY

      const finishedRace = currentRace.value
      finishedRace.status = ProgramStatus.COMPLETED

      const results = [...finishedRace.participants].sort((a, b) => (a.finishTime || 0) - (b.finishTime || 0))
      finishedRace.results = results
      finishedRace.winner = results[0]

      if (currentRound.value < TOTAL_ROUNDS) {
        currentRound.value++
        const nextRace = program.value[currentRound.value - 1]
        if (nextRace) {
          nextRace.status = ProgramStatus.CURRENT
        }
        raceState.value = RaceState.READY
        if (autoMode.value) {
          setTimeout(() => {
            startRace()
          }, 1000)
        }
      } else {
        raceState.value = RaceState.FINISHED
      }
    }
  }

  const toggleAutoMode = (value: boolean) => {
    autoMode.value = value
  }

  const resetRace = () => {
    program.value = []
    currentRound.value = 0
    raceState.value = RaceState.IDLE
    currentRace.value?.participants.forEach((horse) => {
      if (horse.animationFrameId) {
        cancelAnimationFrame(horse.animationFrameId)
      }
    })
  }

  return {
    program,
    currentRound,
    raceState,
    isGenerating,
    autoMode,
    completedRounds,
    progressPercentage,
    hasRaceBeenRun,
    currentRace,
    generateProgram,
    startRace,
    pauseRace,
    resumeRace,
    resetRace,
    toggleAutoMode,
  }
})
