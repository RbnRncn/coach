import React, { useEffect } from 'react';

const ResultadosPage = ({results, history}) => {

  /* Si no tenemos resultados que mostrar, redirigimos a la home */
  useEffect(() => {
    if(!results.hasOwnProperty("id")){
      history.push('/');
    }
  }, [results, history])

  return(
    <div>
      {typeof results?.id !== 'undefined' &&
        JSON.stringify(results)
      }
    </div>
  );
}

export default ResultadosPage;