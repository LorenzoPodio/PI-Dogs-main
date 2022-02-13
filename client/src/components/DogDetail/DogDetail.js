import React, { useEffect } from 'react';
import { getAllDogs, getDogById } from '../../redux/actions';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const DogDetail = ({ match }) => {
  const { id } = useParams();
  // const id = match.params.id;
  const dispatch = useDispatch();
  const dog = useSelector(state => state.dogDetail);
  const dogs = useSelector(state => state.dogs);
  console.log('id COMPONENT', id);

  // function getId(id) {
  //   dispatch(getDogById(id))
  // }
  useEffect(() => {
    dispatch(getDogById(id))
  }, [id]);
  useEffect(() => {
    dispatch(getAllDogs())
  }, []);

  // console.log('first', first)
  console.log('dog COMPONENT', dog);


  return (
    <div>
      {

        <div>
          <h1>{dog.name}</h1>
          <img src={dog.image} alt='img not found' width={'400px'} height='450px' />
          <h2>Altura: {dog.height}</h2>
          <h2>Peso: {dog.weight}</h2>
          <h2>Esperanza de vida: {dog.life_span}</h2>
          <h2>Temperamento: {dog.temperament}</h2>
        </div>
      }
      <Link to={'/home'}>
        <button>Volver</button>
      </Link>
    </div>
  )
}
