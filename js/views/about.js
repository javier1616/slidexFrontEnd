import Navbar from '../../components/navbar.js';

export default async () => {
  return `
    ${Navbar()}
    <main class="page-center-wrapper slidex-home-container slidex-gradient-bg">

      <!-- Hero: Sobre nosotros -->
      <section class="slidex-section slidex-home-hero text-center">
        <div class="home-hero-content slidex-fade-in p-5">
          <h1 class="slidex-title">
            Sobre Nosotros <span class="slidex-text-gradient">SlideX</span>
          </h1>
          <p class="slidex-subtitle">
            Somos un grupo de la Universidad Arturo Jauretche, apasionados por la tecnología y la educación.
          </p>
          <p class="slidex-subtitle">
            Nos llamamos <strong>CTRL C + CTRL V</strong> de copiar y pegar, y estamos dedicados a crear soluciones que faciliten la comunicación en presentaciones interactivas.
          </p>
          <a href="#/login" class="slidex-cta-btn slidex-cta-strong slidex-cta-animate">Volver al Inicio</a>
        </div>
      </section>

      <!-- Sección de características -->
      <section class="slidex-home-features ">
        <div class="slidex-feature-card slidex-fade-in">
          <i class="bi bi-people-fill slidex-feature-icon"></i>
          <h3 class="slidex-feature-title">Equipo Comprometido</h3>
          <p class="slidex-feature-desc">Un equipo multidisciplinario trabajando unido para ofrecer la mejor experiencia.</p>
        </div>

        <div class="slidex-feature-card slidex-fade-in">
          <i class="bi bi-laptop-fill slidex-feature-icon"></i>
          <h3 class="slidex-feature-title">Tecnología Moderna</h3>
          <p class="slidex-feature-desc">Utilizamos las últimas tecnologías para garantizar rendimiento y escalabilidad.</p>
        </div>

        <div class="slidex-feature-card slidex-fade-in">
          <i class="bi bi-mortarboard-fill slidex-feature-icon"></i>
          <h3 class="slidex-feature-title">Enfoque Educativo</h3>
          <p class="slidex-feature-desc">Creemos en el poder de la educación y buscamos potenciarla a través de nuestras herramientas.</p>
        </div>
      </section>

    </main>
  `;
};
