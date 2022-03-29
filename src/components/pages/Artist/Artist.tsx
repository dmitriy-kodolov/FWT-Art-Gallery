import React, {
  FC, useEffect, useState, MouseEvent, useRef,
} from 'react';
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
import MyLink from '../../MyLink/MyLink';
import Card from '../../Card/Card';
import AddPaintingBlock from '../../AddPaintingBlock/AddPaintingBlock';

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
  const artistClassName = cx('artist', { artist_addLightTheme: !isDarkTheme });
  const footerInfoClassName = cx('artist__footerInfo', { artist__footerInfo_addLightTheme: !isDarkTheme });

  useEffect(() => {
    dispatch(fetchArtist(id!));
  }, []);

  const favoritePaintingHandler = (e: MouseEvent, payload: PatchFavoritePaintingRequest) => {
    e.stopPropagation();
    patchFavoritePainting(payload);
  };

  const editArtistPaintingHandler = (e: MouseEvent, payload: number) => {
    e.stopPropagation();
    setCurentIdPainting(payload);
    setIsOpenPaintingEdit(true);
  };

  const openPaintingAgreement = (e: MouseEvent, payload: number) => {
    e.stopPropagation();
    setCurentIdPainting(payload);
    setIsOpenPaintingAgreement(true);
  };

  const deleteArtistPaintingHandler = () => {
    setIsOpenSlider(false);
    dispatch(fetchDeleteArtistsPainting(
      { idArtist: artist?._id, idPainting: artist?.paintings[curentIdPainting as number]._id },
    ));
    setIsOpenPaintingAgreement(false);
  };

  const deleteArtistHandler = () => {
    dispatch(fetchDeleteArtist(artist._id));
    navigate(-1);
    setIsOpenArtistAgreement(false);
  };

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
          yearOfCreation: data!.yearOfCreation!,
          name: data!.name!,
        },
      }),
    ));
    setIsOpenPaintingEdit(false);
  };

  const openSliderHandler = (idPainting: string | number) => {
    setIsOpenSlider(true);
    setCurentIdPainting(idPainting);
  };

  if (error) <h1>Error</h1>;

  if (loading) <Loader isDarkTheme={isDarkTheme} />;

  const ref = useRef<HTMLDivElement>(null);
  const paintingEditRef = useRef<HTMLDivElement>(null);
  const paintingLoaderRef = useRef<HTMLDivElement>(null);

  return (
    <div className={artistClassName}>
      {isOpenArtsitEdit && (
        <ModalArtist
          ref={ref}
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
        ref={paintingEditRef}
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
        ref={paintingLoaderRef}
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
      <CardList isDarkTheme={isDarkTheme}>
        <AddPaintingBlock
          setIsOpenPaintingLoader={setIsOpenPaintingLoader!}
          isDarkTheme={isDarkTheme}
        />
        {artist.paintings?.map((paintingInfo, idPainting) => (
          <Card
            key={idPainting}
            idPaintingArtist={idPainting}
            artistPageInfo={paintingInfo}
            clickHandler={openSliderHandler}
            deleteArtistPaintingHandler={openPaintingAgreement}
            favoritePaintingHandler={favoritePaintingHandler}
            editArtistPaintingHandler={editArtistPaintingHandler}
          />
        ))}
      </CardList>
      {!artist?.paintings?.length && (
        <div className={footerInfoClassName}>
          <span>the paintings of this artist have not been uploaded yet.</span>
          <MyLink onClick={() => setIsOpenPaintingLoader(true)}>add them first!</MyLink>
        </div>
      )}
    </div>
  );
};

export default Artist;
