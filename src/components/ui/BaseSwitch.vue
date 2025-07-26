<template>
  <label class="inline-flex items-center cursor-pointer" :class="{ 'opacity-50 cursor-not-allowed': disabled }">
    <span v-if="offLabel" class="mr-3 text-sm font-medium" :class="!modelValue ? 'text-white' : 'text-gray-400'">
      {{ offLabel }}
    </span>
    <input type="checkbox" class="sr-only" :checked="modelValue" :disabled="disabled" @change="toggle" />
    <div
      class="relative w-11 h-6 rounded-full transition-colors duration-300"
      :class="[modelValue ? 'bg-primary-500' : 'bg-neutral-600', disabled ? 'cursor-not-allowed' : '']"
    >
      <div
        class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300"
        :class="{
          'translate-x-5': modelValue,
        }"
      ></div>
    </div>
    <span v-if="onLabel" class="ml-3 text-sm font-medium" :class="modelValue ? 'text-white' : 'text-gray-400'">
      {{ onLabel }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

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

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>
