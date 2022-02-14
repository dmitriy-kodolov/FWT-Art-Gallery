export type CardInfo = {
  id: number,
  name: string,
  description: string,
  yearsOfLife: string,
  genres?: string[],
  painting: string
  yearOfAvtor?: string,
  yearOfPublishing?: string,
};

export type GetArtistsResponseData = {
  data: Artist[],
};

export type Artist = {
  id: number,
  birthCity: string,
  name: string,
  description: string,
  yearsOfLife: string,
  genres: string[],
  painting: string,
};
