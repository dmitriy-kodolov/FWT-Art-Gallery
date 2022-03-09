import React, { FC, useEffect, useRef } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';
import { ReactComponent as Next } from '../../assets/nextIcon.svg';
import { ReactComponent as Prev } from '../../assets/prevIcon.svg';
import { ReactComponent as Exit } from '../../assets/smallCloseBtn.svg';
import { ReactComponent as EditIcon } from '../../assets/editIcon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg';
import { ReactComponent as Favorite } from '../../assets/favoriteIcon.svg';
import Button from '../Button/Button';
import { AuthorPaintings, PatchFavoritePaintingRequest } from '../../types/types';

const cx = cn.bind(style);

type SliderProps = {
  isDarkTheme: boolean,
  closeHandler: (flag: boolean) => void,
  paintings: AuthorPaintings[],
  curentIdPainting: number,
  setCurentIdPainting: (id: number) => void,
  favoritePaintingHandler: (payload: PatchFavoritePaintingRequest) => void,
  deleteArtistPaintingHandler: () => void,
  editArtistPaintingHandler: () => void,
};

const Slider: FC<SliderProps> = ({
  curentIdPainting, isDarkTheme, closeHandler, paintings, setCurentIdPainting,
  favoritePaintingHandler, deleteArtistPaintingHandler, editArtistPaintingHandler,
}) => {
  const circle = cx(
    'sliderContainer__circle',
    'sliderContainer__circle_addScale',
  );
  const btnClassName = cx('sliderContainer__btnChange', { sliderContainer__btnChange_addLightTheme: !isDarkTheme });
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.focus();
    }
  }, []);

  const nexpPaintingHandler = () => {
    if (curentIdPainting === paintings.length - 1) {
      return setCurentIdPainting(0);
    }
    return setCurentIdPainting(curentIdPainting + 1);
  };

  const prevPaintingHandler = () => {
    if (curentIdPainting === 0) {
      return setCurentIdPainting(paintings.length - 1);
    }
    return setCurentIdPainting(curentIdPainting - 1);
  };

  const keyHandler = (e: { key: string; }) => {
    if (e.key === 'Escape') {
      closeHandler(false);
    }
    if (e.key === 'ArrowRight') {
      nexpPaintingHandler();
    }
    if (e.key === 'ArrowLeft') {
      prevPaintingHandler();
    }
  };

  return (
    <div
      className={style.sliderContainer}
      tabIndex={0}
      onKeyDown={(e) => keyHandler(e)}
      ref={sliderRef}
    >
      <div
        className={style.sliderContainer__btn}
        onClick={prevPaintingHandler}
      >
        <Prev />
      </div>
      <Button
        className={style.sliderContainer__closeBtn}
        onClick={() => closeHandler(false)}
        isDarkTheme={isDarkTheme}
      >
        <Exit />
      </Button>
      <div className={style.sliderContainer__item}>
        <picture>
          <source type="image/webp" srcSet={paintings[curentIdPainting].image.webp} />
          <img src={paintings[curentIdPainting].image.src} alt="" />
        </picture>
        <div className={style.sliderContainer__buttons}>
          <Button
            aria-label="favorite button"
            isDarkTheme={isDarkTheme}
            className={btnClassName}
            onClick={() => {
              favoritePaintingHandler!({
                id: paintings[curentIdPainting].artist,
                body: { mainPainting: paintings[curentIdPainting]._id },
              });
            }}
          >
            <Favorite />
          </Button>
          <Button
            aria-label="edit button"
            isDarkTheme={isDarkTheme}
            className={btnClassName}
            onClick={editArtistPaintingHandler}
          >
            <EditIcon />
          </Button>
          <Button
            aria-label="delete button"
            isDarkTheme={isDarkTheme}
            className={btnClassName}
            onClick={() => deleteArtistPaintingHandler()}
          >
            <DeleteIcon />
          </Button>
        </div>
        <div className={style.sliderContainer__bottomMenu}>
          <div className={style.sliderContainer__circles}>
            {paintings.map((paintingsInfo, id) => (
              <div
                onClick={() => {
                  setCurentIdPainting(id);
                }}
                className={curentIdPainting === id
                  ? circle
                  : style.sliderContainer__circle}
                key={paintingsInfo._id}
              />
            ))}
          </div>
          <div className={style.sliderContainer__description}>
            <span className={style.sliderContainer__text}>
              {paintings[curentIdPainting].name}
            </span>
            {paintings[curentIdPainting].yearOfCreation
            && (
            <span className={style.sliderContainer__text}>
              {paintings[curentIdPainting].yearOfCreation}
            </span>
            )}
          </div>
        </div>
      </div>
      <div
        className={style.sliderContainer__btn}
        onClick={nexpPaintingHandler}
      >
        <Next />
      </div>
    </div>
  );
};

export default Slider;
