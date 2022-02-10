import React, { FC, SVGProps } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';

type LinkProps = {
  text?: string,
  isTheme?: boolean,
  url: string,
  Component?: FC<SVGProps<SVGSVGElement> & { title?: string | undefined; }>,
};

const cx = cn.bind(style);

const MyLink:FC<LinkProps> = ({
  text, isTheme, url, Component,
}) => {
  const linkClassName = cx('myLink', { myLink_theme: isTheme });

  return (
    <a className={linkClassName} href={url}>
      {text || ''}
      {Component && <Component />}
    </a>
  );
};

export default MyLink;
