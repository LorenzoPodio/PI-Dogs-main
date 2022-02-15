import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogByName } from '../../redux/actions';
import s from './SearchBar.madule.css';

export const SearchBar = () => {
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
    <div className={s.search}>
      <form onSubmit={e=>handleSubmit(e)}>
        <input type={'text'} placeholder='Buscar Raza..' value={name} onChange={e => handleInputChange(e)}/>
        <button type='submit'>Buscar</button>
      </form>
    </div>
  );
};