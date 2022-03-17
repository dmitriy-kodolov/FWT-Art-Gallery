import React, { FC } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as BackIcon } from '../../assets/backIcon.svg';
import { ReactComponent as EditIcon } from '../../assets/editIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg';
import style from './style.module.scss';
import Button from '../Button';
import { AuthArtist } from '../../types/types';
import Accardeon from '../Accardeon';
import PlugPhoto from '../PlugPhoto';

type ArtistInfoProps = {
  isDarkTheme: boolean,
  backToMainHandler: () => void,
  deleteArtistHandler: () => void,
  editArtistHandler: () => void,
  artistInfo: AuthArtist,
};

const cx = cn.bind(style);

const baseUrl = process.env.REACT_APP_BASE_URL_DEV;

const ArtistInfo: FC<ArtistInfoProps> = ({
  backToMainHandler,
  deleteArtistHandler,
  editArtistHandler,
  isDarkTheme,
  artistInfo: {
    avatar, description, genres, name, yearsOfLife, country,
  },
}) => {
  const artistInfoClassName = cx('artistInfo', { artistInfo_addLightTheme: !isDarkTheme });
  const btnClassName = cx('artistInfo__btn', { artistInfo__btn_addLightTheme: !isDarkTheme });

  return (
    <div className={artistInfoClassName}>
      <div className={style.artistInfo__buttons}>
        <Button
          aria-label="back button"
          isDarkTheme={isDarkTheme}
          className={btnClassName}
          onClick={backToMainHandler}
        >
          <BackIcon />
        </Button>
        <Button
          aria-label="edit button"
          isDarkTheme={isDarkTheme}
          className={btnClassName}
          onClick={editArtistHandler}
        >
          <EditIcon />
        </Button>
        <Button
          aria-label="delete button"
          isDarkTheme={isDarkTheme}
          className={btnClassName}
          onClick={deleteArtistHandler}
        >
          <DeleteIcon />
        </Button>
      </div>
      <div className={style.artistInfo__portrait}>
        {(!avatar && (
        <PlugPhoto isDarkTheme={isDarkTheme} className={style.artistInfo__plugAvatar}>
          Profile photo have
          {' '}
          not been uploaded yet
        </PlugPhoto>
        ))
        || (
        <picture>
          <source type="image/webp" srcSet={`${baseUrl!}${avatar?.webp}`} />
          <img src={`${baseUrl}${avatar?.src}`} alt="#paintOfAuthor" />
        </picture>
        )}
      </div>
      <div className={style.artistInfo__info}>
        <span>{name}</span>
        <span>{yearsOfLife}</span>
      </div>
      <div className={style.artistInfo__descriprion}>
        <Accardeon text={description} isDarkTheme={isDarkTheme} />
        <span>{country}</span>
        <div className={style.artistInfo__genres}>
          {genres?.map((genre) => (
            <p key={genre._id} className={style.artistInfo__genre}>
              {genre.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
