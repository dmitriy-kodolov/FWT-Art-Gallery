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
  const paginationClassName = cx('pagination', { pagination_addLightTheme: !isDarkTheme });
  const firstPageStyle = cx('pagination__firstPage', { pagination__firstPage_addDisabled: pageNumber === 1 });
  const lastPageStyle = cx('pagination__lastPage', { pagination__lastPage_addDisabled: pageNumber === 3 });
  const nextPageStyle = cx('pagination__nextPage', { pagination__nextPage_addDisabled: pageNumber === 3 });
  const prevPageStyle = cx('pagination__prevPage', { pagination__prevPage_addDisabled: pageNumber === 1 });
  const pageStyle = cx(
    'pagination__page',
  );
  const curentPageStyle = cx('pagination__curentPage', { pagination__curentPage_addLightTheme: !isDarkTheme });
  const totalPagesCount = Math.ceil(totalCount / perPage);
  dispatch(setAllPagesCount(totalPagesCount <= 3 ? 3 : totalPagesCount));

  useEffect(() => {
    dispatch(setPerPage(document.documentElement.scrollWidth));
  }, [pageNumber]);

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
