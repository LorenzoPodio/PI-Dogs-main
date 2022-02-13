import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, filterDogsByTemperament, filterOrigin, alphabeticSort, weightSort, getAllTemps } from "../../redux/actions";
import { DogCard } from "../DogCard/DogCard";
import { NavBar } from "../NavBar/NavBar";
import { Paginado } from "../Pagination/Pagination";
import './Dogs.css';


export const Dogs = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs);
  const allTemps = useSelector(state => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage,] = useState(8);
  const indexLastDog = currentPage * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);

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
  const handleAlphabeticSort = (e) => {
    dispatch(alphabeticSort(e.target.value))
  };
  const handleWeightSort = (e) => {
    dispatch(weightSort(e.target.value))
  };

  return (
    <>
      <NavBar />
      <h1>Listado de Razas de Perro</h1>
      <div>
        <div>
          <label>Orden Alfabético:</label>
          <select onChange={e => handleAlphabeticSort(e)}>
            <option value={'asc'}>Ascendente</option>
            <option value={'desc'}>Descendente</option>
          </select>
          <label>Ordenar por peso:</label>
          <select onChange={e => handleWeightSort(e)}>
            <option value={'asc'}>Ascendente</option>
            <option value={'desc'}>Descendente</option>
          </select>
        </div>
        <label>Filtrar por raza:</label>
        <select onChange={e => handleFilterOrigin(e)}>
          <option value={'Todos'}>Todos</option>
          <option value={'api'}>Existentes</option>
          <option value={'db'}>Creadas</option>
        </select>
        <label>Filtrar por temperamento:</label>
        <select onChange={e => handleFilterTemps(e)}>
          <option value={'Todos'}>Todos</option>
          {
            allTemps.map(t => <option key={t.id} value={t.name}>{t.name}</option>)
          }
        </select>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        <div>
          {
            currentDogs?.map(d => {
              return (
                <DogCard
                  key={d.id}
                  id={d.id}
                  name={d.name}
                  image={d.image}
                  temperament={d.temperament}
                  weight={d.weight}
                />
              )
            })
          }
        </div>
      </div>
    </>
  );
};