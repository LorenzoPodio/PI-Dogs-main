import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogByName } from '../../redux/actions';

export const NavBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  useEffect(() => {}, [name])
  

  const handleInputChange = (e) => {
    setName(e.target.value);
    console.log('name', name);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogByName(name))
    setName('');
  };

  return (
    <div>
      <Link to={'/'}>Home</Link>
      <Link to={'/dog/create'}>Crear Raza</Link>
      <form onSubmit={e=>handleSubmit(e)}>
        <input type={'text'} placeholder='Buscar Raza..' value={name} onChange={e => handleInputChange(e)}/>
        <button type='submit'>Buscar</button>
      </form>
    </div>
  );
};