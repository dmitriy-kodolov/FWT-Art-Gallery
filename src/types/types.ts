export type CardInfo = {
  id: number,
  name: string,
  description: string,
  yearsOfLife: string,
  genres?: string[],
  painting: string
  clickHandler?: () => void,
  yearOfAvtor?: string,
  yearOfPublishing?: string,
};

export type GetArtistsResponseData = {
  data: Artists[],
};

export type Artists = {
  id: number,
  name: string,
  description: string,
  yearsOfLife: string,
  genres: string[],
  painting: string
};
