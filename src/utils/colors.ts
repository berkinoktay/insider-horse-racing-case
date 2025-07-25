import { ProgramStatus } from '@/types/enums'

export function getRandomIndexInArray<T>(array: T[]): number {
  return Math.floor(Math.random() * array.length)
}

export function getStatusColor(status: ProgramStatus): string {
  switch (status) {
    case ProgramStatus.COMPLETED:
      return 'from-green-400 to-emerald-500'
    case ProgramStatus.CURRENT:
      return 'from-yellow-400 to-orange-500'
    case ProgramStatus.UPCOMING:
    default:
      return 'from-gray-400 to-gray-500'
  }
}
