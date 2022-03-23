import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GetBodyRequestMainPaintings } from '../types/types';

const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState({
    sortBy: searchParams.get('sortBy'),
    orderBy: searchParams.get('orderBy'),
    genres: searchParams.getAll('genres'),
  });

  const updateURL = (payload: any) => {
    // TODO либо оставить урлу как есть, либо придумавать так чтобы это все складировалось в масив
    const resultParams = {
      ...state,
      ...payload,
    };
    if (!resultParams.sortBy) delete (resultParams.sortBy);
    if (resultParams.orderBy === 'Recently added' || resultParams.orderBy === null) delete (resultParams.orderBy);
    setSearchParams(resultParams);
  };

  const updateParams = (payload: GetBodyRequestMainPaintings) => {
    updateURL(payload);

    setState({ ...state, ...payload });
  };

  return {
    state,
    updateParams,
  };
};

export default useFilter;
