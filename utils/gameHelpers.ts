/**
 * Utilitaires spécifiques au domaine gaming
 */

/**
 * Regroupe les plateformes par famille
 */
export const groupPlatformsByFamily = (platforms: string[]): {[key: string]: string[]} => {
  const groups: {[key: string]: string[]} = {
    'Nintendo': [],
    'PlayStation': [],
    'Xbox': [],
    'PC': [],
    'Mobile': [],
    'Retro': []
  };

  platforms.forEach(plat => {
    const lower = plat.toLowerCase();
    
    if (lower.includes('nintendo') || lower.includes('game boy') || lower.includes('wii') || 
        lower.includes('switch') || lower.includes('nes') || lower.includes('snes') ||
        lower.includes('n64') || lower.includes('gamecube') || lower.includes('3ds') || lower.includes('ds')) {
      groups['Nintendo'].push(plat);
    } else if (lower.includes('playstation') || lower.includes('ps') || lower.includes('psp') || lower.includes('vita')) {
      groups['PlayStation'].push(plat);
    } else if (lower.includes('xbox') || lower.includes('360')) {
      groups['Xbox'].push(plat);
    } else if (lower.includes('pc') || lower.includes('windows') || lower.includes('mac') || 
               lower.includes('linux') || lower.includes('steam')) {
      groups['PC'].push(plat);
    } else if (lower.includes('android') || lower.includes('ios') || lower.includes('mobile') ||
               lower.includes('iphone') || lower.includes('ipad')) {
      groups['Mobile'].push(plat);
    } else if (lower.includes('atari') || lower.includes('commodore') || lower.includes('amiga') ||
               lower.includes('sega') || lower.includes('neo geo') || lower.includes('dreamcast') ||
               lower.includes('coleco') || lower.includes('msx')) {
      groups['Retro'].push(plat);
    } else {
      groups['Retro'].push(plat);
    }
  });

  // Supprimer les groupes vides
  Object.keys(groups).forEach(key => {
    if (groups[key].length === 0) delete groups[key];
  });

  return groups;
};

/**
 * Compte les occurrences d'items dans un champ de jeux
 */
export const countItemOccurrences = <T extends any>(
  games: any[], 
  field: string
): Map<string, number> => {
  const counts = new Map<string, number>();
  
  games.forEach(game => {
    const items = game[field];
    if (Array.isArray(items)) {
      items.forEach(item => {
        counts.set(item, (counts.get(item) || 0) + 1);
      });
    } else if (items) {
      counts.set(items, (counts.get(items) || 0) + 1);
    }
  });
  
  return counts;
};

/**
 * Obtient les top N items par popularité
 */
export const getTopItems = (
  games: any[], 
  field: string, 
  limit: number = 12
): string[] => {
  const counts = countItemOccurrences(games, field);
  
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([item]) => item);
};

/**
 * Trie les items par popularité
 */
export const sortByPopularity = (
  games: any[], 
  field: string
): string[] => {
  const counts = countItemOccurrences(games, field);
  
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([item]) => item);
};

import { Game } from '../types';
