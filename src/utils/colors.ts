import type { BaseBadgeProps } from '@/components/ui/BaseBadge.vue'
import { ProgramStatus, RaceState } from '@/types/enums'

export function getRandomIndexInArray<T>(array: T[]): number {
  return Math.floor(Math.random() * array.length)
}

export function getProgramStatusVariant(status: ProgramStatus): BaseBadgeProps['variant'] {
  const statusVariant: Record<string, BaseBadgeProps['variant']> = {
    [ProgramStatus.COMPLETED]: 'success',
    [ProgramStatus.CURRENT]: 'primary',
    [ProgramStatus.UPCOMING]: 'neutral',
  }

  return statusVariant[status] ?? 'neutral'
}

export function getRaceStateVariant(state: RaceState): BaseBadgeProps['variant'] {
  const stateVariant: Record<string, BaseBadgeProps['variant']> = {
    [RaceState.RACING]: 'danger',
    [RaceState.READY]: 'primary',
    [RaceState.IDLE]: 'neutral',
    [RaceState.FINISHED]: 'success',
  }

  return stateVariant[state] ?? 'neutral'
}
