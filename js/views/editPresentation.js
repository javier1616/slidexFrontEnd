/* =====================================================================
   SlideX – EditPresentation View
   ---------------------------------------------------------------------
   ▸ Reutiliza exactamente la UI y las clases de CreatePresentation
   ▸ Permite mover ↔, borrar 🗑️ y agregar + slides
   ▸ Límite de 4 opciones por pregunta (botón “+” se deshabilita)
   ▸ Si recibe un id ⇒ carga la presentación vía API y la deja lista
   ▸ Guardar: decide PUT ó POST según editingId
   =====================================================================*/

import Navbar from "../../components/navbar_auth.js";
import {
    getPresentationById,
    updatePresentationBackend
} from "../api.js";

const template = `
   ${Navbar()}
   <div class="container-fluid p-4">
   <!-- En tu EditPresentation view (fuera del form) -->
<div id="edit-loading" class="loading-overlay d-none"></div>

     <label>Título de la Presentación</label>
     <input id="input-presentation-title" type="text" class="form-control mb-2" />
   
     <div class="row g-3">
       <div class="col-md-2 bg-info text-white rounded p-3">
         <label>Título</label>
         <input id="input-title" type="text" class="form-control mb-2" />
   
         <label>Contenido</label>
         <input id="input-subtitle" type="text" class="form-control mb-2" />
   
         <label>URL Imagen</label>
         <input id="input-img" type="text" class="form-control mb-2" />
   
         <label>Color de fondo</label>
         <input id="input-bg" type="color" class="form-control form-control-color" />
       </div>
   
       <div class="col-md-7">
         <div id="preview" class="preview-box">
           <h3 id="preview-title">Título</h3>
           <p id="preview-subtitle">Subtítulo</p>
           <div id="preview-img" class="bg-dark mt-3 mx-auto" style="width: 60%; height: 200px; border-radius: 10px; line-height: 200px;">IMG</div>
         </div>
       </div>
   
       <div class="col-md-3 bg-info text-white rounded p-3">
         <div class="form-check form-switch">
           <input class="form-check-input" type="checkbox" id="toggleQuestion" />
           <label class="form-check-label" for="toggleQuestion">Agregar pregunta</label>
         </div>
   
         <div id="questionSection" class="mt-3" style="display:none;">
           <label>Pregunta</label>
           <input id="input-question" type="text" class="form-control mb-2" />
           <div id="options-container"></div>
           <button class="btn btn-light w-100" id="btn-add-option">+</button>
         </div>
       </div>
     </div>
   
     <div class="mt-4 rounded p-3 d-flex align-items-center" id="slides-container"></div>
   </div>`;

export default async function EditPresentation({ id } = {}) {
    setTimeout(async () => {
        await waitForElement("#input-title");

        if (id) {
            editingId = id;
            try {
                const token = localStorage.getItem("access_token");
                const data = await getPresentationById(id, token);
                loadPresentation(data);
            } catch (err) {
                console.error(err);
                alert("No se pudo cargar la presentación para editar.");
            }
        }

        if (slides.length === 0) {
            slides.push(makeBlankSlide());
            currentSlideIndex = 0;
        }

        initSlideCreator();
    }, 0);

    return template;
}

const slides = [];
let currentSlideIndex = -1;
let editingId = null;

function waitForElement(selector) {
    return new Promise((resolve) => {
        const i = setInterval(() => {
            if (document.querySelector(selector)) {
                clearInterval(i);
                resolve();
            }
        }, 10);
    });
}

function makeBlankSlide() {
    return {
        title: "Título",
        content: "Subtítulo",
        url: "",
        backgroundColor: "#aaaaaa",
        question: "",
        options: [],
        showQuestion: false,
    };
}

function loadPresentation(pres) {
    slides.length = 0;
    document.getElementById("input-presentation-title").value = pres.title;

    pres.slides.forEach((s) => {
        slides.push({
            idPresentation: pres.id,
            id: s.idSlide,
            title: s.title,
            content: s.content,
            url: s.url,
            backgroundColor: s.backgroundColor,
            question: s.ask?.askText ?? "",
            idAsk: s.ask?.idAsk ?? null,           // <-- asignar idAsk aquí
            options: (s.ask?.options || []).map((o) => ({
                idOption: o.idOption,              // <-- asignar idOption aquí
                text: o.optionText,
                correct: o.isCorrect,
            })),
            showQuestion: !!s.ask,
        });
    });

    currentSlideIndex = 0;
}

function initSlideCreator() {
    const inputTitle = document.getElementById("input-title");
    const inputSubtitle = document.getElementById("input-subtitle");
    const inputImg = document.getElementById("input-img");
    const inputBg = document.getElementById("input-bg");
    const toggleQuestion = document.getElementById("toggleQuestion");
    const questionSection = document.getElementById("questionSection");
    const inputQuestion = document.getElementById("input-question");
    const optionsContainer = document.getElementById("options-container");
    const slidesContainer = document.getElementById("slides-container");
    const btnAddOption = document.getElementById("btn-add-option");

    function updatePreview() {
        if (currentSlideIndex === -1) return;
        const slide = slides[currentSlideIndex];

        document.getElementById("preview-title").innerText = slide.title;
        document.getElementById("preview-subtitle").innerText = slide.content;

        const imgDiv = document.getElementById("preview-img");
        imgDiv.innerText = "";
        imgDiv.style.backgroundImage = slide.url ? `url(${slide.url})` : "";
        imgDiv.style.backgroundSize = "cover";
        imgDiv.style.backgroundPosition = "center";

        document.getElementById("preview").style.backgroundColor = slide.backgroundColor;

        inputTitle.value = slide.title;
        inputSubtitle.value = slide.content;
        inputImg.value = slide.url;
        inputBg.value = slide.backgroundColor;
        toggleQuestion.checked = slide.showQuestion;
        questionSection.style.display = slide.showQuestion ? "block" : "none";
        inputQuestion.value = slide.question;

        optionsContainer.innerHTML = "";
        slide.options.forEach((opt, i) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "option-box d-flex align-items-center justify-content-between";
            optionDiv.innerHTML = `
           <input type="text" class="form-control me-2" value="${opt.text}" data-index="${i}" />
           <input type="checkbox" ${opt.correct ? "checked" : ""} data-index="${i}" />
           <button class="btn btn-sm btn-danger ms-2" data-index="${i}">🗑️</button>`;
            optionsContainer.appendChild(optionDiv);
        });

        btnAddOption.disabled = slide.options.length >= 4;
    }

    function updateSlideData() {
        if (currentSlideIndex === -1) return;
        const slide = slides[currentSlideIndex];

        slide.title = inputTitle.value;
        slide.content = inputSubtitle.value;
        slide.url = inputImg.value;
        slide.backgroundColor = inputBg.value;
        slide.question = inputQuestion.value;
        updatePreview();
    }

    function addSlide() {
        slides.push(makeBlankSlide());
        currentSlideIndex = slides.length - 1;
        renderSlides();
        updatePreview();
    }

    function removeSlide(index) {
        slides.splice(index, 1);
        if (slides.length === 0) {
            addSlide();
            return;
        }
        currentSlideIndex = Math.min(index, slides.length - 1);
        renderSlides();
        updatePreview();
    }

    function moveSlide(fromIndex, toIndex) {
        if (toIndex < 0 || toIndex >= slides.length) return;
        const [moved] = slides.splice(fromIndex, 1);
        slides.splice(toIndex, 0, moved);
        currentSlideIndex = toIndex;
        renderSlides();
        updatePreview();
    }

    function renderSlides() {
        slidesContainer.innerHTML = "";

        slides.forEach((_, i) => {
            const div = document.createElement("div");
            div.className = "slide-thumb" + (i === currentSlideIndex ? " active-slide" : "");
            div.innerText = i + 1;
            div.onclick = () => {
                currentSlideIndex = i;
                renderSlides();
                updatePreview();
            };

            const btnLeft = document.createElement("button");
            btnLeft.className = "move-btn move-left";
            btnLeft.innerHTML = "&larr;";
            btnLeft.onclick = (e) => {
                e.stopPropagation();
                moveSlide(i, i - 1);
            };

            const btnRight = document.createElement("button");
            btnRight.className = "move-btn move-right";
            btnRight.innerHTML = "&rarr;";
            btnRight.onclick = (e) => {
                e.stopPropagation();
                moveSlide(i, i + 1);
            };

            const btnDelete = document.createElement("button");
            btnDelete.className = "move-btn delete-btn";
            btnDelete.innerHTML = "🗑️";
            btnDelete.onclick = (e) => {
                e.stopPropagation();
                removeSlide(i);
            };

            div.appendChild(btnLeft);
            div.appendChild(btnRight);
            div.appendChild(btnDelete);
            slidesContainer.appendChild(div);
        });

        const addBtn = document.createElement("button");
        addBtn.className = "btn btn-light ms-3";
        addBtn.innerText = "+";
        addBtn.onclick = addSlide;
        slidesContainer.appendChild(addBtn);

        const saveBtn = document.createElement("button");
        saveBtn.className = "btn btn-success ms-3";
        saveBtn.innerText = "Guardar";

        saveBtn.onclick = async () => {

            const confirmEdit = confirm("¿Estás seguro que querés guardar los cambios en la presentación?");
            if (!confirmEdit) {
                // Sale si el usuario no confirma
                return;
            }

            const loader = document.getElementById("edit-loading");


            const tituloPresentacion = document.getElementById("input-presentation-title").value;
            const usuario = localStorage.getItem("user_id");
            const token = localStorage.getItem("access_token");

            const mappedSlides = slides.map((s, idx) => ({
                id: s.id ?? undefined,
                idPresentation: editingId,
                title: s.title,
                content: s.content,
                position: idx + 1,
                backgroundColor: s.backgroundColor,
                url: s.url,
                ask: s.showQuestion ? {
                    idAsk: s.idAsk ?? undefined, // agrego idAsk si existe
                    name: "",
                    description: "",
                    askText: s.question,
                    options: s.options.map(o => ({
                        idOption: o.idOption ?? undefined, // agrego idOption si existe
                        optionText: o.text,
                        isCorrect: o.correct
                    }))
                } : null
            }));


            const presentation = {
                id: editingId,
                title: tituloPresentacion,
                activityStatus: true,
                idUserCreat: usuario,
                slides: mappedSlides
            };



            try {

                // Mostrar loader
                loader.classList.remove("d-none");

                // Crear promesa para el delay mínimo
                const delay = new Promise(resolve => setTimeout(resolve, 500)); // 500 ms mínimo

                // Ejecutar la actualización y el delay en paralelo
                const [response] = await Promise.all([
                    updatePresentationBackend(presentation, token),
                    delay
                ]);

                console.log("Guardada:", response);


                const newId = response.id;
                window.location.hash = `#/presentations/edit/${newId}`;

            } catch (err) {
                console.error(err);
                alert("❌ Error al guardar la presentación.");
            } finally {
                loader.classList.add("d-none"); // Ocultar loader pase lo que pase
            }
        };

        slidesContainer.appendChild(saveBtn);
    }

    inputTitle.addEventListener("input", updateSlideData);
    inputSubtitle.addEventListener("input", updateSlideData);
    inputImg.addEventListener("input", updateSlideData);
    inputBg.addEventListener("input", updateSlideData);
    inputQuestion.addEventListener("input", updateSlideData);

    toggleQuestion.addEventListener("change", () => {
        if (currentSlideIndex === -1) return;
        slides[currentSlideIndex].showQuestion = toggleQuestion.checked;
        if (toggleQuestion.checked && slides[currentSlideIndex].options.length === 0) {
            slides[currentSlideIndex].options.push({ text: "", correct: false });
        }
        updatePreview();
    });

    btnAddOption.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentSlideIndex === -1) return;
        const currentOptions = slides[currentSlideIndex].options;
        if (currentOptions.length >= 4) {
            alert("Solo se permiten hasta 4 respuestas por pregunta.");
            return;
        }
        slides[currentSlideIndex].options.push({ text: "", correct: false });
        updatePreview();
    });

    optionsContainer.addEventListener("input", (e) => {
        const target = e.target;
        if (target.tagName === "INPUT" && target.type === "text") {
            const i = Number(target.dataset.index);
            slides[currentSlideIndex].options[i].text = target.value;
        }
    });

    optionsContainer.addEventListener("change", (e) => {
        const target = e.target;
        if (target.tagName === "INPUT" && target.type === "checkbox") {
            const i = Number(target.dataset.index);
            slides[currentSlideIndex].options[i].correct = target.checked;
        }
    });

    optionsContainer.addEventListener("click", (e) => {
        const target = e.target;
        if (target.tagName === "BUTTON") {
            const i = Number(target.dataset.index);
            slides[currentSlideIndex].options.splice(i, 1);
            updatePreview();
        }
    });

    renderSlides();
    updatePreview();
}