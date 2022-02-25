import React, { FC } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';
import { ReactComponent as AddIcon } from '../../assets/addPaintingIcon.svg';
import Button from '../Button';

const cx = cn.bind(style);

type AddPaintingBlockProps = {
  isDarkTheme: boolean
};

const AddPaintingBlock: FC<AddPaintingBlockProps> = ({ isDarkTheme }) => {
  const addPaintingBlockClassName = cx('addPaintingBlock', { addPaintingBlock_addLightTheme: !isDarkTheme });

  return (
    <div className={addPaintingBlockClassName}>
      <Button className={style.addPaintingBlock__btn}>
        <AddIcon />
      </Button>
    </div>
  );
};

export default AddPaintingBlock;
