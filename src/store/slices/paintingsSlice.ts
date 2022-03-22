import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  ArtistPainting, GetBodyRequestMainPaintings, PostNewArtistRequset, StaticArtist,
} from '../../types/types';
import { getMainPaintings, getAuthMainPaintings, postNewArtist } from '../../utils/api/methods';

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
  async (payload: GetBodyRequestMainPaintings) => {
    const response = await getAuthMainPaintings(payload);

    return (response.data.data);
  },
);

export const fetchCreateArtist = createAsyncThunk(
  'artists/post',
  async (body: PostNewArtistRequset) => {
    const response = await postNewArtist(body);
    return (response.data);
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
    builder.addCase(fetchCreateArtist.fulfilled, (state, action) => {
      state.loading = false;
      state.paintings = [...state.paintings, action.payload];
    });
    builder.addCase(fetchCreateArtist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateArtist.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default getPaintingsSlice.reducer;
