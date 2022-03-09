import { AxiosResponse } from 'axios';
import instance from '.';
import {
  AuthResponse,
  PatchFavoritePaintingRequest,
  ControlSchema, GetAuthArtistsRespons,
  AuthArtist, ArtistPainting, DeleteArtistPainting,
  StaticArtist, AuthStaticArtist, PostNewPaintingRequest,
} from '../../types/types';

export const getAuthArtists = (): Promise<AxiosResponse<GetAuthArtistsRespons>> => instance.get('/artists');

export const getAuthArtist = (id: string): Promise<AxiosResponse<AuthArtist>> => instance.get(`/artists/${id}`);

export const getMainPaintings = (): Promise<AxiosResponse<StaticArtist[]>> => instance.get('/artists/static');

export const getAuthMainPaintings = (): Promise<AxiosResponse<AuthStaticArtist>> => instance.get('/artists/');

export const getArtistPaintings = (id: string): Promise<AxiosResponse<ArtistPainting[]>> => instance.get(`/artists/${id}/paintings`);

export const createUser = (body: ControlSchema): Promise<AxiosResponse<AuthResponse>> => instance.post('auth/register', body);

export const postAuthorization = (body: ControlSchema): Promise<AxiosResponse<AuthResponse>> => instance.post('auth/login', body);

export const patchFavoritePainting = ({ id, body }: PatchFavoritePaintingRequest): Promise<AxiosResponse<string>> => instance.patch(`artists/${id}/main-painting`, body);

export const deleteArtistPainting = ({ idArtist, idPainting }: DeleteArtistPainting): Promise<AxiosResponse<string>> => instance.delete(`artists/${idArtist}/paintings/${idPainting}`);

export const postNewPainting = ({ id, body }: PostNewPaintingRequest):
Promise<AxiosResponse<any>> => {
  console.log(body.image);

  const formData = new FormData();
  formData.append('name', body.name);
  formData.append('yearOfCreation', body.yearOfCreation);
  formData.append('image', body.image);
  return instance.post(`artists/${id}/paintings`, formData);
};
