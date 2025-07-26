<script setup lang="ts">
import HorseList from '@/components/layout/HorseList.vue'
import RaceTrack from '@/components/layout/RaceTrack.vue'
import RaceProgram from '@/components/layout/RaceProgram.vue'
import HeaderSection from '@/components/layout/HeaderSection.vue'
import RaceResults from '@/components/RaceResults.vue'
</script>

<template>
  <div
    class="flex flex-col h-screen bg-gradient-to-br from-purple-900 via-primary-900 to-indigo-900 relative overflow-hidden"
  >
    <HeaderSection />
    <main class="flex-1 relative z-10 container mx-auto p-6 w-full overflow-hidden">
      <div class="flex gap-6 h-full">
        <div class="w-1/4 h-full">
          <div class="h-full backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
            <HorseList />
          </div>
        </div>

        <div class="w-1/2 h-full flex flex-col gap-6">
          <div class="flex-1 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <RaceTrack />
          </div>
          <div class="h-1/3 backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
            <RaceProgram />
          </div>
        </div>

        <div class="w-1/4 flex gap-6">
          <div class="flex-1 backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
            <RaceResults />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
