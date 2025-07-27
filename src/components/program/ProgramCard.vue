<template>
  <div
    data-cy="program-card"
    class="group relative backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
    :class="{
      'ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/20': status === 'current',
      'opacity-60': status === 'upcoming',
    }"
  >
    <div class="pl-6 p-3 sm:p-4">
      <div
        class="flex flex-row lg:flex-col-reverse xl:flex-row items-center lg:items-start justify-between mb-3 space-y-2 lg:gap-2"
      >
        <div class="flex items-center space-x-3">
          <div>
            <h3 class="text-white font-bold text-base sm:text-lg">{{ roundName }}</h3>
            <p class="text-blue-200 text-xs sm:text-sm">{{ t('common.distance') }}: {{ distance }}m</p>
          </div>
        </div>
        <BaseBadge :text="t(`status.${status}`)" :variant="getProgramStatusVariant(status)" size="sm" />
      </div>

      <div v-if="participants.length > 0" class="space-y-2">
        <div class="text-white/80 text-xs sm:text-sm font-medium">{{ t('common.participants') }}:</div>
        <div class="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-2 gap-y-1">
          <div
            v-for="(participant, index) in participants"
            :key="participant.id"
            class="bg-white/10 rounded-lg px-3 py-2 text-center text-white font-medium hover:bg-white/20 transition-all duration-200"
          >
            <div class="flex items-center justify-center space-x-1">
              <span class="text-xs sm:text-sm opacity-70">{{ index + 1 }}.</span>
              <span class="text-xs sm:text-sm truncate">{{ participant.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="status === 'upcoming'" class="text-center py-4">
        <p class="text-white/60 text-sm">{{ t('program_card.horses_will_be_selected') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Horse, ProgramStatus } from '@/types'
import { getProgramStatusVariant } from '@/utils'
import BaseBadge from '@/components/ui/BaseBadge.vue'

interface ProgramCardProps {
  roundName: string
  distance: number
  participants: Horse[]
  status: ProgramStatus
}

defineProps<ProgramCardProps>()
const { t } = useI18n()
</script>
