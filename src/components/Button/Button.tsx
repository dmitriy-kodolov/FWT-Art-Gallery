import React, { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFilled?: boolean,
  isDarkTheme?: boolean,
  className: string,
}

const cx = cn.bind(style);

const Button:FC<ButtonProps> = ({
  isFilled, isDarkTheme, className, children, ...other
}) => {
  const buttonClassName = cx(
    'button',
    className,
    { button_addLightTheme: !isDarkTheme },
    { button_filled: isFilled },
    { button_filledLightTheme: isFilled && !isDarkTheme },
  );

  return (
    <button
      {...other}
      className={buttonClassName}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
