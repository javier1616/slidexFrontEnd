import Navbar from "../../../components/navbar_auth.js";

export default async (sessionCode) => {
  return `
    ${Navbar()}

    <div class="slide-wrapper">

      <!-- Estado de sesión -->
      <div class="session-status">
        <span>Status:</span>
        <span id="sessionStatusSpan" class="text-danger fw-bold">Not Connected</span>
        <span>Session code:</span>
        <span id="sessionCodeSpan" class="text-danger fw-bold">${sessionCode ?? "-"}</span>
      </div>

      <!-- Zona principal -->
      <div class="slide-main">

        <!-- Contenedor del slide -->
        <div id="slide-container" class="slide-container">
          
        </div>

        <!-- Botón levantar mano -->
        <div class="raise-hand-zone">
          <button id="raise-hand-btn" type="button" class="not-raised sx-btn sx-btn--primary" title="Levantar mano">
            <i class="bi bi-person-raised-hand fs-3"></i>
          </button>
        </div>

      </div>

    </div>
  `;
};
