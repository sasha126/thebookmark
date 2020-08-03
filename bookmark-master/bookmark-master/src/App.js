import React from 'react';
import './App.css';
import Navbar from './components/navBar';
import Left from './components/left';
import Right from './components/right';
function App() {
  return (
    <div className="App">
    <Navbar />
  
    <main>
    <Left />
    <Right />
    </main>
    </div>
  );
}

export default App;
