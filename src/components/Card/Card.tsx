import React, { FC } from 'react';
import { CardInfo } from '../../types/types';
import style from './style.module.scss';

type CardProps = {
  cardInfo:CardInfo
};

const Card:FC<CardProps> = ({
  cardInfo: {
    name, painting, clickHandler, yearOfAvtor, yearOfPublishing,
  },
}) => (
  <div className={style.card}>
    <div className={style.card__slidePanel} onClick={clickHandler}>
      <span>{name}</span>
      {yearOfAvtor && <span>{yearOfAvtor}</span>}
      <span>{name}</span>
      {yearOfPublishing && <span>{yearOfPublishing}</span>}
    </div>
    <img className={style.card__img} src={painting} alt="#paintOfAuthor" />
  </div>
);

export default Card;
