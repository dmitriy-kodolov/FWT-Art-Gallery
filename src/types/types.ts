export type Schema = 'username' | 'password' | 'confirmPassword'
| 'name' | 'yearOfCreation' | 'artistName' | 'yearOfLife' | 'location';

export type ControlSchema = {
  username: string,
  password: string,
  confirmPassword?: string,
  name?: string,
  yearOfCreation?: string
  artistName?: string,
  yearOfLife?: string,
  location?: string,
  description?: string,
  genres?: Genre[]

};

export type PostNewPaintingRequest = {
  idArtist: string,
  body: {
    name: string,
    yearOfCreation: string,
    image?: File,
  }
};

export interface PatchPainintgInfoRequest extends PostNewPaintingRequest {
  idPainting: string,
}

export type DeleteArtistPainting = {
  idArtist: string,
  idPainting: string,
};

export type PatchFavoritePaintingRequest = {
  id: string,
  body: {
    mainPainting: string,
  }
};

export type AuthResponse = {
  accessToken: string,
  refreshToken: string,
};

export type AuthorPaintings = {
  artist: string,
  _id: string,
  name: string,
  yearOfCreation?: string,
  image: Image
};

export type Genre = {
  _id: string,
  name: string,
};

export type Image = {
  _id: string,
  src: string,
  webp: string,
  src2x: string,
  webp2x: string,
  original: string,
};

export type ArtistPainting = {
  _id: string,
  name: string,
  yearOfCreation?: string,
  image: Image,
  artist: string,
};

export type AuthStaticArtist = {
  data: StaticArtist[]
};

export type StaticArtist = {
  genres: Genre[],
  _id: string,
  name: string,
  yearsOfLife: string,
  description: string,
  __v: string,
  mainPainting: ArtistPainting,
};

export type GetAuthArtistsRespons = {
  data: AuthArtist[]
};

export type AuthArtist = {
  paintings: ArtistPainting[],
  genres: Genre[],
  _id: string,
  name: string,
  description: string,
  yearsOfLife: string,
  avatar: {
    _id: string,
    src: string,
    webp: string,
    src2x: string,
    webp2x: string,
    original: string,
  }
  __v: string,
  mainPainting: ArtistPainting,
  country: string
};

export type RejectRequest = {
  statusCode: number,
  message: string,
  error: string
};

export type PostNewArtistRequset = {
  name: string,
  yearsOfLife?: string,
  description?: string,
  location?: string,
  avatar?: File,
  genres: string[]
};

export type PatchArtistInfoRequest = {
  id: string,
  body: PostNewArtistRequset
};
