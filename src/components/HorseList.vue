<script setup lang="ts">
import { computed } from 'vue'
import { useHorseStore } from '@/stores/horse'
import HorseIcon from '@/components/HorseIcon.vue'

const horseStore = useHorseStore()
const horses = computed(() => horseStore.horseList)

// Condition level styling
const getConditionStyle = (score: number) => {
  if (score >= 80) return 'text-green-400 font-bold'
  if (score >= 60) return 'text-yellow-400 font-semibold'
  if (score >= 40) return 'text-orange-400'
  return 'text-red-400'
}

// Condition bar color
const getConditionBarColor = (score: number) => {
  if (score >= 80) return 'bg-gradient-to-r from-green-400 to-emerald-500'
  if (score >= 60) return 'bg-gradient-to-r from-yellow-400 to-amber-500'
  if (score >= 40) return 'bg-gradient-to-r from-orange-400 to-orange-500'
  return 'bg-gradient-to-r from-red-400 to-red-500'
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-white/20 shrink-0">
      <div class="flex items-center justify-between">
        <div class="text-lg font-bold text-white flex items-center space-x-2">Stable Roster</div>
        <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          {{ horses.length }} Horses
        </div>
      </div>
    </div>

    <!-- Horse List Content -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3">
      <div
        v-for="(horse, index) in horses"
        :key="horse.id"
        class="group relative backdrop-blur-sm bg-white/10 rounded-xl p-4 border border-white/20 overflow-hidden"
      >
        <!-- Horse Number Badge -->
        <div
          class="absolute top-0 left-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm rounded-br-lg"
        >
          {{ index + 1 }}
        </div>

        <!-- Horse Info -->
        <div class="flex items-center space-x-2 mb-3">
          <HorseIcon :size="50" :color="horse.color" />

          <div class="flex-1">
            <h3 class="text-white font-bold text-base leading-tight">{{ horse.name }}</h3>
          </div>
        </div>

        <!-- Condition Score -->
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-white/80 text-sm">Condition</span>
            <span :class="getConditionStyle(horse.conditionScore)"> {{ horse.conditionScore }}/100 </span>
          </div>

          <!-- Progress Bar -->
          <div class="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              :class="getConditionBarColor(horse.conditionScore)"
              class="h-full rounded-full transition-all duration-1000 ease-out"
              :style="{ width: horse.conditionScore + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="horses.length === 0" class="text-center py-8">
        <div class="text-6xl mb-4">🐴</div>
        <p class="text-white/60">No horses in stable</p>
      </div>
    </div>

    <!-- Footer Stats -->
    <!-- <div class="p-4 border-t border-white/20 shrink-0">
      <div class="grid grid-cols-2 gap-4 text-center">
        <div class="backdrop-blur-sm bg-white/10 rounded-lg p-3">
          <div class="text-2xl font-bold text-green-400">
            {{ horses.filter((h) => h.conditionScore >= 80).length }}
          </div>
          <div class="text-white/70 text-xs">Champions</div>
        </div>
        <div class="backdrop-blur-sm bg-white/10 rounded-lg p-3">
          <div class="text-2xl font-bold text-yellow-400">
            {{ Math.round(horses.reduce((acc, h) => acc + h.conditionScore, 0) / horses.length) || 0 }}
          </div>
          <div class="text-white/70 text-xs">Avg Score</div>
        </div>
      </div>
    </div> -->
  </div>
</template>
