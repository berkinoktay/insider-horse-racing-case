<template>
  <div data-testid="progress-bar-container" class="w-full bg-white/20 rounded-full h-2 overflow-hidden">
    <div
      data-testid="progress-bar-inner"
      :class="colorClass"
      class="h-full rounded-full transition-all duration-1000 ease-out"
      :style="{ width: clampedValue + '%' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ProgressBarProps {
  value?: number
  colorClass?: string
}

const props = withDefaults(defineProps<ProgressBarProps>(), {
  value: 0,
  colorClass: 'bg-primary-500',
})

const clampedValue = computed(() => Math.max(0, Math.min(100, props.value)))
</script>
