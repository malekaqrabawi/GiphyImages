import { GifItem } from '../types/giphy.types';

export type HomeStackParamList = {
  HomeScreen: undefined;
  ItemDetails: { item: GifItem; sharedTag: string };
};

export type SearchStackParamList = {
  SearchScreen: undefined;
  ItemDetails: { item: GifItem; sharedTag: string };
};

export type FavoritesStackParamList = {
  FavoritesScreen: undefined;
  ItemDetails: { item: GifItem; sharedTag: string };
};

export type MainTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  FavoritesTab: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
