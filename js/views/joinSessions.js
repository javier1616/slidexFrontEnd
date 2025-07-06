import Navbar from '../../components/navbar_auth.js';

export default () => {
  return `

    ${Navbar()}
    
    <div class="join-session-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-8">
            <div class="join-session-card">
              <div class="session-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              
              <h1 class="section-title">Unirse a Sesión</h1>
              <p class="section-subtitle">Ingresa el código de sesión para conectarte</p>
              
              <div class="input-group-modern">
                <label for="sessionCodeInput" class="form-label-modern">
                  Código de sesión
                </label>
                <input 
                  id="sessionCodeInput" 
                  class="form-control form-control-modern" 
                  placeholder="Ejemplo: ABC123"
                  autocomplete="off"
                />
              </div>
              
              <button id="join-session-button" class="btn btn-join-session">
                Conectar a la sesión
              </button>
              
              <div class="quick-actions">
                <p class="quick-actions-text">¿No tienes un código de sesión?</p>
                <a href="#/presentations" class="btn-secondary-modern">Crear nueva sesión</a>
                <a href="/help" class="btn-secondary-modern">Ayuda</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};