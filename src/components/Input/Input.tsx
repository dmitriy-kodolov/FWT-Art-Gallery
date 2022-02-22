import React, { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames/bind';
import { Control, Controller } from 'react-hook-form';
import style from './style.module.scss';
import { ControlSchema, Schema } from '../../types/types';

const cx = cn.bind(style);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isDarkTheme?: boolean,
  errorMessage?: string | false,
  myPlaceholder?: string,
  control?: Control<ControlSchema, any>,
  name: Schema,
}

const Input: FC<InputProps> = ({
  errorMessage, className, control, myPlaceholder, isDarkTheme, name, children, ...other
}) => {
  const inputClassName = cx(
    'input',
    className,
    { input_addLightTheme: isDarkTheme },
    { input_addErrorStyle: errorMessage },
  );

  const customPlaceholderClassName = cx({ input__customPlaceHolder: myPlaceholder });

  return (
    <div className={inputClassName}>
      <span className={customPlaceholderClassName}>{myPlaceholder}</span>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
        }) => (
          <input
            {...other}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <span className={style.input__errorMessage}>{errorMessage}</span>
      {children}
    </div>
  );
};

export default Input;
