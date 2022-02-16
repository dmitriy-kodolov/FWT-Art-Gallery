import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import Cookies from 'js-cookie';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as ThemeIcon } from '../../assets/ThemeIcon.svg';
import { ReactComponent as Menu } from '../../assets/Menu.svg';
import Button from '../Button';
import style from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeTheme, setTheme } from '../../store/slices/changeThemeSlice';
import BurgerMenu from '../BurgerMenu';

const cx = cn.bind(style);

const Header:FC = () => {
  const dispatch = useAppDispatch();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { theme: { isDarkTheme } } = useAppSelector((state) => state);
  const svgClassName = cx(
    'header__svgBtn',
    { header__svgBtn_addLightTheme: !isDarkTheme },
  );
  const headerClassName = cx(
    'header',
    { header_addLightTheme: !isDarkTheme },
  );
  const logoClassName = cx(
    'header__logo',
    { header__logo_addLightTheme: !isDarkTheme },
  );

  const setOpenMenu = () => {
    setIsOpenMenu((prev: boolean) => !prev);
  };

  useEffect(() => {
    dispatch(setTheme(JSON.parse(Cookies.get('isDarkTheme') || 'true')));
  }, []);

  const setIsDarkTheme = () => {
    dispatch(changeTheme());
  };

  return (
    <div className={headerClassName}>
      <Logo className={logoClassName} />
      <div className={style.header__buttons}>
        <Button
          aria-label="theme button"
          className={style.header__themeButton}
          onClick={setIsDarkTheme}
          isDarkTheme={isDarkTheme}
        >
          <ThemeIcon className={svgClassName} />
        </Button>
        <Button
          className={style.header__logInBtn}
          onClick={setIsDarkTheme}
          isDarkTheme={isDarkTheme}
        >
          LOG IN
        </Button>
        <Button
          className={style.header__signInBtn}
          isFilled
          onClick={setIsDarkTheme}
          isDarkTheme={isDarkTheme}
        >
          SIGN UP
        </Button>
      </div>
      {!isOpenMenu && (
        <Button
          className={style.header__openMobileMenuBtn}
          onClick={setOpenMenu}
          isDarkTheme={isDarkTheme}
        >
          <Menu className={svgClassName} />
        </Button>
      )}
      {isOpenMenu && (
        <BurgerMenu setOpenMenu={setOpenMenu} isDarkTheme={isDarkTheme} setTheme={setIsDarkTheme} />
      )}
    </div>
  );
};

export default Header;
