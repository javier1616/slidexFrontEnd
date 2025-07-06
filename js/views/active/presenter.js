import Navbar from "../../../components/navbar_auth.js";

export default async () => {
  return `
    ${Navbar()}

    
    <!-- ***** Contenido ***** -->
    <div class="slide-wrapper d-flex flex-column overflow-hidden px-3 py-2">

      <!-- Barra de estado -->
      <div class="d-flex justify-content-center align-items-center gap-2 mb-2">
        <span>Status:</span>
        <span id="sessionStatusSpan" class="text-danger fw-bold">Not Connected</span>
        <span>Session code:</span>
        <span id="sessionCodeSpan" class="text-danger fw-bold"></span>
      </div>

      <!-- Zona principal -->
      <div class="row flex-grow-1 g-2 m-0">

        <!-- Contenedor del slide -->
        <div id="slide-container"
             class="col-12 col-lg-10 d-flex flex-column h-100 overflow-hidden p-0 border rounded bg-white shadow-sm">
          <!-- aquí inyectarás el slide dinámico -->
        </div>

        <!-- Lista de manos levantadas (opcional, quítala si no la usas) -->
        <div class="raise-hand-list-container">
          <h6 class="text-center text-primary mb-3">Manos levantadas</h6>
          <ul id="raise-hand-list" class="list-group small p-3">
            
          </ul>
        </div>

      </div>


      
      <!-- Navegación -->
      <div class="d-flex justify-content-center flex-wrap gap-3 p-3 mt-3">

        <button id="btn_first" class="btn btn-secondary d-none" disabled>
          <i class="bi bi-skip-backward-fill"></i> First
        </button>

        <button id="btn_prev" class="btn-slide-nav">
          <i class="bi bi-arrow-left-circle-fill"></i> Anterior
        </button>

        <button id="btn_goto" class="btn btn-secondary d-none" disabled>
          <i class="bi bi-box-arrow-in-right"></i> Go to
        </button>

        <input id="goToInput" class="form-control d-none" style="width:4rem" placeholder="#" disabled />

        <button id="btn_next" class="btn-slide-nav">
          Siguiente <i class="bi bi-arrow-right-circle-fill"></i>
        </button>

        <button id="btn_end_session" class="btn-slide-nav">
          <i class="bi bi-arrow-left-circle-fill"></i> CERRAR SESION
        </button>

        <button id="btn_last" class="btn btn-secondary d-none" disabled>
          Last <i class="bi bi-skip-forward-fill"></i>
        </button>

      </div>
    </div>
  `;
};
