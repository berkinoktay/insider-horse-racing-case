<script setup lang="ts">
import { ref, computed } from 'vue'

// Mock results data
const raceResults = ref([
  {
    round: 1,
    distance: 1200,
    date: '2024-01-15',
    results: [
      { position: 1, horse: 'Thunder', time: '1:15.32', emoji: '🏇', prize: 5000 },
      { position: 2, horse: 'Lightning', time: '1:15.87', emoji: '🐎', prize: 3000 },
      { position: 3, horse: 'Storm', time: '1:16.12', emoji: '🐴', prize: 2000 },
      { position: 4, horse: 'Blaze', time: '1:16.45', emoji: '🦄', prize: 1000 },
      { position: 5, horse: 'Spirit', time: '1:16.78', emoji: '🏇', prize: 500 },
    ],
  },
  {
    round: 2,
    distance: 1400,
    date: '2024-01-16',
    results: [
      { position: 1, horse: 'Phoenix', time: '1:28.45', emoji: '🐎', prize: 5500 },
      { position: 2, horse: 'Shadow', time: '1:28.92', emoji: '🏇', prize: 3300 },
      { position: 3, horse: 'Comet', time: '1:29.15', emoji: '🦄', prize: 2200 },
      { position: 4, horse: 'Rocket', time: '1:29.67', emoji: '🐴', prize: 1100 },
      { position: 5, horse: 'Dash', time: '1:30.12', emoji: '🏇', prize: 550 },
    ],
  },
])

const selectedRound = ref(1)

const currentResults = computed(() => raceResults.value.find((r) => r.round === selectedRound.value))

const topThree = computed(() => currentResults.value?.results.slice(0, 3) || [])

const getPodiumHeight = (position: number) => {
  switch (position) {
    case 1:
      return 'h-20' // Gold - highest
    case 2:
      return 'h-16' // Silver - medium
    case 3:
      return 'h-12' // Bronze - lowest
    default:
      return 'h-8'
  }
}

const getPodiumColor = (position: number) => {
  switch (position) {
    case 1:
      return 'from-yellow-400 to-yellow-600' // Gold
    case 2:
      return 'from-gray-300 to-gray-500' // Silver
    case 3:
      return 'from-amber-600 to-amber-800' // Bronze
    default:
      return 'from-gray-400 to-gray-600'
  }
}

const getMedalEmoji = (position: number) => {
  switch (position) {
    case 1:
      return '🥇'
    case 2:
      return '🥈'
    case 3:
      return '🥉'
    default:
      return '🏁'
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-white/20">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-xl font-bold text-white flex items-center space-x-2">
          <span class="text-2xl">🏆</span>
          <span>Race Results</span>
        </h2>
        <select
          v-model="selectedRound"
          class="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="result in raceResults" :key="result.round" :value="result.round" class="bg-gray-800">
            Round {{ result.round }}
          </option>
        </select>
      </div>

      <!-- Race Info -->
      <div v-if="currentResults" class="text-center">
        <p class="text-blue-200 text-sm">
          {{ currentResults.distance }}m • {{ new Date(currentResults.date).toLocaleDateString('tr-TR') }}
        </p>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto">
      <div v-if="currentResults" class="p-4 space-y-6">
        <!-- Podium -->
        <div class="text-center">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center justify-center space-x-2">
            <span>🏁</span>
            <span>Winner's Podium</span>
          </h3>

          <div class="flex items-end justify-center space-x-2 mb-6">
            <!-- 2nd Place -->
            <div v-if="topThree[1]" class="flex flex-col items-center">
              <div class="text-3xl mb-2" style="animation-delay: 0.2s">
                {{ topThree[1].emoji }}
              </div>
              <div class="text-white font-bold text-sm mb-1">{{ topThree[1].horse }}</div>
              <div
                class="w-16 bg-gradient-to-t rounded-t-lg flex items-center justify-center text-white font-bold relative overflow-hidden"
                :class="[getPodiumHeight(2), getPodiumColor(2)]"
              >
                <span class="text-xl">🥈</span>
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></div>
              </div>
              <div class="text-xs text-white/70 mt-1">{{ topThree[1].time }}</div>
            </div>

            <!-- 1st Place -->
            <div v-if="topThree[0]" class="flex flex-col items-center mx-4">
              <div class="text-4xl mb-2">
                {{ topThree[0].emoji }}
              </div>
              <div class="text-yellow-300 font-bold mb-1">{{ topThree[0].horse }}</div>
              <div
                class="w-20 bg-gradient-to-t rounded-t-lg flex items-center justify-center text-white font-bold relative overflow-hidden animate-pulse"
                :class="[getPodiumHeight(1), getPodiumColor(1)]"
              >
                <span class="text-2xl">🥇</span>
                <div class="absolute top-0 left-0 right-0 h-1 bg-white/40"></div>
              </div>
              <div class="text-sm text-yellow-300 font-bold mt-1">{{ topThree[0].time }}</div>
            </div>

            <!-- 3rd Place -->
            <div v-if="topThree[2]" class="flex flex-col items-center">
              <div class="text-3xl mb-2" style="animation-delay: 0.4s">
                {{ topThree[2].emoji }}
              </div>
              <div class="text-white font-bold text-sm mb-1">{{ topThree[2].horse }}</div>
              <div
                class="w-16 bg-gradient-to-t rounded-t-lg flex items-center justify-center text-white font-bold relative overflow-hidden"
                :class="[getPodiumHeight(3), getPodiumColor(3)]"
              >
                <span class="text-xl">🥉</span>
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></div>
              </div>
              <div class="text-xs text-white/70 mt-1">{{ topThree[2].time }}</div>
            </div>
          </div>
        </div>

        <!-- Full Results Table -->
        <div class="backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 overflow-hidden">
          <div class="p-4 border-b border-white/20">
            <h3 class="text-lg font-bold text-white flex items-center space-x-2">
              <span>📊</span>
              <span>Full Results</span>
            </h3>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-white/5">
                <tr class="text-white/80 text-sm">
                  <th class="text-left p-3">Pos</th>
                  <th class="text-left p-3">Horse</th>
                  <th class="text-left p-3">Time</th>
                  <th class="text-right p-3">Prize</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="result in currentResults.results"
                  :key="result.position"
                  class="border-b border-white/10 hover:bg-white/5 transition-colors"
                  :class="{
                    'bg-gradient-to-r from-yellow-400/10 to-transparent': result.position === 1,
                    'bg-gradient-to-r from-gray-400/10 to-transparent': result.position === 2,
                    'bg-gradient-to-r from-amber-600/10 to-transparent': result.position === 3,
                  }"
                >
                  <td class="p-3">
                    <div class="flex items-center space-x-2">
                      <span class="text-lg">{{ getMedalEmoji(result.position) }}</span>
                      <span class="text-white font-bold">{{ result.position }}</span>
                    </div>
                  </td>
                  <td class="p-3">
                    <div class="flex items-center space-x-2">
                      <span class="text-2xl">{{ result.emoji }}</span>
                      <span class="text-white font-medium">{{ result.horse }}</span>
                    </div>
                  </td>
                  <td class="p-3">
                    <span class="text-blue-200 font-mono">{{ result.time }}</span>
                  </td>
                  <td class="p-3 text-right">
                    <span class="text-green-400 font-bold">${{ result.prize.toLocaleString() }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex-1 flex items-center justify-center p-8">
        <div class="text-center">
          <div class="text-6xl mb-4">🏁</div>
          <h3 class="text-xl font-bold text-white mb-2">No Results Yet</h3>
          <p class="text-white/60">Results will appear after races complete</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Podium glow animation */
@keyframes podiumGlow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
  }
}

.animate-podium-glow {
  animation: podiumGlow 2s ease-in-out infinite;
}
</style>
