import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import { Turmas } from './Pages/Turmas.js'
import { Alunos } from './Pages/Alunos.js'
import { Login } from "./Pages/Login/Login.js";
import { Cadastrar } from "./Pages/Cadastrar/Cadastrar.js";
import { Home } from "./Pages/Home/Home.js";

export default function Rotas() {
   return(
       <Routes>
            <Route exact path='/' element = {<Home/>} />
            <Route exact path='/turmas' element = {<Turmas/>} />
            <Route exact path='/alunos' element = {<Alunos/>} />
            <Route exact path='/login' element = {<Login/>} />
            <Route exact path='/cadastrar' element={<Cadastrar/>}/>
       </Routes>
   )
}