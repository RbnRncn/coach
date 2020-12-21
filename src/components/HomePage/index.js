import React from 'react';

import PymeForm from '../PymeForm';
import MainBanner from '../../static/img/home-banner.jpg';

import Step1Icon from '../../static/img/step1.jpg';
import Step2Icon from '../../static/img/step2.jpg';
import Step3Icon from '../../static/img/step3.jpg';


const HomePage = ({setResults, history}) => {

  return(
    <div className="home-wrapper">
      <div className="main-banner">
        <img alt="" src={MainBanner}></img>
      </div>

      <h1>Evalúa y mejora tu negocio</h1>
      <PymeForm setResults={setResults} history={history}/>

      <div className="steps-wrapper">
        <div>
          <img alt="Step 1" src={Step1Icon}></img>
          <p>Introduce el NIF y la actividad de tu negocio</p>
        </div>
        <div>
          <img alt="Step 2" src={Step2Icon}></img>
          <p>Contesta un breve cuestionario</p>
        </div>
        <div>
          <img alt="Step 3" src={Step3Icon}></img>
          <p>Consigue una evaluación y consejos de mejora</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
