<template>
  <div class="h-[60vh] lg:h-full flex flex-col">
    <WidgetHeader>
      <div class="flex flex-row lg:flex-col xl:flex-row items-center space-x-2 justify-between w-full">
        <span class="text-lg font-bold text-white">{{ t('program.title') }}</span>
        <BaseBadge
          :text="`${completedRounds}/${TOTAL_ROUNDS} ${t('status.completed')}`"
          variant="secondary"
          size="sm"
          animation="none"
        />
      </div>
    </WidgetHeader>

    <TransitionGroup
      v-if="raceProgram.length > 0"
      appear
      name="fade"
      tag="div"
      class="flex-1 flex flex-col overflow-y-auto p-4 gap-3"
    >
      <ProgramCard
        v-for="(race, index) in raceProgram"
        :key="race.round"
        :round-name="`${t('common.round')} ${race.round}`"
        :distance="race.distance"
        :participants="race.participants"
        :status="race.status"
        :style="{ '--delay': `${index * 0.1}s` }"
      />
    </TransitionGroup>
    <div v-else class="flex-1 flex flex-col items-center justify-center text-primary-300 text-center gap-6">
      <CalendarX2 :size="80" />
      <p data-cy="no-races-message" class="text-primary-300 text-xl">{{ t('program.no_races') }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRaceStore } from '@/stores/race'
import { TOTAL_ROUNDS } from '@/constants/race'
import { storeToRefs } from 'pinia'
import { CalendarX2 } from 'lucide-vue-next'
import WidgetHeader from '@/components/WidgetHeader.vue'
import ProgramCard from '@/components/program/ProgramCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const { t } = useI18n()
const raceStore = useRaceStore()
const { program: raceProgram, completedRounds } = storeToRefs(raceStore)
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.4s ease-out;
  transition-delay: var(--delay, 0s);
}

.fade-enter-from {
  opacity: 0;
}
</style>
