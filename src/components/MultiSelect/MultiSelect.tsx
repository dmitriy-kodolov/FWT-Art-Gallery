import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';
import { ReactComponent as ArrowSelect } from '../../assets/arrowSelect.svg';
import { ReactComponent as DeleteIcon } from '../../assets/deleteSelectItemIcon.svg';
import { Genre } from '../../types/types';

const cx = cn.bind(style);

type MultiSelectProps = {
  errorMessage?: string | false,
  myPlaceholder?: string,
  isDarkTheme?: boolean,
  selectInfo?: Genre[],
  selectedGenres: Genre[],
  className: string,
  addGenresHandler: (payload: Genre) => void,
  removeGenresHandler: (payload: Genre) => void,
};

const MultiSelect: FC<MultiSelectProps> = ({
  isDarkTheme, removeGenresHandler, selectedGenres,
  className, selectInfo, addGenresHandler, myPlaceholder, errorMessage,
}) => {
  const [isOpenDropMenu, setIsOpenDropMenu] = useState(false);
  const multiSelectClassName = cx(
    'multiSelect',
    className,
    { multiSelect_addLightTheme: !isDarkTheme },
    { multiSelect_removeBorderRadius: isOpenDropMenu },
    { multiSelect_addErrorStyle: errorMessage },
  );
  const selectDropIconClassName = cx(
    'multiSelect__dropBtn',
    { multiSelect__dropBtn_addLigthTheme: !isDarkTheme },
    { multiSelect__dropBtn_rotateDropBtn: isOpenDropMenu },
  );
  const selectItemsClassName = cx('multiSelect__selectItems', { multiSelect__selectItems_addLightTheme: !isDarkTheme });
  const selectItemClassName = cx('multiSelect__selectItem', { multiSelect__selectItem_addLightTheme: !isDarkTheme });

  return (
    <div className={multiSelectClassName}>
      {myPlaceholder && <span className={style.multiSelect__placeholder}>{myPlaceholder}</span>}
      <div className={style.multiSelect__selectedItems}>
        {selectedGenres.map(({ _id, name }) => (
          <div key={_id} className={style.multiSelect__selectedItem}>
            <span>{name}</span>
            <DeleteIcon onClick={() => removeGenresHandler({ _id, name })} />
          </div>
        ))}
      </div>
      {errorMessage && <span className={style.multiSelect__errorMessage}>{errorMessage}</span>}
      <ArrowSelect
        onClick={() => setIsOpenDropMenu((prev) => !prev)}
        className={selectDropIconClassName}
      />
      {isOpenDropMenu && (
      <div className={selectItemsClassName}>
        {selectInfo?.map(({ _id, name }) => (
          <div key={_id} className={selectItemClassName}>
            <input
              checked={!!selectedGenres.find((genre) => genre.name === name)}
              type="checkbox"
              onChange={() => addGenresHandler({ _id, name })}
            />
            <span>{name}</span>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default MultiSelect;
