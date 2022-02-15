import React, { useEffect } from 'react';
import { getDogById } from '../../redux/actions';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import s from './DogDetail.module.css';
import video3 from '../../images/video3.mp4';

export const DogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dog = useSelector(state => state.dogDetail);
  console.log('id COMPONENT', id);

  useEffect(() => {
    dispatch(getDogById(id))
  }, [dispatch, id]);

  // console.log('first', first)
  console.log('dog COMPONENT', dog);


  return (
    <div className={s.container}>
      <video className={s.background} muted autoPlay loop src={video3} />
      <div>
        <h1>{dog.name}</h1>
        <img className={s.image} src={dog.image} alt='img not found'/>
        <h2>Altura: {dog.height}</h2>
        <h2>Peso: {dog.weight}</h2>
        <h2>Esperanza de vida: {dog.life_span}</h2>
        <h2>Temperamento: {dog.temperament}</h2>
      </div>
      <Link to={'/home'}>
        <button>Volver</button>
      </Link>
    </div>
  )
}
