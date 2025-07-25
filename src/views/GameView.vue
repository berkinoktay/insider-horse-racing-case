<script setup lang="ts">
import HorseList from '@/components/HorseList.vue'
import RaceTrack from '@/components/RaceTrack.vue'
import RaceProgram from '@/components/RaceProgram.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRaceStore } from '@/stores/race'
import { storeToRefs } from 'pinia'
import { RaceState } from '@/types/enums'

const raceStore = useRaceStore()
const { raceState, isGenerating } = storeToRefs(raceStore)

const { generateProgram, startRace, resetRace } = raceStore
</script>

<template>
  <div
    class="flex flex-col h-screen bg-gradient-to-br from-purple-900 via-primary-900 to-indigo-900 relative overflow-hidden"
  >
    <header class="relative z-10 backdrop-blur-lg bg-white/10 shadow-2xl border-b border-white/20">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <img src="@/assets/images/logo-horse.png" alt="Horse Racing Logo" class="w-10 h-10" />
            <div>
              <h1
                class="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
              >
                Horse Racing Championship
              </h1>
              <p class="text-blue-200 text-xs">Feel the Thunder, Race to Glory!</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-4">
            <BaseButton
              @click="generateProgram"
              :loading="isGenerating"
              :disabled="raceState === RaceState.RACING"
              variant="secondary"
            >
              <template #left-icon>
                <span>🎲</span>
              </template>
              <span v-if="!isGenerating" class="flex items-center space-x-2">
                <span>GENERATE PROGRAM</span>
              </span>
              <span v-else class="flex items-center space-x-2">
                <span>GENERATING...</span>
              </span>
            </BaseButton>

            <BaseButton
              @click="startRace"
              :loading="isGenerating"
              :disabled="raceState !== RaceState.READY"
              variant="accent"
            >
              <span v-if="raceState !== RaceState.RACING" class="flex items-center space-x-2">
                <span>🚀</span>
                <span>START RACE</span>
              </span>
              <span v-else class="flex items-center space-x-2">
                <div class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>RACING...</span>
              </span>
            </BaseButton>

            <BaseButton @click="resetRace" :disabled="raceState === RaceState.IDLE" variant="danger">
              <span class="flex items-center space-x-2">
                <span>🔄</span>
                <span>RESET RACE</span>
              </span>
            </BaseButton>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 relative z-10 container mx-auto p-6 w-full overflow-hidden">
      <div class="flex gap-6 h-full">
        <!-- Horse List -->
        <div class="w-1/4 h-full">
          <div class="h-full backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
            <HorseList />
          </div>
        </div>

        <div class="w-1/2 h-full flex flex-col gap-6">
          <!-- Race Track -->
          <div class="flex-1 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <RaceTrack />
          </div>
          <!-- Race Program -->
          <div class="h-1/3 backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
            <RaceProgram />
          </div>
        </div>

        <!-- Race Results -->

        <div class="w-1/4 flex gap-6">
          <div class="flex-1 backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Glass morphism effects */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Gradient text animation */
@keyframes gradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>
