<script setup lang="ts">
import { useRaceStore } from '@/stores/race'
import { TOTAL_ROUNDS } from '@/constants/race'
import { storeToRefs } from 'pinia'
import { CalendarX2 } from 'lucide-vue-next'
import { getStatusColor } from '@/utils'

const raceStore = useRaceStore()
const { program: raceProgram, completedRounds } = storeToRefs(raceStore)
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-white/20">
      <div class="flex items-center justify-between">
        <div class="text-xl font-bold text-white flex items-center space-x-2">Race Program</div>
        <div
          v-if="raceProgram.length > 0"
          class="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold"
        >
          {{ completedRounds }}/{{ TOTAL_ROUNDS }} Rounds
        </div>
      </div>
    </div>

    <!-- Race Schedule -->
    <div v-if="raceProgram.length > 0" class="flex-1 grid grid-cols-2 overflow-y-auto p-4 gap-3">
      <div
        v-for="race in raceProgram"
        :key="race.round"
        class="group relative backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
        :class="{
          'ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/20': race.status === 'current',
          'opacity-60': race.status === 'upcoming',
        }"
      >
        <div class="pl-6 p-4">
          <!-- Round Header -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div>
                <h3 class="text-white font-bold text-lg">Round {{ race.round }}</h3>
                <p class="text-blue-200 text-sm">Distance: {{ race.distance }}m</p>
              </div>
            </div>
            <div
              class="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r"
              :class="getStatusColor(race.status)"
            >
              {{ race.status.toUpperCase() }}
            </div>
          </div>

          <!-- Participants -->
          <div v-if="race.participants.length > 0" class="space-y-2">
            <div class="text-white/80 text-sm font-medium">Participants:</div>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="(participant, index) in race.participants"
                :key="participant.id"
                class="bg-white/10 rounded-lg px-3 py-2 text-center text-white text-sm font-medium hover:bg-white/20 transition-all duration-200"
              >
                <div class="flex items-center justify-center space-x-1">
                  <span class="text-xs opacity-70">{{ index + 1 }}.</span>
                  <span class="text-xs truncate">{{ participant.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State for upcoming races -->
          <div v-else-if="race.status === 'upcoming'" class="text-center py-4">
            <p class="text-white/60 text-sm">Horses will be selected</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex-1 flex flex-col items-center justify-center text-primary-300 text-center gap-6">
      <CalendarX2 :size="80" />
      <p class="text-primary-300 text-xl">No races scheduled</p>
    </div>
  </div>
</template>
