import cn from 'classnames/bind';
import React, { FC } from 'react';
import Card from '../Card';
import style from './style.module.scss';
import { Painting } from '../../types/types';

const cx = cn.bind(style);

type CardListProps = {
  info: Painting[],
  isArtistPage?: boolean,
  clickHandler: (idPainting: number) => void,
  isDarkTheme: boolean,
};

const CardList: FC<CardListProps> = ({
  info, isArtistPage, isDarkTheme, clickHandler,
}) => {
  const cardlistClassName = cx(
    'cardList',
    { cardList_addLightTheme: !isDarkTheme },
  );

  return (
    <div className={cardlistClassName}>
      {info.map((infoItem) => (
        <div className={style.cardList__card} key={infoItem.id}>
          <Card clickHandler={clickHandler} cardInfo={infoItem} isArtistPage={isArtistPage} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
