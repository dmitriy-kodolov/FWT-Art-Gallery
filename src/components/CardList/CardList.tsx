import cn from 'classnames/bind';
import React, { FC } from 'react';
import Card from '../Card';
import style from './style.module.scss';
import { Painting, PatchFavoritePaintingRequest } from '../../types/types';

const cx = cn.bind(style);

type CardListProps = {
  info: Painting[],
  isArtistPage?: boolean,
  clickHandler: (idPainting: number) => void,
  isDarkTheme: boolean,
  idArtist?: number,
  favoritePaintingHandler?: (payload: PatchFavoritePaintingRequest) => void,
};

const CardList: FC<CardListProps> = ({
  info, isArtistPage, isDarkTheme, clickHandler, favoritePaintingHandler, idArtist,
}) => {
  const cardlistClassName = cx(
    'cardList',
    { cardList_addLightTheme: !isDarkTheme },
  );

  return (
    <div className={cardlistClassName}>
      {info.map((infoItem) => (
        <div className={style.cardList__card} key={infoItem.id}>
          <Card
            clickHandler={clickHandler}
            idAuthor={idArtist}
            favoritePaintingHandler={favoritePaintingHandler}
            cardInfo={infoItem}
            isArtistPage={isArtistPage}
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;
