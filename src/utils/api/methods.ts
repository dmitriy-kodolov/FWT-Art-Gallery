import { AxiosResponse } from 'axios';
import instance from '.';
import {
  AuthResponse,
  PatchFavoritePaintingRequest,
  ControlSchema, Artist, Painting,
} from '../../types/types';

export const getArtists = (): Promise<AxiosResponse<Artist[]>> => instance.get('/artists');

export const getPaintings = (): Promise<AxiosResponse<Painting[]>> => instance.get('/paintings');

export const createUser = (body: ControlSchema): Promise<AxiosResponse<AuthResponse>> => instance.post('register', body);

export const postAuthorization = (body: ControlSchema): Promise<AxiosResponse<AuthResponse>> => instance.post('login', body);

export const patchFavoritePainting = ({ id, body }: PatchFavoritePaintingRequest): Promise<AxiosResponse<any>> => instance.patch(`/paintings/${id}`, body);
