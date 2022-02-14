import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import CardList from '../../CardList';

const Main:FC = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('../artist');
  };

  return (
    <CardList clickHandler={clickHandler} />
  );
};

export default Main;
