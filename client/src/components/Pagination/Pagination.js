/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import s from './Pagination.module.css';

export const Paginado = ({ dogsPerPage, allDogs, paginado, currentPage }) => {
  const pageNumbers = [];
  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage) - 1; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div className={s.container}>
      {currentPage > 1 ?
        (<button className={s.previous} href='#' onClick={() => paginado(currentPage - 1)}>{'<<'}</button>) :
        (<button className={s.previous} href='#'>{'<<'}</button>)
      }
      {pageNumbers?.map(n => (
        <button className={`${currentPage === n? s.selected : s.page}`} href='#' key={n} onClick={() => paginado(n)}>{n}</button>
      ))}
      {currentPage !== pageNumbers.length ?
        (<button className={s.next} href='#' onClick={() => paginado(currentPage + 1)}>{'>>'}</button>) :
        (<button className={s.next} href='#'>{'>>'}</button>)}
    </div>
  );
};