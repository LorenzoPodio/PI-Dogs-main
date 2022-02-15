import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTemps, postDog } from '../../redux/actions';

const validateForm = (input) => {
  let errors = {};
  if (!input.name) return errors.name = 'Debe ingresar un nombre';
  else if(!/(^[a-zA-z])([^0-9]*)([a-z]*)$/.test(input.name)) return errors.temperament = 'El nombre no puede contener numeros';
  else if(!input.life_span) return errors.life_span = 'Debe otorgar la esperanza de vida';
  else if(!/(^[0-9])([^a-zA-z]*)( - )([^a-zA-z]*)(\d)/.test(input.life_span)) return errors.life_span = 'Formato ingresado incorrecto';
  else if(!input.temperament) return errors.temperament = 'Debe seleccionar al menos un temperamento';
    
  return errors;
};

const validateMinMax = (input) => {
  let errors = {};
  if(!input.heightMin) errors.heightMin = 'Debe ingresar un valor';
  else if(!/^\d{1,2}$/.test(input.heightMin)) errors.heightMin = 'El valor debe ser un numero';
  else if(!input.heightMax) errors.heightMax = 'Debe ingresar un valor';
  else if(!/^\d{1,2}$/.test(input.heightMax)) errors.heightMax = 'El valor debe ser un numero';
  else if(input.heightMin > input.heightMax) errors.weightMin = 'El valor debe ser mayor a la altura minima';
  else if(!input.weightMin) errors.weightMin = 'Debe ingresar un valor';
  else if(!/^\d{1,2}$/.test(input.weightMin)) errors.weightMin = 'El valor debe ser un numero';
  else if(!input.weightMax) errors.weightMax = 'Debe ingresar un valor';
  else if(!/^\d{1,2}$/.test(input.weightMax)) errors.weightMax = 'El valor debe ser un numero';
  else if(input.weightMin > input.weightMax) errors.weightMax = 'El valor debe ser mayor al peso minimo';
  return errors;
};


export const CreateDog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temps = useSelector(state => state.temperaments);
  const [formErrors, setFormErrors] = useState({});
  const [minMaxErrors, setMinMaxErrors] = useState({});
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
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setFormErrors(validateForm({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  const handleMinMax = (e) => {
    e.preventDefault();
    setMinMaxInput({
      ...minMaxInput,
      [e.target.name]: e.target.value
    })
    setMinMaxErrors(validateMinMax({
      ...minMaxInput,
      [e.target.name]: e.target.value
    }));
    let wMax;
    if(e.target.name === 'weightMax') wMax = e.target.value;
    if (!minMaxErrors) {
      setInput({
        ...input,
        height: minMaxInput.heightMin+' - '+minMaxInput.heightMax,
        weight: minMaxInput.weightMin+' - '+wMax,
      });
    }
  }

  const handleSelect = (e) => {
    e.preventDefault();
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
      <form onSubmit={e=>handleSubmit(e)} autoComplete='off'>
        <div>
          <label>Nombre:</label>
          <input type={'text'} value={input.name} name='name' placeholder='Ej: Labrador' onChange={e=>handleChange(e)}/>
          {formErrors.name && (<p>{formErrors.name}</p>)}
        </div>
        <div>
          <label>Altura minima:</label>
          <input type={'text'} value={minMaxInput.heightMin} placeholder='Ej: 20' name='heightMin' onChange={e=>handleMinMax(e)}/>
          {minMaxErrors.heightMin && (<p>{minMaxErrors.heightMin}</p>)}
        </div>
        <div>
          <label>Altura maxima:</label>
          <input type={'text'} value={minMaxInput.heightMax} placeholder='Ej: 30' name='heightMax' onChange={e=>handleMinMax(e)}/>
          {minMaxErrors.heightMax && (<p>{minMaxErrors.heightMax}</p>)}
        </div>
        <div>
          <label>Peso minimo:</label>
          <input type={'text'} value={minMaxInput.weightMin} placeholder='Ej: 25' name='weightMin' onChange={e=>handleMinMax(e)}/>
          {minMaxErrors.weightMin && (<p>{minMaxErrors.weightMin}</p>)}
        </div>
        <div>
          <label>Peso maximo:</label>
          <input type={'text'} value={minMaxInput.weightMax} placeholder='Ej: 40' name='weightMax' onChange={e=>handleMinMax(e)}/>
          {minMaxErrors.weightMax && (<p>{minMaxErrors.weightMax}</p>)}
        </div>
        <div>
          <label>Esperanza de vida:</label>
          <input type={'text'} value={input.life_span} name='life_span' placeholder='Ej: 10 - 15' onChange={e=>handleChange(e)}/>
          {formErrors.life_span && (<p>{formErrors.life_span}</p>)}
        </div>
        <span>
          {input.temperament.map( t => {
            return(
              <div key={t.id}>
                <span>{t}</span>
              </div>
            )
          })}
        </span>
        <div>
          <label>Temperamento:</label>
          <select onChange={e => handleSelect(e)}>
            {temps.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
          </select>
          {formErrors.temperament && (<p>{formErrors.temperament}</p>)}
        </div>
        <button type='submit' disabled={formErrors || minMaxErrors}>Crear Raza</button>
      </form>
    </div>
  )
}
