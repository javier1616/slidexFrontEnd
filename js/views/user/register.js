import Navbar from "../../../components/navbar.js";

export default () => {
  return `
    ${Navbar()}
    <div class="page-center-wrapper">
      <div class="container" style="max-width: 400px;">
        <div class="login-card slidex-scale-in" style="position: relative;">
          
          <!-- Loading overlay -->
          <div class="loading-overlay d-none"></div>
          
          <h2 class="my-4 text-center">Registrarme</h2>
          <div class="card-body">
            <form id="register-form" class="register-form" novalidate>

              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="nombre" 
                  name="nombre" 
                  minlength="4"
                  pattern="^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$"
                  placeholder="su nombre" 
                  autocomplete="username"
                  required
                >
                <div class="invalid-feedback">
                  Por favor ingresa un nombre válido.
                </div>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Correo electrónico</label>
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
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="password" 
                  name="password" 
                  minlength="8"
                  placeholder="Contraseña"
                  autocomplete="current-password" 
                  required
                >
                <div class="invalid-feedback">
                  La contraseña debe tener al menos 6 caracteres.
                </div>
              </div>

              <div class="errorDiv">
                <p class="error" id="error">
                  El email ingresado ya está en uso
                </p>
              </div>

              <button id="register-btn" type="submit" class="btn btn-primary w-100">
                Registrarme
              </button>
            </form>
          </div>
        </div>

        <dialog class="dialogCompleted" id="registerCompleted">
          <div class="completedDiv">
            <span class="dialogText">¡Registro completado!</span>
            <button class="completedBtn" id="acceptBtn">
              <span>Aceptar</span>
            </button>
          </div>
        </dialog>
      </div>
    </div>
  `;
};
