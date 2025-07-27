import { ref, computed, onMounted, onUnmounted, readonly } from 'vue'

const breakpoints = {
  md: 768,
  lg: 1024,
}

export function useResponsive() {
  const windowWidth = ref(window.innerWidth)

  const onResize = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  const isMobile = computed(() => windowWidth.value < breakpoints.md)
  const isTablet = computed(() => windowWidth.value >= breakpoints.md && windowWidth.value < breakpoints.lg)
  const isDesktop = computed(() => windowWidth.value >= breakpoints.lg)

  return {
    windowWidth: readonly(windowWidth),
    isMobile,
    isTablet,
    isDesktop,
  }
}
