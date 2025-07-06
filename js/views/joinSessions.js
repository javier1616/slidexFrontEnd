import Navbar from '../../components/navbar_auth.js';

export default () => {
  return `
    ${Navbar()}
    <div class="container mt-4">

      <h2 class="mb-3">Crear una sesión ahora</h2>

      <div class="row mb-3">
        <div class="col-md-4">
          <label for="descriptionInput" class="form-label">Descripción (opcional):</label>
          <input id="descriptionInput" class="form-control" placeholder="Escriba una descripción" />
        </div>
        <div class="col-md-4">
          <label for="maxParticipantsInput" class="form-label">Máx. participantes:</label>
          <input id="maxParticipantsInput" class="form-control" placeholder="Ej: 10" />
        </div>
        <div class="col-md-4">
          <label for="presentationIdInput" class="form-label">ID de Presentación:</label>
          <input id="presentationIdInput" class="form-control" placeholder="Ej: 123" />
        </div>
      </div>

      <div class="text-center text-muted mb-2">
        <small>(Si arroja error, verificar que los campos estén completos)</small>
      </div>

      <div class="text-center mb-5">
        <button id="start-session-btn" class="btn btn-primary px-4">Iniciar Sesión</button>
      </div>


      <!--
      <h2 class="mb-3">Crear una sesión para unirse luego</h2>

      <div class="row mb-5">
        <div class="col-md-6">
          <input type="text" id="create-session-access-code" class="form-control" placeholder="Código de sesión" maxlength="6" disabled />
        </div>
        <div class="col-md-6">
          <button id="create-session-btn" class="btn btn-primary w-100">
            Generar código de sesión
          </button>
        </div>
      </div>
      -->

      
      <h2 class="mb-3">Unirse a una sesión</h2>

      <div class="row align-items-center mb-5">
        <div class="col-md-6">
          <label for="sessionCodeInput" class="form-label">Código de sesión:</label>
          <input id="sessionCodeInput" class="form-control" placeholder="Escriba el código de sesión..." />
        </div>
        <div class="col-md-6 mt-3 mt-md-0 text-md-start">
          <button id="join-session-button" class="btn btn-primary">Unirse a la sesión</button>
        </div>
      </div>

    </div>
  `;
};
