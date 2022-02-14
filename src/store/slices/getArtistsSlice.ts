import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Artist } from '../../types/types';
import { getArtists } from '../../utils/api/methods';

type ArtistsSlice = {
  artists: Artist[],
  loading: boolean,
  error: boolean,
};

const initialState: ArtistsSlice = {
  artists: [],
  loading: true,
  error: false,
};

export const fetchArtists = createAsyncThunk(
  'artists',
  async () => {
    const response = await getArtists();
    return (response.data);
  },
);

const getArtistsSlice = createSlice({
  name: 'getArtists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.loading = false;
      state.artists = action.payload;
    });
    builder.addCase(fetchArtists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default getArtistsSlice.reducer;
