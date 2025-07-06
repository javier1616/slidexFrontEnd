import Navbar from "../../components/navbar_auth.js";
import { createPresentationBackend } from "../api.js";

/*
=====================================================================
Archivo  : createPresentation.js
Propósito: Vista y lógica para crear una Presentación con Slides
Autor    : (auto‑generado por ChatGPT, julio 2025)
=====================================================================
Resumen rápido
--------------
👉 Renderiza la vista en una única función `createPresentation()`
👉 Permite añadir, reordenar y previsualizar slides
👉 Opcionalmente cada slide puede contener una pregunta + opciones
👉 Al hacer click en «Guardar» se construye el payload EXACTO que
   espera tu backend. Revisa la consola para comprobarlo ✅

Todas las funciones tienen comentarios inline para que puedas seguir
el flujo sin perderte.
=====================================================================
*/

// ==================== VISTA (template literal) =====================
const template = `
${Navbar()}
<div class="container-fluid p-4">
  <!-- Datos de la presentación -->
  <label>Título de la Presentación</label>
  <input id="input-presentation-title" type="text" class="form-control mb-2" />

  <div class="row g-3">
    <!-- Panel de edición de la slide ------------------------------->
    <div class="col-md-2 bg-info text-white rounded p-3">
      <label>Título</label>
      <input id="input-title" type="text" class="form-control mb-2" />

      <label>Contenido</label>
      <input id="input-subtitle" type="text" class="form-control mb-2" />

      <label>URL Imagen</label>
      <input id="input-img" type="text" class="form-control mb-2" />

      <label>Color de fondo</label>
      <input id="input-bg" type="color" class="form-control form-control-color" />
    </div>

    <!-- Previsualización en vivo ----------------------------------->
    <div class="col-md-7">
      <div id="preview" class="preview-box">
        <h3 id="preview-title">Título</h3>
        <p id="preview-subtitle">Subtítulo</p>
        <div
          id="preview-img"
          class="bg-dark mt-3 mx-auto"
          style="width: 60%; height: 200px; border-radius: 10px; line-height: 200px;"
        >IMG</div>
      </div>
    </div>

    <!-- Área de preguntas/opciones --------------------------------->
    <div class="col-md-3 bg-info text-white rounded p-3">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="toggleQuestion" />
        <label class="form-check-label" for="toggleQuestion">Agregar pregunta</label>
      </div>

      <div id="questionSection" class="mt-3" style="display:none;">
        <label>Pregunta</label>
        <input id="input-question" type="text" class="form-control mb-2" />

        <!-- Contenedor dinámico de opciones -->
        <div id="options-container"></div>
        <button class="btn btn-light w-100" id="btn-add-option">+</button>
      </div>
    </div>
  </div>

  <!-- Lista de miniaturas de slides + botones acción --------------->
  <div class="mt-4 rounded p-3 d-flex align-items-center" id="slides-container"></div>
</div>`;

// ==================== FUNCIÓN PRINCIPAL ===========================
export default async function createPresentation() {
  // El template se inyectará en <div id="app"></div> (o donde corresponda)
  // Usamos setTimeout 0 para asegurarnos de que el DOM ya esté pintado
  setTimeout(() => initSlideCreator(), 0);
  return template;
}

// ==================== ESTADO INTERNO ==============================
const slides = [];      // Array de slides en memoria
let currentSlideIndex = -1; // Índice de la slide seleccionada

// ==================== LÓGICA DE LA PANTALLA ========================
function initSlideCreator() {
  /*
  -------------------------------------------------------------------
  1.  Capturamos referencias a los elementos de la UI.
  2.  Definimos helpers para actualizar preview, datos y render.
  3.  Registramos todos los listeners.
  4.  Arrancamos con la primera slide por defecto.
  -------------------------------------------------------------------
  */
  // ---------- Inputs básicos --------------------------------------
  const inputTitle       = document.getElementById("input-title");
  const inputSubtitle    = document.getElementById("input-subtitle");
  const inputImg         = document.getElementById("input-img");
  const inputBg          = document.getElementById("input-bg");
  const toggleQuestion   = document.getElementById("toggleQuestion");
  const questionSection  = document.getElementById("questionSection");
  const inputQuestion    = document.getElementById("input-question");
  const optionsContainer = document.getElementById("options-container");
  const slidesContainer  = document.getElementById("slides-container");
  const btnAddOption     = document.getElementById("btn-add-option");

  //---------------------- HELPERS ----------------------------------
  /**
   * Pinta en la UI los datos de la slide activa y su thumbnail.
   */
  function updatePreview() {
    if (currentSlideIndex === -1) return; // nada seleccionado
    const slide = slides[currentSlideIndex];

    // Texto
    document.getElementById("preview-title").innerText    = slide.title;
    document.getElementById("preview-subtitle").innerText = slide.content;

    // Imagen de fondo
    const imgDiv = document.getElementById("preview-img");
    imgDiv.innerText               = ""; // limpiamos texto "IMG"
    imgDiv.style.backgroundImage   = slide.url ? `url(${slide.url})` : "";
    imgDiv.style.backgroundSize    = "cover";
    imgDiv.style.backgroundPosition= "center";

    // Color de fondo del preview
    document.getElementById("preview").style.backgroundColor = slide.backgroundColor;

    // Sincronizamos inputs del panel de edición
    inputTitle.value    = slide.title;
    inputSubtitle.value = slide.content;
    inputImg.value      = slide.url;
    inputBg.value       = slide.backgroundColor;

    // Pregunta/opciones
    toggleQuestion.checked   = slide.showQuestion;
    questionSection.style.display = slide.showQuestion ? "block" : "none";
    inputQuestion.value      = slide.question;

    // Render de opciones
    optionsContainer.innerHTML = "";
    slide.options.forEach((opt, i) => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "option-box d-flex align-items-center justify-content-between";
      optionDiv.innerHTML = `
        <input type="text"     class="form-control me-2" value="${opt.text}" ${"data-index="+i} />
        <input type="checkbox" ${opt.correct ? "checked" : ""} ${"data-index="+i} />
        <button class="btn btn-sm btn-danger ms-2" ${"data-index="+i}>🗑️</button>`;
      optionsContainer.appendChild(optionDiv);
    });
  }

  /**
   * Actualiza la slide activa con los valores actuales de los inputs.
   */
  function updateSlideData() {
    if (currentSlideIndex === -1) return;
    const slide = slides[currentSlideIndex];
    slide.title           = inputTitle.value;
    slide.content         = inputSubtitle.value;
    slide.url             = inputImg.value;
    slide.backgroundColor = inputBg.value;
    slide.question        = inputQuestion.value;
    slide.position        = currentSlideIndex + 1; // 1‑based
    updatePreview();
  }

  /**
   * Crea una slide nueva con valores por defecto y la selecciona.
   */
  function addSlide() {
    slides.push({
      title: "Título",
      content: "Subtítulo",
      url: "",
      backgroundColor: "#aaaaaa",
      question: "",
      options: [],
      showQuestion: false
    });
    currentSlideIndex = slides.length - 1;
    renderSlides();
    updatePreview();
  }

  /**
   * Mueve una slide dentro del array y actualiza la UI.
   */
  function moveSlide(fromIndex, toIndex) {
    if (toIndex < 0 || toIndex >= slides.length) return;
    const [moved] = slides.splice(fromIndex, 1);
    slides.splice(toIndex, 0, moved);
    currentSlideIndex = toIndex;
    renderSlides();
    updatePreview();
  }

  /**
   * Renderiza todas las miniaturas + botones acción sobre `slidesContainer`.
   */
  function renderSlides() {
    slidesContainer.innerHTML = ""; // limpiamos contenedor

    slides.forEach((_, i) => {
      const div = document.createElement("div");
      div.className = "slide-thumb" + (i === currentSlideIndex ? " active-slide" : "");
      div.innerText = i + 1;               // número de slide
      div.onclick = () => {                // seleccionar
        currentSlideIndex = i;
        renderSlides();
        updatePreview();
      };

      // Botón ← (mover a la izquierda)
      const btnLeft = document.createElement("button");
      btnLeft.className = "move-btn move-left";
      btnLeft.innerHTML = "&larr;";
      btnLeft.onclick = (e) => {
        e.stopPropagation();
        moveSlide(i, i - 1);
      };

      // Botón → (mover a la derecha)
      const btnRight = document.createElement("button");
      btnRight.className = "move-btn move-right";
      btnRight.innerHTML = "&rarr;";
      btnRight.onclick = (e) => {
        e.stopPropagation();
        moveSlide(i, i + 1);
      };

      div.appendChild(btnLeft);
      div.appendChild(btnRight);
      slidesContainer.appendChild(div);
    });

    // Botón [+] para agregar slide
    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-light ms-3";
    addBtn.innerText = "+";
    addBtn.onclick = addSlide;
    slidesContainer.appendChild(addBtn);

    // Botón [Guardar] para enviar al backend
    const saveBtn = document.createElement("button");
    saveBtn.className = "btn btn-success ms-3";
    saveBtn.innerText = "Guardar";
    saveBtn.onclick = async () => {
      /*
      -----------------------------------------------------------------
      A‑QUÍ se genera el payload FINAL que necesita tu API.          🎯
      Compara con el formato proporcionado por vos:
      {
        "title": "string",
        "activityStatus": true,
        "idUserCreat": "3fa85f64‑...",
        "slides": [ { ... } ]
      }
      -----------------------------------------------------------------
      */

      // Obtenemos datos de la presentación
      const tituloPresentacion = document.getElementById("input-presentation-title").value;
      const usuario            = localStorage.getItem("user_id");
      const token              = localStorage.getItem("access_token"); // suponemos que lo guardaste ahí

      /*
      Mapeamos nuestro array `slides` a la estructura que pide el backend.
      */
      const mappedSlides = slides.map((s, idx) => ({
        idPresentation : 0,         // El backend lo sobrescribirá con el ID real
        title          : s.title,
        content        : s.content,
        position       : idx + 1,
        backgroundColor: s.backgroundColor,
        url            : s.url,
        ask: s.showQuestion ? {
          name       : "",          // → Completa si tu modelo lo requiere
          description: "",          // → idem
          askText    : s.question,
          options    : s.options.map(o => ({
            optionText: o.text,
            isCorrect : o.correct
          }))
        } : null
      }));

      // Objeto final que se enviará en la request
      const presentation = {
        title         : tituloPresentacion,
        activityStatus: true,
        idUserCreat   : usuario,
        slides        : mappedSlides
      };

      console.log("Payload a enviar (debería coincidir con el ejemplo):", presentation);

      // ======================== Llamada a la API ===================
      try {
        await createPresentationBackend(presentation, token);
        alert("Presentación guardada con éxito ✔️");
      } catch (err) {
        console.error(err);
        alert("❌ Error al guardar la presentación. Revisa la consola.");
      }
    };

    slidesContainer.appendChild(saveBtn);
  }

  /** Agrega una opción vacía a la slide actual */
  function addOption() {
    if (currentSlideIndex === -1) return;
    slides[currentSlideIndex].options.push({ text: "", correct: false });
    updatePreview();
  }

  // ------------------------- LISTENERS -----------------------------
  // Inputs de texto/color para props básicas
  inputTitle.addEventListener("input", updateSlideData);
  inputSubtitle.addEventListener("input", updateSlideData);
  inputImg.addEventListener("input", updateSlideData);
  inputBg.addEventListener("input", updateSlideData);
  inputQuestion.addEventListener("input", updateSlideData);

  // Toggle de pregunta
  toggleQuestion.addEventListener("change", () => {
    if (currentSlideIndex === -1) return;
    slides[currentSlideIndex].showQuestion = toggleQuestion.checked;
    // Si se habilita la pregunta y no hay opciones, añadimos una
    if (toggleQuestion.checked && slides[currentSlideIndex].options.length === 0) {
      slides[currentSlideIndex].options.push({ text: "", correct: false });
    }
    updatePreview();
  });

  // Botón [+] agregar opción
  btnAddOption.addEventListener("click", (e) => {
    e.preventDefault();
    addOption();
  });

  // Delegación eventos en optionsContainer -------------------------
  /* texto */
  optionsContainer.addEventListener("input", (e) => {
    const target = e.target;
    if (target.tagName === "INPUT" && target.type === "text") {
      const i = Number(target.dataset.index);
      slides[currentSlideIndex].options[i].text = target.value;
    }
  });

  /* checkbox */
  optionsContainer.addEventListener("change", (e) => {
    const target = e.target;
    if (target.tagName === "INPUT" && target.type === "checkbox") {
      const i = Number(target.dataset.index);
      slides[currentSlideIndex].options[i].correct = target.checked;
    }
  });

  /* botón 🗑️ (eliminar opción) */
  optionsContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const i = Number(target.dataset.index);
      slides[currentSlideIndex].options.splice(i, 1);
      updatePreview();
    }
  });

  // Finalmente creamos la primera slide para arrancar
  addSlide();
}
