import React from 'react';
import { Link } from 'react-router-dom';
import s from './DogCard.module.css';

export const DogCard = ({ id, name, image, temperament, weight }) => {
  const detail = `/dogs/${id}`;
  return (
    <div className={s.card}>
      <Link to={detail} className={s.link}>
        <img src={image} alt='img not found' width={'200px'} height='250px' />
        <h3>{name}</h3>
        <h5>Temperamento: {temperament}</h5>
        <h5 className={s.peso}>Peso: {weight} kg</h5>
      </Link>
    </div>
  );
};