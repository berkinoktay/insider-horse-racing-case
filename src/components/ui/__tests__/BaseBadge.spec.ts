import { it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseBadge from '@/components/ui/BaseBadge.vue'

it('should render the text from the text prop', () => {
  const text = 'Test Badge'
  const wrapper = mount(BaseBadge, {
    props: { text },
  })
  expect(wrapper.text()).toBe(text)
})

it('should have default classes when no props are provided', () => {
  const wrapper = mount(BaseBadge, { props: { text: 'test' } })
  expect(wrapper.classes()).toContain('badge')
  expect(wrapper.classes()).toContain('badge-primary')
  expect(wrapper.classes()).toContain('size-md')
})

it('should apply correct classes for variant and size props', () => {
  const wrapper = mount(BaseBadge, {
    props: {
      text: 'test',
      variant: 'danger',
      size: 'lg',
    },
  })
  expect(wrapper.classes()).toContain('badge-danger')
  expect(wrapper.classes()).toContain('size-lg')
})

it('should apply pulse animation class when animation prop is "pulse"', () => {
  const wrapper = mount(BaseBadge, {
    props: {
      text: 'test',
      animation: 'pulse',
    },
  })
  expect(wrapper.classes()).toContain('animate-pulse')
})

it('should not apply pulse animation class when animation prop is "none"', () => {
  const wrapper = mount(BaseBadge, {
    props: {
      text: 'test',
      animation: 'none',
    },
  })
  expect(wrapper.classes()).not.toContain('animate-pulse')
})
