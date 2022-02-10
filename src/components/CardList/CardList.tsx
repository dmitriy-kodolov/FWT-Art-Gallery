import cn from 'classnames/bind';
import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Card from '../Card/Card';
import style from './style.module.scss';

const cx = cn.bind(style);

const CardList:FC = () => {
  const mokPaintingsInfo = [
    {
      title: '1',
      name: '1',
      painting: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    },
    {
      title: '2',
      name: '1',
      painting: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    },
    {
      title: '3',
      name: '1',
      painting: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    },
    {
      title: '4',
      name: '1',
      painting: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    },
    {
      title: '5',
      name: '1',
      painting: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    },
    {
      title: '6',
      name: '1',
      painting: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    },
    {
      title: '7',
      name: '1',
      painting: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    },
    {
      title: '8',
      name: '1',
      painting: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    },
    {
      title: '9',
      name: '1',
      painting: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
    },
  ];
  const { theme: { isDarkTheme } } = useAppSelector((state) => state);
  const cardlistClassName = cx(
    'cardList',
    { cardList_addLightTheme: !isDarkTheme },
  );

  return (
    <div className={cardlistClassName}>
      {mokPaintingsInfo.map((item) => (
        <div className={style.cardList__card}>
          <Card cardInfo={item} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
