import type { Horse } from './horse'
import { ProgramStatus } from './enums'

export interface Race {
  round: number
  distance: number
  status: ProgramStatus
  participants: Horse[]
  winner: Horse | null
  results: RaceResult[]
}

export interface RaceResult {
  horse: Horse
  finishTime: number
}
