import Navbar from "../../../components/navbar_auth.js";

export default async (sessionCode) => {
  return `
    ${Navbar()}

    <div class="slide-wrapper d-flex flex-column overflow-hidden px-3 py-2">

      <!-- Estado de sesión -->
      <div class="d-flex justify-content-center align-items-center gap-2 mb-2">
        <span>Status:</span>
        <span id="sessionStatusSpan" class="text-danger fw-bold">Not Connected</span>
        <span>Session code:</span>
        <span id="sessionCodeSpan" class="text-danger fw-bold">${sessionCode ?? "-"}</span>
      </div>

      <!-- Zona principal -->
      <div class="row flex-grow-1 g-2 m-0">

        <!-- Contenedor del slide -->
        <div id="slide-container" class="col-12 col-lg-10 d-flex flex-column h-100 overflow-hidden p-0 border rounded bg-white shadow-sm mb-2">
          
        </div>

        <!-- Botón levantar mano -->
        <div class="col-12 col-lg-2 d-flex flex-column align-items-center justify-content-start p-3">
          <button id="raise-hand-btn" type="button" class="not-raised sx-btn sx-btn--primary" title="Levantar mano">
            <i class="bi bi-person-raised-hand fs-3"></i>
          </button>
        </div>

      </div>

    </div>
  `;
};
