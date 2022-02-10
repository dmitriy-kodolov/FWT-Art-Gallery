import cn from 'classnames/bind';
import React from 'react';
import Main from './components/pages/Main';
import style from './style.module.scss';

const cx = cn.bind(style);

const App = () => {
  const appClassName = cx('app');
  //  { app__theme: !lightTheme };
  return (
    <div className={appClassName}>
      <Main />
    </div>

  );
};

export default App;
