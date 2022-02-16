import cn from 'classnames/bind';
import React, { FC } from 'react';
import Card from '../Card/Card';
import style from './style.module.scss';
import { CardInfo } from '../../types/types';

const cx = cn.bind(style);

type CardListProps = {
  paintingInfo: CardInfo[],
  clickHandler: (id: number) => void,
  isDarkTheme: boolean,
};

const CardList:FC<CardListProps> = ({ paintingInfo, isDarkTheme, clickHandler }) => {
  const cardlistClassName = cx(
    'cardList',
    { cardList_addLightTheme: !isDarkTheme },
  );

  return (
    <div className={cardlistClassName}>
      {paintingInfo.map((artistInfo) => ( // TODO как появиться бэк изменить передаваемый массив
        <div className={style.cardList__card} key={artistInfo.id}>
          <Card clickHandler={clickHandler} cardInfo={artistInfo} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
