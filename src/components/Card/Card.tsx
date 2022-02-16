import React, { FC } from 'react';
import { CardInfo } from '../../types/types';
import style from './style.module.scss';

type CardProps = {
  cardInfo:CardInfo,
  clickHandler: (id: number) => void,
};

const Card:FC<CardProps> = ({
  cardInfo: {
    name, painting, yearOfAuthor, yearOfPublishing, id,
  }, clickHandler,
}) => (
  <div className={style.card} onClick={() => clickHandler(id)}>
    <div className={style.card__slidePanel}>
      <span>{name}</span>
      {yearOfAuthor && <span>{yearOfAuthor}</span>}
      <span>{name}</span>
      {yearOfPublishing && <span>{yearOfPublishing}</span>}
    </div>
    <img className={style.card__img} src={painting} alt="#paintOfAuthor" />
  </div>
);

export default Card;
