import React, { FC } from 'react';
import cn from 'classnames/bind';
import MyLink from '../MyLink';
import style from './style.module.scss';
import { ReactComponent as FaceBook } from '../../assets/FaceBook.svg';
import { ReactComponent as VK } from '../../assets/VK.svg';
import { ReactComponent as Instagram } from '../../assets/Instagram.svg';
import { useAppSelector } from '../../hooks/redux';

const cx = cn.bind(style);

const Footer:FC = () => {
  const { theme: { isDarkTheme } } = useAppSelector((state) => state);
  const footerClassName = cx(
    'footer',
    { footer_addLightTheme: !isDarkTheme },
  );

  return (
    <div className={footerClassName}>
      <span className={style.footer__mainSite}>
        Проект реализован в рамках стажировки
        <br />
        для Frontend-разработчиков
        от компании
        {' '}
        <MyLink isDarkTheme={isDarkTheme} text="Framework Team" url="https://framework.team" />
      </span>
      <div className={style.footer__social}>
        <MyLink isDarkTheme={isDarkTheme} Component={FaceBook} url="https://www.facebook.com/framework.team" />
        <MyLink isDarkTheme={isDarkTheme} Component={VK} url="https://vk.com/frameworkteam" />
        <MyLink isDarkTheme={isDarkTheme} Component={Instagram} url="https://www.instagram.com/framework.team/" />
      </div>
      <span className={style.footer__author}>Иванов Иван, 2022</span>
    </div>
  );
};

export default Footer;
