export type Schema = 'email' | 'password' | 'confirmPassword' | 'paintingName' | 'yearOfCreated';

export type ControlSchema = {
  email: string,
  password: string,
  confirmPassword?: string,
  paintingName?: string,
  yearOfCreated?: number
};

export type PatchFavoritePaintingRequest = {
  id: number,
  body: {
    painting: string,
  }
};

export type AuthResponse = {
  accessToken: string,
  user: {
    email: string,
    id: number
  }

};

export type Artist = {
  genres: string[],
  id: number,
  name: string,
  description: string,
  yearsOfLife: string,
  mainPainting: string,
  birthCity: string,
  avatar: string,
  paintings: AuthorPaintings[],
};

export interface Painting extends AuthorPaintings {
  authorName?: string,
  yearOfAuthor?: string,
}

export type AuthorPaintings = {
  id: number,
  name: string,
  yearOfCreated?: string,
  painting: string
};
