import React, { FC, SVGProps } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';

type LinkProps = {
  text?: string,
  isDarkTheme?: boolean,
  url: string,
  Component?: FC<SVGProps<SVGSVGElement> & { title?: string | undefined; }>,
};

const cx = cn.bind(style);

const MyLink:FC<LinkProps> = ({
  text, isDarkTheme, url, Component,
}) => {
  const linkClassName = cx('myLink', { myLink_addLightTheme: !isDarkTheme });
  const svgClassName = cx('myLink__svg', { myLink__svg_addLightTheme: !isDarkTheme });

  return (
    <a className={linkClassName} href={url}>
      {text || ''}
      {Component && <Component className={svgClassName} />}
    </a>
  );
};

export default MyLink;
