import cn from 'classnames/bind';
import React, { FC } from 'react';
import style from './style.module.scss';
import { ReactComponent as PlugIcon } from '../../assets/plug.svg';

type PlugPhotoProps = {
  isDarkTheme: boolean,
  className: string,
};

const cx = cn.bind(style);

const PlugPhoto: FC<PlugPhotoProps> = ({ isDarkTheme, className, children }) => {
  const plugPhotoClassName = cx('plugPhoto', { plugPhoto_addLightTheme: !isDarkTheme }, className);
  const plugIconClassName = cx('plugPhoto__icon', { plugPhoto__icon_addLightTheme: !isDarkTheme });

  return (
    <div className={plugPhotoClassName}>
      <PlugIcon className={plugIconClassName} />
      <span>{children}</span>
    </div>
  );
};

export default PlugPhoto;
