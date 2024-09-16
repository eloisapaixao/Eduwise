import React from 'react';
import Rotas from './Rotas';


import { BrowserRouter, Route, Router } from 'react-router-dom';


function App() {
 return (
   <BrowserRouter>
     <div className='App'>
       <Rotas />
     </div>
   </BrowserRouter>
 );
}


export default App;