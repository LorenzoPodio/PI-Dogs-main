import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../redux/actions";
import { DogCard } from "../DogCard/DogCard";
import './Dogs.css';

export const Dogs = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs);

  useEffect(() => {
    dispatch(getAllDogs());
  },[dispatch]);

  return (
    <>
      <h1>Listado de Razas de Perro</h1>
      <div>
        <div>
          <label>Orden Alfabético:</label>
          <select>
            <option value={'asc'}>Ascendente</option>
            <option value={'desc'}>Descendente</option>
          </select>
          <label>Ordenar por peso:</label>
          <select>
            <option value={'asc'}>Ascendente</option>
            <option value={'desc'}>Descendente</option>
          </select>
          <label>Filtrar por raza:</label>
          <select>
            <option value={'api'}>Existentes</option>
            <option value={'db'}>Creados</option>
          </select>
          <label>Filtrar por temperamento:</label>
          <select>
            <option value={'api'}>Existentes</option>
            <option value={'db'}>Creados</option>
          </select>
        </div>
        <div>
          {
            allDogs?.map( d => {
              return (
                <>
                  <DogCard
                    name={d.name}
                    image={d.image}
                    temperament={d.temperament}
                    weight={d.weight}
                  />
                </>
              )
            })
          }
        </div>
      </div> 
    </>
  );
};