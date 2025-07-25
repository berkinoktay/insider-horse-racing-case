<script setup lang="ts">
import { useRaceStore } from '@/stores/race'
import { TOTAL_ROUNDS } from '@/constants/race'
import { storeToRefs } from 'pinia'
import { ProgramStatus } from '@/types/enums'

const raceStore = useRaceStore()
const { program: raceProgram, completedRounds, progressPercentage } = storeToRefs(raceStore)

const getStatusColor = (status: ProgramStatus) => {
  switch (status) {
    case ProgramStatus.COMPLETED:
      return 'from-green-400 to-emerald-500'
    case ProgramStatus.CURRENT:
      return 'from-yellow-400 to-orange-500'
    case ProgramStatus.UPCOMING:
    default:
      return 'from-gray-400 to-gray-500'
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-white/20">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white flex items-center space-x-2">
          <span class="text-2xl">📋</span>
          <span>Race Program</span>
        </h2>
        <div class="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          {{ completedRounds }}/{{ TOTAL_ROUNDS }} Rounds
        </div>
      </div>
    </div>

    <!-- Race Schedule -->
    <div class="flex-1 grid grid-cols-2 overflow-y-auto p-4 gap-3">
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
            <div class="text-4xl mb-2">🎲</div>
            <p class="text-white/60 text-sm">Horses will be selected</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
