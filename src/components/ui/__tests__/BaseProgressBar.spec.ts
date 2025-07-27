import { it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseProgressBar from '@/components/ui/BaseProgressBar.vue'

it('renders with default props', () => {
  const wrapper = mount(BaseProgressBar)
  const progressBar = wrapper.find('[data-testid="progress-bar-inner"]')
  const progressBarContainer = wrapper.find('[data-testid="progress-bar-container"]')
  expect(progressBarContainer.exists()).toBe(true)
  expect(progressBar.exists()).toBe(true)
  expect(progressBar.attributes('style')).toContain('width: 0%')
  expect(progressBar.classes()).toContain('bg-primary-500')
})

it('sets the width based on the value prop', () => {
  const wrapper = mount(BaseProgressBar, {
    props: { value: 50 },
  })
  const progressBar = wrapper.find('[data-testid="progress-bar-inner"]')
  expect(progressBar.attributes('style')).toContain('width: 50%')
})

it('applies the colorClass prop correctly', () => {
  const wrapper = mount(BaseProgressBar, {
    props: { value: 50, colorClass: 'bg-green-500' },
  })
  const progressBar = wrapper.find('[data-testid="progress-bar-inner"]')
  expect(progressBar.classes()).toContain('bg-green-500')
  expect(progressBar.classes()).not.toContain('bg-primary-500')
})

it('handles value greater than 100 by capping at 100', () => {
  const wrapper = mount(BaseProgressBar, {
    props: { value: 150 },
  })
  const progressBar = wrapper.find('[data-testid="progress-bar-inner"]')
  expect(progressBar.attributes('style')).toContain('width: 100%')
})

it('handles value less than 0 by capping at 0', () => {
  const wrapper = mount(BaseProgressBar, {
    props: { value: -50 },
  })
  const progressBar = wrapper.find('[data-testid="progress-bar-inner"]')
  expect(progressBar.attributes('style')).toContain('width: 0%')
})
