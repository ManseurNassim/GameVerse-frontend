export interface User {
  _id?: string; // MongoDB ID
  user_id: number; // Legacy ID (migration)
  username: string;
  email: string;
  profile_picture?: string;
  bio?: string;
  game_list?: number[];
  createdAt?: string;
}

export interface ImageResource {
  thumb: string;
  original: string;
}

export interface MultilingualString {
  en?: string;
  fr?: string;
}

export interface MultilingualArray {
  en?: string[];
  fr?: string[];
}

export interface Game {
  _id?: string; // MongoDB ID
  game_id: number; // Legacy ID pour les URLs existantes
  title: string;
  description: MultilingualString;
  platforms: string[];
  platform_logos?: ImageResource[];
  genres: MultilingualArray;
  cover: ImageResource;
  developers: string[];
  publishers: string[];
  artworks?: ImageResource[];
  game_modes?: MultilingualArray;
  player_perspectives?: MultilingualArray;
  themes?: MultilingualArray;
  franchises?: string[];
  dlcs?: string[];
  game_engines?: string[];
  videos?: string[];
  release_date: string;
  added?: number; // Compteur de popularité
}

export interface Filters {
  genres: string[];
  platforms: string[];
  themes: string[];
  developers: string[];
  publishers: string[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
