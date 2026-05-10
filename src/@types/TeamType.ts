// "category": "U13", "channel": "#u13-bears", "coach": 1, "created_at": "2026-05-01T17:51:38.290512+00:00", "id": 6, "name": "U13 Bears", "players": [46, 47, 48, 49, 50, 51, 52, 53, 54]

export type TeamType = {
  id: number;
  name: string;
  category: string;
  channel: string;
  coach: number;
  created_at: string;
  players: number[];
};
