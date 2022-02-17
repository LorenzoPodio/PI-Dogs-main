import React from 'react';

export const Filters = ({handleFilter}) => {
  return (
    <div>
      <label>Filtrar por Origen:</label>
      <select onChange={e => handleFilter(e)}>
        <option value={'Todos'}>Todos</option>
        <option value={'Germany'}>Germany</option>
        <option value={'Iran'}>Iran</option>
        <option value={'England'}>England</option>
        <option value={'Desconocido'}>Desconocido</option>
      </select>
    </div>
  )
}
