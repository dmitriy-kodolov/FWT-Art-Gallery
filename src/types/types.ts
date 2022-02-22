export type Schema = 'login' | 'password' | 'confirmPassword';

export type ControlSchema = {
  login?: string,
  password: string,
  confirmPassword?: string
};

export type PostAuthRegistrat = {
  data: ControlSchema
};

export type GetArtistsResponseData = {
  data: Artist[],
};

export type GetPaintingsResponseData = {
  data: Painting[],
};

export type Artist = {
  id: number,
  birthCity: string,
  name: string,
  description: string,
  yearsOfLife: string,
  genres: string[],
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
