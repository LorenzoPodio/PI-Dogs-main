import React from 'react';
import s from './Filters.module.css'

export const Filters = ({ handleAlphabeticSort, handleWeightSort, handleFilterOrigin, handleFilterTemps, allTemps }) => {
  return (
    <div className={s.container}>
      <div className={s.sort}>
        <h2>Orden</h2>
        <div className={s.sorter}>
          <label>Alfabético:</label>
          <select className={s.select} onChange={e => handleAlphabeticSort(e)}>
            <option value={'asc'}>Ascendente</option>
            <option value={'desc'}>Descendente</option>
          </select>
        </div>
        <div className={s.sorter}>
          <label>Por Peso: &nbsp;</label>
          <select className={s.select} onChange={e => handleWeightSort(e)}>
            <option value={'asc'}>Ascendente</option>
            <option value={'desc'}>Descendente</option>
          </select>
        </div>
      </div>
      <div className={s.filter}>
        <h2>Filtro</h2>
        <div className={s.filterer}>
          <label>Por Raza: &nbsp;</label>
          <select className={s.select} onChange={e => handleFilterOrigin(e)}>
            <option value={'Todos'}>Todos</option>
            <option value={'api'}>Existentes</option>
            <option value={'db'}>Creadas</option>
          </select>
        </div>
        <div className={s.filterer}>
          <label>Por Temperamento:</label>
          <select className={s.select} onChange={e => handleFilterTemps(e)}>
            <option value={'Todos'}>Todos</option>
            {
              allTemps.map(t => <option key={t.id} value={t.name}>{t.name}</option>)
            }
          </select>
        </div>
      </div>
    </div>
  )
}
