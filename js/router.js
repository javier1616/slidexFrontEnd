import Landing from "./views/landing.js";
import Login from "./views/user/login.js";
import Register from "./views/user/register.js";
import Presentations from "./views/presentations.js";
import JoinSession from "./views/joinSessions.js";
//luego cambiar viewer por participant
import Participant from "./views/active/viewer.js";
import Presenter from "./views/active/presenter.js";
import Account from "./views/account.js";
import About from "./views/about.js";
import recoverPassword from "./views/user/recoverPassword.js";
import postRenderPresenter from "../src/postRenderHandlers/postRenderPresenter.js";
import createPresentation from "./views/createPresentation.js";
import Home from "./views/home.js";
import EditPresentation from "./views/editPresentation.js";
import renderMetricsListView, {
  postRenderMetricsListView,
} from "./views/metrics.js";

//aca defino las rutas de mi app
const routes = {
  "/": Landing,
  "/login": Login,
  "/register": Register,
  "/about": About,
  "/help": About,
  "/presentations": Presentations,
  "/presentations/create": createPresentation,
  "/presentations/edit": EditPresentation,
  "/recoverpassword": recoverPassword,
  "/joinsession": JoinSession,
  "/account": Account,
  "/home": Home,
  "/metrics": renderMetricsListView,
};

const parseLocation = () => location.hash.slice(1).toLowerCase() || "/";

const router = async () => {
  console.log("Iniciando router.js");

  const path = parseLocation();
  var render;

  // 1-B: /presentations/edit/:id
  if (path.startsWith("/presentations/edit/")) {
    const id = Number(path.split("/")[3]);

    if (Number.isNaN(id)) {
      alert("ID de presentación no válido");
      return;
    }

    document.getElementById("app").innerHTML = await EditPresentation({ id });
    return;
  }

  if (path.startsWith("/metrics/")) {
    const id = Number(path.split("/")[2]);

    if (Number.isNaN(id)) {
      alert("ID de presentación no válido");
      return;
    }

    document.getElementById("app").innerHTML = await renderMetricsListView(id);
    await postRenderMetricsListView(id);
    return;
  }

  if (path.startsWith("/active/") && !routes[path]) {
    const access_condition = path.split("/")[2];
    const access_code = path.split("/")[3];

    console.log(`path: ${path}`);
    console.log(`access_contidion: ${access_condition}`);
    console.log(`access_code: ${access_code}`);

    render = path;

    console.log(`Conectando como ${access_condition}`);

    if (access_condition == "presenter") {
      console.log("entra a Presenter");
      document.getElementById("app").innerHTML = await Presenter();
      await postRenderPresenter();
    } else if (access_condition == "participant") {
      console.log("entra a participant");
      document.getElementById("app").innerHTML = await Participant(access_code);
    }
  } else {
    //lo vuelo por si quiere loguearse de cero, por si existe de antes
    sessionStorage.removeItem("joinSession");

    const hash = window.location.hash; //lo que la url tiene a partir del #
    // Ej: "#/login?session=236A29"

    const hashParts = hash.split("?"); // Separa "/login" y "session=236A29"

    const queryString = hashParts[1];

    if (queryString) {
      console.log("parametro detectado: ", queryString);
      sessionStorage.setItem("joinSession", queryString.split("=")[1]);

      //redirecciona a login cuando sale del if
      path = `/login`;
    }

    //toma una ruta preestablecida o Landing

    render = routes[path] || Landing;
    document.getElementById("app").innerHTML = await render();
    console.log("redireccionando a path: " + path);
  }

  window.addEventListener("hashchange", router);
  //window.addEventListener('load', router);
};

export default router;
