import Navbar from "../../../components/navbar.js";

export default () => {
  return `
    ${Navbar()}
    <main class="page-center-wrapper home-container d-flex justify-content-center align-items-center">
      <div class="login-card slidex-scale-in">
        
        <!-- Loader oculto inicialmente -->
        <div class="loading-overlay d-none"></div>
        
        <h2 class="text-center mb-4">Iniciar Sesión</h2>
        
        <form id="login-form" novalidate>
          <div class="mb-3">
            <label for="email" class="form-label">Correo electrónico</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="ejemplo@correo.com" 
              class="form-control"
              autocomplete="email"
              required
            />
            <div class="invalid-feedback">Por favor ingresa un correo válido.</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Contraseña" 
              class="form-control"
              autocomplete="current-password"
              required
            />
            <div class="invalid-feedback">La contraseña debe tener al menos 6 caracteres.</div>
            <p class="mt-2"><a href="#/recoverPassword" class="small-link">Olvidé mi contraseña</a></p>
          </div>

          <button id="login-btn" type="submit" class="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </form>

        <div class="text-center mt-4">
          <p>¿No tenés cuenta? <a href="#/register" class="btn btn-outline-secondary home-register-btn">Registrarme</a></p>
        </div>
      </div>
    </main>
  `;
};
