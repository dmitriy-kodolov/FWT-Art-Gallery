import instance from '.';
import { GetArtistsResponseData } from '../../types/types';

export const getArtists = ():Promise<GetArtistsResponseData> => instance.get('/artists');

export const getSome = () => {};
