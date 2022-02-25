import React, { FC } from 'react';
import cn from 'classnames/bind';
import Button from '../Button';
import style from './style.module.scss';
import { ReactComponent as ThemeIcon } from '../../assets/ThemeIcon.svg';
import { ReactComponent as Exit } from '../../assets/Exit.svg';
import { useAppDispatch } from '../../hooks/redux';
import { changeIsAuth, changeIsOpenModalAuth } from '../../store/slices/authorizationSlice';
import { changeTheme } from '../../store/slices/changeThemeSlice';
import { changeRegistration } from '../../store/slices/registrationSlice';

type BurgerMenuProps = {
  setOpenMenu: () => void,
  isDarkTheme: boolean,
  isAuth: boolean,
};

const cx = cn.bind(style);

const BurgerMenu: FC<BurgerMenuProps> = ({
  setOpenMenu,
  isDarkTheme, isAuth,
}) => {
  const dispatch = useAppDispatch();
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
          onClick={() => dispatch(changeTheme())}
          isDarkTheme={isDarkTheme}
        >
          <ThemeIcon />
        </Button>
        {!isAuth && (
        <Button
          className={style.mobileMenu__btn}
          onClick={() => dispatch(changeIsOpenModalAuth(true))}
          isDarkTheme={isDarkTheme}
        >
          LOG IN
        </Button>
        )}
        {isAuth && (
        <Button
          className={style.mobileMenu__btn}
          onClick={() => dispatch(changeIsAuth(false))}
          isDarkTheme={isDarkTheme}
        >
          LOG OUT
        </Button>
        )}
        {!isAuth && (
        <Button
          className={style.mobileMenu__btn}
          isFilled
          onClick={() => dispatch(changeRegistration(true))}
          isDarkTheme={isDarkTheme}
        >
          SIGN UP
        </Button>
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
