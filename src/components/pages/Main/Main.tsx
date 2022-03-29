import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import Loader from '../../Loader';
import { fetchMainPaintings } from '../../../store/slices/paintingsSlice';
import FiltredBar from '../../FiltredBar';
import ModalArtist from '../../ModalArtist';
import Pagination from '../../Pagination/Pagination';
import style from './style.module.scss';
import DragDropWrapper from '../../DragDropWrapper';

const Main: FC = () => {
  const {
    theme: { isDarkTheme },
    paintings: {
      paintings, error, loading, meta: { pageNumber, perPage },
    },
    auth: { isAuth },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpenArtsitEdit, setIsOpenArtsitEdit] = useState(false);

  useEffect(() => {
    if (!isAuth) dispatch(fetchMainPaintings({ perPage, pageNumber }));
  }, [isAuth]);

  const clickHandler = (idPainting: string | number) => (isAuth ? navigate(`../artist/${idPainting}`) : alert('Не авторизован'));

  if (error) <h1>Error</h1>;

  if (loading) <Loader isDarkTheme={isDarkTheme} />;

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={style.main}>
      {isOpenArtsitEdit && (
      <ModalArtist
        ref={ref}
        setIsOpenArtsitEdit={() => setIsOpenArtsitEdit(false)}
      />
      )}
      {isAuth && (
      <FiltredBar
        isDarkTheme={isDarkTheme}
        setIsOpenArtsitEdit={() => setIsOpenArtsitEdit(true)}
      />
      )}
      <DragDropWrapper
        mainPageInfo={paintings}
        isDarkTheme={isDarkTheme}
        clickHandler={clickHandler}
      />
      <Pagination />
    </div>
  );
};

export default Main;
