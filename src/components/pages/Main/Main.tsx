import React, { FC } from 'react';
import CardList from '../../CardList';
import Footer from '../../Footer';
import Header from '../../Header';
import style from './style.module.scss';

const Main:FC = () => (
  <div className={style.main}>
    <Header />
    <CardList />
    <Footer />
  </div>
);

export default Main;
