import React from 'react';
import './App.css';
import NavBar from './components/NavBar'

import SignIn from './components/SignIn';
import Title from './components/Title';

function App() {
  return (
    <div className="App">
<Title/>

     <SignIn />
  
      </div>
  );
}

export default App;
