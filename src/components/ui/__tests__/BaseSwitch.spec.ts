import { it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseSwitch from '@/components/ui/BaseSwitch.vue'

it('renders correctly based on modelValue', async () => {
  const wrapper = mount(BaseSwitch, {
    props: { modelValue: false },
  })
  expect(wrapper.find('input').element.checked).toBe(false)

  await wrapper.setProps({ modelValue: true })
  expect(wrapper.find('input').element.checked).toBe(true)
})

it('emits update:modelValue on change', async () => {
  const wrapper = mount(BaseSwitch, {
    props: { modelValue: false },
  })

  await wrapper.find('input').setValue(true)

  expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
  expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
})

it('does not emit update:modelValue when disabled', async () => {
  const wrapper = mount(BaseSwitch, {
    props: { modelValue: false, disabled: true },
  })

  await wrapper.find('label').trigger('click')

  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
})

it('renders labels when provided', () => {
  const wrapper = mount(BaseSwitch, {
    props: {
      modelValue: false,
      onLabel: 'On',
      offLabel: 'Off',
    },
  })

  expect(wrapper.text()).toContain('On')
  expect(wrapper.text()).toContain('Off')
})

it('applies correct label classes based on modelValue', async () => {
  const wrapper = mount(BaseSwitch, {
    props: {
      modelValue: false,
      onLabel: 'On',
      offLabel: 'Off',
    },
  })

  // offLabel is active
  expect(wrapper.find('[data-testid="off-label"]').classes()).toContain('text-white')
  expect(wrapper.find('[data-testid="on-label"]').classes()).toContain('text-gray-400')

  await wrapper.setProps({ modelValue: true })

  //  onLabel is active
  expect(wrapper.find('[data-testid="off-label"]').classes()).toContain('text-gray-400')
  expect(wrapper.find('[data-testid="on-label"]').classes()).toContain('text-white')
})

it('is disabled when disabled prop is true', () => {
  const wrapper = mount(BaseSwitch, {
    props: { modelValue: false, disabled: true },
  })
  expect(wrapper.find('input').element.disabled).toBe(true)
  expect(wrapper.find('label').classes()).toContain('cursor-not-allowed')
})
