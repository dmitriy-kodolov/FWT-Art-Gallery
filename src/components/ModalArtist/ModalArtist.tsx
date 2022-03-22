import React, {
  FC, useRef, useEffect, useState,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ReactComponent as ArtistPhoto } from '../../assets/defaultArtistPhoto.svg';
import style from './style.module.scss';
import { AuthArtist, ControlSchema, Genre } from '../../types/types';
import Input from '../Input/Input';
import Button from '../Button';
import TextArea from '../TextArea';
import { ReactComponent as Exit } from '../../assets/smallCloseBtn.svg';
import useOutsideClick from '../../hooks/useOutsideClick';
import MultiSelect from '../MultiSelect';
import { fetchGenres } from '../../store/slices/genresSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ModalImage from '../ModalImage';
import { fetchPatchArtistInfo } from '../../store/slices/artistsSlice';
import { fetchCreateArtist } from '../../store/slices/paintingsSlice';
import setIdGenresForRequest from '../../utils/getIdGenresForRequest';

type ModalArtistProps = {
  setIsOpenArtsitEdit: () => void,
  artistInfo?: AuthArtist,
  isUpdateArtstInfo?: boolean,
};

const schema = yup.object({
  artistName: yup.string().required('Поле обязательно'),
  genres: yup.array().required(),
}).required();

const ModalArtist: FC<ModalArtistProps> = ({
  setIsOpenArtsitEdit, isUpdateArtstInfo, artistInfo,
}) => {
  const dispatch = useAppDispatch();
  const [genresBySelelcet, setGenresBySelelcet] = useState<Genre[]>(artistInfo?.genres || []);
  const [isOpenArtistAvatarLoader, setIsOpenArtistAvatarLoader] = useState(false);
  const [avatarImage, setAvatarImage] = useState<File>();
  const { theme: { isDarkTheme }, genres: { genres } } = useAppSelector((state) => state);
  const {
    register, handleSubmit, control, formState: { errors }, setValue, clearErrors,
    setError,
  } = useForm<ControlSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      artistName: artistInfo?.name,
      location: artistInfo?.country,
      yearOfLife: artistInfo?.yearsOfLife,
      description: artistInfo?.description,
    },
  });

  const keyHandler = (e: KeyboardEvent) => ((e.key === 'Escape' && !isOpenArtistAvatarLoader) ? setIsOpenArtsitEdit() : () => {});

  useEffect(() => {
    if (!genres.length) dispatch(fetchGenres());
    document.addEventListener('keydown', keyHandler);

    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [isOpenArtistAvatarLoader]);

  useEffect(() => {
    if (genresBySelelcet.length) {
      clearErrors('genres');
      setValue('genres', genresBySelelcet);
    }
  }, [genresBySelelcet]);

  const onSubmit: SubmitHandler<ControlSchema> = (data) => {
    if (!isUpdateArtstInfo) {
      dispatch(fetchCreateArtist({
        name: data.artistName!,
        avatar: avatarImage,
        description: data.description || '',
        yearsOfLife: data.yearOfLife || '',
        location: data.location || '',
        genres: setIdGenresForRequest(genres, genresBySelelcet),
      }));
    } else {
      dispatch(fetchPatchArtistInfo({
        id: artistInfo!._id,
        body: {
          name: data.artistName!,
          avatar: avatarImage,
          description: data.description || '',
          yearsOfLife: data.yearOfLife || '',
          location: data.location || '',
          genres: setIdGenresForRequest(genres, genresBySelelcet),
        },
      }));
    }
    setIsOpenArtsitEdit();
  };

  const ref = useRef <HTMLDivElement>(null) as React.MutableRefObject<HTMLInputElement>;

  useOutsideClick(ref, () => !isOpenArtistAvatarLoader && setIsOpenArtsitEdit());

  const addGenresHandler = (selecetedGenre: Genre) => {
    setGenresBySelelcet((prev) => {
      if (prev.find((genre) => genre.name === selecetedGenre.name)) return prev;

      return [...prev, selecetedGenre];
    });
  };

  const removeGenresHandler = (selecetedGenre: Genre) => {
    setGenresBySelelcet((prev) => {
      const result = prev.filter(({ name }) => name !== selecetedGenre.name);
      if (!result.length) setError('genres', { type: 'required', message: 'Поле обязательно' });

      return result;
    });
  };

  const addAvatarHandler = (_?: ControlSchema, acceptedFiles?: File) => {
    setIsOpenArtistAvatarLoader(false);
    setAvatarImage(acceptedFiles);
  };
  // аватарка не обновляется в ответе
  // валидация снова кривая на жанры,

  return (
    <div className={style.modal}>
      {isOpenArtistAvatarLoader
      && (
      <ModalImage
        isArtistEdit
        setIsOpenPaintingLoader={() => setIsOpenArtistAvatarLoader(false)}
        submitHandler={addAvatarHandler}
      />
      )}
      <div className={style.modalArtist} ref={ref}>
        <Button
          className={style.modalArtist__closeBtn}
          onClick={setIsOpenArtsitEdit}
          isDarkTheme
        >
          <Exit />
        </Button>
        <div className={style.modalArtist__photo}>
          <ArtistPhoto />
          <Button
            className={style.modalArtist__addAvatartBtn}
            onClick={() => setIsOpenArtistAvatarLoader(true)}
          >
            Change Profile Photo
          </Button>
        </div>
        <form className={style.modalArtist__form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            control={control}
            {...register('artistName')}
            type="text"
            name="artistName"
            myPlaceholder="Name*"
            className={style.modalArtist__input}
            errorMessage={errors.artistName?.message || false}
          />
          <Input
            control={control}
            {...register('yearOfLife')}
            type="text"
            name="yearOfLife"
            myPlaceholder="Years of life"
            className={style.modalArtist__input}
            errorMessage={errors.yearOfLife?.message || false}
          />
          <Input
            control={control}
            {...register('location')}
            type="text"
            name="location"
            myPlaceholder="Location"
            className={style.modalArtist__input}
            errorMessage={errors.location?.message || false}
          />
          <TextArea
            className={style.modalArtist__textArea}
            setValue={setValue}
            value={artistInfo?.description}
          >
            Description
          </TextArea>
          <MultiSelect
            myPlaceholder="Genre*"
            isDarkTheme={isDarkTheme}
            removeGenresHandler={removeGenresHandler}
            addGenresHandler={addGenresHandler}
            selectInfo={genres}
            selectedGenres={genresBySelelcet}
            className={style.modalArtist__select}
            errorMessage={((errors.genres && !genresBySelelcet.length) && 'Поле обязательно') || false}
          />
        </form>
        <Button
          isFilled
          className={style.modalArtist__btn}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default ModalArtist;
