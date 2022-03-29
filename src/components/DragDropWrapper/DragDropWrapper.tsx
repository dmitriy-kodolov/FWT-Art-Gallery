import React, {
  FC, useState, useEffect,
} from 'react'; import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';
import cn from 'classnames/bind';
import Card from '../Card';
import style from './style.module.scss';
import { StaticArtist, DragDropWrapperItemsType } from '../../types/types';

type DragDropWrapperProps = {
  isDarkTheme: boolean,
  clickHandler: (idPainting: string | number) => void,
  mainPageInfo: StaticArtist[],
};

const cx = cn.bind(style);

const DragDropWrapper: FC<DragDropWrapperProps> = ({ mainPageInfo, isDarkTheme, clickHandler }) => {
  const [items, setItems] = useState([] as DragDropWrapperItemsType[]);

  useEffect(() => {
    const newItems = mainPageInfo.map((item, id) => ({ ...item, id }));
    setItems(newItems);
  }, [mainPageInfo]);

  const onChange = (_: string, sourceIndex: number, targetIndex: number) => {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  };

  const mobile = document.documentElement.scrollWidth <= 768;
  const tablet = document.documentElement.scrollWidth <= 1024
  && document.documentElement.scrollWidth >= 768;

  const dropzoneItemStyle = cx('dropzone__item');

  // TODO баг с откртием карточки при перетаскивании

  return (
    <GridContextProvider onChange={onChange}>
      <div className={style.container}>
        <GridDropZone
          className={style.dropzone}
          id="items"
          boxesPerRow={mobile ? 2 : 3}
          rowHeight={(tablet && 210) || (mobile && 130) || 280}
        >
          {items.map((item) => (
            <GridItem
              key={item.id}
              className={dropzoneItemStyle}
            >
              <Card
                clickHandler={clickHandler}
                mainPageInfo={item}
                isDarkTheme={isDarkTheme}
              />
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
};

export default DragDropWrapper;
