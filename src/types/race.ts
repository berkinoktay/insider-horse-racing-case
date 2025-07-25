import type { Horse } from "@/types/horse";

export interface RaceRound {
  roundNumber: number;
  distance: number;
  participants: Horse[];
  result: Horse[];
}

export interface RaceResult {
  roundNumber: number;
  result: Horse[];
}
