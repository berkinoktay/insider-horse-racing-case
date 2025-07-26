<template>
  <div class="h-[70vh] lg:h-full flex flex-col relative overflow-hidden">
    <WidgetHeader>
      <div class="flex items-center space-x-2 justify-between w-full">
        <div class="flex items-center space-x-3">
          <div class="text-xl sm:text-2xl">🏁</div>
          <div v-if="!allRacesFinished">
            <h3 class="text-base sm:text-xl font-bold text-white">
              {{ currentRace ? `Round ${currentRace.round}` : 'Awaiting Program' }}
            </h3>
            <p class="text-blue-200 text-xs sm:text-sm">
              {{ currentRace ? `Distance: ${currentRace.distance}m` : 'Generate a program to begin' }}
            </p>
          </div>
          <div v-else>
            <h3 class="text-base sm:text-xl font-bold text-white">All races finished!</h3>
          </div>
        </div>
        <BaseBadge
          :text="raceState.toUpperCase()"
          :variant="getRaceStateVariant(raceState)"
          size="sm"
          :animation="isRacing ? 'pulse' : 'none'"
        />
      </div>
    </WidgetHeader>

    <!-- Track Container -->
    <div class="flex-1 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-green-600 opacity-80"></div>

      <div class="absolute inset-0 bg-gradient-to-b from-green-400/20 to-green-800/40 transform">
        <!-- Distance Markers -->
        <template v-if="currentRace && !allRacesFinished">
          <div
            v-for="marker in distanceMarkers"
            :key="`marker-${marker}`"
            class="absolute top-0 bottom-0 -translate-x-1/2"
            :style="{ left: `${(marker / currentRace.distance) * 100}%` }"
          >
            <div class="w-px h-full bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
            <div class="absolute -top-1.5 transform -translate-x-1/2 left-1/2">
              <span
                class="text-[10px] sm:text-xs text-white/60 font-semibold bg-black/30 px-1 sm:px-1.5 py-0.5 rounded-md whitespace-nowrap"
              >
                {{ marker }}m
              </span>
            </div>
          </div>
        </template>
        <div class="h-full flex flex-col">
          <template v-if="hasParticipants && !allRacesFinished">
            <div
              v-for="(participant, index) in currentRace!.participants"
              :key="participant.id"
              class="flex-1 relative border-b border-white/20 flex items-center"
              :style="{ backgroundColor: `rgba(34, 197, 94, ${0.1 + (index % 2) * 0.1})` }"
            >
              <!-- Lane Number -->

              <div
                class="absolute top-1/2 -translate-y-1/2 left-0 w-8 sm:w-8 h-[calc(100%-6px)] bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm sm:text-lg z-10 rounded-r-lg"
              >
                {{ index + 1 }}
              </div>

              <!-- Horse Position -->
              <div
                class="group absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 hover:scale-110 cursor-pointer"
                :class="{ 'transition-all duration-500 ease-out': transitionsEnabled }"
                :style="{ left: (participant.position / currentRace.distance) * 100 + '%' }"
              >
                <div class="relative">
                  <HorseIcon
                    :size="80"
                    :color="participant.color"
                    :is-running="isRacing && participant.position < currentRace.distance"
                  />

                  <div
                    class="absolute top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {{ participant.name }}
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div
              v-for="i in 10"
              :key="`skeleton-${i}`"
              class="flex-1 relative border-b border-white/20"
              :style="{ backgroundColor: `rgba(34, 197, 94, ${0.1 + ((i - 1) % 2) * 0.1})` }"
            ></div>
          </template>
        </div>
      </div>

      <!-- Finish Line -->
      <div
        class="absolute top-0 bottom-0 right-2 w-3 sm:w-4 bg-gradient-to-b from-error-600 via-finish-line to-error-600 flex items-center justify-center shadow-lg"
      >
        <div class="text-error-500 font-bold transform rotate-90 text-xs sm:text-base">FINISH</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useRaceStore } from '@/stores/race'
import { storeToRefs } from 'pinia'
import { RaceState } from '@/types/enums'
import HorseIcon from '@/components/HorseIcon.vue'
import WidgetHeader from '@/components/WidgetHeader.vue'
import { getRaceStateVariant } from '@/utils/colors'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const raceStore = useRaceStore()
const { currentRace, raceState, allRacesFinished } = storeToRefs(raceStore)

const transitionsEnabled = ref(false)
const isRacing = computed(() => raceState.value === RaceState.RACING)
const hasParticipants = computed(() => !!currentRace.value?.participants?.length)

watch(currentRace, async (newRace, oldRace) => {
  if (newRace?.round !== oldRace?.round) {
    transitionsEnabled.value = false
    await nextTick()
  }
})

watch(isRacing, (racing) => {
  transitionsEnabled.value = racing
})

const distanceMarkers = computed(() => {
  if (!currentRace.value) return []
  const markers = []
  const { distance } = currentRace.value
  const interval = 200
  for (let d = interval; d < distance; d += interval) {
    markers.push(d)
  }
  return markers
})
</script>
