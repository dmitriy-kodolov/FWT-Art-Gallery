import React, { FC, useEffect } from 'react';
import cn from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import style from './style.module.scss';
import CardList from '../../CardList';
import { fetchArtists } from '../../../store/slices/getArtistsSlice';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import ArtistInfo from '../../ArtistInfo';
import Loader from '../../Loader';

const cx = cn.bind(style);

const Artist: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    theme: { isDarkTheme },
    artists: { artists, error, loading },
  } = useAppSelector((state) => state);
  const { id } = useParams();

  useEffect(() => {
    if (!artists.length) {
      dispatch(fetchArtists());
    }
  }, []);

  const artistClassName = cx('artist', { artist_addLightTheme: !isDarkTheme });

  const backToMainHadler = () => {
    navigate(-1);
  };

  const editArtistHandler = () => {
    console.log('edit'); // здесь пока затычка
  };

  const deleteArtistHandler = () => {
    console.log('delete'); // здесь пока затычка
  };

  const editPainting = () => {
    console.log('edit'); // здесь пока затычка
  };

  if (error) {
    return <h1>Error</h1>;
  }

  if (loading) {
    return (
      <Loader isDarkTheme={isDarkTheme} />
    );
  }

  return (
    <div className={artistClassName}>
      <ArtistInfo
        artistInfo={typeof id === 'string' ? artists[+id - 1] : artists[0]}
        isDarkTheme={isDarkTheme}
        backToMainHadler={backToMainHadler}
        deleteArtistHandler={deleteArtistHandler}
        editArtistHandler={editArtistHandler}
      />
      <CardList isDarkTheme={isDarkTheme} paintingInfo={artists} clickHandler={editPainting} />
    </div>
  );
};

export default Artist;
