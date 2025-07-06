import Navbar from '../../components/navbar.js';

export default async () => {
  return `
    ${Navbar()}
    <main class="page-center-wrapper slidex-home-container slidex-gradient-bg">

      <section class="slidex-section home-hero text-center">
        <div class="home-hero-content slidex-fade-in p-5 ">
          <h1 class="slidex-border-underline slidex-text-shadow"><span class="slidex-text-gradient-dark">BIENVENIDO A <span class="slidex-text-gradient display-3">SlideX</span></span></h1>
          <p class="slidex-subtitle">
            Tu plataforma para presentaciones en vivo. Conecta, comparte y sorprende a tu audiencia en tiempo real.
          </p>
          <a href="#/login" class="slidex-cta-btn slidex-cta-strong slidex-cta-animate">Creá tu cuenta gratis</a>

        </div>
      </section>

      <section class="slidex-home-features slidex-fade-in ">
        <div class="slidex-feature-card slidex-glow slidex-float-loop">
          <i class="bi bi-easel-fill slidex-feature-icon"></i>
          <h3 class="slidex-feature-title">Crea Presentaciones</h3>
          <p class="slidex-feature-desc">Diseñá tus presentaciones directamente en la plataforma, sin necesidad de software externo.</p>
        </div>

        <div class="slidex-feature-card slidex-glow slidex-float-loop">
          <i class="bi bi-broadcast-pin slidex-feature-icon"></i>
          <h3 class="slidex-feature-title">Transmití en Vivo</h3>
          <p class="slidex-feature-desc">Mostrá tu presentación en tiempo real a tu audiencia, sin complicaciones.</p>
        </div>

        <div class="slidex-feature-card  slidex-float-loop slidex-glow">
          <i class="bi bi-chat-dots-fill slidex-feature-icon"></i>
          <h3 class="slidex-feature-title">Interacción en Tiempo Real</h3>
          <p class="slidex-feature-desc">Permití que tu audiencia participe con encuestas, preguntas y votaciones durante tu presentación.</p>
        </div>
      </section>

    </main>
  `;
};
