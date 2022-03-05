import cn from 'classnames/bind';
import React, { FC } from 'react';
import Card from '../Card';
import style from './style.module.scss';
import {
  StaticArtist, PatchFavoritePaintingRequest, AuthArtist, DeleteArtistPainting,
} from '../../types/types';
import AddPaintingBlock from '../AddPaintingBlock';

const cx = cn.bind(style);

type CardListProps = {
  mainPageInfo?: StaticArtist[],
  artistPageInfo?: AuthArtist,
  clickHandler: (idPainting: string | number) => void,
  isDarkTheme: boolean,
  setIsOpenPaintingLoader?: (flag: boolean) => void,
  favoritePaintingHandler?: (payload: PatchFavoritePaintingRequest) => void,
  deleteArtistPaintingHandler?: (body: DeleteArtistPainting) => void,
};

const CardList: FC<CardListProps> = ({
  artistPageInfo, mainPageInfo, isDarkTheme, clickHandler, favoritePaintingHandler,
  setIsOpenPaintingLoader, deleteArtistPaintingHandler,
}) => {
  const cardlistClassName = cx(
    'cardList',
    { cardList_addLightTheme: !isDarkTheme },
  );

  return (
    <div className={cardlistClassName}>
      {artistPageInfo && (
      <AddPaintingBlock
        setIsOpenPaintingLoader={setIsOpenPaintingLoader!}
        isDarkTheme={isDarkTheme}
      />
      )}
      {artistPageInfo && artistPageInfo!.paintings.map((infoItem, id) => (
        <div className={style.cardList__card} key={infoItem._id}>
          <Card
            idPaintingArtist={id}
            artistPageInfo={infoItem}
            clickHandler={clickHandler}
            deleteArtistPaintingHandler={deleteArtistPaintingHandler}
            favoritePaintingHandler={favoritePaintingHandler}
          />
        </div>
      ))}
      {mainPageInfo && mainPageInfo!.map((infoItem) => (
        <div className={style.cardList__card} key={infoItem._id}>
          <Card
            mainPageInfo={infoItem}
            clickHandler={clickHandler}
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;
