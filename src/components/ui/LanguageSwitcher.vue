<template>
  <div class="flex items-center space-x-2">
    <Globe class="h-5 w-5 text-white" />
    <select
      :value="currentLanguage"
      @change="onLanguageChange"
      class="cursor-pointer border-none bg-transparent text-white focus:outline-none focus:ring-0"
    >
      <option v-for="loc in LANGUAGES" :key="loc.value" :value="loc.value" class="bg-gray-800">
        {{ loc.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '@/composables'
import { LANGUAGES } from '@/constants/i18n'
import { Globe } from 'lucide-vue-next'

const { currentLanguage, changeLanguage } = useLanguage()

function onLanguageChange(event: Event) {
  const locale = (event.target as HTMLSelectElement).value
  changeLanguage(locale)
}
</script>
