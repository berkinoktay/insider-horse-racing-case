<template>
  <div :class="classes">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils'

export interface BaseBadgeProps {
  text: string
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  animation?: 'pulse' | 'none'
}

const props = withDefaults(defineProps<BaseBadgeProps>(), {
  variant: 'primary',
  size: 'md',
  animation: 'none',
})

const baseClasses = 'px-3 py-1 rounded-full text-xs font-bold text-white'

const variantClasses = {
  primary: 'bg-gradient-to-r from-yellow-400 to-orange-500',
  secondary: 'bg-gradient-to-r from-blue-400 to-purple-500',
  success: 'bg-gradient-to-r from-green-500 to-green-600',
  danger: 'bg-gradient-to-r from-red-400 to-pink-500',
  neutral: 'bg-gradient-to-r from-gray-500 to-gray-600',
}

const sizeClasses = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
}

const animationClasses = {
  pulse: 'animate-pulse',
  none: '',
}

const classes = computed(() =>
  cn(baseClasses, variantClasses[props.variant], sizeClasses[props.size], animationClasses[props.animation]),
)
</script>
