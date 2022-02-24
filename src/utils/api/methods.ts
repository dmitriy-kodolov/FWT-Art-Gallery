import instance from '.';
import {
  ControlSchema, GetArtistsResponseData, GetPaintingsResponseData, PostAuthRegistrat,
} from '../../types/types';

export const getArtists = (): Promise<GetArtistsResponseData> => instance.get('/artists');

export const getPaintings = (): Promise<GetPaintingsResponseData> => instance.get('/paintings');

export const createUser = (body: ControlSchema): Promise<PostAuthRegistrat> => instance.post('users', body); // TODO нужно будет менять

export const postAuthorization = (body: ControlSchema): Promise<PostAuthRegistrat> => instance.post('users', body);
