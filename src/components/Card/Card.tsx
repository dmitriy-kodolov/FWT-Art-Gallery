import cn from 'classnames/bind';
import React, { FC } from 'react';
import { Painting, PatchFavoritePaintingRequest } from '../../types/types';
import Button from '../Button';
import style from './style.module.scss';
import { ReactComponent as EditIcon } from '../../assets/editIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg';
import { ReactComponent as Favorite } from '../../assets/favoriteIcon.svg';

type CardProps = {
  cardInfo: Painting,
  clickHandler: (idPainting: number) => void,
  isArtistPage?: boolean,
  idAuthor?: number,
  favoritePaintingHandler?: (payload: PatchFavoritePaintingRequest) => void,
};

const cx = cn.bind(style);

const Card: FC<CardProps> = ({
  cardInfo: {
    id, authorName, yearOfAuthor, name, yearOfCreated, painting,
  }, clickHandler, isArtistPage, favoritePaintingHandler, idAuthor,
}) => {
  const slidePanelClassName = cx('card__slidePanel', { card__slidePanel_abc: isArtistPage });

  return (
    <div className={style.card} onClick={() => clickHandler(id)}>
      <div className={slidePanelClassName}>
        {isArtistPage && (
          <span>
            {name}
            {' '}
            {yearOfCreated}
          </span>
        )}
        {!isArtistPage && (
          <>
            <span>{authorName}</span>
            <span className={style.card__authorYear}>{yearOfAuthor}</span>
            {name && (
            <span className={style.card__paintingName}>
              Name:
              {' '}
              {name}
            </span>
            )}
            {yearOfCreated && (
            <span className={style.card__paintingCreated}>
              Created:
              {' '}
              {yearOfCreated}
            </span>
            )}
          </>
        )}
      </div>
      <img className={style.card__img} src={painting} alt="#paintOfAuthor" />
      {isArtistPage && (
      <div className={style.card__changeBtns}>
        <Button
          aria-label="favorite button"
          className={style.card__changeBtn}
          onClick={(e) => {
            e.stopPropagation();
            favoritePaintingHandler!({ id: idAuthor!, body: { painting } });
          }}
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
          onClick={() => {}}
        >
          <DeleteIcon />
        </Button>
      </div>
      )}
    </div>
  );
};

export default Card;
