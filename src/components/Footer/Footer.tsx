import React, { FC } from 'react';
import cn from 'classnames/bind';
import MyLink from '../MyLink';
import style from './style.module.scss';
import { ReactComponent as FaceBook } from '../../assets/FaceBook.svg';
import { ReactComponent as VK } from '../../assets/VK.svg';

const cx = cn.bind(style);

const Footer:FC = () => {
//   const footerClassName = cx('footer', { footer_theme: isTheme });
  const footerClassName = cx('footer');

  return (
    <div className={footerClassName}>
      <span className={style.footer__mainSite}>
        Проект реализован в рамках стажировки для Frontend-разработчиков
        от компании

        <MyLink text="Framework Team" url="https://framework.team" />
      </span>
      <div className={style.footer__social}>
        <MyLink Component={FaceBook} url="https://www.facebook.com/framework.team" />
        <MyLink Component={VK} url="https://vk.com/frameworkteam" />
      </div>
      <span className={style.footer__author}>Иванов Иван, 2022</span>
    </div>
  );
};

export default Footer;
