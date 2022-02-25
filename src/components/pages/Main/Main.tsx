import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import Loader from '../../Loader';
import CardList from '../../CardList';
import { fetchPaintings } from '../../../store/slices/getPaintingsSlice';

const Main: FC = () => {
  const {
    theme: { isDarkTheme },
    paintings: { paintings, error, loading },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPaintings());
  }, []);

  const clickHandler = (idPainting: number) => {
    navigate(`../artist/${idPainting}`);
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
    <CardList isDarkTheme={isDarkTheme} info={paintings} clickHandler={clickHandler} />
  );
};

export default Main;
