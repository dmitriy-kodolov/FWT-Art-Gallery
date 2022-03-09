import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ArtistPainting, StaticArtist } from '../../types/types';
import { getMainPaintings, getAuthMainPaintings } from '../../utils/api/methods';

type PaintingsSlice = {
  paintings: StaticArtist[],
  loading: boolean,
  error: boolean,
  artistPaintings: ArtistPainting[]
};

const initialState: PaintingsSlice = {
  paintings: [],
  loading: true,
  error: false,
  artistPaintings: [],
};

export const fetchMainPaintings = createAsyncThunk(
  'paintings',
  async () => {
    const response = await getMainPaintings();
    return (response.data);
  },
);

export const fetchAuthMainPaintings = createAsyncThunk(
  'authPaintings',
  async () => {
    const response = await getAuthMainPaintings();

    return (response.data.data);
  },
);

const getPaintingsSlice = createSlice({
  name: 'getPaintings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMainPaintings.fulfilled, (state, action) => {
      state.loading = false;
      state.paintings = action.payload;
    });
    builder.addCase(fetchMainPaintings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMainPaintings.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchAuthMainPaintings.fulfilled, (state, action) => {
      state.loading = false;
      state.paintings = action.payload;
    });
    builder.addCase(fetchAuthMainPaintings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAuthMainPaintings.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default getPaintingsSlice.reducer;
