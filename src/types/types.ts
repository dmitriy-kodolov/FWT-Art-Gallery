export type Schema = 'email' | 'password' | 'confirmPassword';

export type ControlSchema = {
  email: string,
  password: string,
  confirmPassword?: string
};

export type AuthResponse = {
  accessToken: string,
  user: {
    email: string,
    id: number
  }

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
