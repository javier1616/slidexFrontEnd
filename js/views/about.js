import Navbar from '../../components/navbar.js';

export default () => {
  return `
    <style>
      :root {
        --gris-super-claro: #ECEBF1;
        --azul-oscuro: #137CA5;
        --azul-claro: #009BB5;
        --naranja: #F1634A;
        --naranja-claro: #E27662;
        --blanco: #ffffff;
        --sombra-suave: rgba(0, 0, 0, 0.08);
        --sombra-media: rgba(0, 0, 0, 0.15);
        --sombra-fuerte: rgba(0, 0, 0, 0.25);
      }

      .help-container {
        min-height: 100vh;
        background: linear-gradient(135deg, var(--gris-super-claro) 0%, var(--blanco) 100%);
        padding: 2rem 0;
      }

      .help-header {
        text-align: center;
        margin-bottom: 3rem;
        padding: 2rem 0;
      }

      .help-title {
        color: var(--azul-oscuro);
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
        position: relative;
      }

      .help-subtitle {
        color: var(--azul-claro);
        font-size: 1.3rem;
        opacity: 0.9;
        max-width: 600px;
        margin: 0 auto;
      }

      .help-section {
        background: var(--blanco);
        border-radius: 20px;
        padding: 2.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 10px 30px var(--sombra-suave);
        border: 1px solid rgba(19, 124, 165, 0.1);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .help-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--azul-oscuro), var(--azul-claro));
      }

      .help-section:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px var(--sombra-media);
      }

      .section-icon {
        width: 60px;
        height: 60px;
        background: linear-gradient(45deg, var(--azul-claro), var(--naranja));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        box-shadow: 0 5px 15px var(--sombra-suave);
      }

      .section-icon svg {
        width: 30px;
        height: 30px;
        fill: var(--blanco);
      }

      .section-title {
        color: var(--azul-oscuro);
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      .section-content {
        color: var(--azul-oscuro);
        line-height: 1.6;
        opacity: 0.8;
      }

      .step-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: var(--gris-super-claro);
        border-radius: 15px;
        transition: all 0.3s ease;
      }

      .step-item:hover {
        background: rgba(0, 155, 181, 0.1);
        transform: translateX(5px);
      }

      .step-number {
        background: var(--azul-claro);
        color: var(--blanco);
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        margin-right: 1rem;
        flex-shrink: 0;
        font-size: 0.9rem;
      }

      .step-content {
        flex: 1;
      }

      .step-content h5 {
        color: var(--azul-oscuro);
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      .step-content p {
        color: var(--azul-oscuro);
        margin: 0;
        opacity: 0.8;
      }

      .faq-item {
        border-bottom: 1px solid var(--gris-super-claro);
        padding: 1.5rem 0;
      }

      .faq-item:last-child {
        border-bottom: none;
      }

      .faq-question {
        color: var(--azul-oscuro);
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 0.8rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: color 0.3s ease;
      }

      .faq-question:hover {
        color: var(--azul-claro);
      }

      .faq-answer {
        color: var(--azul-oscuro);
        opacity: 0.8;
        line-height: 1.6;
      }

      .contact-card {
        background: linear-gradient(45deg, var(--azul-oscuro), var(--azul-claro));
        color: var(--blanco);
        border-radius: 20px;
        padding: 2.5rem;
        text-align: center;
        margin-top: 2rem;
        position: relative;
        overflow: hidden;
      }

      .contact-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
        animation: rotate 20s linear infinite;
      }

      @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .contact-card h3 {
        margin-bottom: 1rem;
        position: relative;
        z-index: 1;
      }

      .contact-card p {
        margin-bottom: 1.5rem;
        opacity: 0.9;
        position: relative;
        z-index: 1;
      }

      .btn-contact {
        background: var(--blanco);
        color: var(--azul-oscuro);
        border: none;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-weight: 600;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
        position: relative;
        z-index: 1;
      }

      .btn-contact:hover {
        background: var(--naranja);
        color: var(--blanco);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }

      .code-example {
        background: var(--gris-super-claro);
        border: 1px solid rgba(19, 124, 165, 0.2);
        border-radius: 10px;
        padding: 1rem;
        font-family: 'Courier New', monospace;
        color: var(--azul-oscuro);
        margin: 1rem 0;
        position: relative;
      }

      .code-example::before {
        content: 'Ejemplo';
        position: absolute;
        top: -10px;
        left: 15px;
        background: var(--azul-claro);
        color: var(--blanco);
        padding: 2px 8px;
        border-radius: 5px;
        font-size: 0.8rem;
        font-weight: 600;
      }

      .back-button {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--naranja);
        color: var(--blanco);
        border: none;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 20px var(--sombra-media);
        transition: all 0.3s ease;
        z-index: 1000;
      }

      .back-button:hover {
        background: var(--naranja-claro);
        transform: translateY(-3px);
        box-shadow: 0 10px 30px var(--sombra-fuerte);
      }

      @media (max-width: 768px) {
        .help-title {
          font-size: 2.5rem;
        }
        
        .help-section {
          padding: 2rem 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .contact-card {
          padding: 2rem 1.5rem;
        }
      }
    </style>

    ${Navbar()}
    
    <div class="help-container">
      <div class="container">
        <div class="help-header">
          <h1 class="help-title">Centro de Ayuda</h1>
          <p class="help-subtitle">Encuentra respuestas a tus preguntas y aprende cómo usar nuestra plataforma</p>
        </div>

        <div class="row">
          <div class="col-lg-6 mb-4">
            <div class="help-section">
              <div class="section-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h2 class="section-title">Primeros Pasos</h2>
              <div class="section-content">
                <div class="step-item">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h5>Crear una cuenta</h5>
                    <p>Regístrate en nuestra plataforma con tu email y contraseña</p>
                  </div>
                </div>
                <div class="step-item">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h5>Unirse a una sesión</h5>
                    <p>Ingresa el código de sesión que te proporcionaron</p>
                  </div>
                </div>
                <div class="step-item">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h5>Comenzar a colaborar</h5>
                    <p>Participa activamente en las actividades de la sesión</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mb-4">
            <div class="help-section">
              <div class="section-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 class="section-title">Códigos de Sesión</h2>
              <div class="section-content">
                <p>Los códigos de sesión son identificadores únicos que te permiten unirte a una sesión específica.</p>
                
                <h5 style="color: var(--azul-oscuro); margin-top: 1.5rem; margin-bottom: 1rem;">Formato del código:</h5>
                <div class="code-example">
                  ABC123XYZ
                </div>
                
                <p><strong>Características:</strong></p>
                <ul style="color: var(--azul-oscuro); opacity: 0.8;">
                  <li>Combinación de letras y números</li>
                  <li>Longitud de 6-9 caracteres</li>
                  <li>Sensible a mayúsculas y minúsculas</li>
                  <li>Expira después de la sesión</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="help-section">
              <div class="section-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 class="section-title">Preguntas Frecuentes</h2>
              <div class="section-content">
                <div class="faq-item">
                  <div class="faq-question">
                    ¿Qué hago si mi código de sesión no funciona?
                    <span>▼</span>
                  </div>
                  <div class="faq-answer">
                    Verifica que hayas ingresado el código correctamente, respetando mayúsculas y minúsculas. Si el problema persiste, solicita un nuevo código al organizador de la sesión.
                  </div>
                </div>

                <div class="faq-item">
                  <div class="faq-question">
                    ¿Puedo unirme a una sesión desde mi móvil?
                    <span>▼</span>
                  </div>
                  <div class="faq-answer">
                    Sí, nuestra plataforma es completamente responsive y funciona perfectamente en dispositivos móviles, tablets y computadoras.
                  </div>
                </div>

                <div class="faq-item">
                  <div class="faq-question">
                    ¿Cuánto tiempo dura una sesión?
                    <span>▼</span>
                  </div>
                  <div class="faq-answer">
                    La duración depende del organizador de la sesión. Generalmente las sesiones duran entre 30 minutos y 2 horas.
                  </div>
                </div>

                <div class="faq-item">
                  <div class="faq-question">
                    ¿Necesito instalar algún software?
                    <span>▼</span>
                  </div>
                  <div class="faq-answer">
                    No, todo funciona directamente desde tu navegador web. Solo necesitas una conexión a internet estable.
                  </div>
                </div>

                <div class="faq-item">
                  <div class="faq-question">
                    ¿Mis datos están seguros?
                    <span>▼</span>
                  </div>
                  <div class="faq-answer">
                    Sí, utilizamos encriptación de extremo a extremo y no almacenamos información personal innecesaria. Tu privacidad es nuestra prioridad.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="contact-card">
              <h3>¿Necesitas más ayuda?</h3>
              <p>Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta o problema técnico</p>
              <a href="/contact" class="btn-contact">Contactar Soporte</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button class="back-button" onclick="window.history.back()">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </button>

    <script>
      // Funcionalidad para las preguntas frecuentes
      document.addEventListener('DOMContentLoaded', function() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
          question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('span');
            
            if (answer.style.display === 'none' || answer.style.display === '') {
              answer.style.display = 'block';
              icon.textContent = '▲';
            } else {
              answer.style.display = 'none';
              icon.textContent = '▼';
            }
          });
        });

        // Ocultar respuestas por defecto
        document.querySelectorAll('.faq-answer').forEach(answer => {
          answer.style.display = 'none';
        });
      });
    </script>
  `;
};