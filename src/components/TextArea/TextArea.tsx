import React, { FC } from 'react';
import cn from 'classnames/bind';
import { UseFormSetValue } from 'react-hook-form';
import style from './style.module.scss';
import { ControlSchema } from '../../types/types';

type TextAreaProps = {
  setValue: UseFormSetValue<ControlSchema>,
  className: string,
  value?: string
};

const cx = cn.bind(style);

const TextArea: FC<TextAreaProps> = ({
  children, className, setValue, value,
}) => {
  const texAreaClassName = cx('textArea', className);

  return (
    <div className={texAreaClassName}>
      <span>{children}</span>
      <textarea defaultValue={value} onChange={(e) => setValue('description', e.target.value)} />
    </div>
  );
};
export default TextArea;
