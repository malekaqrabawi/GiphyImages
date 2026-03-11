import apiClient from './axios';
import { GiphyApiResponse } from '../types/giphy.types';
import { PAGE_SIZE } from '../utils/constants';

export const fetchTrending = async (offset: number): Promise<GiphyApiResponse> => {
  const response = await apiClient.get<GiphyApiResponse>('/trending', {
    params: { limit: PAGE_SIZE, offset, rating: 'g' },
  });
  return response.data;
};

export const searchGifs = async (
  query: string,
  offset: number,
  signal?: AbortSignal,
): Promise<GiphyApiResponse> => {
  const response = await apiClient.get<GiphyApiResponse>('/search', {
    params: { q: query, limit: PAGE_SIZE, offset, rating: 'g' },
    signal,
  });
  return response.data;
};
