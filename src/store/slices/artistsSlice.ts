import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthArtist, DeleteArtistPainting } from '../../types/types';
import { getAuthArtist, getAuthArtists, deleteArtistPainting } from '../../utils/api/methods';

type ArtistsSlice = {
  artists: AuthArtist[],
  loading: boolean,
  error: boolean,
  artist: AuthArtist
};

const initialState: ArtistsSlice = {
  artists: [],
  loading: true,
  error: false,
  artist: {} as AuthArtist,
};

export const fetchArtists = createAsyncThunk(
  'artists',
  async () => {
    const response = await getAuthArtists();
    return (response.data);
  },
);

export const fetchArtist = createAsyncThunk(
  'artist',
  async (id: string) => {
    const response = await getAuthArtist(id);
    return (response.data);
  },
);

export const fetchDeleteArtistsPainting = createAsyncThunk(
  'painting/delete',
  async (body: DeleteArtistPainting) => {
    const response = await deleteArtistPainting(body);
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
      state.artists = action.payload.data;
    });
    builder.addCase(fetchArtists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchArtist.fulfilled, (state, action) => {
      state.loading = false;
      state.artist = action.payload;
    });
    builder.addCase(fetchArtist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArtist.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchDeleteArtistsPainting.fulfilled, (state, action) => {
      state.loading = false;
      state.artist.paintings.map((painting) => painting._id !== action.payload);
    });
    builder.addCase(fetchDeleteArtistsPainting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDeleteArtistsPainting.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default getArtistsSlice.reducer;
