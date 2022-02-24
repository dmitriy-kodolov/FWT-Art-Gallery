import cn from 'classnames/bind';
import React, { FC } from 'react';
import { Painting } from '../../types/types';
import style from './style.module.scss';

type CardProps = {
  cardInfo: Painting,
  clickHandler: (idPainting: number) => void,
  isArtistPage?: boolean
};

const cx = cn.bind(style);

const Card: FC<CardProps> = ({
  cardInfo: {
    id, authorName, yearOfAuthor, name, yearOfCreated, painting,
  }, clickHandler, isArtistPage,
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
    </div>
  );
};

export default Card;
