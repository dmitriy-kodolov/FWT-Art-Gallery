/* eslint-disable @typescript-eslint/no-unused-vars */
import cn from 'classnames/bind';
import React, { FC } from 'react';
import LazyLoad from 'react-lazyload';
import {
  ArtistPainting, DeleteArtistPainting, PatchFavoritePaintingRequest, StaticArtist,
} from '../../types/types';
import Button from '../Button';
import style from './style.module.scss';
import { ReactComponent as EditIcon } from '../../assets/editIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg';
import { ReactComponent as Favorite } from '../../assets/favoriteIcon.svg';

type CardProps = {
  mainPageInfo?: StaticArtist,
  artistPageInfo?: ArtistPainting,
  idPaintingArtist?: number,
  clickHandler: (idPainting: string | number) => void,
  favoritePaintingHandler?: (payload: PatchFavoritePaintingRequest) => void,
  deleteArtistPaintingHandler?: (body: DeleteArtistPainting) => void,
};

const cx = cn.bind(style);

const baseUrl = process.env.REACT_APP_BASE_URL_DEV;

const Card: FC<CardProps> = ({
  mainPageInfo, artistPageInfo, idPaintingArtist, deleteArtistPaintingHandler,
  clickHandler, favoritePaintingHandler,
}) => {
  const slidePanelClassName = cx('card__slidePanel', { card__slidePanel_abc: artistPageInfo });

  return (
    <div
      className={style.card}
      onClick={() => clickHandler(mainPageInfo!?._id || idPaintingArtist!)}
    >
      <div className={slidePanelClassName}>
        {artistPageInfo && (
          <span>
            {artistPageInfo!.name}
            {' '}
            {artistPageInfo!.yearOfCreation}
          </span>
        )}
        {mainPageInfo && (
          <>
            <span>{mainPageInfo!.name}</span>
            <span className={style.card__authorYear}>{mainPageInfo!.yearsOfLife}</span>
            {mainPageInfo.mainPainting.name && (
            <span className={style.card__paintingName}>
              Name:
              {' '}
              {mainPageInfo.mainPainting.name}
            </span>
            )}
            {mainPageInfo.mainPainting.yearOfCreation && (
            <span className={style.card__paintingCreated}>
              Created:
              {' '}
              {mainPageInfo.mainPainting.yearOfCreation}
            </span>
            )}
          </>
        )}
      </div>
      <LazyLoad height="100%">
        {mainPageInfo
        && (
          <picture className={style.card__img}>
            <source type="image/webp" srcSet={`${baseUrl!}${mainPageInfo.mainPainting.image.webp}`} />
            <img className={style.card__img} src={`${baseUrl!}${mainPageInfo.mainPainting.image.src}`} alt="#paintOfAuthor" />
          </picture>
        )}
        {artistPageInfo
        && (
        <picture>
          <source type="image/webp" srcSet={`${baseUrl!}${artistPageInfo.image.webp}`} />
          <img className={style.card__img} src={`${baseUrl!}${artistPageInfo.image.src}`} alt="#paintOfAuthor" />
        </picture>
        )}
      </LazyLoad>
      {artistPageInfo && (
      <div className={style.card__changeBtns}>
        <Button
          aria-label="favorite button"
          className={style.card__changeBtn}
          // TODO
          // onClick={(e) => {
          //   e.stopPropagation();
          //   favoritePaintingHandler!({ id: artistPageInfo!._id, body: { cardInfo });
          // }}
        >
          <Favorite />
        </Button>
        <Button
          aria-label="edit button"
          className={style.card__changeBtn}
          onClick={() => {}}
        >
          <EditIcon />
        </Button>
        <Button
          aria-label="delete button"
          className={style.card__changeBtn}
          onClick={(e) => {
            e.stopPropagation();
            deleteArtistPaintingHandler!(
              { idArtist: artistPageInfo?.artist, idPainting: artistPageInfo?._id },
            );
          }}
        >
          <DeleteIcon />
        </Button>
      </div>
      )}
    </div>
  );
};

export default Card;
