// utils/translateRole.ts
export const translateRole = (role: string): string => {
  const roles: Record<string, string> = {
    Referee: "Arbitre",
    TableOfficer: "Table de marque",
    RoomOfficer: "Responsable de salle",
  };

  return roles[role] || role;
};
