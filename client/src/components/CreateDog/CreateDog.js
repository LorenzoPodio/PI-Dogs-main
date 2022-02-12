import React, { useEffect, useState, Select } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTemps, postDog } from '../../redux/actions';


export const CreateDog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temps = useSelector(state => state.temperaments);
  const [minMaxInput, setMinMaxInput] = useState({
    heightMin: '',
    heightMax: '',
    weightMin: '',
    weightMax: ''
  });
  const [input, setInput] = useState({
    name: '',
    height: '',
    weight: '',
    life_span: '',
    temperament: []
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleMinMax = (e) => {
    setMinMaxInput({
      ...minMaxInput,
      [e.target.name]: e.target.value
    })
    console.log('weightMax', minMaxInput.weightMax)
    setInput({
      ...input,
      height: minMaxInput.heightMin+' - '+minMaxInput.heightMax,
      weight: minMaxInput.weightMin+' - '+minMaxInput.weightMax,
    });
  }

  const handleSelect = (e) => {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value]
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('FORM VALUES', input);
    dispatch(postDog(input))
    setMinMaxInput({
      heightMin: '',
      heightMax: '',
      weightMin: '',
      weightMax: ''
    });
    setInput({
      name: '',
      height: '',
      weight: '',
      life_span: '',
      temperament: []
    });
    navigate('/home');
  };

  useEffect(() => {
    dispatch(getAllTemps())
  }, [dispatch]);

  return (
    <div>
      <Link to={'/home'}><button>Volver</button></Link>
      <h1>Creá una raza de perro</h1>
      <form onSubmit={e=>handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input type={'text'} value={input.name} name='name' onChange={e=>handleChange(e)}/>
        </div>
        <div>
          <label>Altura minima:</label>
          <input type={'text'} value={minMaxInput.heightMin} name='heightMin' onChange={e=>handleMinMax(e)}/>
        </div>
        <div>
          <label>Altura maxima:</label>
          <input type={'text'} value={minMaxInput.heightMax} name='heightMax' onChange={e=>handleMinMax(e)}/>
        </div>
        <div>
          <label>Peso minimo:</label>
          <input type={'text'} value={minMaxInput.weightMin} name='weightMin' onChange={e=>handleMinMax(e)}/>
        </div>
        <div>
          <label>Peso maximo:</label>
          <input type={'text'} value={minMaxInput.weightMax} name='weightMax' onChange={e=>handleMinMax(e)}/>
        </div>
        <div>
          <label>Esperanza de vida:</label>
          <input type={'text'} value={input.life_span} name='life_span' onChange={e=>handleChange(e)}/>
        </div>
        <div>
          <label>Años de vida:</label>
          <select multiple onSelect={e => handleSelect(e)}>
            {temps.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
          </select>
        </div>
        <button type='submit'>Crear Raza</button>
      </form>
    </div>
  )
}
