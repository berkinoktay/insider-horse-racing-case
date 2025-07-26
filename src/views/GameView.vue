<script setup lang="ts">
import { ref } from 'vue'
import HorseList from '@/components/layout/HorseList.vue'
import RaceTrack from '@/components/layout/RaceTrack.vue'
import RaceProgram from '@/components/layout/RaceProgram.vue'
import HeaderSection from '@/components/layout/HeaderSection.vue'
import RaceResults from '@/components/layout/RaceResults.vue'
import BaseTabs from '@/components/ui/BaseTabs.vue'

const activeTab = ref('program')

const tabs = [
  { label: 'Program', value: 'program' },
  { label: 'Results', value: 'results' },
]
</script>

<template>
  <div
    class="flex flex-col h-screen bg-gradient-to-br from-purple-900 via-primary-900 to-indigo-900 relative overflow-x-hidden"
  >
    <HeaderSection />
    <main class="flex-1 relative z-10 container mx-auto p-4 md:p-6 w-full overflow-y-auto lg:overflow-hidden">
      <div class="flex flex-col lg:flex-row gap-6 h-auto lg:h-full">
        <div class="w-full lg:w-1/4">
          <div class="h-full backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
            <HorseList />
          </div>
        </div>

        <div class="w-full lg:w-1/2">
          <div class="h-full backdrop-blur-lg bg-white/5 rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <RaceTrack />
          </div>
        </div>

        <div class="w-full lg:w-1/4">
          <div class="flex flex-col h-full gap-6">
            <BaseTabs v-model="activeTab" :tabs="tabs" />

            <div
              class="h-full backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden overscroll-y-contain"
            >
              <RaceProgram v-show="activeTab === 'program'" />
              <RaceResults v-show="activeTab === 'results'" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
