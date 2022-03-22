import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import Loader from '../../Loader';
import CardList from '../../CardList';
import { fetchMainPaintings } from '../../../store/slices/paintingsSlice';
import FiltredBar from '../../FiltredBar';
import ModalArtist from '../../ModalArtist';

const Main: FC = () => {
  const {
    theme: { isDarkTheme },
    paintings: { paintings, error, loading },
    auth: { isAuth },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpenArtsitEdit, setIsOpenArtsitEdit] = useState(false);

  useEffect(() => {
    if (!isAuth) dispatch(fetchMainPaintings());
  }, [isAuth]);

  const clickHandler = (idPainting: string | number) => (isAuth ? navigate(`../artist/${idPainting}`) : alert('xyi'));

  if (error) <h1>Error</h1>;

  if (loading) <Loader isDarkTheme={isDarkTheme} />;

  return (
    <>
      {isOpenArtsitEdit && (
      <ModalArtist
        setIsOpenArtsitEdit={() => setIsOpenArtsitEdit(false)}
      />
      )}
      {isAuth && (
      <FiltredBar
        isDarkTheme={isDarkTheme}
        setIsOpenArtsitEdit={() => setIsOpenArtsitEdit(true)}
      />
      )}
      <CardList isDarkTheme={isDarkTheme} mainPageInfo={paintings} clickHandler={clickHandler} />
    </>
  );
};

export default Main;
