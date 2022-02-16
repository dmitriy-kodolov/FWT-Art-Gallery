import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import Loader from '../../Loader';
import { fetchArtists } from '../../../store/slices/getArtistsSlice';
import CardList from '../../CardList';

const Main: FC = () => {
  const navigate = useNavigate();
  const {
    theme: { isDarkTheme },
    artists: { artists, error, loading },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!artists.length) {
      dispatch(fetchArtists()); // TODO поменять на картины как появится бэк
    }
  }, []);
  const clickHandler = (id: number) => {
    navigate(`../artist/${id}`);
  };

  if (error) {
    return <h1>Error</h1>;
  }

  if (loading) {
    return (
      <Loader isDarkTheme={isDarkTheme} />
    );
  }

  return (
    <CardList isDarkTheme={isDarkTheme} paintingInfo={artists} clickHandler={clickHandler} />
  );
};

export default Main;
