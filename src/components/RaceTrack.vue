<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRaceStore } from '@/stores/race'
import { storeToRefs } from 'pinia'
import type { Horse } from '@/types'
import { RaceState } from '@/types/enums'
import BaseSvg from './ui/BaseSvg.vue'

const raceStore = useRaceStore()
const { currentRace, raceState } = storeToRefs(raceStore)

interface RacingHorse extends Horse {
  position: number
}

const racingHorses = ref<RacingHorse[]>([])

const isRacing = computed(() => raceState.value === RaceState.RACING)

watch(
  currentRace,
  (newRace) => {
    if (newRace && newRace.participants) {
      racingHorses.value = newRace.participants.map((horse) => ({
        ...horse,
        position: 0,
      }))
    } else {
      racingHorses.value = []
    }
  },
  { immediate: true, deep: true },
)

const lanes = Array.from({ length: 10 }, (_, i) => i + 1)
const trackLines = ref(Array.from({ length: 20 }, (_, i) => ({ id: i, delay: i * 0.1 })))
</script>

<template>
  <div class="h-full flex flex-col relative overflow-hidden">
    <!-- Race Header -->
    <div class="p-4 border-b border-white/20 backdrop-blur-sm bg-white/10">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <div class="text-2xl">🏁</div>
          <div>
            <h3 class="text-xl font-bold text-white">
              {{ currentRace ? `Round ${currentRace.round}` : 'Awaiting Program' }}
            </h3>
            <p class="text-blue-200 text-sm">
              {{ currentRace ? `Distance: ${currentRace.distance}m` : 'Generate a program to begin' }}
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <div
            class="bg-gradient-to-r text-white px-4 py-2 rounded-full text-sm font-bold"
            :class="{
              'from-red-400 to-pink-500 animate-pulse': isRacing,
              'from-yellow-400 to-orange-500': raceState === RaceState.READY,
              'from-gray-500 to-gray-600': raceState === RaceState.IDLE,
            }"
          >
            {{ raceState.toUpperCase() }}
          </div>
        </div>
      </div>
    </div>

    <!-- Track Container -->
    <div class="flex-1 relative">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-green-600 opacity-80">
        <!-- Moving track lines -->
        <div
          v-for="line in trackLines"
          :key="line.id"
          class="absolute h-full w-1 bg-white/30"
          :class="{ 'animate-track-lines': isRacing }"
          :style="{
            left: line.id * 5 + '%',
            animationDelay: line.delay + 's',
            animationDuration: '2s',
          }"
        ></div>
      </div>

      <!-- Track Surface with 3D Effect -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-green-400/20 to-green-800/40 transform perspective-1000 rotateX-2"
      >
        <!-- Track Lanes -->
        <div class="h-full flex flex-col">
          <div
            v-for="(lane, index) in lanes"
            :key="lane"
            class="flex-1 relative border-b border-white/20 flex items-center"
            :style="{ backgroundColor: `rgba(34, 197, 94, ${0.1 + (index % 2) * 0.1})` }"
          >
            <!-- Lane Number -->
            <!-- <div
              class="absolute left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10"
            >
              {{ lane }}
            </div> -->
            <div
              class="absolute top-1/2 -translate-y-1/2 left-0 w-12 h-[calc(100%-6px)] bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg z-10 rounded-r-lg"
            >
              {{ lane }}
            </div>

            <!-- Horse Position -->
            <div
              v-if="racingHorses[index]"
              class="group absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out hover:scale-110 cursor-pointer"
              :class="{ 'animate-gallop': isRacing }"
              :style="{ left: racingHorses[index].position + '%' }"
            >
              <div class="relative">
                <div
                  class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/30 rounded-full blur-xs"
                ></div>

                <BaseSvg name="horse" size="60" :style="{ color: racingHorses[index].color }" />

                <div
                  v-if="isRacing"
                  class="absolute top-1/2 right-full transform -translate-y-1/2 w-12 h-1 bg-gradient-to-r from-transparent to-white/50 rounded-full animate-pulse"
                ></div>
                <div
                  class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {{ racingHorses[index].name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Finish Line -->
      <div
        class="absolute top-0 bottom-0 right-8 w-4 bg-gradient-to-b from-red-500 via-white to-red-500 flex items-center justify-center shadow-lg"
      >
        <div class="text-white font-bold text-xs writing-mode-vertical transform rotate-180">FINISH</div>
      </div>
      <div
        class="absolute top-0 bottom-0 right-8 w-4 bg-gradient-to-b from-yellow-400 via-white to-yellow-400 animate-pulse opacity-75"
      ></div>
    </div>

    <!-- Race Progress Bar -->
    <div class="p-4 border-t border-white/20 backdrop-blur-sm bg-white/10">
      <div class="flex items-center justify-between mb-2">
        <span class="text-white/80 text-sm">Race Progress</span>
        <span class="text-white text-sm font-bold"
          >{{ Math.round(Math.max(0, ...(racingHorses || []).map((h) => h.position))) }}%</span
        >
      </div>
      <div class="w-full bg-white/20 rounded-full h-3 overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out"
          :class="{ 'animate-pulse': isRacing }"
          :style="{ width: Math.max(0, ...(racingHorses || []).map((h) => h.position)) + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.rotateX-2 {
  transform: rotateX(2deg);
}
.writing-mode-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
@keyframes animate-track-lines {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
.animate-track-lines {
  animation: animate-track-lines 2s linear infinite;
}
@keyframes gallop {
  0%,
  100% {
    transform: translateY(0) scaleY(1);
  }
  25% {
    transform: translateY(-2px) scaleY(0.95);
  }
  75% {
    transform: translateY(2px) scaleY(1.05);
  }
}
.animate-gallop {
  animation: gallop 0.6s ease-in-out infinite;
}
</style>
