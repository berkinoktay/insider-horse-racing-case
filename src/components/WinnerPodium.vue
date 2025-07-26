<template>
  <div class="flex flex-col items-center" :class="{ 'mx-4': variant === 'first' }">
    <div class="mb-1 font-bold" :class="titleClasses">{{ title }}</div>
    <div
      class="relative flex items-center justify-center overflow-hidden rounded-t-lg font-bold text-white"
      :class="podiumBoxClasses"
    >
      <span :class="contentClasses">{{ content }}</span>
      <div class="absolute left-0 right-0 h-1" :class="podiumLineClasses"></div>
    </div>
    <div class="mt-1" :class="timeClasses">{{ time }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type WinnerPodiumProps = {
  title: string
  time: string
  content: string
  variant: 'first' | 'second' | 'third'
}

const props = withDefaults(defineProps<WinnerPodiumProps>(), {})

const titleVariantClasses = {
  first: 'text-yellow-300 text-sm sm:text-base',
  second: 'text-xs sm:text-sm text-white',
  third: 'text-xs sm:text-sm text-white',
}
const titleClasses = computed(() => titleVariantClasses[props.variant])

const podiumBoxVariantClasses = {
  first: 'h-16 w-16 sm:h-20 sm:w-20 bg-gradient-to-t from-secondary-400 to-secondary-600',
  second: 'h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-t from-gray-300 to-gray-500',
  third: 'h-10 w-14 sm:h-12 sm:w-16 bg-gradient-to-t from-amber-600 to-amber-800',
}
const podiumBoxClasses = computed(() => podiumBoxVariantClasses[props.variant])

const contentVariantClasses = {
  first: 'text-3xl sm:text-4xl',
  second: 'text-2xl sm:text-3xl',
  third: 'text-xl sm:text-2xl',
}
const contentClasses = computed(() => contentVariantClasses[props.variant])

const podiumLineVariantClasses = {
  first: 'top-0 bg-white/40',
  second: 'bottom-0 bg-white/20',
  third: 'bottom-0 bg-white/20',
}
const podiumLineClasses = computed(() => podiumLineVariantClasses[props.variant])

const timeVariantClasses = {
  first: 'text-xs sm:text-sm font-bold text-yellow-300',
  second: 'text-[10px] sm:text-xs text-white/70',
  third: 'text-[10px] sm:text-xs text-white/70',
}
const timeClasses = computed(() => timeVariantClasses[props.variant])
</script>
