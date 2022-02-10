import React, { FC, useState } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as ThemeIcon } from '../../assets/ThemeIcon.svg';
import { ReactComponent as Menu } from '../../assets/Menu.svg';
import Button from '../Button';
import style from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeTheme } from '../../store/slices/changeThemeSlice';
import BurgerMenu from '../BurgerMenu';

const cx = cn.bind(style);

const Header:FC = () => {
  const dispatch = useAppDispatch();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { theme: { isDarkTheme } } = useAppSelector((state) => state);
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

  const setTheme = () => {
    dispatch(changeTheme());
  };

  return (
    <div className={headerClassName}>
      <Logo className={logoClassName} />
      <div className={style.header__buttons}>
        <Button
          customStyle={style.header__themeButton}
          clickHandler={setTheme}
          Component={ThemeIcon}
          isDarkTheme={isDarkTheme}
        />
        <Button
          customStyle={style.header__logInBtn}
          clickHandler={setTheme}
          text="LOG IN"
          isDarkTheme={isDarkTheme}
        />
        <Button
          customStyle={style.header__signInBtn}
          isFilled
          clickHandler={setTheme}
          text="SIGN UP"
          isDarkTheme={isDarkTheme}
        />
      </div>
      {!isOpenMenu && (
        <Button
          customStyle={style.header__openMobileMenuBtn}
          clickHandler={setOpenMenu}
          Component={Menu}
          isDarkTheme={isDarkTheme}
        />
      )}
      {isOpenMenu && (
        <BurgerMenu setOpenMenu={setOpenMenu} isDarkTheme={isDarkTheme} setTheme={setTheme} />
      )}
    </div>
  );
};

export default Header;
