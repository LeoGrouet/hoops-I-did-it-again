import { type GamesType } from '@/src/@types/GamesType';

export type GamesScreenIntent = {
  selectDateKey: string;
  createdGame?: GamesType;
};

let pendingIntent: GamesScreenIntent | null = null;

export function setGamesScreenIntent(intent: GamesScreenIntent): void {
  pendingIntent = intent;
}

export function consumeGamesScreenIntent(): GamesScreenIntent | null {
  const intent = pendingIntent;
  pendingIntent = null;
  return intent;
}
