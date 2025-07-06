import { SIGNALR_HUB } from "../../data/config.js";

let connection = null;
let slideActualIndex = null;

let slideListeners = [];

export async function startSignalRConnection() {
    if (connection && connection.state === "Connected") return connection;

    connection = new signalR.HubConnectionBuilder()
        //.withUrl("https://localhost:6662/sessionhub")
        .withUrl(SIGNALR_HUB)
        .withAutomaticReconnect()
        .build();

    try {
        await connection.start();
        console.log("✅ Conectado al hub");

        connection.on("ChangeSlide", (slideIndex) => {
            slideActualIndex = slideIndex;

            const div = document.getElementById("slideActual");
            if (div) div.textContent = `Slide actual: ${slideIndex}`;

            // 🔔 Notificá a todos los suscriptores
            slideListeners.forEach(cb => cb(slideIndex));
        });

    } catch (err) {
        console.error("❌ Error de conexión:", err);
    }

    return connection;
}

export async function joinSessionGroup(sessionId) {
    try {
      await connection.invoke("JoinSession", sessionId);
      console.log(`📡 Unido a la sesión ${sessionId}`);
    } catch (err) {
      console.error("❌ Error al unirse al grupo:", err);
    }
  }
  

export function getSlideActualIndex() {
    return slideActualIndex;
}

export async function sendSlideChange(sessionId, slideIndex) {
    if (!connection || connection.state !== "Connected") return;

    try {
        await connection.invoke("ChangeSlide", sessionId, slideIndex);
        console.log(`📤 Slide cambiado a ${slideIndex}`);
    } catch (err) {
        console.error("❌ Error al enviar slide:", err);
    }
}

export function onSlideChanged(callback) {
    if (typeof callback === "function") {
        slideListeners.push(callback);
    }
}