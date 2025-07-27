<template>
  <div
    data-cy="horse-card"
    class="group relative backdrop-blur-sm bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden"
  >
    <!-- Horse Number Badge -->
    <div
      class="absolute top-0 left-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm rounded-br-lg"
    >
      {{ number }}
    </div>

    <!-- Horse Info -->
    <div class="flex items-center space-x-2 mb-3">
      <HorseIcon :size="50" :color="color" />

      <div class="flex-1">
        <h3 class="text-white font-bold text-base leading-tight">{{ name }}</h3>
      </div>
    </div>

    <!-- Condition Score -->
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <span class="text-white/80 text-sm">{{ $t('horse.condition') }}</span>
        <span :class="getConditionStyle(conditionScore)"> {{ conditionScore }}/100 </span>
      </div>

      <!-- Progress Bar -->
      <BaseProgressBar :value="conditionScore" :color-class="getConditionBarColor(conditionScore)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HorseIcon from '@/components/HorseIcon.vue'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'

interface HorseCardProps {
  name: string
  color: string
  conditionScore: number
  number: number
}

withDefaults(defineProps<HorseCardProps>(), {
  name: '',
  color: '',
  conditionScore: 0,
  number: 0,
})

const getConditionStyle = (score: number) => {
  if (score >= 80) return 'text-green-400 font-bold'
  if (score >= 60) return 'text-yellow-400 font-semibold'
  if (score >= 40) return 'text-orange-400'
  return 'text-red-400'
}

const getConditionBarColor = (score: number) => {
  if (score >= 80) return 'bg-gradient-to-r from-green-400 to-emerald-500'
  if (score >= 60) return 'bg-gradient-to-r from-yellow-400 to-amber-500'
  if (score >= 40) return 'bg-gradient-to-r from-orange-400 to-orange-500'
  return 'bg-gradient-to-r from-red-400 to-red-500'
}
</script>
