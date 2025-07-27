<template>
  <TopBar />
  <header class="relative z-10 backdrop-blur-lg bg-white/10 shadow-2xl border-b border-white/20">
    <div class="container mx-auto px-4 sm:px-6 py-4">
      <div class="flex flex-col lg:flex-row justify-between items-center lg:space-y-0 space-y-4">
        <div class="flex items-center space-x-3">
          <img src="@/assets/images/logo-horse.png" alt="Horse Racing Logo" class="w-10 h-10" />
          <div class="flex flex-col items-center lg:items-start">
            <h1
              class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent text-center sm:text-left"
            >
              {{ t('header.title') }}
            </h1>
            <p class="text-blue-200 text-xs text-center sm:text-left">{{ t('header.subtitle') }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-4 flex-col lg:flex-row sm:space-x-0">
          <div class="flex items-center gap-2">
            <BaseButton
              @click="generateProgram"
              :loading="isGeneratingProgram"
              :disabled="raceState === RaceState.RACING || raceState === RaceState.PAUSED"
              variant="secondary"
              size="sm"
              data-cy="generate-program-button"
            >
              <span v-if="!isGeneratingProgram"> {{ t('header.generate_program') }} </span>
              <span v-else> {{ t('header.generating') }} </span>
            </BaseButton>

            <BaseButton
              v-if="raceState === RaceState.IDLE || raceState === RaceState.READY || raceState === RaceState.FINISHED"
              @click="startRace"
              :disabled="isGeneratingProgram || raceState === RaceState.IDLE || raceState === RaceState.FINISHED"
              variant="accent"
              size="sm"
              data-cy="start-button"
            >
              {{ t('header.start') }}
            </BaseButton>

            <BaseButton
              v-else
              @click="handleStartResume"
              :variant="raceState === RaceState.RACING ? 'warning' : 'accent'"
              size="sm"
              data-cy="pause-resume-button"
            >
              {{ raceState === RaceState.RACING ? t('header.pause') : t('header.resume') }}
            </BaseButton>

            <BaseButton
              @click="resetRace"
              :disabled="isGeneratingProgram || raceState === RaceState.IDLE"
              variant="danger"
              size="sm"
              data-cy="reset-button"
            >
              {{ t('header.reset') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRaceStore } from '@/stores/race'
import { storeToRefs } from 'pinia'
import { RaceState } from '@/types/enums'
import BaseButton from '@/components/ui/BaseButton.vue'
import TopBar from '@/components/layout/TopBar.vue'

const { t } = useI18n()
const raceStore = useRaceStore()
const { raceState, isGeneratingProgram } = storeToRefs(raceStore)

const { generateProgram, startRace, resetRace, pauseRace, resumeRace } = raceStore

const handleStartResume = () => {
  if (raceState.value === RaceState.PAUSED) {
    resumeRace()
  } else {
    pauseRace()
  }
}
</script>
