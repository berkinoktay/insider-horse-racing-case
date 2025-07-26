<template>
  <div class="backdrop-blur-sm bg-white/10 rounded-xl border border-white/20 overflow-hidden">
    <div v-if="props.title || $slots.header" class="flex items-center justify-between p-4 border-b border-white/20">
      <h3 v-if="props.title" class="text-lg font-bold text-white flex items-center space-x-2">
        <span>{{ props.title }}</span>
      </h3>
      <slot v-else name="header" />
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-white/5">
          <tr class="text-white/80 text-xs sm:text-sm">
            <th
              v-for="column in props.columns"
              :key="column.key"
              scope="col"
              class="text-left p-2 sm:p-3"
              :class="column.headerClass"
            >
              <slot :name="`header-${column.key}`" :column="column">
                {{ column.label }}
              </slot>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in props.data"
            :key="rowIndex"
            class="border-b border-white/10 hover:bg-white/5 transition-colors"
            :style="{ height: props.rowHeight + 'px' }"
          >
            <td v-for="column in props.columns" :key="column.key" class="p-2 sm:p-3" :class="column.cellClass">
              <slot :name="`data-${column.key}`" :value="row[column.key]" :row="row">
                <span class="text-white font-medium text-xs sm:text-base">{{ row[column.key] }}</span>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableProps } from '@/types'

const props = defineProps<TableProps>()
</script>
