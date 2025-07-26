import type { Horse, RaceParticipant } from './horse'
import { ProgramStatus } from './enums'

export interface Race {
  round: number
  distance: number
  participants: RaceParticipant[]
  status: ProgramStatus
  winner: RaceParticipant | null
  results: RaceParticipant[]
}

export interface RaceResult {
  horse: Horse
  finishTime: number
}
