import './App.css';
import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './components/LandingPage/LandingPage';
import { Dogs } from './components/Dogs/Dogs';
import { CreateDog } from './components/CreateDog/CreateDog';
import { DogDetail } from './components/DogDetail/DogDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home'element={<Dogs/>}/>
        <Route path='/dog/create'element={<CreateDog/>}/>
        <Route path='/dogs/:id' element={<DogDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
