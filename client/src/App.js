import './App.css';
import { Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar';
import { LandingPage } from './components/LandingPage/LandingPage';
import { Dogs } from './components/Dogs/Dogs';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home'element={<Dogs/>}/>
      </Routes>
    </div>
  );
}

export default App;
