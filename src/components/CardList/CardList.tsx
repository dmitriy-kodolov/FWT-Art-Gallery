import cn from 'classnames/bind';
import React, { FC } from 'react';
import style from './style.module.scss';

const cx = cn.bind(style);

type CardListProps = {
  isDarkTheme: boolean,

};

const CardList: FC<CardListProps> = ({

  children, isDarkTheme,
}) => {
  const cardlistClassName = cx(
    'cardList',
    { cardList_addLightTheme: !isDarkTheme },
  );

  return (
    <div className={cardlistClassName}>
      {children}
    </div>
  );
};

export default CardList;
