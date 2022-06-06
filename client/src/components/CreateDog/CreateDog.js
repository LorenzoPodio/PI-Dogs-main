import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTemps, postDog } from '../../redux/actions';
import s from './CreateDog.module.css';
import video2 from '../../images/video2.mp4';

const validateForm = (input) => {
  const errors = {};
  if (!input.name) errors.name = 'Debe ingresar un nombre';
  else if (!/(^[a-zA-z])([^0-9]*)([a-z]*)$/.test(input.name)) errors.name = 'El nombre no puede contener numeros';
  else if (!input.heightMin) errors.heightMin = 'Debe ingresar un valor';
  else if (!/^\d{1,2}$/.test(input.heightMin)) errors.heightMin = 'El valor debe ser un numero';
  else if (!input.heightMax) errors.heightMax = 'Debe ingresar un valor';
  else if (!/^\d{1,2}$/.test(input.heightMax)) errors.heightMax = 'El valor debe ser un numero';
  else if (input.heightMin > input.heightMax) errors.heightMax = 'El valor debe ser mayor a la altura minima';
  else if (!input.weightMin) errors.weightMin = 'Debe ingresar un valor';
  else if (!/^\d{1,2}$/.test(input.weightMin)) errors.weightMin = 'El valor debe ser un numero';
  else if (!input.weightMax) errors.weightMax = 'Debe ingresar un valor';
  else if (!/^\d{1,2}$/.test(input.weightMax)) errors.weightMax = 'El valor debe ser un numero';
  else if (input.weightMin > input.weightMax) errors.weightMax = 'El valor debe ser mayor al peso minimo';
  else if (!input.life_span) errors.life_span = 'Debe otorgar la esperanza de vida';
  else if (!/(^[0-9])([^a-zA-z]*)( - )([^a-zA-z]*)(\d)/.test(input.life_span)) errors.life_span = 'Formato ingresado incorrecto';

  return errors;
};

export const CreateDog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temps = useSelector(state => state.temperaments);
  const [formErrors, setFormErrors] = useState({
    name: 'Debe ingresar un nombre'
  });
  const [input, setInput] = useState({
    name: '',
    heightMin: '',
    heightMax: '',
    weightMin: '',
    weightMax: '',
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
    const dogToPost = {
      name: input.name,
      height: input.heightMin + ' - ' + input.heightMax,
      weight: input.weightMin + ' - ' + input.weightMax,
      life_span: input.life_span,
      temperament: input.temperament
    }
    dispatch(postDog(dogToPost))
    setInput({
      name: '',
      heightMin: '',
      heightMax: '',
      weightMin: '',
      weightMax: '',
      life_span: '',
      temperament: []
    });
    navigate('/home');
  };

  const handleDelete = e => {
    e.preventDefault();
    setInput({
      ...input,
      temperament: input.temperament.filter(t => t !== e.target.value)
    });
  }

  useEffect(() => {
    dispatch(getAllTemps())
  }, [dispatch]);

  return (
    <div>
      <video className={s.background} muted autoPlay loop src={video2} />
      <div className={s.container}>
        <h1>CREÁ TU RAZA</h1>
        <form onSubmit={e => handleSubmit(e)} autoComplete='off' className={s.form}>
          <div>
            <label>Nombre:</label>
            <input className={s.formInputs} type={'text'} value={input.name} name='name' placeholder='Ej: Labrador' onChange={e => handleChange(e)} />
            {formErrors.name && (<p>{formErrors.name}</p>)}
          </div>
          <div>
            <label>Altura minima:</label>
            <input className={s.formInputs} type={'text'} value={input.heightMin} placeholder='Ej: 20' name='heightMin' onChange={e => handleChange(e)} />
            {formErrors.heightMin && (<p>{formErrors.heightMin}</p>)}
          </div>
          <div>
            <label>Altura maxima:</label>
            <input className={s.formInputs} type={'text'} value={input.heightMax} placeholder='Ej: 30' name='heightMax' onChange={e => handleChange(e)} />
            {formErrors.heightMax && (<p>{formErrors.heightMax}</p>)}
          </div>
          <div>
            <label>Peso minimo:</label>
            <input className={s.formInputs} type={'text'} value={input.weightMin} placeholder='Ej: 25' name='weightMin' onChange={e => handleChange(e)} />
            {formErrors.weightMin && (<p>{formErrors.weightMin}</p>)}
          </div>
          <div>
            <label>Peso maximo:</label>
            <input className={s.formInputs} type={'text'} value={input.weightMax} placeholder='Ej: 40' name='weightMax' onChange={e => handleChange(e)} />
            {formErrors.weightMax && (<p>{formErrors.weightMax}</p>)}
          </div>
          <div>
            <label>Esperanza de vida:</label>
            <input className={s.formInputs} type={'text'} value={input.life_span} name='life_span' placeholder='Ej: 10 - 15' onChange={e => handleChange(e)} />
            {formErrors.life_span && (<p>{formErrors.life_span}</p>)}
          </div>
          <div className={s.selectedTemps}>
            {input.temperament.map((t,i) => {
              return (
                <div key={i}>
                  <span className={i === 0? s.firstSpan : s.tempsSpan}>{t}</span><button value={t} onClick={e => handleDelete(e)}>X</button>
                </div>
              )
            })}
          </div>
          <div>
            <label>Temperamento:</label>
            <select className={s.formInputs} onChange={e => handleSelect(e)}>
              {temps.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
            </select>
            {!!(Object.keys(formErrors).length) ? null : input.temperament.length === 0 ? (<p>Debe selecionar al menos un temperamento</p>) : null}
          </div>
          {console.log('errores', !!(Object.keys(formErrors).length))}
          <Link className={s.btnVolver} to={'/home'}><button>Volver a Home</button></Link>
          <button type='submit' className={s.submitBtn} disabled={input.temperament.length === 0 || !!formErrors.length}>
            Crear Raza
          </button>
        </form>
      </div>
    </div>
  )
}