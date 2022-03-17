import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import style from './style.module.scss';
import CardList from '../../CardList';
import {
  fetchArtist, fetchDeleteArtistsPainting, fetchPatchArtistPainting,
  fetchCreateArtistPainitng, fetchDeleteArtist,
} from '../../../store/slices/artistsSlice';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import ArtistInfo from '../../ArtistInfo';
import Loader from '../../Loader';
import Slider from '../../Slider';
import { patchFavoritePainting } from '../../../utils/api/methods';
import { ControlSchema, PatchFavoritePaintingRequest } from '../../../types/types';
import ModalImage from '../../ModalImage/ModalImage';
import ModalAgreement from '../../ModalAgreement/ModalAgreement';
import ModalArtist from '../../ModalArtist/ModalArtist';

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
  const [isOpenPaintingAgreement, setIsOpenPaintingAgreement] = useState(false);
  const [isOpenPaintingEdit, setIsOpenPaintingEdit] = useState(false);
  const [isOpenArtsitEdit, setIsOpenArtsitEdit] = useState(false);
  const [isOpenArtistAgreement, setIsOpenArtistAgreement] = useState(false);

  const favoritePaintingHandler = (payload: PatchFavoritePaintingRequest) => {
    patchFavoritePainting(payload);
  };

  useEffect(() => {
    dispatch(fetchArtist(id!));
  }, []);

  const artistClassName = cx('artist', { artist_addLightTheme: !isDarkTheme });

  const deleteArtistHandler = () => {
    dispatch(fetchDeleteArtist(artist._id));
    navigate(-1);
    setIsOpenArtistAgreement(false);
  };

  const deleteArtistPaintingHandler = () => {
    setIsOpenSlider(false);
    dispatch(fetchDeleteArtistsPainting(
      { idArtist: artist?._id, idPainting: artist?.paintings[curentIdPainting as number]._id },
    ));
    setIsOpenPaintingAgreement(false);
  };

  const openSliderHandler = (idPainting: string | number) => {
    setIsOpenSlider(true);
    setCurentIdPainting(idPainting);
  };

  const curentIdPaintingHandler = (idPainting: number) => setCurentIdPainting(idPainting);

  if (error) <h1>Error</h1>;

  if (loading) <Loader isDarkTheme={isDarkTheme} />;

  // создание и обновление артиста мб в отудльный хук
  const createPaintingHandler = (data?: ControlSchema, acceptedFiles?: File) => {
    dispatch(fetchCreateArtistPainitng(
      {
        idArtist: artist._id,
        body:
        {
          yearOfCreation: data!.yearOfCreation!.toString(),
          name: data!.name!,
          image: acceptedFiles!,
        },
      },
    ));
    setIsOpenPaintingLoader(false);
  };

  const patchPaintingHandler = (data?: ControlSchema) => {
    dispatch(fetchPatchArtistPainting(
      ({
        idArtist: artist._id,
        idPainting: artist?.paintings.find(
          (_, idPicture) => idPicture === curentIdPainting,
        )?._id as string,
        body:
        {
          yearOfCreation: data!.yearOfCreation!.toString(),
          name: data!.name!,
        },
      }),
    ));
    setIsOpenPaintingEdit(false);
  };

  return (
    <div className={artistClassName}>
      {isOpenArtsitEdit && (
        <ModalArtist
          artistInfo={artist}
          isUpdateArtstInfo
          setIsOpenArtsitEdit={() => setIsOpenArtsitEdit(false)}
        />
      )}
      {isOpenArtistAgreement
      && (
        <ModalAgreement
          deleteHandler={deleteArtistHandler}
          closeModalHandler={() => setIsOpenArtistAgreement(false)}
        >
          artist profile
        </ModalAgreement>
      )}
      {isOpenPaintingAgreement
       && (
       <ModalAgreement
         deleteHandler={deleteArtistPaintingHandler}
         closeModalHandler={() => setIsOpenPaintingAgreement(false)}
       >
         picture
       </ModalAgreement>
       )}
      {isOpenPaintingEdit && (
      <ModalImage
        submitHandler={patchPaintingHandler}
        paintingSrc={artist.paintings[+curentIdPainting!].image.src}
        setIsOpenPaintingLoader={setIsOpenPaintingEdit}
        created={artist.paintings[+curentIdPainting!]?.yearOfCreation}
        paintingName={artist.paintings[+curentIdPainting!]?.name}
      />
      )}
      {isOpenPaintingLoader
      && (
      <ModalImage
        submitHandler={createPaintingHandler}
        setIsOpenPaintingLoader={setIsOpenPaintingLoader}
      />
      )}
      <ArtistInfo
        artistInfo={artist}
        isDarkTheme={isDarkTheme}
        backToMainHandler={() => navigate(-1)}
        deleteArtistHandler={() => setIsOpenArtistAgreement(true)}
        editArtistHandler={() => setIsOpenArtsitEdit(true)}
      />
      {
        isOpenSlider
        && (
        <Slider
          deleteArtistPaintingHandler={() => setIsOpenPaintingAgreement(true)}
          paintings={artist.paintings}
          closeHandler={setIsOpenSlider}
          curentIdPainting={+curentIdPainting!}
          setCurentIdPainting={setCurentIdPainting}
          isDarkTheme={isDarkTheme}
          favoritePaintingHandler={favoritePaintingHandler}
          editArtistPaintingHandler={() => setIsOpenPaintingEdit(true)}
        />
        )
      }
      <CardList
        setIsOpenPaintingLoader={setIsOpenPaintingLoader}
        deleteArtistPaintingHandler={() => setIsOpenPaintingAgreement(true)}
        editArtistPaintingHandler={() => setIsOpenPaintingEdit(true)}
        isDarkTheme={isDarkTheme}
        favoritePaintingHandler={favoritePaintingHandler}
        artistPageInfo={artist}
        clickHandler={openSliderHandler}
        curentIdPaintingHandler={curentIdPaintingHandler}
      />
    </div>
  );
};

export default Artist;
