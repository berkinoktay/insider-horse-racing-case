<template>
  <div class="h-full flex flex-col">
    <WidgetHeader>
      <div class="flex items-center space-x-2 justify-between w-full">
        <span class="text-lg font-bold text-white">Stable Roster</span>
        <BaseBadge :text="`${horses.length} Horses`" variant="secondary" size="sm" animation="none" />
      </div>
    </WidgetHeader>

    <div class="flex-1 overflow-y-auto p-4 space-y-3">
      <template v-if="horses.length > 0">
        <HorseCard
          v-for="(horse, index) in horses"
          :key="horse.id"
          :name="horse.name"
          :color="horse.color"
          :condition-score="horse.conditionScore"
          :number="index + 1"
        />
      </template>
      <template v-else>
        <div class="text-center py-8">
          <p class="text-white/60">No horses in stable</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHorseStore } from '@/stores/horse'
import HorseCard from '@/components/horse/HorseCard.vue'
import WidgetHeader from '@/components/WidgetHeader.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const horseStore = useHorseStore()

const horses = computed(() => horseStore.horseList)
</script>
