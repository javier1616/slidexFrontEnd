import { SESSION_SERVICE_URL } from "../../../data/config.js";

export async function startSession(sessionDescription,maxParticipants,presentationId) {

    //el userId deberia obtenerlo del jwt, no deberia enviarlo en el body...
    //const user_id = 3   

    const user_id = localStorage.getItem('user_id');

    const payload = {
        description: sessionDescription,
        max_participants: maxParticipants,
        presentation_id: presentationId,
        user_id : user_id
    }
    
    const url = SESSION_SERVICE_URL + "session/create"
    //no se encuentra habilitado el Authorize en el backend
    //const jwt = 'Bearer ' + localStorage.getItem("access_token");
    try {
            const response = await fetch(url, {
            method: 'POST',
            headers: {
                // 'Authorization': jwt,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en la solicitud');
            }
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            return data;
        } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
    }
}