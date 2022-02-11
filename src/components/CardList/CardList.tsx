import cn from 'classnames/bind';
import React, { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import Card from '../Card/Card';
import style from './style.module.scss';
import { fetchArtists } from '../../store/slices/getArtistsSlice';
import Loader from '../../Loader';

const cx = cn.bind(style);

const CardList:FC = () => {
  const dispatch = useAppDispatch();
  const {
    theme: { isDarkTheme },
    artists: { artists, error, loading },
  } = useAppSelector((state) => state);

  const cardlistClassName = cx(
    'cardList',
    { cardList_addLightTheme: !isDarkTheme },
  );

  useEffect(() => {
    if (!artists.length) {
      dispatch(fetchArtists());
    }
  }, []);

  if (error) {
    return <h1>Error</h1>;
  }

  if (loading) {
    return (
      <div className={style.cardList__loader}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={cardlistClassName}>
      {artists.map((artistInfo) => (
        <div className={style.cardList__card}>
          <Card key={artistInfo.id} cardInfo={artistInfo} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
