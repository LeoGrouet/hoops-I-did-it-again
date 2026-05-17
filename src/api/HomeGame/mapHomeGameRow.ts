import { type HomeGameWithTeamName } from '@/src/@types/HomeGameWithTeamName';

type TeamsRelation = { name: string } | { name: string }[] | null;

export type HomeGameRow = {
  id: number;
  date: string;
  hour: string;
  opponent: string;
  Teams: TeamsRelation;
};

function normalizeTeams(relation: TeamsRelation): { name: string } {
  if (!relation) return { name: 'Unknown Team' };
  return Array.isArray(relation) ? (relation[0] ?? { name: 'Unknown Team' }) : relation;
}

export function mapHomeGameRow(row: HomeGameRow): HomeGameWithTeamName {
  return {
    ...row,
    Teams: normalizeTeams(row.Teams),
  };
}
