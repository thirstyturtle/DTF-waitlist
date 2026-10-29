// Display names for commander roles. The internal ids stay the same (they are
// stored on each commander and used in permission keys), only the labels change.
export const ROLE_LABELS = {
  trainee: "Training FC",
  "trainee-advanced": "Solo",
  fc: "FC",
  "fc+": "FC Daycare",
  admin: "Admin",
};

export function roleLabel(role) {
  return ROLE_LABELS[role] || role;
}
