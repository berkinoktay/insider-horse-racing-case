<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useHorseStore } from '@/stores'

const horseStore = useHorseStore()

onMounted(() => {
  horseStore.generateInitialHorses()
})
</script>

<style scoped></style>
