import Navbar from '../../components/navbar.js';
import { getPresentations } from '../api.js';

export default async () => {

  const sessions = await getPresentations(1);

  console.log(sessions) 
    
    return `
      ${Navbar()}
      <div class="container">
        <h2>Home</h2>
        <p>Para que funcione el get hay que tener cargada una presentacion con id 1, tambien hay que ejecutar el servicio de presentacion, que tiene que tener habilitados los CORS</p>
        <p>Si apretan F12 y van a console ahí esta el json con lo que trae del microservicio</p>
        <a href="#/other" class="btn btn-primary">Ir a otraVista</a>
      </div>
    `;

}