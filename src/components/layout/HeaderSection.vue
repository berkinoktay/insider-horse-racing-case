<template>
  <header class="relative z-10 backdrop-blur-lg bg-white/10 shadow-2xl border-b border-white/20">
    <div class="container mx-auto px-4 sm:px-6 py-4">
      <div class="flex flex-col lg:flex-row justify-between items-center lg:space-y-0 space-y-4">
        <div class="flex items-center space-x-3">
          <img src="@/assets/images/logo-horse.png" alt="Horse Racing Logo" class="w-10 h-10" />
          <div class="flex flex-col items-center lg:items-start">
            <h1
              class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent text-center sm:text-left"
            >
              Horse Racing Championship
            </h1>
            <p class="text-blue-200 text-xs text-center sm:text-left">Feel the Thunder, Race to Glory!</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-4 flex-col lg:flex-row sm:space-x-0">
          <BaseSwitch
            v-model="autoMode"
            @update:modelValue="toggleAutoMode"
            on-label="Otomatik"
            off-label="Manuel"
            :disabled="raceState === RaceState.RACING"
          />

          <div class="h-[1px] w-full lg:h-8 lg:w-px bg-white/20"></div>
          <div class="flex items-center gap-2">
            <BaseButton
              @click="generateProgram"
              :loading="isGeneratingProgram"
              :disabled="raceState === RaceState.RACING || raceState === RaceState.PAUSED"
              variant="secondary"
              size="sm"
            >
              <span v-if="!isGeneratingProgram"> GENERATE PROGRAM </span>
              <span v-else> GENERATING... </span>
            </BaseButton>

            <BaseButton
              v-if="raceState !== RaceState.RACING"
              @click="handleStartResume"
              :disabled="isGeneratingProgram || raceState === RaceState.IDLE || raceState === RaceState.FINISHED"
              variant="accent"
              size="sm"
            >
              {{ raceState === RaceState.PAUSED ? 'RESUME' : 'START' }}
            </BaseButton>

            <BaseButton v-if="raceState === RaceState.RACING" @click="pauseRace" variant="warning" size="sm">
              PAUSE
            </BaseButton>

            <BaseButton
              @click="resetRace"
              :disabled="isGeneratingProgram || raceState === RaceState.IDLE"
              variant="danger"
              size="sm"
            >
              RESET
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRaceStore } from '@/stores/race'
import { storeToRefs } from 'pinia'
import { RaceState } from '@/types/enums'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseSwitch from '@/components/ui/BaseSwitch.vue'

const raceStore = useRaceStore()
const { raceState, isGeneratingProgram, autoMode } = storeToRefs(raceStore)

const { generateProgram, startRace, resetRace, pauseRace, resumeRace, toggleAutoMode } = raceStore

const handleStartResume = () => {
  if (raceState.value === RaceState.PAUSED) {
    resumeRace()
  } else {
    startRace()
  }
}
</script>
