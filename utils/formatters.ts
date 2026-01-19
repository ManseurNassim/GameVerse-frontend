/**
 * Fonctions utilitaires pour le formatage des données
 */

/**
 * Extrait l'année depuis une date
 */
export const getYearFromDate = (dateString: string | number | Date | undefined): string => {
  if (!dateString) return '-';
  try {
    return new Date(dateString).getFullYear().toString();
  } catch {
    return '-';
  }
};

/**
 * Formate un nombre pour l'affichage
 */
export const formatNumber = (num: number | undefined): string => {
  if (!num) return '0';
  return num.toLocaleString('fr-FR');
};

/**
 * Tronque un texte à une longueur maximale
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Retire les doublons d'un tableau
 */
export const removeDuplicates = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

/**
 * Combine plusieurs tableaux et retire les doublons
 */
export const mergeAndDeduplicate = <T>(...arrays: T[][]): T[] => {
  return removeDuplicates(arrays.flat());
};

/**
 * Créer une URL d'image avec fallback
 */
export const getImageUrl = (url: string | undefined, fallback: string = ''): string => {
  return url || fallback;
};

/**
 * Capitalise la première lettre d'une chaîne
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Génère un ID aléatoire
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Vérifie si une valeur est vide
 */
export const isEmpty = (value: any): boolean => {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};
