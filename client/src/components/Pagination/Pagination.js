import React from 'react';
import './Pagination.css';

export const Paginado = ({dogsPerPage, allDogs, paginado}) => {
  const pageNumbers = [];
  for (let i = 0; i <= Math.ceil(allDogs/dogsPerPage)-1; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav className='papgination'>
      <ul>
        {
          pageNumbers?.map(n => {
            return (
              <li key={n}>
                <button onClick={() => paginado(n)}>{n}</button>
              </li>
            )
          })
        }
      </ul>
    </nav>
  );
};