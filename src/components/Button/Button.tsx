import React, { FC, SVGProps } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';

interface ButtonProps {
  isFilled?: boolean,
  isTheme?: boolean,
  text?: string,
  customStyle: string,
  clickHandler:() => void,
  Component?: FC<SVGProps<SVGSVGElement> & { title?: string | undefined; }>,
}

const cx = cn.bind(style);

const Button:FC<ButtonProps> = ({
  isFilled, isTheme, clickHandler, text, Component, customStyle,
}) => {
  const buttonClassName = cx(
    'button',
    customStyle,
    { button_addTheme: isTheme },
    { button_filled: isFilled },
    { button_filledTheme: isFilled && isTheme },
  );

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={clickHandler}
    >
      {Component && <Component />}
      {text && text}
    </button>
  );
};

export default Button;
