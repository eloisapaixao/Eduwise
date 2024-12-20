import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import { Turmas } from './Pages/Turmas/Turmas.js'
import { Alunos } from './Pages/Alunos/Alunos.js'
import { Login } from "./Pages/Login/Login.js";
import { Cadastrar } from "./Pages/Cadastrar/Cadastrar.js";
import { Home } from "./Pages/Home/Home.js";
import { IA } from "./Pages/IA/IA.js"
import { Sobre } from "./Pages/Sobre/Sobre.js"
import { Arquivados } from "./Pages/Arquivados/Arquivados.js";

export default function Rotas() {
   return(
       <Routes>
            <Route exact path='/' element = {<Home/>} />
            <Route exact path='/sobre' element = {<Sobre/>} />
            <Route exact path='/turmas' element = {<Turmas/>} />
            <Route exact path='/alunos' element = {<Alunos/>} />
            <Route exact path='/login' element = {<Login/>} />
            <Route exact path='/cadastrar' element={<Cadastrar/>}/>
            <Route exact path='/ia' element={<IA/>} />
            <Route exact path='/arquivados' element={<Arquivados/>} />
       </Routes>
   )
}