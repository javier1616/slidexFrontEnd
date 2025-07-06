import Navbar from "../../../components/navbar.js";

export default () => {
  return `
    ${Navbar()}
    <div class="page-center-wrapper">
      <div class="container" style="max-width: 400px;">
        <div class="login-card slidex-scale-in">
          <h2 class="my-4 text-center">Recuperar contraseña</h2>
          <div class="card-body">
            <form id="recover-form" class="recover-form" novalidate>
              <div class="mb-3">
                <label for="email" class="form-label">Ingrese su correo electrónico</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  name="email" 
                  placeholder="ejemplo@correo.com" 
                  autocomplete="email"
                  required
                >
                <div class="invalid-feedback">
                  Por favor ingresa un correo válido.
                </div>
                <p class="legend small-link mt-2">
                  Se enviará una nueva contraseña al correo ingresado.
                </p>
              </div>

              <div class="errorDiv">
                <p class="error" id="error">
                  No existe cuenta asociada a ese email
                </p>
              </div>

              <button id="recoverBtn" type="submit" class="btn btn-primary w-100" id="login-btn">
                Enviar
              </button>

              <div id="loader" class="text-center mt-4" style="display: none;">
                <div class="spinner-border" role="status" style="color: var(--naranja);">
                  <span class="visually-hidden">Cargando...</span>
                </div>
                <div class="mt-2" style="color: var(--naranja); font-weight: 500;">
                  Aguarde un momento...
                </div>
              </div>
            </form>
          </div>
        </div>

        <dialog class="dialogCompleted" id="recoveryCompleted">
          <div class="completedDiv">
            <span class="dialogText">¡Mail enviado!</span>
            <button class="completedBtn" id="sendBttn">
              Volver al login
            </button>
          </div>
        </dialog>
      </div>
    </div>
  `;
};
