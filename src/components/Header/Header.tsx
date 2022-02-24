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
import Registration from '../Registration/Registration';
import Authorization from '../Authorization';
import { changeRegistration } from '../../store/slices/registrationSlice';
import { changeIsAuth, changeIsOpenModalAuth } from '../../store/slices/authorizationSlice';

const cx = cn.bind(style);

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const {
    theme: { isDarkTheme },
    auth: { isAuthOpen, isAuth, errorAuth },
    registration: { isRegistrationOpen, errorRegistrat },
  } = useAppSelector((state) => state);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const svgClassName = cx('header__svgBtn', { header__svgBtn_addLightTheme: !isDarkTheme });
  const headerBtnsClassName = cx('header__buttons', { header__buttons_addAuthorizate: isAuth });
  const headerClassName = cx('header', { header_addLightTheme: !isDarkTheme });
  const logoClassName = cx('header__logo', { header__logo_addLightTheme: !isDarkTheme });
  const openMobileBtn = cx('header__openMobileMenuBtn', { header__openMobileMenuBtn_addLighTheme: !isDarkTheme });

  const setOpenMenu = () => {
    setIsOpenMenu((prev: boolean) => !prev);
  };

  useEffect(() => {
    dispatch(setTheme(JSON.parse(Cookies.get('isDarkTheme') || 'true')));
  }, []);

  const setIsDarkTheme = () => {
    dispatch(changeTheme());
  };

  const setIsOpenRegistration = (flag: boolean) => {
    dispatch(changeRegistration(flag));
  };

  const setIsOpenAuth = (flag: boolean) => {
    dispatch(changeIsOpenModalAuth(flag));
  };

  const changeIsAuthorization = (flag: boolean) => {
    dispatch(changeIsAuth(flag));
  };

  if (errorAuth && errorRegistrat) {
    dispatch(changeIsAuth(false));
    alert('Не удалось');
  }

  return (
    <div className={headerClassName}>
      <Logo className={logoClassName} />
      <div className={headerBtnsClassName}>
        <Button
          aria-label="theme button"
          className={style.header__themeButton}
          onClick={setIsDarkTheme}
          isDarkTheme={isDarkTheme}
        >
          <ThemeIcon className={svgClassName} />
        </Button>
        {!isAuth && (
        <Button
          className={style.header__logInBtn}
          onClick={() => setIsOpenAuth(true)}
          isDarkTheme={isDarkTheme}
        >
          LOG IN
        </Button>
        )}
        {!isAuth && (
        <Button
          className={style.header__signInBtn}
          isFilled
          onClick={() => setIsOpenRegistration(true)}
          isDarkTheme={isDarkTheme}
        >
          SIGN UP
        </Button>
        )}
        {isAuth && (
        <Button
          className={style.header__logInBtn}
          onClick={() => dispatch(changeIsAuth(false))}
          isDarkTheme={isDarkTheme}
        >
          LOG OUT
        </Button>
        )}
      </div>
      {!isOpenMenu && (
        <Button
          className={openMobileBtn}
          onClick={setOpenMenu}
          isDarkTheme={isDarkTheme}
        >
          <Menu className={svgClassName} />
        </Button>
      )}
      {isOpenMenu && (
        <BurgerMenu
          isAuth={isAuth}
          setOpenMenu={setOpenMenu}
          setIsOpenRegistration={setIsOpenRegistration}
          setIsOpenAuth={setIsOpenAuth}
          isDarkTheme={isDarkTheme}
          setTheme={setIsDarkTheme}
          changeIsAuthorization={changeIsAuthorization}
        />
      )}
      {isAuthOpen && (
        <Authorization
          setIsOpenAuth={setIsOpenAuth}
          changeIsAuthorization={changeIsAuthorization}
          setIsOpenRegistration={setIsOpenRegistration}
        />
      )}
      {isRegistrationOpen && (
        <Registration
          setIsOpenAuth={setIsOpenAuth}
          setIsOpenRegistration={setIsOpenRegistration}
          changeIsAuthorization={changeIsAuthorization}
        />
      )}
    </div>
  );
};

export default Header;
