import { SIGNALR_HUB } from "../../../data/config.js";
import { startSession } from "../SessionServices/startSession.js";
import { pintarSlide } from "../../../components/slideCards.js";

//creo variable para conectarme
export const connection = new signalR.HubConnectionBuilder()
    .withUrl(SIGNALR_HUB)
    .configureLogging(signalR.LogLevel.Information)
    .build();


// Verifica si el usuario NO está en la lista
function noEstaEnLaLista(userId) {
    return !document.getElementById(userId);
}

// Elimina al usuario de la lista
function removerDeLaLista(userId) {
    const elemento = document.getElementById(userId);
    if (elemento) {
        elemento.remove();
    }
}

async function iniciarSignalR() {

    console.log("funcion iniciarSignalR")


    //defino lo que sucede cuando reciba mensaje
    connection.on("ReceiveSlide", (slideIndex) => {

        console.log("MENSAJE RECIBIDO - PRESENTADOR");
        let sortedSlides = JSON.parse(localStorage.getItem("slides"));
        const slideContainer = document.getElementById('slide-container');
        //slideContainer.innerHTML = showSlide(sortedSlides[slideIndex-1],"presentador");
        slideContainer.innerHTML = pintarSlide(sortedSlides[slideIndex - 1], 1);
    });

    connection.on("UpdateStatistics", (slideStats) => {
        // slideStats = { Total, Correct, Incorrect, CorrectPercentage }
        alert("Recibiendo respuesta - ESTOY EN PRESENTADOR");
        console.log("respuesta desde PRESENTADOR: ", slideStats);

        // Mostrar estadísticas en la vista del presentador
        let statsContainer = document.getElementById('stats-presenter');
        if (statsContainer) {
            statsContainer.style.display = 'block';
            statsContainer.innerHTML = `
                <strong>Estadísticas de la pregunta actual:</strong><br>
                Total de respuestas: <b>${slideStats.total}</b><br>
                Respuestas correctas: <b class='text-success'>${slideStats.correct}</b><br>
                Respuestas incorrectas: <b class='text-danger'>${slideStats.incorrect}</b><br>
                Porcentaje correctas: <b>${slideStats.correctPercentage}%</b>
            `;
        }
    });

    connection.on("ChangeRaiseHandTail", (userId, userName, status_btn) => {

        const listaDeManos = document.getElementById("raise-hand-list");

        if (noEstaEnLaLista(userId) && status_btn) {
            const result = `
            <li id="${userId}" class="slidex-pulse-loop">
              <i class="bi bi-hand-index-thumb-fill text-primary me-2"></i> ${userName}
            </li>
            `;

            listaDeManos.innerHTML += result;
        }
        else if (!status_btn && document.getElementById(userId)) {
            removerDeLaLista(userId);
        }

    })


    //Conectamos
    await connection.start();

    console.log("Conectado como presentador");

    //agrego al grupo
    await connection.invoke("JoinSession", localStorage.getItem("sessionId"));

    console.log("Realizando invoke para carga de primer slide...")

    localStorage.setItem('currentSlide', 1);
    let sortedSlides = JSON.parse(localStorage.getItem("slides"));
    await changeSlide(connection, localStorage.getItem("sessionId"), 1, sortedSlides[0]);

}


async function changeSlide(connection, sessionId, slideIndex, slide) {

    console.log("slideIndex: ", slideIndex);
    console.log("sessionId: ", sessionId);

    // Determinar si el slide tiene pregunta
    const hasQuestion = slide.ask && slide.answerCorrect && slide.options;

    const slideRequest = {
        sessionId: sessionId,
        slideIndex: slideIndex,
        slideId: slide.slideId,
        ask: hasQuestion ? slide.ask : null,
        answerCorrect: hasQuestion ? slide.answerCorrect : null,
        options: hasQuestion ? slide.options : null
    }

    console.log("slideRequest: ", slideRequest);

    await connection.invoke("ChangeSlide", sessionId, slideRequest);
}



async function startSessionHandler(presentationId) {

    console.log("Creando sesión (startSessionHandler)...");

    //Hace el POST para crear sesión y se trae la presentacion asociada y sus slides
    const json = await startSession("description", 1, presentationId);

    console.log("datos de la conexion");
    console.log(json);

    console.log("sessionId: ", json.sessionId);
    console.log("accessCode: ", json.acces_code);

    localStorage.setItem("sessionId", json.sessionId);
    localStorage.setItem("accessCode", json.acces_code);

    var sortedSlides = json.presentation.slides;
    //orden por posicion ascendente
    sortedSlides.sort((a, b) => a.position - b.position);
    localStorage.setItem("slides", JSON.stringify(sortedSlides));

    console.log("slides")
    console.log(json.presentation.slides)
    console.log("sorted slides")
    console.log(sortedSlides)

    console.log("Sesión creada exitosamente");

}

export { startSessionHandler, iniciarSignalR };