import { AxiosResponse } from 'axios';
import instance from '.';
import {
  AuthResponse,
  PatchFavoritePaintingRequest,
  ControlSchema, GetAuthArtistsRespons,
  AuthArtist, ArtistPainting, DeleteArtistPainting,
  StaticArtist, AuthStaticArtist, PostNewPaintingRequest,
  PatchPainintgInfoRequest, Genre, PostNewArtistRequset,
  PatchArtistInfoRequest, GetBodyRequestMainPaintings,
} from '../../types/types';

export const getAuthArtists = (): Promise<AxiosResponse<GetAuthArtistsRespons>> => instance.get('/artists');

export const getAuthArtist = (id: string): Promise<AxiosResponse<AuthArtist>> => instance.get(`/artists/${id}`);

export const getMainPaintings = (): Promise<AxiosResponse<StaticArtist[]>> => instance.get('/artists/static');

export const getArtistPaintings = (id: string): Promise<AxiosResponse<ArtistPainting[]>> => instance.get(`/artists/${id}/paintings`);

export const createUser = (body: ControlSchema): Promise<AxiosResponse<AuthResponse>> => {
  delete instance.defaults.headers.common.Authorization;
  return instance.post('auth/register', body);
};

export const postAuthorization = (body: ControlSchema): Promise<AxiosResponse<AuthResponse>> => {
  delete instance.defaults.headers.common.Authorization;
  return instance.post('auth/login', body);
};

export const patchFavoritePainting = ({ id, body }: PatchFavoritePaintingRequest): Promise<AxiosResponse<string>> => instance.patch(`artists/${id}/main-painting`, body);

export const deleteArtistPainting = ({ idArtist, idPainting }: DeleteArtistPainting): Promise<AxiosResponse<string>> => instance.delete(`artists/${idArtist}/paintings/${idPainting}`);

export const postNewPainting = ({ idArtist, body }: PostNewPaintingRequest):
Promise<AxiosResponse<ArtistPainting>> => {
  const formData = new FormData();
  formData.append('name', body.name);
  formData.append('yearOfCreation', body.yearOfCreation);
  formData.append('image', body.image!);

  return instance.post(`artists/${idArtist}/paintings`, formData);
};

export const patchPaintingInfo = ({ idArtist, idPainting, body }: PatchPainintgInfoRequest):
Promise<AxiosResponse<ArtistPainting>> => instance.put(`artists/${idArtist}/paintings/${idPainting}`, body);

export const getAuthGenres = (): Promise<AxiosResponse<Genre[]>> => instance.get('/genres/');

export const postNewArtist = ({
  name, description, avatar, yearsOfLife, location, genres,
}: PostNewArtistRequset):
Promise<AxiosResponse<AuthArtist>> => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('country', location!);
  formData.append('description', description!);
  formData.append('yearsOfLife', yearsOfLife!);
  if (avatar) formData.append('avatar', avatar!);
  genres.forEach((genre) => formData.append('genres[]', genre));

  return instance.post('artists/', formData);
};

export const patchArtistInfo = ({
  id, body: {
    name, description, avatar, yearsOfLife, location, genres,
  },
}: PatchArtistInfoRequest):
Promise<AxiosResponse<AuthArtist>> => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('country', location!);
  formData.append('description', description!);
  formData.append('yearsOfLife', yearsOfLife!);
  if (avatar) formData.append('avatar', avatar!);
  genres.forEach((genre) => formData.append('genres[]', genre));

  return instance.put(`artists/${id}`, formData);
};

export const deleteArtist = (id: string): Promise<AxiosResponse<string>> => instance.delete(`artists/${id}`);

export const getAuthMainPaintings = ({
  orderBy, genres, sortBy,
}: GetBodyRequestMainPaintings): Promise<AxiosResponse<AuthStaticArtist>> => {
  let sorting = null;
  if (orderBy === 'A—Z') sorting = 'asc';
  if (orderBy === 'Z—A') sorting = 'desc';

  return instance.get('/artists/', {
    params: {
      sortBy,
      orderBy: sorting,
      genres: genres?.length ? genres : null,
    },
  });
};
