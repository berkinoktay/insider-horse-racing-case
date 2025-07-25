export function getHorseRunTime(distance: number, condition: number): number {
  const baseSpeed = 6
  const speed = baseSpeed * (condition / 100)
  return (distance / speed) * 1000
}
