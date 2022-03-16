import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Genre } from '../../types/types';
import { getAuthGenres } from '../../utils/api/methods';

type GenreSlice = {
  loading: boolean,
  error: boolean,
  genres: Genre[],
};

const initialState: GenreSlice = {
  loading: true,
  error: false,
  genres: [],
};

export const fetchGenres = createAsyncThunk(
  'genres',
  async () => {
    const response = await getAuthGenres();
    return (response.data);
  },
);

const getGenreSlice = createSlice({
  name: 'getArtists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.loading = false;
      state.genres = action.payload;
    });
    builder.addCase(fetchGenres.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGenres.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default getGenreSlice.reducer;
