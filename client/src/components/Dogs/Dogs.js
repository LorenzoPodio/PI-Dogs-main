import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, filterDogsByTemperament, filterOrigin, alphabeticSort, weightSort, getAllTemps, filterFrom } from "../../redux/actions";
import { DogCard } from "../DogCard/DogCard";
import { SearchBar } from "../SearchBar/SearchBar";
import { Paginado } from "../Pagination/Pagination";
import s from './Dogs.module.css';
import video3 from '../../images/video3.mp4';
import { Link } from "react-router-dom";
import { Filters } from "../Filters/Filters";


export const Dogs = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs);
  const allTemps = useSelector(state => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage,] = useState(8);
  const indexLastDog = currentPage * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);

  console.log('currentPage', currentPage)

  const paginado = (pageNum) => {
    setCurrentPage(pageNum)
  }

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemps());
  }, [dispatch]);

  const handleFilterTemps = (e) => {
    dispatch(filterDogsByTemperament(e.target.value))
  };
  const handleFilterOrigin = (e) => {
    dispatch(filterOrigin(e.target.value))
  };
  const handleFilterFrom = (e) => {
    dispatch(filterFrom(e.target.value))
  };
  const handleAlphabeticSort = (e) => {
    dispatch(alphabeticSort(e.target.value))
  };
  const handleWeightSort = (e) => {
    dispatch(weightSort(e.target.value))
  };

  return (
    <div className={s.container}>
      <video className={s.background} muted autoPlay loop src={video3} />
      <h1>Estas son las razas de perros existentes</h1>
      <Link className={s.link + ' ' + s.linkHome} to={'/'}>Home</Link>
      <Link className={s.link + ' ' + s.linkCrear} to={'/dog/create'}>Crear Raza</Link>
      <SearchBar />
      <div>
        <div>
          <div className={s.filtro}>
            <label>Orden Alfabético:</label>
            <select className={s.select} onChange={e => handleAlphabeticSort(e)}>
              <option value={'asc'}>Ascendente</option>
              <option value={'desc'}>Descendente</option>
            </select>
          </div>
          <div className={s.filtro}>
            <label>Ordenar por peso:</label>
            <select className={s.select} onChange={e => handleWeightSort(e)}>
              <option value={'asc'}>Ascendente</option>
              <option value={'desc'}>Descendente</option>
            </select>
          </div>
          <div className={s.filtro}>
            <label>Filtrar por raza:</label>
            <select className={s.select} onChange={e => handleFilterOrigin(e)}>
              <option value={'Todos'}>Todos</option>
              <option value={'api'}>Existentes</option>
              <option value={'db'}>Creadas</option>
            </select>
          </div>
          <div className={s.filtro}>
            <label>Filtrar por temperamento:</label>
            <select className={s.select} onChange={e => handleFilterTemps(e)}>
              <option value={'Todos'}>Todos</option>
              {
                allTemps.map(t => <option key={t.id} value={t.name}>{t.name}</option>)
              }
            </select>
          </div>
          <Filters handleFilter={handleFilterFrom} />
        </div>
        <Paginado
          currentPage={currentPage}
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        <div className={s.cards_container}>
          {
            currentDogs?.map(d => (
              <DogCard
                key={d.id}
                id={d.id}
                name={d.name}
                image={d.image}
                origin={d.origin}
                temperament={d.temperament}
                weight={d.weight}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};