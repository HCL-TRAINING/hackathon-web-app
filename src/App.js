import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/header/header';
import { BrowserRouter } from 'react-router-dom';
import TestRoutes from './routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/test'>
      <Header/>
        <TestRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
