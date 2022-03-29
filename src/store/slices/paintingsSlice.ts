import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetBodyRequestMainPaintings, GetStaticPaintingsRequest, PostNewArtistRequset, StaticArtist,
} from '../../types/types';
import { getMainPaintings, getAuthMainPaintings, postNewArtist } from '../../utils/api/methods';

type PaintingsSlice = {
  paintings: StaticArtist[],
  loading: boolean,
  error: boolean,
  meta: {
    pageNumber: number,
    perPage: number,
    count: number,
    totalCount: number,
  }
  pages: number
};

const initialState: PaintingsSlice = {
  paintings: [],
  loading: true,
  error: false,
  pages: 1,
  meta: {
    pageNumber: 1,
    perPage: 9,
    count: 0,
    totalCount: 9,
  },
};

export const fetchMainPaintings = createAsyncThunk(
  'paintings',
  async ({ perPage, pageNumber }: GetStaticPaintingsRequest) => {
    const response = await getMainPaintings({ perPage, pageNumber });
    return (response.data);
  },
);

export const fetchAuthMainPaintings = createAsyncThunk(
  'authPaintings',
  async (payload: GetBodyRequestMainPaintings) => {
    const response = await getAuthMainPaintings(payload);

    return (response.data);
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
  reducers: {
    setAllPagesCount: (state, action) => {
      state.pages = action.payload;
    },
    setPerPage: (state, action) => {
      if (action.payload <= 768) state.meta.perPage = 8;
    },
    setStartPage: (state) => { state.meta.pageNumber = 1; },
    setLastPage: (state) => { state.meta.pageNumber = state.pages; },
    setCurentPage: (state, action) => { state.meta.pageNumber = action.payload; },
    incrementPage: (state) => {
      state.meta.pageNumber === state.pages
        ? state.meta.pageNumber = state.pages
        : state.meta.pageNumber += 1;
    },
    decrementPage: (state) => {
      state.meta.pageNumber === 1
        ? state.meta.pageNumber = 1
        : state.meta.pageNumber -= 1;
    },
  },
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
      state.paintings = action.payload.data;
      state.meta = { ...state.meta, ...action.payload.meta };
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

export const {
  incrementPage, setAllPagesCount, setPerPage, setStartPage, decrementPage, setLastPage,
  setCurentPage,
} = getPaintingsSlice.actions;

export default getPaintingsSlice.reducer;
