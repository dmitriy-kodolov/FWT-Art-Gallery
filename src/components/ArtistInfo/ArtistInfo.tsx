import React, { FC } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as BackIcon } from '../../assets/backIcon.svg';
import { ReactComponent as EditIcon } from '../../assets/editIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg';
import style from './style.module.scss';
import Button from '../Button';
import { Artist } from '../../types/types';
import Accardeon from '../Accardeon';

type ArtistInfoProps = {
  isDarkTheme: boolean,
  backToMainHadler: () => void,
  deleteArtistHandler: () => void,
  editArtistHandler: () => void,
  artistInfo: Artist,
};

const cx = cn.bind(style);

const ArtistInfo: FC<ArtistInfoProps> = ({
  backToMainHadler,
  deleteArtistHandler,
  editArtistHandler,
  isDarkTheme,
  artistInfo: {
    painting, birthCity, description, genres, name, yearsOfLife,
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
          onClick={backToMainHadler}
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
      <img className={style.artistInfo__portrait} src={painting} alt="portrait" />
      <div className={style.artistInfo__info}>
        <span>{name}</span>
        <span>{yearsOfLife}</span>
      </div>
      <div className={style.artistInfo__descriprion}>
        <Accardeon text={description} isDarkTheme={isDarkTheme} />
        <span>{birthCity}</span>
        <div className={style.artistInfo__genres}>
          {genres.map((genre, id) => <p key={id} className={style.artistInfo__genre}>{genre}</p>)}
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
