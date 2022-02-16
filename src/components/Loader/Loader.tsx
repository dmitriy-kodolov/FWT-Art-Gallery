/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';
import cn from 'classnames/bind';
import { ReactComponent as Circle } from '../../assets/circleLoader.svg';
import style from './style.module.scss';

const cx = cn.bind(style);

type LoaderPops = {
  isDarkTheme: boolean;
};

const Loader:FC<LoaderPops> = ({ isDarkTheme }) => {
  const loaderItemClassName = cx('loader__item', { loader__item_addLightTheme: !isDarkTheme });

  return (
    <div className={style.loader}>
      <div className={loaderItemClassName}><Circle /></div>
      <div className={loaderItemClassName}><Circle /></div>
      <div className={loaderItemClassName}><Circle /></div>
    </div>
  );
};

export default Loader;
