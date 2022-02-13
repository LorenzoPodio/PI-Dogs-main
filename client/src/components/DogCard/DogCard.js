import React from 'react';
import { Link } from 'react-router-dom';
import './DogCard.css';

export const DogCard = ({ id, name, image, temperament, weight }) => {
  const detail = `/dogs/${id}`; 
  return (
    <Link to={detail}>
      <div className='card'>
        <img src={image} alt='img not found' width={'200px'} height='250px' />
        <div className='container'>
          <h3>Raza: {name}</h3>
          <h5>Temperamento: {temperament}</h5>
          <h5>Peso: {weight} kg</h5>
        </div>
      </div>
    </Link>
  );
};