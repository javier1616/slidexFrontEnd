
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

        // nota: 
        //
        // slideStas = {
        //  int Total,
        //  int Correct,
        //  int Incorrect,
        //  double CorrectPercentage
        // }

        alert("Recibiendo respuesta - ESTOY EN PRESENTADOR")

        console.log("respuesta: ", slideStats);

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

    const slideRequest = {
        sessionId: sessionId,
        slideIndex: slideIndex,
        slideId: slide.slideId,
        ask: null,
        answerCorrect: null,
        options: null
    }

    console.log("slideRequest: ", slideRequest);

    //await connection.invoke("ChangeSlide", sessionId, slideIndex);
    await connection.invoke("ChangeSlide", sessionId, slideRequest);
}



async function startSessionHandler() {

    console.log("Creando sesión (startSessionHandler)...");

    const description = document.getElementById('descriptionInput').value;
    const max_participants = document.getElementById('maxParticipantsInput').value;
    const presentationId = document.getElementById('presentationIdInput').value;

    //Hace el POST para crear sesión y se trae la presentacion asociada y sus slides
    const json = await startSession(description, max_participants, presentationId);

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