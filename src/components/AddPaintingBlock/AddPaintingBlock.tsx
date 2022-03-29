import React, { FC } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';
import { ReactComponent as AddIcon } from '../../assets/addPaintingIcon.svg';
import Button from '../Button';

const cx = cn.bind(style);

type AddPaintingBlockProps = {
  isDarkTheme: boolean,
  setIsOpenPaintingLoader: (flag: boolean) => void
};

const AddPaintingBlock: FC<AddPaintingBlockProps> = ({ isDarkTheme, setIsOpenPaintingLoader }) => {
  const addPaintingBlockClassName = cx('addPaintingBlock', { addPaintingBlock_addLightTheme: !isDarkTheme });

  return (
    <div className={addPaintingBlockClassName}>
      <Button onClick={() => setIsOpenPaintingLoader(true)} className={style.addPaintingBlock__btn}>
        <AddIcon />
      </Button>
    </div>
  );
};

export default AddPaintingBlock;
