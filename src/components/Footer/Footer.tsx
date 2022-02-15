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
  const authorClassName = cx(
    'footer__author',
    { footer__author_addLightTheme: !isDarkTheme },
  );
  const svgClassName = cx('footer__svg', { footer__svg_addLightTheme: !isDarkTheme });

  return (
    <div className={footerClassName}>
      <span className={style.footer__mainSite}>
        Проект реализован в рамках стажировки
        <br />
        для Frontend-разработчиков
        от компании
        {' '}
        <MyLink isDarkTheme={isDarkTheme} url="https://framework.team">Framework Team</MyLink>
      </span>
      <div className={style.footer__social}>
        <MyLink isDarkTheme={isDarkTheme} url="https://www.facebook.com/framework.team">
          <FaceBook className={svgClassName} />
        </MyLink>
        <MyLink isDarkTheme={isDarkTheme} url="https://vk.com/frameworkteam">
          <VK className={svgClassName} />
        </MyLink>
        <MyLink isDarkTheme={isDarkTheme} url="https://www.instagram.com/framework.team/">
          <Instagram className={svgClassName} />
        </MyLink>
      </div>
      <span className={authorClassName}>Иванов Иван, 2022</span>
    </div>
  );
};

export default Footer;
