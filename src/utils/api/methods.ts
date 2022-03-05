import { AxiosResponse } from 'axios';
import instance from '.';
import {
  AuthResponse,
  PatchFavoritePaintingRequest,
  ControlSchema, GetAuthArtistsRespons,
  AuthArtist, ArtistPainting, DeleteArtistPainting, StaticArtist,
} from '../../types/types';

export const getAuthArtists = (): Promise<AxiosResponse<GetAuthArtistsRespons>> => instance.get('/artists');

export const getAuthArtist = (id: string): Promise<AxiosResponse<AuthArtist>> => instance.get(`/artists/${id}`);

export const getMainPaintings = (): Promise<AxiosResponse<StaticArtist[]>> => instance.get('/artists/static');

export const getArtistPaintings = (id: string): Promise<AxiosResponse<ArtistPainting[]>> => instance.get(`/artists/${id}/paintings`);

export const createUser = (body: ControlSchema): Promise<AxiosResponse<AuthResponse>> => instance.post('auth/register', body);

export const postAuthorization = (body: ControlSchema): Promise<AxiosResponse<AuthResponse>> => instance.post('auth/login', body);

export const patchFavoritePainting = ({ id, body }: PatchFavoritePaintingRequest): Promise<AxiosResponse<any>> => instance.patch(`/paintings/${id}`, body);

export const deleteArtistPainting = ({ idArtist, idPainting }: DeleteArtistPainting): Promise<AxiosResponse<string>> => instance.delete(`artist/${idArtist}/paintings/${idPainting}`);
