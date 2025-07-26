import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

export const shuffle = <T>(array: T[]): T[] => {
  let currentIndex = array.length
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds.toFixed(2)}`
}
