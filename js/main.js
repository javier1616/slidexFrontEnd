import router from './router.js';
import { createParticipant, getSessionByAccessCode, loginUser, getPresentationById, registerUser, recoverPassword, deletePresentationBackend } from './api.js'
import { startSignalRConnection, joinSessionGroup } from './SignalR/Manager.js';
import { startSessionHandler, iniciarSignalR } from './Services/SignalR/signalR.js';
import { joinSessionHandler } from './Services/SessionServices/joinSession.js';
import qrModal from '../components/qrModal.js';
import { connection } from './Services/SessionServices/joinSession.js'; //conexion de participante
import { resetStorage } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {

    console.log("Iniciando main.js")

    /*
    // ➤ Limpiar una vez y marcar que ya se limpió
    if (!localStorage.getItem('slidex_initialized')) {
        localStorage.clear();                         // 1) vacía todo
        localStorage.setItem('slidex_initialized', '1'); // 2) deja el flag
    }
    */

    router();




    //delegacion de evento 'click' (carga el addEventListener para click para todo el DOM)
    document.addEventListener('click', async (event) => {

        //LOGOUT
        if (event.target.closest('.nav-item.auth a[href="#/landing"]')) {
            resetStorage();
        }

        // ELIMINAR PRESENTACIÓN
        if (event.target.closest('button[data-action="delete"]')) {
            const deleteBtn = event.target.closest('button[data-action="delete"]');
            if (deleteBtn) {
                const confirmed = confirm("¿Estás seguro de que querés eliminar esta presentación?");
                if (!confirmed) return;

                const id = deleteBtn.dataset.id;
                const token = localStorage.getItem("access_token");

                try {
                    await deletePresentationBackend(id, token); // ← función que llama a tu API
                    alert("✅ Presentación eliminada correctamente.");

                    // Opcional: recargar o redirigir
                    location.reload(); // o router.navigate("/#/home") si usás rutas hash
                } catch (err) {
                    console.error(err);
                    alert("❌ Error al eliminar la presentación.");
                }
            }
        }

        //PRESENTAR
        if (event.target.closest('button[data-action="present"]')) {
            const presentBtn = event.target.closest('button[data-action="present"]');
            if (presentBtn) {
                const confirmed = confirm("¿Estás seguro de que querés presentar?");
                if (!confirmed) return;
            }

            const id = presentBtn.dataset.id;
            //se crea la sesión
            await startSessionHandler(id);

            console.log("renderizando vista de presentacion (presentador)");

            const accessCode = localStorage.getItem("accessCode");

            //dispara el evento
            location.hash = `#/active/presenter/${accessCode}`;

            //aqui dentro se hace el invoke para cargar el primer slide (signalR.js - linea 110)
            await iniciarSignalR();

        }

        //Participant
        if (event.target.matches('#join-session-button')) {

            console.log("renderizando vista de presentacion (participante)");

            const accessCode = document.getElementById("sessionCodeInput").value;
            localStorage.setItem("accessCode", accessCode);

            //dispara el evento
            location.hash = `#/active/participant/${accessCode}`;

            await joinSessionHandler();
        }

        //sendAnswer
        if (event.target.matches('#sendAnswer-btn')) {

            alert("Enviando respuesta (el endpoint deberia validar si el usuario ya respondio en esta sesion). Ver como hacer para que si no contesto nada, y el profe pasa la diapo que no pueda volver (puede verificar el currentSlide, si no estas en esa diapo => ya paso la diapo => no te deja. tb podes guardar algo como una lista de (currentSlide,enableBtn) que los deshabilite si se adelantan o retroceden las diapos ");

            var userId = localStorage.getItem("user_id");
            var sessionId = JSON.parse(localStorage.getItem("sessionId"));
            var currentSlideIndex = localStorage.getItem('currentSlide');
            var sortedSlides = JSON.parse(localStorage.getItem("slides"));
            var currentSlide = sortedSlides[currentSlideIndex - 1];

            //console.log("Answer: ", answerPicked);  // --> ver qué conviene mandarle aca

            //document.getElementById(listItem1).value
            //document.getElementById(listItem2).value
            //document.getElementById(listItem3).value


            const answerRequest = {
                sessionId: sessionId,
                slideId: currentSlide.idSlide,
                userId: userId,
                answer: "banana"
            }

            console.log("answerRequest")
            console.log(answerRequest)

            alert("enviando")

            await connection.invoke("SubmitAnswer", sessionId, answerRequest);

            alert("Si responde se deshabilita botón");

            const answerBtn = document.getElementById("sendAnswer-btn");
            answerBtn.classList.add('disabled');

        }

        //qrModal
        if (event.target.matches('#btn_shareLink')) {

            alert("Mostrando modal con QRcode");

            var link_url = 'https://www.google.com' //(luego modificar)

            /*
            new QRCode(qrContainer, {    // aca pone el qr
                text: link_url,
                width: 128,
                height: 128,
                colorDark: "#000000",       //podes cambiarlo
                colorLight: "#ffffff",    //podes cambiarlo
                correctLevel: QRCode.CorrectLevel.H   //no se que hace, ver 
            });
 
            console.log("qrContainer: ", qrContainer);
            */

            const qrModalContainer = document.getElementById("modal");
            var qrContainer = `<h1>Aqui va el  QR Code</h1>`;
            qrModalContainer.innerHTML = qrModal(link_url, qrContainer);

        }

        if (event.target.closest('#raise-hand-btn')) {

            //tenes que enviarle el estado del boton
            //Si se cae la conexion del participante se reinicia el estado pero no la lista

            const btn = document.getElementById("raise-hand-btn");
            var raiseHand_btn;

            if (btn.classList.contains("not-raised")) {

                btn.classList.add("raised");
                btn.classList.add("slidex-float-loop");
                btn.classList.remove("not-raised");
                raiseHand_btn = true;
            }
            else {

                btn.classList.add("not-raised");
                btn.classList.remove("raised");
                btn.classList.remove("slidex-float-loop");
                raiseHand_btn = false;
            }

            var userId = localStorage.getItem("user_id");
            var sessionId = JSON.parse(localStorage.getItem("sessionId"));
            var userName = localStorage.getItem('user_name');;

            await connection.invoke("RaiseHand", sessionId, userId, userName, raiseHand_btn);

        }

    });

});

document.addEventListener('submit', async (event) => {
    if (event.target.matches('#login-form')) {
        event.preventDefault();

        const form = event.target;
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        // Lógica de login con valores
        const email = form.email.value;
        const password = form.password.value;

        const loadingOverlay = document.querySelector('.loading-overlay');
        const minDelay = 1000; // milisegundos mínimos que queremos mostrar el loader
        try {

            loadingOverlay.classList.remove('d-none');
            const startTime = performance.now();
            const response = await loginUser(email, password);


            // Medimos el tiempo que tardó
            const elapsed = performance.now() - startTime;

            // Si fue muy rápido, esperamos el tiempo restante para que dure al menos minDelay
            if (elapsed < minDelay) {
                await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
            }


            const access_token = response.access_token;
            const expires_in = response.expires_in;
            const refresh_token = response.refresh_token;
            const role = response.role;
            const token_type = response.token_type;
            const user_id = response.user_id;
            const user_name = response.name;

            localStorage.setItem('user_name', user_name);
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('expires_in', expires_in);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('role', role);
            localStorage.setItem('token_type', token_type);
            localStorage.setItem('user_id', user_id);

            // Redirección a /SesionIniciada
            location.hash = '#/presentations';
        } catch (error) {
            alert('Error al loguearse ', error);
        } finally {
            // Ocultar loader siempre
            loadingOverlay.classList.add('d-none');
        }


        console.log('Login con:', email, password);

    }
});


//registrar usuario

document.addEventListener("submit", async (event) => {
    if (event.target.matches("#register-form")) {
        event.preventDefault();

        const error = document.getElementById("error");
        error.style.visibility = "hidden";

        const form = event.target;
        const loadingOverlay = document.querySelector('.loading-overlay');
        const minDelay = 1000; // 1 segundo mínimo

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        try {
            loadingOverlay.classList.remove('d-none');
            const startTime = performance.now();

            const name = document.getElementById("nombre");
            const email = document.getElementById("email");
            const password = document.getElementById("password");
            const dialog = document.getElementById("registerCompleted");
            const acceptBtn = document.getElementById("acceptBtn");

            const requestData = {
                name: name.value,
                email: email.value,
                password: password.value,
            };

            const data = await registerUser(requestData);

            // Medimos el tiempo que tardó
            const elapsed = performance.now() - startTime;
            if (elapsed < minDelay) {
                await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
            }

            if (data) {
                dialog.showModal();

                acceptBtn.addEventListener("click", () => {
                    dialog.close();
                    window.location.hash = "#/login";
                });
            } else {
                error.style.visibility = "visible";
            }
        } catch (err) {
            alert(err);
        } finally {
            loadingOverlay.classList.add('d-none');
        }
    }
});



//Restaurar contraseña

document.addEventListener("submit", async (event) => {
    if (event.target.matches("#recover-form")) {
        event.preventDefault();
        const error = document.getElementById("error");
        const loader = document.getElementById("loader");
        const btn = document.getElementById("sendBttn");
        const recoverBtn = document.getElementById("recoverBtn");

        const form = event.target;

        error.style.visibility = "hidden";

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }
        try {
            // Mostrar loader y deshabilitar botón
            loader.style.display = "block";
            recoverBtn.disabled = true;

            const email = document.getElementById("email");
            const dialog = document.getElementById("recoveryCompleted");

            const requestData = {
                email: email.value,
            };

            const data = await recoverPassword(requestData);

            // Ocultar loader y habilitar botón
            loader.style.display = "none";

            if (data) {
                dialog.showModal();
                btn.addEventListener("click", () => {
                    dialog.close();
                    window.location.hash = "#/login";
                });
            } else {
                error.style.visibility = "visible";
            }
        } catch (err) {
            loader.style.display = "none";
            btn.disabled = false;
            alert(err);
        }
    }
});
