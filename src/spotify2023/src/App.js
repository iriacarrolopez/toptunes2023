import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Canciones from './components/Canciones';
import UsersComponent from './components/Perfil';
import StatsComponent from './components/Estadisticas';
import Login from './components/Login';
import Registro from './components/Registro';

function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/canciones" element={<Canciones />} />
          <Route path="/estadisticas" element={<StatsComponent />} /> 
          <Route path="/perfil" element={<UsersComponent />} />
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;