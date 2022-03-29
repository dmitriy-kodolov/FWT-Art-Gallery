import React, { useEffect } from 'react';
import cn from 'classnames/bind';
import style from './style.module.scss';
import { ReactComponent as FirstPage } from '../../assets/firstPage.svg';
import { ReactComponent as PrevPage } from '../../assets/prevPage.svg';
import { ReactComponent as NextPage } from '../../assets/nextPage.svg';
import { ReactComponent as LastPage } from '../../assets/lastPage.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  decrementPage, incrementPage, setAllPagesCount, setCurentPage, setLastPage,
  setPerPage, setStartPage,
} from '../../store/slices/paintingsSlice';
import createPages from '../../utils/createPages';

const cx = cn.bind(style);

const Pagination: import('react').FC = () => {
  const {
    theme: { isDarkTheme },
    paintings: { meta: { totalCount, pageNumber, perPage } },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPerPage(document.documentElement.scrollWidth));
  }, [pageNumber]);

  const paginationClassName = cx('pagination', { pagination_addLightTheme: !isDarkTheme });
  const firstPageStyle = cx(
    'pagination__firstPage',
    { pagination__firstPage_addDisabled: pageNumber === 1 },
    { pagination__firstPage_addLightDisabled: pageNumber === 1 && !isDarkTheme },
  );
  const lastPageStyle = cx(
    'pagination__lastPage',
    { pagination__lastPage_addDisabled: pageNumber === 3 },
    { pagination__lastPage_addLightDisabled: pageNumber === 3 && !isDarkTheme },
  );
  const nextPageStyle = cx(
    'pagination__nextPage',
    { pagination__nextPage_addDisabled: pageNumber === 3 },
    { pagination__nextPage_addLightDisabled: pageNumber === 3 && !isDarkTheme },
  );
  const prevPageStyle = cx(
    'pagination__prevPage',
    { pagination__prevPage_addDisabled: pageNumber === 1 },
    { pagination__prevPage_addLightDisabled: pageNumber === 1 && !isDarkTheme },
  );
  const pageStyle = cx('pagination__page');
  const curentPageStyle = cx('pagination__curentPage', { pagination__curentPage_addLightTheme: !isDarkTheme });

  dispatch(setAllPagesCount(Math.ceil(totalCount / perPage) <= 3
    ? 3
    : Math.ceil(totalCount / perPage)));

  return (
    <div className={paginationClassName}>
      <div className={firstPageStyle} onClick={() => dispatch(setStartPage())}>
        <FirstPage />
      </div>
      <div className={prevPageStyle} onClick={() => dispatch(decrementPage())}>
        <PrevPage />
      </div>
      {createPages(Math.ceil(totalCount / perPage), pageNumber).map((page, id) => (
        <div
          key={id}
          className={page === pageNumber ? curentPageStyle : pageStyle}
          onClick={() => dispatch(setCurentPage(page))}
        >
          {page}
        </div>
      )) }
      <div className={nextPageStyle} onClick={() => dispatch(incrementPage())}>
        <NextPage />
      </div>
      <div className={lastPageStyle} onClick={() => dispatch(setLastPage())}>
        <LastPage />
      </div>
    </div>
  );
};

export default Pagination;
