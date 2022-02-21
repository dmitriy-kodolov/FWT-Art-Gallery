import React, { FC } from 'react';
import cn from 'classnames/bind';
import Button from '../Button';
import style from './style.module.scss';
import { ReactComponent as ThemeIcon } from '../../assets/ThemeIcon.svg';
import { ReactComponent as Exit } from '../../assets/Exit.svg';

type BurgerMenuProps = {
  setOpenMenu: () => void,
  isDarkTheme: boolean,
  setTheme: () => void,
  setIsOpenAuth: (falg: boolean) => void,
  setIsOpenRegistration: (falg: boolean) => void,
};

const cx = cn.bind(style);

const BurgerMenu: FC<BurgerMenuProps> = ({
  setOpenMenu, setIsOpenAuth, setIsOpenRegistration,
  isDarkTheme, setTheme,
}) => {
  const themeBtnClassName = cx('mobileMenu__btn', 'mobileMenu__svgBtn', { mobileMenu__svgBtn_addLightTheme: !isDarkTheme });
  const exitBtnClassName = cx('mobileMenu__closeBtn', { mobileMenu__closeBtn_addLightTheme: !isDarkTheme });

  return (
    <div className={style.mobileMenu}>
      <div className={style.mobileMenu__content}>
        <Button
          className={exitBtnClassName}
          onClick={setOpenMenu}
          isDarkTheme={isDarkTheme}
        >
          <Exit />
        </Button>
        <Button
          className={themeBtnClassName}
          onClick={setTheme}
          isDarkTheme={isDarkTheme}
        >
          <ThemeIcon />
        </Button>
        <Button
          className={style.mobileMenu__btn}
          onClick={() => setIsOpenAuth(true)}
          isDarkTheme={isDarkTheme}
        >
          LOG IN
        </Button>
        <Button
          className={style.mobileMenu__btn}
          isFilled
          onClick={() => setIsOpenRegistration(true)}
          isDarkTheme={isDarkTheme}
        >
          SIGN UP
        </Button>
      </div>
    </div>
  );
};

export default BurgerMenu;
