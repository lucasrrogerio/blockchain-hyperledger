import React from 'react';
import Home from './Home';
import NavBar from './NavBar';
import ListagemPacientes from './ListagemPacientes';
import InserirPaciente from './InserirPaciente';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
  return <>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/listagem" component={ListagemPacientes} />
        <Route path="/inserir" component={InserirPaciente} />
      </Switch>
    </BrowserRouter>
  </>
}
