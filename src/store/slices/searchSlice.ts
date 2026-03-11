import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GifItem } from '../../types/giphy.types';
import { searchGifs } from '../../api/giphy.api';
import { PAGE_SIZE } from '../../utils/constants';

interface SearchState {
  query: string;
  results: GifItem[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  offset: number;
  hasMore: boolean;
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  loadingMore: false,
  error: null,
  offset: 0,
  hasMore: false,
};

export const performSearch = createAsyncThunk(
  'search/performSearch',
  async ({ query, offset }: { query: string; offset: number }, { signal }) => {
    const response = await searchGifs(query, offset, signal);
    return { response, offset };
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    resetSearch: state => {
      state.results = [];
      state.offset = 0;
      state.hasMore = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(performSearch.pending, (state, action) => {
        if (action.meta.arg.offset === 0) {
          state.loading = true;
          state.results = [];
        } else {
          state.loadingMore = true;
        }
        state.error = null;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        const { data, pagination } = action.payload.response;
        if (action.payload.offset === 0) {
          state.results = data;
        } else {
          state.results = [...state.results, ...data];
        }
        state.offset = pagination.offset + data.length;
        state.hasMore = data.length === PAGE_SIZE;
      })
      .addCase(performSearch.rejected, (state, action) => {
        if (action.meta.aborted) return;
        state.loading = false;
        state.loadingMore = false;
        state.error = action.error.message ?? 'Search failed';
      });
  },
});

export const { setQuery, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
