import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AuthArtist, DeleteArtistPainting, PatchArtistInfoRequest, PatchPainintgInfoRequest,
  PostNewPaintingRequest,
} from '../../types/types';
import {
  getAuthArtist, getAuthArtists, deleteArtistPainting, patchPaintingInfo,
  postNewPainting, patchArtistInfo, deleteArtist,
} from '../../utils/api/methods';

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

export const fetchDeleteArtist = createAsyncThunk(
  'artist/delete',
  async (id: string) => {
    const response = await deleteArtist(id);
    return (response.data);
  },
);

export const fetchPatchArtistPainting = createAsyncThunk(
  'painting/patch',
  async (body: PatchPainintgInfoRequest) => {
    const response = await patchPaintingInfo(body);
    return (response.data);
  },
);

export const fetchCreateArtistPainitng = createAsyncThunk(
  'painting/post',
  async (body: PostNewPaintingRequest) => {
    const response = await postNewPainting(body);
    return (response.data);
  },
);

export const fetchPatchArtistInfo = createAsyncThunk(
  'artists/patch',
  async (body: PatchArtistInfoRequest) => {
    const response = await patchArtistInfo(body);
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
      state.artist.paintings = state.artist.paintings
        .filter((painting) => painting._id !== action.payload);
    });
    builder.addCase(fetchDeleteArtistsPainting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDeleteArtistsPainting.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchPatchArtistPainting.fulfilled, (state, action) => {
      state.loading = false;
      const result = state.artist.paintings.map(({
        _id, name, yearOfCreation, ...rest
      }) => {
        if (_id === action.payload._id) {
          name = action.payload.name;
          yearOfCreation = action.payload.yearOfCreation;
        }
        return {
          _id, name, yearOfCreation, ...rest,
        };
      });
      state.artist.paintings = result;
    });
    builder.addCase(fetchPatchArtistPainting.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPatchArtistPainting.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchCreateArtistPainitng.fulfilled, (state, action) => {
      state.loading = false;
      state.artist.paintings = [...state.artist.paintings, action.payload];
    });
    builder.addCase(fetchCreateArtistPainitng.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreateArtistPainitng.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchPatchArtistInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.artist = { ...state.artist, ...action.payload };
    });
    builder.addCase(fetchPatchArtistInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPatchArtistInfo.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchDeleteArtist.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchDeleteArtist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDeleteArtist.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default getArtistsSlice.reducer;
