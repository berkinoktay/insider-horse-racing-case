<template>
  <div class="p-4 border-b border-white/20 shrink-0">
    <div class="flex items-center">
      <slot v-if="slots.default" />
      <div v-else class="text-lg font-bold text-white flex items-center space-x-2">
        <span>{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

interface WidgetHeaderProps {
  title?: string
}

defineProps<WidgetHeaderProps>()

const slots = useSlots()
</script>
