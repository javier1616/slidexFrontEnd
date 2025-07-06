import Navbar from '../../components/navbar_auth.js';

export default async () => {
  return `
    ${Navbar()}
    <main class="page-center-wrapper slidex-home-container slidex-gradient-bg">

      <!-- HERO -->
      <section class="slidex-section home-hero text-center">
        <div class="home-hero-content slidex-fade-in p-5">
          <h1 class="slidex-border-underline">
            <span class="slidex-text-gradient-dark slidex-text-shadow">BIENVENIDO A <span>SLIDEX</span></span>
          </h1>
          <p class="slidex-subtitle">
            ¡Comenzá ahora a crear y compartir tus presentaciones en tiempo real!
          </p>
        </div>
      </section>

      <!-- FEATURES -->
      <section class="slidex-home-features slidex-fade-in ">
        <div class="slidex-feature-card slidex-tilt slidex-float-loop">
          <i class="bi bi-easel-fill slidex-feature-icon"></i>
          <h3 class="slidex-feature-title">Crea Presentaciones</h3>
          <p class="slidex-feature-desc">
            Diseñá tus presentaciones directamente en la plataforma, sin software externo.
          </p>
        </div>

        <div class="slidex-feature-card slidex-tilt slidex-float-loop">
          <i class="bi bi-broadcast-pin slidex-feature-icon"></i>
          <h3 class="slidex-feature-title">Transmití en Vivo</h3>
          <p class="slidex-feature-desc">
            Mostrá tu presentación en tiempo real a tu audiencia, sin complicaciones.
          </p>
        </div>

        <div class="slidex-feature-card slidex-tilt slidex-float-loop">
          <i class="bi bi-chat-dots-fill slidex-feature-icon"></i>
          <h3 class="slidex-feature-title">Interacción en Tiempo Real</h3>
          <p class="slidex-feature-desc">
            Permití que tu audiencia participe con encuestas, preguntas y votaciones.
          </p>
        </div>
      </section>

      <!-- CTA FINAL -->
      <section class="slidex-section text-center slidex-fade-in p-5">
        <a href="#/login" class="slidex-cta-btn slidex-cta-strong slidex-cta-animate">Creá tu primera presentación</a>
      </section>

    </main>
  `;
};
