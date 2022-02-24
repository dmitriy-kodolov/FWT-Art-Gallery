import React, { AnchorHTMLAttributes, FC } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isDarkTheme?: boolean,
  url?: string,
}

const cx = cn.bind(style);

const MyLink: FC<LinkProps> = ({
  isDarkTheme, url, children, ...other
}) => {
  const linkClassName = cx('myLink', { myLink_addLightTheme: !isDarkTheme });

  return (
    <a
      {...other}
      className={linkClassName}
      href={url}
    >
      {children}
    </a>
  );
};

export default MyLink;
