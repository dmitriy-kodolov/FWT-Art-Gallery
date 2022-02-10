import React, { FC } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as ThemeIcon } from '../../assets/ThemeIcon.svg';
import Button from '../Button';
import style from './style.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { changeTheme } from '../../store/slices/changeThemeSlice';

const cx = cn.bind(style);

const Header:FC = () => {
  const dispatch = useAppDispatch();
  // const { isDarkTheme } = useAppSelector((state) => state.changeTheme);

  const clickHandler = () => {
    dispatch(changeTheme());
  };

  const header = cx(
    'header',
    // { button_addLightTheme: !isDarkTheme },
  );

  return (
    <div className={header}>
      <Logo />
      <div className={style.header__buttons}>
        <Button
          customStyle={style.header__themeButton}
          clickHandler={clickHandler}
          Component={ThemeIcon}
        />
        <Button
          customStyle={style.header__logInBtn}
          clickHandler={clickHandler}
          text="LOG IN"
        />
        <Button
          customStyle={style.header__signInBtn}
          isFilled
          clickHandler={clickHandler}
          text="SIGN UP"
        />
      </div>
    </div>
  );
};

export default Header;
