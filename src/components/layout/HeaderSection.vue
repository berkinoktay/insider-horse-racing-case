<template>
  <header class="relative z-10 backdrop-blur-lg bg-white/10 shadow-2xl border-b border-white/20">
    <div class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <img src="@/assets/images/logo-horse.png" alt="Horse Racing Logo" class="w-10 h-10" />
          <div>
            <h1
              class="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
            >
              Horse Racing Championship
            </h1>
            <p class="text-blue-200 text-xs">Feel the Thunder, Race to Glory!</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-4">
          <BaseSwitch
            v-model="autoMode"
            @update:modelValue="toggleAutoMode"
            on-label="Otomatik"
            off-label="Manuel"
            :disabled="raceState === RaceState.RACING"
          />

          <div class="h-8 w-px bg-white/20"></div>

          <BaseButton
            @click="generateProgram"
            :loading="isGenerating"
            :disabled="raceState === RaceState.RACING || raceState === RaceState.PAUSED"
            variant="secondary"
            size="sm"
          >
            <span v-if="!isGenerating" class="flex items-center space-x-2">
              <span>GENERATE PROGRAM</span>
            </span>
            <span v-else class="flex items-center space-x-2">
              <span>GENERATING...</span>
            </span>
          </BaseButton>

          <BaseButton
            v-if="raceState !== RaceState.RACING"
            @click="handleStartResume"
            :disabled="raceState === RaceState.IDLE || raceState === RaceState.FINISHED"
            variant="accent"
            size="sm"
          >
            <span class="flex items-center space-x-2">
              <span>{{ raceState === RaceState.PAUSED ? 'RESUME RACE' : 'START RACE' }}</span>
            </span>
          </BaseButton>

          <BaseButton v-if="raceState === RaceState.RACING" @click="pauseRace" variant="warning" size="sm">
            <span class="flex items-center space-x-2">
              <span>PAUSE RACE</span>
            </span>
          </BaseButton>

          <BaseButton @click="resetRace" :disabled="raceState === RaceState.IDLE" variant="danger" size="sm">
            <span>RESET RACE</span>
          </BaseButton>
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
const { raceState, isGenerating, autoMode } = storeToRefs(raceStore)

const { generateProgram, startRace, resetRace, pauseRace, resumeRace, toggleAutoMode } = raceStore

const handleStartResume = () => {
  if (raceState.value === RaceState.PAUSED) {
    resumeRace()
  } else {
    startRace()
  }
}
</script>
