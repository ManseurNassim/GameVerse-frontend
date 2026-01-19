/**
 * Constants centralisés pour tout le projet
 */

// Classes Tailwind communes
export const BG_CLASSES = {
  primary: 'bg-[#0e0f10]',
  secondary: 'bg-[#1c1e22]',
  tertiary: 'bg-[#22262a]',
} as const;

// Débounce times
export const DEBOUNCE = {
  search: 500,
  autocomplete: 450,
} as const;

// Messages d'erreur
export const ERROR_MESSAGES = {
  auth: {
    invalidCredentials: 'Email ou mot de passe incorrect',
    requiredFields: 'Tous les champs sont requis',
    userExists: 'Un utilisateur avec cet email existe déjà',
    registerSuccess: 'Inscription réussie ! Vous pouvez maintenant vous connecter.',
  },
  games: {
    notFound: 'Jeu introuvable',
    loadError: 'Erreur lors du chargement des jeux',
  },
} as const;

