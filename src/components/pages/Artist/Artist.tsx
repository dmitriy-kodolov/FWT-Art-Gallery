import React, { FC, useEffect } from 'react';
import cn from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';
import CardList from '../../CardList';
import { fetchArtists } from '../../../store/slices/getArtistsSlice';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import ArtistInfo from '../../ArtistInfo';

const cx = cn.bind(style);

const Artist:FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    theme: { isDarkTheme },
    artists: { artists },
  } = useAppSelector((state) => state);
  const artistClassName = cx('artist', { artist_addLightTheme: !isDarkTheme });

  useEffect(() => {
    if (!artists.length) {
      dispatch(fetchArtists());
    }
  }, []);

  const backToMainHadler = () => {
    navigate(-1);
  };

  const editArtistHandler = () => {
    console.log('edit');
  };

  const deleteArtistHandler = () => {
    console.log('delete');
  };

  console.log();

  return (
    <div className={artistClassName}>
      <ArtistInfo
        artistInfo={artists[0]}
        isDarkTheme={isDarkTheme}
        backToMainHadler={backToMainHadler}
        deleteArtistHandler={deleteArtistHandler}
        editArtistHandler={editArtistHandler}
      />
      <CardList />
    </div>
  );
};

export default Artist;
