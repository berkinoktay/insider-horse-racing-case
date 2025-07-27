import { it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTable from '@/components/ui/BaseTable.vue'
import type { Column } from '@/types'

const mockColumns: Column[] = [
  { key: 'id', label: 'ID', headerClass: 'id-header', cellClass: 'id-cell' },
  { key: 'name', label: 'Name' },
]

const mockData = [
  { id: 1, name: 'Horse A' },
  { id: 2, name: 'Horse B' },
]

it('renders a title when the title prop is provided', () => {
  const wrapper = mount(BaseTable, {
    props: {
      columns: mockColumns,
      data: mockData,
      title: 'Test Table',
    },
  })
  expect(wrapper.find('h3').text()).toBe('Test Table')
})

it('renders a header slot when provided', () => {
  const wrapper = mount(BaseTable, {
    props: { columns: mockColumns, data: [] },
    slots: { header: '<div class="custom-header">Custom ID</div>' },
  })
  expect(wrapper.find('.custom-header').text()).toBe('Custom ID')
})

it('renders table headers correctly based on columns prop', () => {
  const wrapper = mount(BaseTable, {
    props: { columns: mockColumns, data: [] },
  })
  const headers = wrapper.findAll('th')
  expect(headers).toHaveLength(mockColumns.length)
  expect(headers[0].text()).toBe('ID')
  expect(headers[1].text()).toBe('Name')
  expect(headers[0].classes()).toContain('id-header')
})

it('renders table rows correctly based on data prop', () => {
  const wrapper = mount(BaseTable, {
    props: { columns: mockColumns, data: mockData },
  })
  const rows = wrapper.findAll('tbody tr')
  expect(rows).toHaveLength(mockData.length)
  const firstRowCells = rows[0].findAll('td')
  expect(firstRowCells[0].text()).toBe('1')
  expect(firstRowCells[1].text()).toBe('Horse A')
  expect(firstRowCells[0].classes()).toContain('id-cell')
})

it('renders no rows when data is empty', () => {
  const wrapper = mount(BaseTable, {
    props: { columns: mockColumns, data: [] },
  })
  const rows = wrapper.findAll('tbody tr')
  expect(rows).toHaveLength(0)
})

it('applies row height style correctly', () => {
  const wrapper = mount(BaseTable, {
    props: { columns: mockColumns, data: mockData, rowHeight: 80 },
  })
  const row = wrapper.find('tbody tr')
  expect(row.attributes('style')).toContain('height: 80px')
})

it('renders custom header slot', () => {
  const wrapper = mount(BaseTable, {
    props: { columns: mockColumns, data: [] },
    slots: {
      'header-id': '<div class="custom-header">Custom ID</div>',
    },
  })
  const header = wrapper.find('th')
  expect(header.find('.custom-header').text()).toBe('Custom ID')
})

it('renders custom data cell slot', () => {
  const wrapper = mount(BaseTable, {
    props: { columns: mockColumns, data: mockData },
    slots: {
      'data-name': `<template #data-name="{ value }">
                        <div class="custom-cell">Name: {{ value }}</div>
                      </template>`,
    },
  })
  const cell = wrapper.findAll('td')[1]
  expect(cell.find('.custom-cell').text()).toBe('Name: Horse A')
})
