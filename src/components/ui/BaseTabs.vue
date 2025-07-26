<template>
  <div ref="tabsContainer" class="relative flex w-full items-center rounded-2xl border border-white/20 bg-white/10 p-2">
    <span
      v-if="indicatorStyle.width !== '0px'"
      class="absolute top-1 bottom-1 rounded-lg bg-gradient-to-r from-primary-500/80 to-primary-500/50 transition-all duration-300 ease-in-out shadow-lg pointer-events-none select-none"
      :style="indicatorStyle"
    ></span>
    <button
      v-for="(tab, index) in props.tabs"
      :key="tab.value"
      :ref="(el) => (tabRefs[index] = el as HTMLElement)"
      type="button"
      class="relative z-10 flex-1 py-2 px-4 text-center font-bold rounded-md focus:outline-none transition-colors duration-300 cursor-pointer"
      :class="[modelValue === tab.value ? 'text-white' : 'text-gray-300 hover:text-white']"
      @click="selectTab(tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'

interface Tab {
  label: string
  value: string
}

interface BaseTabsProps {
  tabs: Tab[]
}

const props = defineProps<BaseTabsProps>()
const modelValue = defineModel<string>()

const tabsContainer = ref<HTMLElement | null>(null)
const tabRefs = ref<HTMLElement[]>([])

const indicatorStyle = ref({
  width: '0px',
  height: '0px',
  left: '0px',
  top: '0px',
})

const updateIndicator = () => {
  nextTick(() => {
    const selectedIndex = props.tabs.findIndex((tab) => tab.value === modelValue.value)
    if (selectedIndex !== -1 && tabRefs.value[selectedIndex]) {
      const selectedTabEl = tabRefs.value[selectedIndex]
      indicatorStyle.value = {
        width: `${selectedTabEl.offsetWidth}px`,
        height: `${selectedTabEl.offsetHeight}px`,
        left: `${selectedTabEl.offsetLeft}px`,
        top: `${selectedTabEl.offsetTop}px`,
      }
    }
  })
}

const selectTab = (value: string) => {
  modelValue.value = value
}

onMounted(() => {
  updateIndicator()
  if (tabsContainer.value) {
    const resizeObserver = new ResizeObserver(() => {
      updateIndicator()
    })
    resizeObserver.observe(tabsContainer.value)
  }
})

watch(() => modelValue.value, updateIndicator)

watch(
  () => props.tabs,
  () => {
    tabRefs.value = []
    nextTick(updateIndicator)
  },
  { deep: true },
)
</script>
