<template>
  <div class="h-[50vh] lg:h-full flex flex-col">
    <WidgetHeader>
      <div class="flex items-center space-x-2 justify-between w-full">
        <span class="text-lg font-bold text-white">{{ t('horse.stable_roster') }}</span>
        <BaseBadge :text="`${horses.length} ${t('horse.horses')}`" variant="secondary" size="sm" animation="none" />
      </div>
    </WidgetHeader>

    <div class="flex-1 overflow-y-auto p-4">
      <TransitionGroup v-if="horses.length > 0" name="fade" tag="div" appear class="flex flex-col gap-3">
        <HorseCard
          v-for="(horse, index) in horses"
          :key="horse.id"
          :name="horse.name"
          :color="horse.color"
          :condition-score="horse.conditionScore"
          :number="index + 1"
          :style="{ '--delay': `${index * 0.1}s` }"
        />
      </TransitionGroup>
      <template v-else>
        <div class="text-center py-8">
          <p class="text-white/60">{{ t('horse.no_horses') }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHorseStore } from '@/stores/horse'
import HorseCard from '@/components/horse/HorseCard.vue'
import WidgetHeader from '@/components/WidgetHeader.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const { t } = useI18n()
const horseStore = useHorseStore()

const horses = computed(() => horseStore.horseList)
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
