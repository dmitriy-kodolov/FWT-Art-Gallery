import { Genre } from '../types/types';

const getIdGenresForRequest = (genres: Genre[], genresBySelelcet: Genre[]) => {
  const result = [] as string[];
  genres.forEach(({ name }) => {
    genresBySelelcet.forEach((genre) => {
      if (name === genre.name) result.push(genre._id);
    });
  });

  return result;
};

export default getIdGenresForRequest;
