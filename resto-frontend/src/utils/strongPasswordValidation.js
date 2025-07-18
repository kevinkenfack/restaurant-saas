// Fonction pour évaluer la complexité d'un mot de passe
// Retourne un objet { score: 0-4, level: 'faible'|'moyen'|'fort'|'très fort' }
export function getPasswordStrength(password) {
  let score = 0;

  if (!password) return { score: 0, level: 'faible' };

  // Critères de base
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Ajuste le score max à 4
  if (score > 4) score = 4;

  let level = 'faible';
  if (score === 4) level = 'très fort';
  else if (score === 3) level = 'fort';
  else if (score === 2) level = 'moyen';
  else level = 'faible';

  return { score, level };
}
