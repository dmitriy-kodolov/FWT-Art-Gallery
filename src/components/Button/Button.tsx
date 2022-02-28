import React, { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFilled?: boolean,
  isDarkTheme?: boolean,
  disabled?: boolean,
  className: string,
}

const cx = cn.bind(style);

const Button: FC<ButtonProps> = ({
  isFilled, isDarkTheme, disabled, className, children, ...other
}) => {
  const buttonClassName = cx(
    'button',
    className,
    { button_addLightTheme: !isDarkTheme },
    { button_filled: isFilled },
    { button_filledLightTheme: isFilled && !isDarkTheme },
    { button_disabled: disabled },
  );

  return (
    <button
      className={buttonClassName}
      type="button"
      {...other}
    >
      {children}
    </button>
  );
};

export default Button;
