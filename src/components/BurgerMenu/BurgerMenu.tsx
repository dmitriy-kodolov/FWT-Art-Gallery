import React, { FC } from 'react';
import Button from '../Button';
import style from './style.module.scss';
import { ReactComponent as ThemeIcon } from '../../assets/ThemeIcon.svg';
import { ReactComponent as Exit } from '../../assets/Exit.svg';

type BurgerMenuProps = {
  setOpenMenu: () => void,
  isDarkTheme: boolean,
  setTheme: () => void,
};

const BurgerMenu:FC<BurgerMenuProps> = ({ setOpenMenu, isDarkTheme, setTheme }) => (
  <div className={style.mobileMenu}>
    <div className={style.mobileMenu__content}>
      <Button
        customStyle={style.mobileMenu__closeBtn}
        clickHandler={setOpenMenu}
        isDarkTheme={isDarkTheme}
        Component={Exit}
      />
      <Button
        customStyle={style.mobileMenu__btn}
        clickHandler={setTheme}
        Component={ThemeIcon}
        isDarkTheme={isDarkTheme}
      />
      <Button
        customStyle={style.mobileMenu__btn}
        clickHandler={setTheme}
        text="LOG IN"
        isDarkTheme={isDarkTheme}
      />
      <Button
        customStyle={style.mobileMenu__btn}
        isFilled
        clickHandler={setTheme}
        text="SIGN UP"
        isDarkTheme={isDarkTheme}
      />
    </div>

  </div>
);

export default BurgerMenu;
