import React, { FC } from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';

interface ButtonProps {
  isFilled:boolean,
  isTheme:boolean,
  text:string,
  clickHandler:() => void
}

const cx = classNames.bind(style);

const Button:FC<ButtonProps> = ({
  isFilled, isTheme, clickHandler, text,
}) => {
  const buttonClassName = cx(
    'button',
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
      {text}
    </button>
  );
};

export default Button;
