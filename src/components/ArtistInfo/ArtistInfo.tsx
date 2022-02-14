import React, { FC } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as BackIcon } from '../../assets/backIcon.svg';
import { ReactComponent as EditIcon } from '../../assets/editIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg';
import style from './style.module.scss';
import Button from '../Button';
import { Artist } from '../../types/types';

type ArtistInfoProps = {
  isDarkTheme: boolean,
  backToMainHadler: () => void,
  deleteArtistHandler: () => void,
  editArtistHandler: () => void,
  artistInfo: Artist,
};

const cx = cn.bind(style);

const ArtistInfo:FC<ArtistInfoProps> = ({
  backToMainHadler,
  deleteArtistHandler,
  editArtistHandler,
  isDarkTheme,
  artistInfo: {
    painting, birthCity, description, genres, name, yearsOfLife,
  },
}) => {
  const artistInfoClassName = cx('artistInfo', { artistInfo_addLightTheme: !isDarkTheme });
  const btnClassName = cx('artistInfo__btn', { artist__btn_addLightTheme: !isDarkTheme });

  return (
    <div className={artistInfoClassName}>
      <div className={style.artistInfo__imgContainer}>
        <div className={style.artistInfo__buttons}>
          <Button
            customStyle={btnClassName}
            Component={BackIcon}
            clickHandler={backToMainHadler}
          />
          <Button
            customStyle={btnClassName}
            Component={EditIcon}
            clickHandler={editArtistHandler}
          />
          <Button
            customStyle={btnClassName}
            Component={DeleteIcon}
            clickHandler={deleteArtistHandler}
          />
        </div>
        <div className={style.artistInfo__imgContainer}>
          <img className={style.artistInfo__portrait} src={painting} alt="portrait" />
          <div className={style.artistInfo__info}>
            <span>{name}</span>
            <span>{yearsOfLife}</span>
          </div>
        </div>
      </div>
      <div className={style.artistInfo__descriprion}>
        <span>{description}</span>
        <span>{birthCity}</span>
        <div className={style.artistInfo__genres}>
          {genres.map((genre) => <p className={style.artistInfo__genre}>{genre}</p>)}
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
