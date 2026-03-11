import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GifItem } from '../../types/giphy.types';
import { fetchTrending } from '../../api/giphy.api';
import { PAGE_SIZE } from '../../utils/constants';

interface GiphyState {
  gifs: GifItem[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  offset: number;
  hasMore: boolean;
}

const initialState: GiphyState = {
  gifs: [],
  loading: false,
  loadingMore: false,
  error: null,
  offset: 0,
  hasMore: true,
};

export const loadTrending = createAsyncThunk('giphy/loadTrending', async (offset: number) => {
  const response = await fetchTrending(offset);
  return response;
});

const giphySlice = createSlice({
  name: 'giphy',
  initialState,
  reducers: {
    resetFeed: state => {
      state.gifs = [];
      state.offset = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadTrending.pending, (state, action) => {
        if (action.meta.arg === 0) {
          state.loading = true;
        } else {
          state.loadingMore = true;
        }
        state.error = null;
      })
      .addCase(loadTrending.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        const { data, pagination } = action.payload;
        if (action.meta.arg === 0) {
          state.gifs = data;
        } else {
          state.gifs = [...state.gifs, ...data];
        }
        state.offset = pagination.offset + data.length;
        state.hasMore = data.length === PAGE_SIZE;
      })
      .addCase(loadTrending.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export const { resetFeed } = giphySlice.actions;
export default giphySlice.reducer;
