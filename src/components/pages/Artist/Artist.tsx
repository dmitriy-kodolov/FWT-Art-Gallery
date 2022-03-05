import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import style from './style.module.scss';
import CardList from '../../CardList';
import { fetchArtist, fetchDeleteArtistsPainting } from '../../../store/slices/artistsSlice';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import ArtistInfo from '../../ArtistInfo';
import Loader from '../../Loader';
import Slider from '../../Slider';
import { patchFavoritePainting } from '../../../utils/api/methods';
import { DeleteArtistPainting, PatchFavoritePaintingRequest } from '../../../types/types';
import ModalImage from '../../ModalImage/ModalImage';

const cx = cn.bind(style);

const Artist: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    theme: { isDarkTheme },
    artists: { artist, error, loading },
  } = useAppSelector((state) => state);
  const { id } = useParams();
  const [isOpenPaintingLoader, setIsOpenPaintingLoader] = useState(false);
  const [isOpenSlider, setIsOpenSlider] = useState(false);
  const [curentIdPainting, setCurentIdPainting] = useState<string | number>();

  const favoritePaintingHandler = (payload: PatchFavoritePaintingRequest) => {
    patchFavoritePainting(payload);
  };

  useEffect(() => {
    dispatch(fetchArtist(id!));
  }, []);

  const artistClassName = cx('artist', { artist_addLightTheme: !isDarkTheme });

  const backToMainHandler = () => {
    navigate(-1);
  };

  const editArtistHandler = () => {
    console.log('edit'); // здесь пока затычка
  };

  const deleteArtistHandler = () => {
    console.log('delete'); // здесь пока затычка
  };

  const deleteArtistPaintingHandler = (body: DeleteArtistPainting) => {
    dispatch(fetchDeleteArtistsPainting(body));
  };

  const openHandler = (idPainting: string | number) => {
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
      {isOpenPaintingLoader && <ModalImage setIsOpenPaintingLoader={setIsOpenPaintingLoader} />}
      <ArtistInfo
        artistInfo={artist}
        isDarkTheme={isDarkTheme}
        backToMainHandler={backToMainHandler}
        deleteArtistHandler={deleteArtistHandler}
        editArtistHandler={editArtistHandler}
      />
      {
        isOpenSlider
        && (
        <Slider
          deleteArtistPaintingHandler={deleteArtistPaintingHandler}
          paintings={artist.paintings}
          closeHandler={setIsOpenSlider}
          curentIdPainting={+curentIdPainting!}
          setCurentIdPainting={setCurentIdPainting}
          isDarkTheme={isDarkTheme}
          favoritePaintingHandler={favoritePaintingHandler}
        />
        )
      }
      <CardList
        setIsOpenPaintingLoader={setIsOpenPaintingLoader}
        deleteArtistPaintingHandler={deleteArtistPaintingHandler}
        isDarkTheme={isDarkTheme}
        favoritePaintingHandler={favoritePaintingHandler}
        artistPageInfo={artist}
        clickHandler={openHandler}
      />
    </div>
  );
};

export default Artist;
