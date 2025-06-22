import Home from './views/home.js';
import OtraVista from './views/otraVista.js';

//aca defino las rutas de mi app
const routes = {
  '/': Home,
  '/other': OtraVista
};

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const router = async () => {

    console.log("Iniciando router.js")

    const path = parseLocation();
    var render;

    //validacion para deteccion de rutas dinamicas (se usa?)
    //if (path.startsWith('/session/') && !routes[path])
    //{
    //  const id = path.split('/')[2]; // Ej: '/project/3' -> '3'
    //  render = path
    //  document.getElementById('app').innerHTML = await Session(id);
    //}
    //else
    //{
      render = routes[path] || Home;
      document.getElementById('app').innerHTML = await render();
    //}

    console.log("redireccionando a path: " + path)
    
};

window.addEventListener('hashchange', router);
//window.addEventListener('load', router);

export default router;