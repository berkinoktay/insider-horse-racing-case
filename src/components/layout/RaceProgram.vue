<template>
  <div class="h-full flex flex-col">
    <WidgetHeader>
      <div class="flex items-center space-x-2 justify-between w-full">
        <span class="text-lg font-bold text-white">Race Program</span>
        <BaseBadge
          :text="`${completedRounds}/${TOTAL_ROUNDS} Completed`"
          variant="secondary"
          size="sm"
          animation="none"
        />
      </div>
    </WidgetHeader>

    <div v-if="raceProgram.length > 0" class="flex-1 flex flex-col overflow-y-auto p-4 gap-3">
      <ProgramCard
        v-for="(race, index) in raceProgram"
        :key="race.round"
        :ref="
          (el) => {
            if (el) cardRefs[index] = el as InstanceType<typeof ProgramCard>
          }
        "
        :round-name="`Round ${race.round}`"
        :distance="race.distance"
        :participants="race.participants"
        :status="race.status"
      />
    </div>
    <div v-else class="flex-1 flex flex-col items-center justify-center text-primary-300 text-center gap-6">
      <CalendarX2 :size="80" />
      <p class="text-primary-300 text-xl">No races scheduled</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRaceStore } from '@/stores/race'
import { TOTAL_ROUNDS } from '@/constants/race'
import { storeToRefs } from 'pinia'
import { CalendarX2 } from 'lucide-vue-next'
import WidgetHeader from '@/components/WidgetHeader.vue'
import ProgramCard from '@/components/program/ProgramCard.vue'
import { ref, watch, nextTick } from 'vue'
import { ProgramStatus } from '@/types/enums'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const raceStore = useRaceStore()
const { program: raceProgram, completedRounds } = storeToRefs(raceStore)

const cardRefs = ref<(InstanceType<typeof ProgramCard> | null)[]>([])

watch(
  raceProgram,
  (newProgram) => {
    const currentIndex = newProgram.findIndex((race) => race.status === ProgramStatus.CURRENT)

    if (currentIndex !== -1) {
      nextTick(() => {
        const cardComponent = cardRefs.value[currentIndex]
        if (cardComponent) {
          cardComponent.$el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      })
    }
  },
  { deep: true, flush: 'post' },
)
</script>
