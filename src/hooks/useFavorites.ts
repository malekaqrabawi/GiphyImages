import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useAppDispatch';
import { addFavorite, removeFavorite, clearAllFavorites } from '../store/slices/favoritesSlice';
import { GifItem } from '../types/giphy.types';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.favorites);

  const isFavorite = useCallback(
    (id: string) => favorites.some(item => item.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (item: GifItem) => {
      if (isFavorite(item.id)) {
        dispatch(removeFavorite(item.id));
      } else {
        dispatch(addFavorite(item));
      }
    },
    [dispatch, isFavorite],
  );

  const removeAll = useCallback(() => {
    dispatch(clearAllFavorites());
  }, [dispatch]);

  return { favorites, isFavorite, toggleFavorite, removeAll };
};
