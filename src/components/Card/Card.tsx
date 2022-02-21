import React, { FC } from 'react';
import { Painting } from '../../types/types';
import style from './style.module.scss';

type CardProps = {
  cardInfo: Painting,
  clickHandler: (idPainting: number) => void,
};

const Card: FC<CardProps> = ({
  cardInfo: {
    id, authorName, yearOfAuthor, name, yearOfCreated, painting,
  }, clickHandler,
}) => (
  <div className={style.card} onClick={() => clickHandler(id)}>
    <div className={style.card__slidePanel}>
      <span>{authorName}</span>
      {yearOfAuthor && <span>{yearOfAuthor}</span>}
      <span>
        Name:
        {name}
      </span>
      {yearOfCreated && (
      <span>
        Created:
        {yearOfCreated}
      </span>
      )}
    </div>
    <img className={style.card__img} src={painting} alt="#paintOfAuthor" />
  </div>
);

export default Card;
