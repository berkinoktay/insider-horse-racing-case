<template>
  <div class="w-full bg-white/20 rounded-full h-2 overflow-hidden">
    <div
      :class="colorClass"
      class="h-full rounded-full transition-all duration-1000 ease-out"
      :style="{ width: value + '%' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface ProgressBarProps {
  value: number
  colorClass: string
}

withDefaults(defineProps<ProgressBarProps>(), {
  value: 0,
  colorClass: 'bg-primary-500',
})
</script>
