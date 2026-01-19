/**
 * Constants centralisés pour tout le projet
 */

// Couleurs de fond principales
export const COLORS = {
  background: {
    primary: '#0e0f10',
    secondary: '#1c1e22',
    tertiary: '#22262a',
    hover: '#2a2f35',
  },
  border: {
    default: 'gray-800',
    light: 'gray-700',
    lighter: 'gray-600',
  },
  text: {
    primary: 'white',
    secondary: 'gray-400',
    tertiary: 'gray-500',
  },
} as const;

// Classes Tailwind communes
export const BG_CLASSES = {
  primary: 'bg-[#0e0f10]',
  secondary: 'bg-[#1c1e22]',
  tertiary: 'bg-[#22262a]',
} as const;

// Durées d'animation
export const ANIMATION = {
  fast: 300,
  medium: 500,
  slow: 700,
  carousel: 6000,
} as const;

// Débounce times
export const DEBOUNCE = {
  search: 500,
  autocomplete: 450,
  filter: 100,
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

// Configuration de pagination
export const PAGINATION = {
  defaultLimit: 50,
  rankingLimit: 10,
  suggestionsLimit: 8,
  minSearchChars: 3,
  minAutocompleteChars: 2,
} as const;
