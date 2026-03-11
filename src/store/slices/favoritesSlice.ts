import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GifItem } from '../../types/giphy.types';

interface FavoritesState {
  favorites: GifItem[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<GifItem>) => {
      const exists = state.favorites.some(item => item.id === action.payload.id);
      if (!exists) {
        state.favorites.unshift(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload);
    },
    clearAllFavorites: state => {
      state.favorites = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearAllFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
