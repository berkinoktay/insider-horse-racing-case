import { ProgramStatus } from '@/types/enums'

export const TOTAL_ROUNDS = 6
export const HORSES_PER_RACE = 10

export const RACE_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]

export const DEFAULT_PROGRAM = Array.from({ length: TOTAL_ROUNDS }, (_, i) => ({
  round: i + 1,
  distance: RACE_DISTANCES[i],
  status: ProgramStatus.UPCOMING,
  participants: [],
  winner: null,
  results: [],
}))
