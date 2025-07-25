import { defineStore } from 'pinia'
import type { Horse } from '@/types'
import { HORSE_NAMES, HORSE_COLORS } from '@/constants'
import { ref } from 'vue'
import { getRandomIndexInArray } from '@/utils'

export const useHorseStore = defineStore('horse', () => {
  const horseList = ref<Horse[]>([])

  function generateInitialHorses() {
    const horses: Horse[] = []
    const availableColors = [...HORSE_COLORS]
    for (let i = 0; i < HORSE_NAMES.length; i++) {
      horses.push({
        id: i + 1,
        name: HORSE_NAMES[i],
        color: availableColors.splice(getRandomIndexInArray(availableColors), 1)[0],
        conditionScore: Math.floor(Math.random() * 100) + 1,
      })
    }
    horseList.value = horses
  }
  return { horseList, generateInitialHorses }
})
