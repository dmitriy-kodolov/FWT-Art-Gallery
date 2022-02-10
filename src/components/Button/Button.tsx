import React, { FC } from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';

interface ButtonProps {
  isFilled: boolean,
  isDarkTheme: boolean,
  text: string,
  clickHandler: () => void
}

const cx = classNames.bind(style);

const Button:FC<ButtonProps> = ({
  isFilled, isDarkTheme, clickHandler, text,
}) => {
  const buttonClassName = cx(
    'button',
    { button_addTheme: isDarkTheme },
    { button_filled: isFilled },
    { button_filledTheme: isFilled && isDarkTheme },
  );

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
