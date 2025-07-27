<template>
  <label :class="cn('inline-flex items-center cursor-pointer', { 'opacity-50 cursor-not-allowed': disabled })">
    <span v-if="offLabel" data-testid="off-label" :class="labelOffClasses">
      {{ offLabel }}
    </span>
    <input type="checkbox" class="sr-only" :checked="modelValue" :disabled="disabled" @change="toggle" />
    <div :class="switchClasses">
      <div :class="switchInnerClasses"></div>
    </div>
    <span v-if="onLabel" data-testid="on-label" :class="labelOnClasses">
      {{ onLabel }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { cn } from '@/utils'
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  disabled?: boolean
  onLabel?: string
  offLabel?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const switchClasses = computed(() =>
  cn('relative w-11 h-6 rounded-full transition-colors duration-300', {
    'bg-primary-500': props.modelValue,
    'bg-neutral-600': !props.modelValue,
  }),
)

const switchInnerClasses = computed(() =>
  cn('absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300', {
    'translate-x-5': props.modelValue,
  }),
)

const labelOffClasses = computed(() =>
  cn('mr-3 text-sm font-medium select-none', {
    'text-white': !props.modelValue,
    'text-gray-400': props.modelValue,
  }),
)

const labelOnClasses = computed(() =>
  cn('ml-3 text-sm font-medium select-none', {
    'text-white': props.modelValue,
    'text-gray-400': !props.modelValue,
  }),
)

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>
