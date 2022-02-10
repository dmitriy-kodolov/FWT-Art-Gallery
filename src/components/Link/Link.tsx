import React, { FC } from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';

type LinkProps = {
  text?: string,
  isTheme?: boolean,
  url: string,
  Component?: string,
};

const cx = classNames.bind(style);

const Link:FC<LinkProps> = ({
  text, isTheme, url, Component,
}) => {
  const linkClassName = cx('myLink', { myLink_theme: isTheme });

  return (
    <>
      <a className={linkClassName} href={url}>
        {text || ''}
      </a>
      {Component && <Component />}
    </>
  );
};

export default Link;
