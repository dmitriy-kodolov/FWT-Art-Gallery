import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Painting } from '../../types/types';
import { getPaintings } from '../../utils/api/methods';

type PaintingsSlice = {
  paintings: Painting[],
  loading: boolean,
  error: boolean,
};

const initialState: PaintingsSlice = {
  paintings: [],
  loading: true,
  error: false,
};

export const fetchPaintings = createAsyncThunk(
  'paintings',
  async () => {
    const response = await getPaintings();
    return (response.data);
  },
);

const getPaintingsSlice = createSlice({
  name: 'getPaintings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPaintings.fulfilled, (state, action) => {
      state.loading = false;
      state.paintings = action.payload;
    });
    builder.addCase(fetchPaintings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPaintings.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default getPaintingsSlice.reducer;
