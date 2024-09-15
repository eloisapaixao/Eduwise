import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import { Inicio } from './Pages/Inicio.js'
import Turmas from './Pages/Turmas.js'
import { Alunos } from './Pages/Alunos.js'
import { Login } from "./Pages/Login/Login.js";

export default function Rotas() {
   return(
       <Routes>
            <Route exact path='/' element = {<Inicio/>} />
            <Route exact path='/turmas' element = {<Turmas/>} />
            <Route exact path='/alunos' element = {<Alunos/>} />
            <Route exact path='/login' element = {<Login/>} />
       </Routes>
   )
}