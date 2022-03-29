import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';
import { ReactComponent as ArrowSelect } from '../../assets/arrowSelect.svg';

const cx = cn.bind(style);

type SelectProps = {
  sortInfo: string[],
  sortHandler: (selectedSortName: string) => void
  checkedSortName?: string,
  isDarkTheme: boolean,
  className: string,
};

const Select: FC<SelectProps> = ({
  isDarkTheme, className, sortInfo, sortHandler, checkedSortName,
}) => {
  const [isOpenDropMenu, setIsOpenDropMenu] = useState(false);
  const selectClassName = cx(
    'select',
    { select_addLightTheme: !isDarkTheme },
    { select_removeBorderRadius: isOpenDropMenu },
    className,
  );
  const selectDropIconClassName = cx(
    'select__dropBtn',
    { select__dropBtn_addLigthTheme: !isDarkTheme },
    { select__dropBtn_rotateDropBtn: isOpenDropMenu },
  );
  const selectItemsClassName = cx('select__items', { select__items_addLightTheme: !isDarkTheme });

  return (
    <div
      className={selectClassName}
      onClick={() => setIsOpenDropMenu((prev) => !prev)}
    >
      {isOpenDropMenu
        && (
        <div className={selectItemsClassName} onClick={(e) => e.stopPropagation()}>
          {sortInfo.map((sortName) => (
            <label htmlFor={sortName} key={sortName}>
              {sortName}
              <input
                id={sortName}
                type="checkbox"
                checked={sortName === checkedSortName}
                onChange={() => sortHandler(sortName)}
              />
              <span />
            </label>
          ))}
        </div>
        )}
      <span>Sort by</span>
      <ArrowSelect className={selectDropIconClassName} />
    </div>
  );
};

export default Select;
