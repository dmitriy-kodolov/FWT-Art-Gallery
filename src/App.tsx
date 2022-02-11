import cn from 'classnames/bind';
import React from 'react';
import Main from './components/pages/Main';
import { useAppSelector } from './hooks/redux';
import style from './style.module.scss';

const cx = cn.bind(style);

const App = () => {
  const { theme: { isDarkTheme } } = useAppSelector((state) => state);

  const appClassName = cx('app', { app_addLightTheme: !isDarkTheme });
  return (
    <div className={appClassName}>
      <Main />
    </div>

  );
};

export default App;
