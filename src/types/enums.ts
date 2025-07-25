export const RaceState = {
  NotStarted: "NOT_STARTED",
  InProgress: "IN_PROGRESS",
  Completed: "COMPLETED",
} as const;

export const AnimationState = {
  Idle: "IDLE",
  Running: "RUNNING",
  Finished: "FINISHED",
} as const;

export type RaceStateType = (typeof RaceState)[keyof typeof RaceState];
export type AnimationStateType =
  (typeof AnimationState)[keyof typeof AnimationState];
