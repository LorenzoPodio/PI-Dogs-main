import React from 'react';
import s from './Pagination.module.css';

export const Paginado = ({ dogsPerPage, allDogs, paginado, currentPage }) => {
  const pageNumbers = [];
  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage) - 1; i++) {
    pageNumbers.push(i + 1);
  }
  console.log('pageNumbers.length', pageNumbers.length)

  return (
    <div className={s.container}>
      <ul>
        {currentPage > 1 ? (<button onClick={() => paginado(currentPage - 1)}>{'<<'}</button>) : (<button>{'<<'}</button>)}
        {pageNumbers?.map(n => (
          <li key={n}>
            <button onClick={() => paginado(n)}>{n}</button>
          </li>
        ))}
        {currentPage !== pageNumbers.length ? (<button onClick={() => paginado(currentPage + 1)}>{'>>'}</button>) : (<button>{'>>'}</button>)}
      </ul>
    </div>
  );
};