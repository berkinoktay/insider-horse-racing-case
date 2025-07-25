<template>
  <span :style="style" v-html="processedSvg" />
</template>

<script setup lang="ts">
import horseSvg from '@/assets/svg/horse.svg?raw'
import { computed, type CSSProperties } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: string | number
    color?: string
  }>(),
  {
    size: 24,
    color: 'currentColor',
  },
)

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
