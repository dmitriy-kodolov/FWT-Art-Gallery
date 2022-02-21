import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import style from './style.module.scss';
import CardList from '../../CardList';
import { fetchArtists } from '../../../store/slices/getArtistsSlice';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import ArtistInfo from '../../ArtistInfo';
import Loader from '../../Loader';
import Slider from '../../Slider';

const cx = cn.bind(style);

const Artist: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    theme: { isDarkTheme },
    artists: { artists, error, loading },
  } = useAppSelector((state) => state);
  const { id } = useParams();
  const [isOpenSlider, setIsOpenSlider] = useState(false);
  const [curentIdPainting, setCurentIdPainting] = useState(0);
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

  const openHandler = (idPainting: number) => {
    setIsOpenSlider(true);
    setCurentIdPainting(idPainting);
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
      {
        isOpenSlider
        && (
        <Slider
          paintings={typeof id === 'string' ? artists[+id - 1].paintings : artists[0].paintings} // здесь надо будет придумать как сделать правильно
          closeHandler={setIsOpenSlider}
          curentIdPainting={curentIdPainting - 1}
          setCurentIdPainting={setCurentIdPainting}
          isDarkTheme={isDarkTheme}
        />
        )
      }
      <CardList
        isDarkTheme={isDarkTheme}
        info={typeof id === 'string' ? artists[+id - 1].paintings : artists[0].paintings}
        clickHandler={openHandler}
      />
    </div>
  );
};

export default Artist;
