import instance from '.';
import { GetArtistsResponseData, GetPaintingsResponseData } from '../../types/types';

export const getArtists = (): Promise<GetArtistsResponseData> => instance.get('/artists');

export const getPaintings = (): Promise<GetPaintingsResponseData> => instance.get('/paintings');
