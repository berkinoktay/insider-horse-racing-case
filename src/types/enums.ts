export enum HorseState {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  FINISHED = 'FINISHED',
}

export enum ProgramStatus {
  COMPLETED = 'completed',
  CURRENT = 'current',
  UPCOMING = 'upcoming',
}

export enum RaceState {
  IDLE = 'idle',
  READY = 'ready', // Not started
  RACING = 'racing',
  PAUSED = 'paused',
  FINISHED = 'finished',
}
