import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as Toggle } from '../../assets/toggleImage.svg';
import style from './style.module.scss';

type AccardeonProps = {
  text: string,
  isDarkTheme: boolean,
};

const cx = cn.bind(style);

const Accardeon:FC<AccardeonProps> = ({ text, isDarkTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const svgClassName = cx(
    'accardeon__svgIcon',
    { accardeon__svgIcon_addLightTheme: !isDarkTheme },
    { accardeon__svgIcon_rotateSvg: isOpen },
  );
  const titleClassName = cx(
    'accardeon__title',
    { accardeon__title_addLightTheme: !isDarkTheme },
  );

  return (
    <>
      {!isOpen
      && (
      <span>
          {text.slice(0, 100)}
        ...
        <div className={style.accardeon} onClick={() => setIsOpen((prev) => !prev)}>
          <span className={titleClassName}>SHOW ALL</span>
          <Toggle className={svgClassName} />
        </div>
      </span>
      )}
      {isOpen
      && (
      <span>
        {text}
        <div className={style.accardeon} onClick={() => setIsOpen((prev) => !prev)}>
          <span className={titleClassName}>SHOW LESS</span>
          <Toggle className={svgClassName} />
        </div>
      </span>
      )}
    </>
  );
};

export default Accardeon;
