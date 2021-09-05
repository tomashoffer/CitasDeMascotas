import React, {Fragment, useState, useEffect} from 'react'
import Formulario from './components/Formulario';
import Cita from './components/Cita';



function App() {

  // CITAS EN LOCALSTORAGE
  let citasEnLocalStorage = JSON.parse(localStorage.getItem('citas'));
  if(!citasEnLocalStorage){
    citasEnLocalStorage = [];
  }

  // ARREGLO DE CITAS 
  const [citas, guardarCitas] = useState(citasEnLocalStorage);

  // useEffect PARA REALIZAR CIERTAS OPERACIONES CUANDO CAMBIA EL STATE
  useEffect(()=>{
      if(citasEnLocalStorage){
        localStorage.setItem("citas", JSON.stringify(citas))
      }else{
        localStorage.setItem("citas", JSON.stringify([]))
      }
  }, [citas, citasEnLocalStorage])

  // FUNCION QUE TOME LAS CITAS ACTUALES Y AGREGUE LAS NUEVAS
  const crearCitas = cita =>{
      guardarCitas([...citas, cita]);
  }

  // FUNCION PARA ELIMINAR CITAS
  const eliminarCita = id =>{
     const nuevasCitas = citas.filter(cita => cita.id !== id);
     guardarCitas(nuevasCitas)
  }

  // Mensaje Condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

    return(
      <Fragment>
        <h1>Administrador de pacientes</h1>
        <div className="container">
          <div className="one-half column">
          <Formulario crearCitas={crearCitas}></Formulario>
          </div>
          <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita =>(
                <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}>
                 
                </Cita>
              ))}
          </div>
        </div>
      </Fragment>
  );
}



export default App;
