export interface Horse {
  id: number
  name: string
  color: string
  conditionScore: number
}

export interface RaceParticipant extends Horse {
  position: number
  finishTime: number
  totalRunTime: number
  animationFrameId?: number | null
}
