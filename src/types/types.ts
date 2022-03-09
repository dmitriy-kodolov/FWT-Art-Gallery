export type Schema = 'username' | 'password' | 'confirmPassword' | 'name' | 'yearOfCreation';

export type ControlSchema = {
  username: string,
  password: string,
  confirmPassword?: string,
  name?: string,
  yearOfCreation?: number
};

export type PostNewPaintingRequest = {
  id: string,
  body: {
    name: string,
    yearOfCreation: string,
    image: File,
  }
};

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
  genres: string[],
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
