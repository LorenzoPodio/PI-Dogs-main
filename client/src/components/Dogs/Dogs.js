import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, filterDogsByTemperament, filterOrigin, alphabeticSort, weightSort, getAllTemps } from "../../redux/actions";
import { DogCard } from "../DogCard/DogCard";
import { SearchBar } from "../SearchBar/SearchBar";
import { Paginado } from "../Pagination/Pagination";
import s from './Dogs.module.css';
import video3 from '../../images/video3.mp4';
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
    <div className={s.container}>
      <video className={s.background} muted autoPlay loop src={video3} />
      <div className="header">
        <h1>Razas de Perros</h1>
      </div>
      <SearchBar />
      <div>
        <Filters
          handleFilterTemps={handleFilterTemps}
          handleFilterOrigin={handleFilterOrigin} handleWeightSort={handleWeightSort}
          handleAlphabeticSort={handleAlphabeticSort} allTemps={allTemps}
        />
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