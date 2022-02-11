import React, { FC, SVGProps } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';

interface ButtonProps {
  isFilled?: boolean,
  isDarkTheme?: boolean,
  text?: string,
  customStyle?: string,
  clickHandler:() => void,
  Component?: FC<SVGProps<SVGSVGElement> & { title?: string | undefined; }>,
}

const cx = cn.bind(style);

const Button:FC<ButtonProps> = ({
  isFilled, isDarkTheme, clickHandler, text, Component, customStyle,
}) => {
  const buttonClassName = cx(
    'button',
    customStyle,
    { button_addLightTheme: !isDarkTheme },
    { button_filled: isFilled },
    { button_filledLightTheme: isFilled && !isDarkTheme },
  );
  const svgClassName = cx(
    'button__svgBtn',
    { button__svgBtn_addLightTheme: !isDarkTheme },
  );

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={clickHandler}
    >
      {Component && <Component className={svgClassName} />}
      {text && text}
    </button>
  );
};

export default Button;
