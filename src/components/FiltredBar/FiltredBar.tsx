import React, { FC } from 'react';
import cn from 'classnames/bind';
import Button from '../Button';
import style from './style.module.scss';
import { ReactComponent as AddIcon } from '../../assets/addArtistIcon.svg';

type FiltredBarProps = {
  isDarkTheme: boolean,
  setIsOpenArtsitEdit: () => void,
};

const cx = cn.bind(style);

const FiltredBar: FC<FiltredBarProps> = ({ isDarkTheme, setIsOpenArtsitEdit }) => {
  const addArtistClassName = cx(
    'filtredBar__addArtistBtn',
    { filtredBar__addArtistBtn_addLightTheme: !isDarkTheme },
  );

  return (
    <div className={style.filtredBar}>
      <Button
        isDarkTheme={isDarkTheme}
        isFilled
        className={addArtistClassName}
        onClick={setIsOpenArtsitEdit}
      >
        <AddIcon />
        ADD ARTIST
      </Button>
    </div>
  );
};
export default FiltredBar;
