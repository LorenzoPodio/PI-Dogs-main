import React from 'react';
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css';
import video1 from "../../images/video1.mp4";

export const LandingPage = () => {
  return (
    <div className={s.container}>
      <div className={s.titulo}>
        <h1> TODO SOBRE PERROS </h1>
      <div className={s.slogan}>
        <h1>
          "A un perro no le importa si eres rico o pobre, inteligente o tonto.
          Dale tu corazón y él te dará el suyo" 
        </h1>
      </div>
      </div>
      <div className={s.container_btn}>
        <Link to={'/home'}>
          <button>Ingresar</button>
        </Link>
      </div>
      <video className={s.background} muted autoPlay loop src={video1} />
    </div>
  )
}