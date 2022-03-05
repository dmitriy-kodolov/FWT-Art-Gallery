import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import Loader from '../../Loader';
import CardList from '../../CardList';
import { fetchMainPaintings } from '../../../store/slices/paintingsSlice';

const Main: FC = () => {
  const {
    theme: { isDarkTheme },
    paintings: { paintings, error, loading },
    auth: { isAuth },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMainPaintings());
  }, []);

  const clickHandler = (idPainting: string | number) => (isAuth ? navigate(`../artist/${idPainting}`) : alert('xyi'));

  if (error) <h1>Error</h1>;

  if (loading) <Loader isDarkTheme={isDarkTheme} />;

  return (
    <CardList isDarkTheme={isDarkTheme} mainPageInfo={paintings} clickHandler={clickHandler} />
  );
};

export default Main;
