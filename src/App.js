import React, { useState } from 'react';
import HomePage from "./components/HomePage";
import QueObtengoPage from "./components/QueObtengoPage";
import LoginPage from "./components/LoginPage";
import ResultadosPage from "./components/ResultadosPage";

import {
  Switch,
  Route,
  NavLink,
  Link
} from "react-router-dom";

import InbonisLogo from './static/img/INBONIS_option2.png';
import './static/css/App.scss';

function App(props) {
  const [results, setResults] = useState({});

  return (
    <div className="App">

      <header>
        <div className="wrapper">
          <h1><Link to="/"><span>COACH</span>PYME</Link></h1>
          <nav>
            <ul>
              <li><NavLink activeClassName="active" exact={true} to="/">INICIO</NavLink></li>
              <li><NavLink activeClassName="active" to="/que-obtengo">QUÉ OBTENGO</NavLink></li>
              <li><Link className="loginBtn" to="/iniciar-sesion">ACCEDER</Link></li>
            </ul>
          </nav>
          <button></button>
        </div>
      </header>

      <main>
        <Switch>
          <Route
            path="/resultados" 
            render={routeProps => <ResultadosPage {...props} {...routeProps} results={results} />}
          />

          <Route path="/iniciar-sesion">
            <LoginPage />
          </Route>

          <Route path="/que-obtengo">
            <QueObtengoPage />
          </Route>

          <Route
            path="/" 
            render={routeProps => <HomePage {...props} {...routeProps} setResults={setResults} />}
          />
        </Switch>
      </main>
      
      <footer>
        <div className="wrapper">
          <img alt="inbonis-logo" className="footer-logo" src={InbonisLogo}></img>
        </div>
      </footer>
    </div>
  );
}

export default App;
