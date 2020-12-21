import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';

import { getActivities, getResults } from '../services/api';

const PymeForm = ({setResults, history}) => {
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);

  /* Cargamos las actividades al inicio (mount) */
  useEffect(() => {
    const fetchActivities = async () => {
      const activitiesList = await getActivities();
      setActivities(activitiesList.sort((a,b) => a.description.localeCompare(b.description)));
    };

    fetchActivities();    
  }, []);

  return(
    <Formik
      initialValues={{ nif: '', sector: '' }}
      validate={values => {
        const errors = {};

        if (!values.nif) {
          errors.nif = 'Por favor, rellena este campo.';
        } else if (!/^[A|B][0-9]{8}$/i.test(values.nif)) {
          errors.nif = 'Lo sentimos, el NIF introducido no coincide con el formato de un NIF de empresa en España.';
        }

        if (!values.sector) {
          errors.sector = 'Por favor, rellena este campo.';
        } else if (!activities.map(a => a.description).includes(values.sector)) {
          errors.sector = 'Por favor, elige un elemento de la lista.';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const fetchResults = async () => {
          const sectorCode = activities.find(a => a.description === values.sector).code;
          const resultsList = await getResults(values.nif, sectorCode);
          setResults(resultsList);
          setSubmitting(false);
          history.push('/resultados');
        };
    
        fetchResults();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => (
        <div className="pymeForm-wrapper">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nif"
              placeholder="NIF"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nif}
            />
            <span className="errorFormMsg">{errors.nif && touched.nif && errors.nif}</span>
            
            <input
              type="text"
              name="sector"
              placeholder="SECTOR DE ACTIVIDAD"
              autoComplete="off"
              onChange={handleChange}
              onBlur={e => {handleBlur(e); setShowActivities(false);}}
              onFocus={e => setShowActivities(true)}
              value={values.sector}
            />
            {showActivities && 
              <ol className="activitiesList">
                {activities
                  .filter(act => act.description.toUpperCase().includes(values.sector.toUpperCase()))
                  .map((act, i) =>
                    <li key={i} onMouseDown={() => setFieldValue('sector', act.description)}>{act.description}</li>  
                )}
              </ol>
            }
            <span className="errorFormMsg">{errors.sector && touched.sector && errors.sector}</span>

            <button type="submit" disabled={isSubmitting}>
              {!isSubmitting ? "CONTINUAR" : "CARGANDO..."}
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
}

export default PymeForm;