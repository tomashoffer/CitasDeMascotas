import React, {Fragment, useState} from 'react'
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCitas}) => {
    
    // CREAR STATE PARA CITAS
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });
    
    // CREAR STATE PARA VALIDACION DEL FORMULARIO
    const [error, actualizarError] = useState(false);

    // Funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e =>{
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    // Extraer valores 
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    // Cuando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();

        // VALIDAR 
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' ||
        sintomas.trim() === ''){
            actualizarError(true);
            return;
        }    
        // ELIMINAR MENSAJE PREVIO DE ERROR
        actualizarError(false);
        // ASIGNAR UN ID
        cita.id = uuid();

        // CREAR CITA
        console.log(cita)
        crearCitas(cita);
        //REINICIAR EL FORMULARIO
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    } 

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form onSubmit={submitCita}>
                <label htmlFor="">Nombre Mascota</label>
                <input type="text" 
                name="mascota"
                className="u-full-width"
                placeholder="Nombre Mascota" 
                onChange={actualizarState}
                value={mascota}
                />
                <label htmlFor="">Nombre Dueño</label>
                <input type="text" 
                name="propietario"
                className="u-full-width"
                placeholder="Nombre Propietario" 
                onChange={actualizarState}
                value={propietario}
                />
                <label htmlFor="">Fecha</label>
                <input type="date" 
                name="fecha"
                className="u-full-width" 
                onChange={actualizarState}
                value={fecha}
                />
                <label htmlFor="">Hora</label>
                <input type="time" 
                name="hora"
                className="u-full-width" 
                onChange={actualizarState}
                value={hora}
                />
                <label htmlFor="">Sintomas</label>
                <textarea name="sintomas" className="u-full-width" onChange={actualizarState} value={sintomas}>
                </textarea>
                <button type="submit" className="u-full-width button-primary">Agragar cita</button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired,
  }
export default Formulario;