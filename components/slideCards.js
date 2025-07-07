import { connection } from '../js/Services/SessionServices/joinSession.js';

/***************************  Helpers de answeredSlides  ***************************/
function getAnsweredSlides() {
  // Devuelve un array de ids (números) o [] si no existe aún
  return JSON.parse(sessionStorage.getItem('answeredSlides') || '[]');
}

function markSlideAnswered(slideId) {
  const list = getAnsweredSlides();
  if (!list.includes(slideId)) {
    list.push(slideId);
    sessionStorage.setItem('answeredSlides', JSON.stringify(list));
  }
}


export function showSlideWaiting() {
  return `
    <div class="card">
      <img src="https://i.pinimg.com/736x/53/0d/a3/530da3e6a7400ad49b5a076feb538b6b.jpg" class="card-img-top" alt="...">
    </div>`;
}

export function pintarSlide(slide, role) {
  console.log('Slide pintado: ', slide);

  if (slide.ask == null) {
    console.log("renderizando card tipo imagen");
    switch (role) {
      case 1:
        return slideSinPreguntaPresentador(slide);
      case 2:
        return slideSinPreguntaParticipante(slide);
      default:
        alert('ERROR');
    }
  }

  console.log("renderizando card tipo question");

  switch (role) {
    case 1:
      return slideConPreguntaPresentador(slide);
    case 2:
      return slideConPreguntaParticipante(slide);
    default:
      alert('ERROR');
  }
}

function slideConPreguntaPresentador(slide) {
  return `
    <div class="presenter-wrapper">
      <!-- Encabezado con título, contador y subtítulo -->
      <div class="slide-header mb-4">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="slide-title">${slide.title ?? "Sin título"}</h4>
          <span class="slide-count">Slide N° ${slide.position ?? 1}</span>
        </div>
        <h6 class="slide-subtitle mt-2 mb-0">
          ${slide.content ?? "Sin subtítulo"}
        </h6>
      </div>

      <div class="presenter-content">
        <!-- Imagen o placeholder -->
        <div class="presenter-image" style="background-color:${slide.backgroundColor ?? "#fff"};">
          ${slide.url
      ? `<img src="${slide.url}" alt="Slide Image" class="presenter-image-img">`
      : `<div class="text-muted text-center">Sin imagen</div>`
    }
        </div>

        <!-- Panel de pregunta -->
        <div class="presenter-question">
          <h6 class="presenter-question-title">${slide.ask?.name ?? "Sin pregunta"}</h6>
          <p class="presenter-question-description">${slide.ask?.description ?? ""}</p>
          <p class="presenter-question-text">${slide.ask?.askText ?? ""}</p>

          ${slide.ask?.options?.length
      ? slide.ask.options
        .map(
          (o) => `
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="option-${o.idOption}" disabled>
                <label class="form-check-label" for="option-${o.idOption}">
                  ${o.optionText ?? ""}
                </label>
              </div>`
        )
        .join("")
      : `<p class="text-muted">No hay opciones disponibles</p>`
    }

          <div id="stats-presenter" class="alert alert-info mt-3" style="display:none;"></div>
        </div>
      </div>
    </div>
  `;
}


function slideConPreguntaParticipante(slide) {
  const isAnswered = getAnsweredSlides().includes(slide.idSlide);

  return `
    <div class="slide-main">

      <!-- Slide principal -->
      <div class="slide-content">
        <div class="card-header text-center p-4">
          <h5 class="text-primary fw-bold mb-2">${slide.title ?? 'Sin título'}</h5>
          <h6 class="text-primary fw-semibold">${slide.content ?? 'Sin subtitulo'}</h6>
        </div>

        <div class="participant-image flex-grow-1 d-flex align-items-center justify-content-center"
             style="background-color: ${slide.backgroundColor ?? '#fff'};">
          ${slide.url
            ? `<img src="${slide.url}" alt="Slide Image" class="participant-image-img">`
            : `<div class="text-muted text-center w-100">Sin imagen</div>`}
        </div>
      </div>

      <!-- Zona de pregunta -->
      <div class="participant-question p-3">
        <h6 class="fw-bold text-primary">${slide.ask?.name ?? 'Sin pregunta'}</h6>
        <p class="text-muted mb-1">${slide.ask?.description ?? ''}</p>
        <p class="fw-semibold">${slide.ask?.askText ?? ''}</p>

        ${slide.ask?.options?.length
          ? slide.ask.options.map(o => `
              <div class="form-check">
                <input class="form-check-input"
                       type="checkbox"
                       name="ask-options-${slide.idSlide}"
                       id="option-${slide.idSlide}-${o.idOption}"
                       value="${o.idOption}"
                       ${isAnswered ? 'disabled' : ''}
                       onchange="
                         document.querySelectorAll('input[name=\\'ask-options-${slide.idSlide}\\']').forEach(cb => {
                           if (cb !== this) cb.checked = false;
                         });
                       ">
                <label class="form-check-label" for="option-${slide.idSlide}-${o.idOption}">
                  ${o.optionText ?? ''}
                </label>
              </div>
            `).join('')
          : `<p class="text-muted">No hay opciones disponibles</p>`}

        <div class="text-end mt-3">
          <button id="btn-save-ask-${slide.idSlide}"
                  data-id-slide="${slide.idSlide}"
                  class="sx-btn sx-btn--primary w-100"
                  ${isAnswered ? 'disabled' : ''}>
            ${isAnswered ? 'Respuesta guardada' : 'Guardar respuesta'}
          </button>
        </div>
      </div>

    </div>
  `;
}


function slideSinPreguntaPresentador(slide) {
  return `
    <div class="presenter-wrapper">
     
      <div class="slide-header mb-4">
        <div class="d-flex justify-content-between align-items-center">
        <h4 class="slide-title">${slide.title ?? 'Sin título'}</h4>
        <span class="slide-count">Slide N° ${slide.position ?? 1}</span>
      </div>
      <h6 class="slide-subtitle mt-2 mb-0">${slide.content ?? 'Sin subtítulo'}</h6>
    </div>

      <div class="presenter-content">
        <div class="presenter-image" style="background-color: ${slide.backgroundColor ?? '#fff'};">
          ${slide.url
      ? `<img src="${slide.url}" alt="Slide Image" class="presenter-image-img">`
      : `<div class="text-muted text-center">Sin imagen</div>`
    }
        </div>
      </div>

    </div>
  `;
}


function slideSinPreguntaParticipante(slide) {
  return `
    <div class="slide-main">

      <!-- Slide principal -->
      <div class="slide-content">
        <div class="card-header text-center p-4">
          <h5 class="text-primary fw-bold mb-2">${slide.title ?? 'Sin título'}</h5>
          <h6 class="text-primary fw-semibold">${slide.content ?? 'Sin subtitulo'}</h6>
        </div>
        <div class="participant-image flex-grow-1 d-flex align-items-center justify-content-center" style="background-color: ${slide.backgroundColor ?? '#fff'};">
          ${slide.url
      ? `<img src="${slide.url}" alt="Slide Image" class="participant-image-img">`
      : `<div class="text-muted text-center w-100">Sin imagen</div>`}
        </div>
      </div>

      <!-- Lateral -->
      <div class="participant-question d-flex flex-column align-items-center justify-content-center p-3">
        <div class="text-muted">Sin pregunta</div>
      </div>

    </div>
  `;
}



// Evento delegado para todos los botones "Guardar respuesta"
document.addEventListener('click', function (event) {
  if (event.target && event.target.matches('button[id^="btn-save-ask-"]')) {
    const button = event.target;
    const slideId = button.dataset.idSlide; // uso data attribute para evitar parseos
    const parent = button.closest('.participant-question');
    let selectedOption = null;

    if (parent) {
      // Busca primero un radio seleccionado
      const radio = parent.querySelector('input.form-check-input[type="radio"]:checked');
      if (radio) {
        // Buscar el label asociado y tomar el texto
        const label = parent.querySelector('label[for="' + radio.id + '"]');
        selectedOption = label ? label.textContent.trim() : null;
      } else {
        // Si no hay radios, busca un checkbox seleccionado (puede ser más de uno, pero tomamos el primero)
        const checkbox = parent.querySelector('input.form-check-input[type="checkbox"]:checked');
        if (checkbox) {
          const label = parent.querySelector('label[for="' + checkbox.id + '"]');
          selectedOption = label ? label.textContent.trim() : null;
        }
      }
    }
    submitAnswer(slideId, selectedOption);
  }
});

async function submitAnswer(slideId, selectedOption) {
  if (!selectedOption) {
    alert('Por favor, selecciona una respuesta antes de guardar.');
    return;
  }

  // Prevenir doble envío si ya respondió
  if (getAnsweredSlides().includes(Number(slideId))) {
    alert('Ya respondiste esta pregunta.');
    return;
  }

  const sessionId = localStorage.getItem('sessionId');
  const userId = localStorage.getItem('user_id');
  const answerRequest = {
    sessionId: sessionId.slice(1, -1),
    slideId: Number(slideId),
    userId: userId,
    answer: selectedOption
  };

  try {
    const stats = await connection.invoke(
      'submitAnswer',
      sessionId.slice(1, -1),
      answerRequest
    );

    console.log('Estadística recibida:', stats);

    // Marca como respondido
    markSlideAnswered(Number(slideId));

    // Deshabilita botón y cambia texto
    const btn = document.getElementById('btn-save-ask-' + slideId);
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Respuesta guardada';
    }

    // Deshabilita inputs para que no pueda cambiar la respuesta
    const parent = btn.closest('.participant-question');
    if (parent) {
      const inputs = parent.querySelectorAll('input.form-check-input');
      inputs.forEach(i => i.disabled = true);
    }

  } catch (err) {
    console.error('Error al enviar respuesta:', err);
    alert('Hubo un problema al enviar la respuesta.');
  }
}
