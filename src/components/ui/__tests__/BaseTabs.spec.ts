import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTabs from '@/components/ui/BaseTabs.vue'
import { nextTick } from 'vue'

const mockTabs = [
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2' },
]

describe('Tabs', () => {
  beforeEach(() => {
    const ResizeObserverMock = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
    vi.stubGlobal('ResizeObserver', ResizeObserverMock)
  })

  it('renders tabs correctly based on the tabs prop', () => {
    const wrapper = mount(BaseTabs, {
      props: { tabs: mockTabs, modelValue: 'tab1' },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(mockTabs.length)
    expect(buttons[0].text()).toBe('Tab 1')
    expect(buttons[1].text()).toBe('Tab 2')
  })

  it('emits modelValue update when a tab is clicked', async () => {
    const wrapper = mount(BaseTabs, {
      props: { tabs: mockTabs, modelValue: 'tab1' },
    })
    const tab2Button = wrapper.findAll('button')[1]
    await tab2Button.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab2'])
  })

  it('applies active class to the selected tab', async () => {
    const wrapper = mount(BaseTabs, {
      props: { tabs: mockTabs, modelValue: 'tab1' },
    })
    let buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).toContain('text-white')
    expect(buttons[1].classes()).toContain('text-gray-300')

    await wrapper.setProps({ modelValue: 'tab2' })
    await nextTick()

    buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).toContain('text-gray-300')
    expect(buttons[1].classes()).toContain('text-white')
  })
  it('should not render the indicator when modelValue is not set', () => {
    const wrapper = mount(BaseTabs, {
      props: { tabs: mockTabs },
    })
    expect(wrapper.find('[data-testid="indicator"]').exists()).toBe(false)
  })
})
