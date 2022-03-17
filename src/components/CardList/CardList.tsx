import cn from 'classnames/bind';
import React, { FC } from 'react';
import Card from '../Card';
import style from './style.module.scss';
import {
  StaticArtist, PatchFavoritePaintingRequest, AuthArtist,
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
  curentIdPaintingHandler?: (idPaintng: number) => void,
  deleteArtistPaintingHandler?: () => void,
  editArtistPaintingHandler?: () => void,
};

const CardList: FC<CardListProps> = ({
  artistPageInfo, mainPageInfo, isDarkTheme, clickHandler, favoritePaintingHandler,
  setIsOpenPaintingLoader, deleteArtistPaintingHandler, editArtistPaintingHandler,
  curentIdPaintingHandler,
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
      {artistPageInfo && artistPageInfo!.paintings?.map((infoItem, id) => (
        <div className={style.cardList__card} key={infoItem._id}>
          <Card
            idPaintingArtist={id}
            artistPageInfo={infoItem}
            clickHandler={clickHandler}
            curentIdPaintingHandler={curentIdPaintingHandler}
            deleteArtistPaintingHandler={deleteArtistPaintingHandler}
            favoritePaintingHandler={favoritePaintingHandler}
            editArtistPaintingHandler={editArtistPaintingHandler}
          />
        </div>
      ))}
      {mainPageInfo && mainPageInfo!.map((infoItem) => (
        <div className={style.cardList__card} key={infoItem._id}>
          <Card
            isDarkTheme={isDarkTheme}
            mainPageInfo={infoItem}
            clickHandler={clickHandler}
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;
