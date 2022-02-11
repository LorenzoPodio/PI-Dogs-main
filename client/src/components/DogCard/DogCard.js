import React from 'react';
import './DogCard.css';

export const DogCard = ({name, image, temperament, weight }) => {
  return (
    <div className='card'>
      <img src={image} alt='img not found' width={'200px'} height='250px'/>
      <div className='container'>
        <h3>Raza: {name}</h3>
        <h5>Temperamento: {temperament}</h5>
        <h5>Peso: {weight} kg</h5>
      </div>
    </div>
  );
};