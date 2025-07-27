import { it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/ui/BaseButton.vue'

it('should render correctly with default props', () => {
  const wrapper = mount(BaseButton, {
    slots: {
      default: 'Click me',
    },
  })
  expect(wrapper.text()).toContain('Click me')
  expect(wrapper.classes()).toContain('button')
  expect(wrapper.classes()).toContain('button-primary')
  expect(wrapper.classes()).toContain('size-md')
})

it('should apply correct classes for variant and size props', () => {
  const wrapper = mount(BaseButton, {
    props: {
      variant: 'secondary',
      size: 'sm',
    },
  })
  expect(wrapper.classes()).toContain('button')
  expect(wrapper.classes()).toContain('button-secondary')
  expect(wrapper.classes()).toContain('size-sm')
})

it('should be disabled when disabled prop is true', async () => {
  const wrapper = mount(BaseButton, {
    props: {
      disabled: true,
    },
  })
  expect(wrapper.element.disabled).toBe(true)
  await wrapper.trigger('click')
  expect(wrapper.emitted('click')).toBeUndefined()
})

it('should show loading spinner when loading prop is true', () => {
  const wrapper = mount(BaseButton, {
    props: {
      loading: true,
    },
  })
  expect(wrapper.find('div.animate-spin').exists()).toBe(true)
  expect(wrapper.classes()).toContain('animate-pulse')
  expect(wrapper.element.disabled).toBe(true)
})

it('renders left and right icons', () => {
  const wrapper = mount(BaseButton, {
    slots: {
      'left-icon': '<span class="left-icon">L</span>',
      'right-icon': '<span class="right-icon">R</span>',
    },
  })
  expect(wrapper.find('.left-icon').exists()).toBe(true)
  expect(wrapper.find('.right-icon').exists()).toBe(true)
})

it('applies fluid class when fluid prop is true', () => {
  const wrapper = mount(BaseButton, {
    props: {
      fluid: true,
    },
  })
  expect(wrapper.classes()).toContain('w-full')
})

it('emits click event when clicked', async () => {
  const wrapper = mount(BaseButton)
  await wrapper.trigger('click')
  expect(wrapper.emitted()).toHaveProperty('click')
})

it('should render correctly with type prop', () => {
  const wrapper = mount(BaseButton, {
    props: {
      type: 'submit',
    },
  })
  expect(wrapper.element.type).toBe('submit')
})
