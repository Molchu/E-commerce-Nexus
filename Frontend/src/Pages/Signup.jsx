import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './CSS/Signup.css';
import axios from 'axios';

const Signup = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [id, setId] = useState('');
  const [fecha_nacimiento, setFnacimiento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [errorname, setErrorname] = useState('');
  const [errorlname, setErrorlname] = useState('');
  const [errormail, setErrormail] = useState('');
  const [errortel, setErrortel] = useState('');
  const [errorid, setErrorid] = useState('');
  const [errorf, setErrorf] = useState('');
  const [errorpass, setErrorpass] = useState('');
  const [errorcheck, setErrorcheck] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [mostrarTerminos, setMostrarTerminos] = useState(false);
  const hasUpperCase = /[A-Z]/.test(contrasena);
  const hasLowerCase = /[a-z]/.test(contrasena);
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(contrasena);

  const handleAceptaTerminosChange = (e) => {
    setAceptaTerminos(e.target.checked);
  };

  const handleMostrarTerminos = () => {
    setMostrarTerminos(true);
  };

  const handleCloseTerminos = () => {
    setMostrarTerminos(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre.length === 0) {
      setErrorname('Ingrese un nombre valido');
      return;
    }else{
      setErrorname(false)
    }if (apellido.length === 0) {
      setErrorlname('Ingrese un apellido valido');
      return;
    }else{
      setErrorlname(false);
    }if (correo.length === 0) {
      setErrormail('Ingrese su correo');
      return;
    }else{
      setErrormail(false);
    }if (!correo.endsWith('.com') && !correo.endsWith('.co')) {
      setErrormail('El correo debe terminar en ".com" o ".co"');
      return;
    }else{
      setErrormail(false);
    }if (telefono.length === 0 || telefono.length < 8) {
      setErrortel('Ingrese un número de telefono');
      return;
    }else{
      setErrortel(false);
    }if (id.length === 0) {
      setErrorid('Ingrese un número de identificación');
      return;
    }else{
      setErrorid(false)
    }if (id.length < 8) {
      setErrorid('El número de identificación debe tener al menos 8 dígitos');
      return;
    }else{
      setErrorid(false)
    }if (fecha_nacimiento.length === 0) {
      setErrorf('Seleccione su fecha de nacimiento');
      return;
    }else{
      setErrorf(false)
    }if (contrasena.length < 8) {
      setErrorpass('La contraseña debe tener al menos 8 caracteres');
      return;
    }else if(!hasLowerCase) {
      setErrorpass('La contraseña debe tener al menos una letra minuscula');
      return;
    }else if(!hasUpperCase) {
      setErrorpass('La contraseña debe tener al menos una letra mayuscula');
      return;
    }else if(!hasSymbol) {
      setErrorpass('La contraseña debe tener al menos un símbolo');
      return;
    }else{
      setErrorpass(false)
    }
    if (!aceptaTerminos) {
      setErrorcheck('Debe aceptar los términos y condiciones para continuar');
      return;
    }
    setError('');
    try {
      const response = await axios.post('/signup', { nombre, apellido, correo, telefono, id, fecha_nacimiento, contrasena});
      console.log(response.data); // Aquí puedes manejar la respuesta del backend si es necesario
      window.location.replace('/');
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'correo ya registrado') {
        setError('Ya existe una cuenta registrada con el correo ingresado');
      }
      console.error('Error al enviar datos al servidor:', error);
    }
  };
  return (
    <div className='signup'>
      <form className="signup-container" onSubmit={handleSubmit}>
        <h1>Registrarse</h1>
        <div className="signup-fields">
          <p>Nombre{errorname && <div className="error-message">{errorname}</div>}</p>
          <input type="text" placeholder='Tu nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          <p>Apellido{errorlname && <div className="error-message">{errorlname}</div>}</p>
          <input type="text" placeholder='Tu apellido' value={apellido} onChange={(e) => setApellido(e.target.value)}/>
          <p>Correo{errormail && <div className="error-message">{errormail}</div>}</p>
          <input type="email" placeholder='ejemplo@email.com' value={correo} onChange={(e) => setCorreo(e.target.value)}/>
          <p>Teléfono{errortel && <div className="error-message">{errortel}</div>}</p>
          <input type="tel" placeholder='3123342312' value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
          <p>Identificación{errorid && <div className="error-message">{errorid}</div>}</p>
          <input type="integer" placeholder='1085344440' value={id} onChange={(e) => setId(e.target.value)}/>
          <p>Fecha de nacimiento{errorf && <div className="error-message">{errorf}</div>}</p>
          <input type="date" title='Fecha' value={fecha_nacimiento} onChange={(e) => setFnacimiento(e.target.value)}/>
          <p>Contraseña{errorpass && <div className="error-message">{errorpass}</div>}</p>
          <input type="password" placeholder='Tu contraseña' value={contrasena} onChange={(e) => setContrasena(e.target.value)}/>
          {errorcheck && <p className="error-message">{errorcheck}</p>}
        </div>
        <button type="submit">Continuar</button>
        <p className="signup-login">¿Ya tienes una cuenta? <Link to='/signin'>Inicia sesión aquí</Link></p>
        <div className="signup-agree">
          <input type="checkbox" id="terminosCheckbox" checked={aceptaTerminos} onChange={handleAceptaTerminosChange}/>
          <label htmlFor="terminosCheckbox">Acepto los términos y condiciones</label>
          <button onClick={handleMostrarTerminos}>Ver términos y condiciones</button>
        </div>
        {mostrarTerminos && (
          <div className="terminos-modal">
            <div className="terminos-contenido">
              <h2>Términos y Condiciones</h2>
              <p>Sujeto al cumplimiento de estas Condiciones de Uso y de los Términos de los Servicios, así como del pago de cualquier tarifa aplicable, Nexus o sus proveedores de contenido le otorgan una licencia limitada, no exclusiva, no transferible, no sublicenciable para acceder a los Servicios de Nexus y hacer uso personal no comercial de ellos. Esta licencia no incluye la reventa ni el uso comercial de los Servicios de Nexus ni de sus contenidos; ni cualquier tipo de recopilación o uso de las listas de productos, descripciones o precios; ningún uso derivado de los Servicios de Nexus ni de sus contenidos; ninguna descarga, copia u otro uso de información de la cuenta para el beneficio de un tercero; ni el uso de minería de datos, robots o herramientas de extracción y recopilación de datos similares. Todos los derechos que no se le conceden expresamente en estas Condiciones de Uso o en los Términos de los Servicios quedan reservados y retenidos por Nexus o sus licenciantes, proveedores, editores y titulares de derechos, u otros proveedores de contenido. No está permitida la reproducción, duplicación, copia, venta, reventa ni explotación de ningún tipo de los Servicios de Nexus, ni de ninguna parte de estos, para fines comerciales sin el consentimiento expreso por escrito de Nexus. No podrá encuadrar ni utilizar técnicas de encuadre en marcas comerciales, logotipos u otra información exclusiva (como imágenes, texto, diseño de página o formularios) de Nexus sin el consentimiento expreso por escrito. No podrá utilizar etiquetas meta (meta tags) ni "texto oculto" que contengan el nombre o marcas comerciales de Nexus sin el consentimiento expreso por escrito de Nexus. No podrá hacer uso indebido de los Servicios de Nexus. Podrá utilizar los Servicios de Nexus solo en la medida en que lo permita la ley. En caso de incumplimiento con estas Condiciones de Uso o con cualquiera de los Términos de los Servicios daremos por terminadas las licencias otorgadas por Nexus.</p>
              <button onClick={handleCloseTerminos}>Cerrar</button>
            </div>
          </div>)}
      </form>
    </div>
  );
}

export default Signup;