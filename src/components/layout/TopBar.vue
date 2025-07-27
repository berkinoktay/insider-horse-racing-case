<template>
  <div class="bg-black/20 backdrop-blur-sm text-white text-xs py-2 border-b border-white/10">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="flex justify-center sm:justify-end items-center gap-4">
        <BaseSwitch
          v-model="autoMode"
          @update:modelValue="toggleAutoMode"
          :on-label="t('header.auto_mode_on')"
          :off-label="t('header.auto_mode_off')"
          :disabled="raceState === RaceState.RACING"
        />
        <div class="h-4 w-px bg-white/20"></div>
        <LanguageSwitcher />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRaceStore } from '@/stores/race'
import { storeToRefs } from 'pinia'
import { RaceState } from '@/types/enums'
import BaseSwitch from '@/components/ui/BaseSwitch.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

const { t } = useI18n()
const raceStore = useRaceStore()
const { raceState, autoMode } = storeToRefs(raceStore)
const { toggleAutoMode } = raceStore
</script>
