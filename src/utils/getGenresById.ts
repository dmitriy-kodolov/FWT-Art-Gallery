import { Genre } from '../types/types';

const getGenresById = (genres: Genre[], idGenres: string[]) => {
  const result = [] as Genre[];
  genres?.forEach((genre) => {
    idGenres.forEach((genreId) => {
      if (genreId === genre._id) result.push(genre);
    });
  });

  return result;
};

export default getGenresById;
