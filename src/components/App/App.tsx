import cn from 'classnames/bind';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import { useAppSelector } from '../../hooks/redux';
import style from './style.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import Artist from '../pages/Artist';

const cx = cn.bind(style);

const App = () => {
  const { theme: { isDarkTheme } } = useAppSelector((state) => state);
  const appClassName = cx('app', { app_addLightTheme: !isDarkTheme });

  return (
    <div className={appClassName}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/FWT-Art-Gallery" element={<Main />} />
          <Route path="/artist/:id" element={<Artist />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
