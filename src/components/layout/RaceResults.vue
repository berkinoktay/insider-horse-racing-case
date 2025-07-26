<template>
  <div class="h-[60vh] lg:h-full flex flex-col">
    <!-- Header -->
    <WidgetHeader>
      <div class="flex items-center space-x-2 justify-between w-full">
        <div class="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
          <Trophy class="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Race Results</span>
        </div>
        <select
          v-if="isProgramGenerated"
          v-model="selectedRound"
          class="bg-white/10 border border-white/20 text-white rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="race in raceProgram" :key="race.round" :value="race.round" class="bg-gray-800">
            Round {{ race.round }}
          </option>
        </select>
      </div>
    </WidgetHeader>

    <div class="flex-1 overflow-y-auto">
      <div v-if="currentResults" class="p-2 sm:p-4 space-y-6">
        <div class="text-center">
          <h3 class="text-base sm:text-lg font-bold text-white mb-4 flex items-center justify-center space-x-2">
            <span>Winner's Podium</span>
          </h3>

          <div class="flex items-end justify-center space-x-1 sm:space-x-2 mb-6">
            <WinnerPodium
              v-if="topThree[1]"
              variant="second"
              :title="topThree[1].horse"
              :time="topThree[1].time"
              content="🥈"
            />

            <WinnerPodium
              v-if="topThree[0]"
              variant="first"
              :title="topThree[0].horse"
              :time="topThree[0].time"
              content="🥇"
            />

            <WinnerPodium
              v-if="topThree[2]"
              variant="third"
              :title="topThree[2].horse"
              :time="topThree[2].time"
              content="🥉"
            />
          </div>
        </div>

        <BaseTable :data="currentResults.results" :columns="columns">
          <template #header>
            <div class="flex items-center justify-between space-x-2 text-base sm:text-lg font-bold text-white w-full">
              <div class="flex items-center space-x-2">
                <ChartNoAxesColumn class="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Full Results</span>
              </div>
              <span class="text-white/60 text-xs sm:text-sm">{{ currentResults.distance }}m</span>
            </div>
          </template>

          <template #data-position="{ value }">
            <span class="text-white font-bold">{{ value }}</span>
          </template>
          <template #data-horse="{ value }">
            <span class="text-white font-medium text-xs sm:text-base">{{ value }}</span>
          </template>
          <template #data-time="{ value }">
            <span class="text-blue-200 font-mono text-xs sm:text-base">{{ value }}</span>
          </template>
        </BaseTable>
      </div>

      <div v-else class="flex-1 flex items-center justify-center p-8">
        <div class="text-center">
          <h3 class="text-lg sm:text-xl font-bold text-white mb-2">No Results Yet</h3>
          <p class="text-white/60 text-sm">Results will appear after races complete</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Trophy, ChartNoAxesColumn } from 'lucide-vue-next'
import WidgetHeader from '@/components/WidgetHeader.vue'
import WinnerPodium from '@/components/WinnerPodium.vue'
import BaseTable from '@/components/ui/BaseTable.vue'
import { useRaceStore } from '@/stores/race'
import { ProgramStatus, type Column } from '@/types'
import { storeToRefs } from 'pinia'
import { formatTime } from '@/utils'
import { RACE_RESULTS_COLUMNS } from '@/constants'

const raceStore = useRaceStore()
const { program: raceProgram, completedRounds } = storeToRefs(raceStore)

const selectedRound = ref<number>()

const columns = ref<Column[]>(RACE_RESULTS_COLUMNS)

const isProgramGenerated = computed(() => raceProgram.value.length > 0)

const currentResults = computed(() => {
  if (!selectedRound.value || !isProgramGenerated.value) {
    return null
  }

  const race = raceProgram.value.find((r) => r.round === selectedRound.value)

  if (!race || race.status !== ProgramStatus.COMPLETED) {
    return null
  }

  const formattedResults = race.results.map((p, index) => ({
    position: index + 1,
    horse: p.name,
    time: formatTime(p.finishTime || 0),
  }))

  return {
    round: race.round,
    distance: race.distance,
    results: formattedResults,
  }
})

const topThree = computed(() => {
  const results = currentResults.value?.results || []
  return [results[0], results[1], results[2]]
})

watch(
  () => [raceProgram.value.length, completedRounds.value],
  ([programLength, completedCount]) => {
    if (completedCount > 0) {
      selectedRound.value = completedCount
    } else if (programLength > 0) {
      selectedRound.value = 1
    } else {
      selectedRound.value = undefined
    }
  },
  { immediate: true },
)
</script>
