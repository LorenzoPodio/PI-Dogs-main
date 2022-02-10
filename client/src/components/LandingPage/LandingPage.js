import React from 'react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div>
      <h1>
        Toda su vida intentó ser bueno <br/>
        y es cierto que muchas veces falló. <br/>
        Después de todo, él era solo un humano, <br/>
        no era un perro como yo.
      </h1>
      <Link to={'/home'}>
        <button>Ingresar</button>
      </Link>
    </div>
  )
}