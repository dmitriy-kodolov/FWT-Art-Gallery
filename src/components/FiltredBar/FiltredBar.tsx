import React, {
  FC, useEffect, useState,
} from 'react';
import cn from 'classnames/bind';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import style from './style.module.scss';
import { ReactComponent as AddIcon } from '../../assets/addArtistIcon.svg';
import MultiSelect from '../MultiSelect/MultiSelect';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchGenres } from '../../store/slices/genresSlice';
import Select from '../Select';
import { ControlSchema, Genre } from '../../types/types';
import Input from '../Input/Input';
import { ReactComponent as FindLogo } from '../../assets/findIcon.svg';
import useFilter from '../../hooks/useFilter';
import { fetchAuthMainPaintings } from '../../store/slices/paintingsSlice';
import useDebounce from '../../hooks/useDebounce';
import setGenresById from '../../utils/getGenresById';
import getIdGenresForRequest from '../../utils/getIdGenresForRequest';

type FiltredBarProps = {
  isDarkTheme: boolean,
  setIsOpenArtsitEdit: () => void,
};

const cx = cn.bind(style);

const mockSortName = ['Recently added', 'A—Z', 'Z—A'];

const FiltredBar: FC<FiltredBarProps> = ({ isDarkTheme, setIsOpenArtsitEdit }) => {
  const dispatch = useAppDispatch();
  const { genres: { genres } } = useAppSelector((state) => state);
  const [genresBySelelcet, setGenresBySelelcet] = useState<Genre[]>([]);
  const [sortInfo, setSortInfo] = useState('Recently added');
  const { updateParams, state } = useFilter();
  const { control, watch } = useForm<ControlSchema>({
    defaultValues: { name: state.sortBy || '' },
  });

  const debouncedSearchName = useDebounce(watch('name')!);

  useEffect(() => {
    updateParams({ sortBy: debouncedSearchName });
  }, [debouncedSearchName]);

  useEffect(() => {
    setSortInfo(state.orderBy || 'Recently added');
    dispatch(fetchAuthMainPaintings(state));
  }, [state]);

  useEffect(() => {
    setGenresBySelelcet(setGenresById(genres, state.genres));
  }, [genres]);

  useEffect(() => {
    if (!genres.length) dispatch(fetchGenres());
  }, []);

  const addArtistClassName = cx(
    'filtredBar__addArtistBtn',
    { filtredBar__addArtistBtn_addLightTheme: !isDarkTheme },
  );
  const inputClassName = cx(
    'filtredBar__input',
    { filtredBar__input_addLightTheme: !isDarkTheme },
  );

  // TODO надо поработать с запросами всех данных чтобы не повторялись
  // TODO слишком много ререндеров, надо оптимизровать

  const addGenresHandler = (selectedGenre: Genre) => {
    setGenresBySelelcet((prev) => {
      if (prev.find((genre) => genre.name === selectedGenre.name)) return prev;
      updateParams({ genres: getIdGenresForRequest(genres, [...prev, selectedGenre]) });

      return [...prev, selectedGenre];
    });
  };

  const removeGenresHandler = (selectedGenre: Genre) => {
    setGenresBySelelcet((prev) => {
      const result = prev.filter(({ name }) => name !== selectedGenre.name);
      updateParams({ genres: getIdGenresForRequest(genres, [...result]) });

      return result;
    });
  };

  return (
    <div className={style.filtredBar}>
      <Button
        isDarkTheme={isDarkTheme}
        isFilled
        className={addArtistClassName}
        onClick={setIsOpenArtsitEdit}
      >
        <AddIcon />
        ADD ARTIST
      </Button>
      <Input
        placeholder="Name"
        isDarkTheme={isDarkTheme}
        control={control}
        className={inputClassName}
        name="name"
      >
        <FindLogo />
      </Input>
      <MultiSelect
        isMainPage
        selectedGenres={genresBySelelcet}
        className={style.filtredBar__multiSelect}
        isDarkTheme={isDarkTheme}
        removeGenresHandler={removeGenresHandler}
        addGenresHandler={addGenresHandler}
        selectInfo={genres}
      >
        Genres
      </MultiSelect>
      <Select
        sortInfo={mockSortName}
        checkedSortName={sortInfo}
        sortHandler={updateParams}
        className={style.filtredBar__select}
        isDarkTheme={isDarkTheme}
      />
    </div>
  );
};

export default FiltredBar;
