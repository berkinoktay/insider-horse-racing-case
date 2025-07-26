<template>
  <button :class="[classes, { 'animate-pulse': loading }]" :disabled="disabled || loading" :type="type">
    <div v-if="loading" class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
    <slot v-if="!loading" name="left-icon" />
    <slot />
    <slot name="right-icon" />
  </button>
</template>
<script setup lang="ts">
import { cn } from '@/utils'
import { computed } from 'vue'

export type BaseButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  fluid?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  fluid: false,
  loading: false,
})

const baseClasses =
  'group relative inline-flex items-center justify-center gap-2 font-bold rounded-xl shadow-lg cursor-pointer transform  transition-all duration-300 disabled:opacity-50'

const sizeClasses = {
  sm: 'px-6 py-2.5 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-10 py-4 text-lg',
}

const variantClasses = {
  primary: 'bg-primary-500 text-white ',
  secondary: 'bg-secondary-500 text-white ',
  accent: 'bg-accent-500 text-white ',
  danger: 'bg-error-500 text-white ',
  warning: 'bg-yellow-500 text-white ',
}

const classes = computed(() =>
  cn(
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    props.disabled && 'cursor-not-allowed pointer-events-none',
    props.fluid && 'w-full',
  ),
)
</script>
