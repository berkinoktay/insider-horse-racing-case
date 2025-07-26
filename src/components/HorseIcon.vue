<template>
  <div class="relative">
    <span :style="style" v-html="processedSvg" />
    <div
      v-if="isRunning"
      aria-label="Horse Run Effect"
      tabindex="-1"
      class="absolute top-1/2 right-full transform -translate-y-1/2 w-14 h-1 bg-gradient-to-r from-transparent to-white/30 rounded-full animate-pulse"
    ></div>
    <div
      aria-label="Horse Shadow Effect"
      tabindex="-1"
      class="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/30 rounded-full blur-xs"
    ></div>
  </div>
</template>

<script setup lang="ts">
import horseSvg from '@/assets/svg/horse.svg?raw'
import { computed, type CSSProperties } from 'vue'

interface HorseIconProps {
  size?: string | number
  color?: string
  isRunning?: boolean
}

const props = withDefaults(defineProps<HorseIconProps>(), {
  size: 24,
  color: 'currentColor',
  isRunning: false,
})

const processedSvg = computed(() => {
  let svgData = horseSvg.replace(/\bwidth\s*=\s*["'][^"']*["']/g, '').replace(/\bheight\s*=\s*["'][^"']*["']/g, '')

  svgData = svgData.replace(/<svg\b([^>]*)>/, (_, attributes) => {
    return `<svg ${attributes} width="${props.size}" height="${props.size}" fill="${props.color}">`
  })

  return svgData
})

const style = computed<CSSProperties>(() => ({
  color: props.color,
  display: 'inline-block',
}))
</script>
