import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useHorseStore } from './horse'
import { shuffle } from '@/utils'
import { DEFAULT_PROGRAM, HORSES_PER_RACE, TOTAL_ROUNDS } from '@/constants/race'
import type { Race } from '@/types/race'
import { ProgramStatus, RaceState } from '@/types/enums'

export const useRaceStore = defineStore('race', () => {
  const horseStore = useHorseStore()

  // State
  const program = ref<Race[]>(JSON.parse(JSON.stringify(DEFAULT_PROGRAM)))
  const currentRound = ref(0)
  const raceState = ref<RaceState>(RaceState.IDLE)
  const isGenerating = ref(false)
  // Getters
  const completedRounds = computed(() => program.value.filter((r: Race) => r.status === ProgramStatus.COMPLETED).length)
  const progressPercentage = computed(() => Math.round((completedRounds.value / TOTAL_ROUNDS) * 100))
  const hasRaceBeenRun = computed(() => completedRounds.value > 0)
  const currentRace = computed(() => (currentRound.value > 0 ? program.value[currentRound.value - 1] : null))

  // Actions
  const generateProgram = () => {
    isGenerating.value = true
    const newProgram = []

    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      const availableHorses = shuffle([...horseStore.horseList])
      const participants = []

      for (let j = 0; j < HORSES_PER_RACE; j++) {
        const randomIndex = Math.floor(Math.random() * availableHorses.length)
        participants.push(availableHorses.splice(randomIndex, 1)[0])
      }

      newProgram.push({
        ...DEFAULT_PROGRAM[i],
        participants,
        status: i === 0 ? ProgramStatus.CURRENT : ProgramStatus.UPCOMING,
      })
    }
    program.value = newProgram
    currentRound.value = 1
    raceState.value = RaceState.READY
    setTimeout(() => {
      isGenerating.value = false
    }, 1000)
  }

  const startRace = () => {
    if (raceState.value !== RaceState.READY) return
    raceState.value = RaceState.RACING
  }

  const resetRace = () => {
    program.value = JSON.parse(JSON.stringify(DEFAULT_PROGRAM))
    currentRound.value = 0
    raceState.value = RaceState.IDLE
  }

  return {
    program,
    currentRound,
    raceState,
    isGenerating,
    completedRounds,
    progressPercentage,
    hasRaceBeenRun,
    currentRace,
    generateProgram,
    startRace,
    resetRace,
  }
})
