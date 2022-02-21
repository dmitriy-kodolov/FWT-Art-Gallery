import React, { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';

const cx = cn.bind(style);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isDarkTheme?: boolean,
  myPlaceholder?: string,
}

const Input: FC<InputProps> = ({
  className, myPlaceholder, isDarkTheme, children, ...other
}) => {
  const inputClassName = cx(
    'input',
    className,
    { input_addLightTheme: isDarkTheme },
  );

  const customPlaceholderClassName = cx({ input__customPlaceHolder: myPlaceholder });

  return (
    <div className={inputClassName}>
      <span className={customPlaceholderClassName}>{myPlaceholder}</span>
      <input
        {...other}
      />
      {children}
    </div>
  );
};

export default Input;
