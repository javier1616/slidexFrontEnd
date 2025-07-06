import { USER_SERVICE_URL } from '../data/config.js';
import { SESSION_SERVICE_URL } from '../data/config.js';
import { PRESENTATION_SERVICE_URL } from '../data/config.js';

export async function loginUser(email, password) {
  try {
    const url = USER_SERVICE_URL + 'api/Auth/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status}`);
    }

    const data = await response.json();
    console.log('Respuesta del login:', data);
    return data;
  } catch (error) {
    console.error('Error en la llamada login:', error);
    throw error;
  }
}

export async function getSessionByAccessCode(accessCode, token) {
  try {

    const url = `${SESSION_SERVICE_URL}session/${accessCode}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(data.message || 'Error');
    error.status = response.status;
    throw error;

  } catch (error) {
    console.error('Error al obtener sesión por accessCode:', error);
    throw error;
  }
}


export async function createParticipant(user, session, token) {


  const url = `${SESSION_SERVICE_URL}participant/create`;

  const body = {
    'idUser': user,
    'idSession': session
  }

  console.log(body);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('user added as participant', data);
      return data;
    }

    const error = new Error(data.message || 'Error');
    error.status = response.status;
    throw error;

  } catch (error) {
    console.error('Error al agregar el usuario como participante', error);
    throw error;
  }
}


export async function getPresentationById(presentationId, token) {
  try {

    const url = `${PRESENTATION_SERVICE_URL}Presentation/GetById/${presentationId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Presentación encontrada: ', data);
      return data;
    }

    const error = new Error(data.message || 'Error');
    error.status = response.status;
    throw error;

  } catch (error) {
    console.error('Error al obtener sesión por accessCode:', error);
    throw error;
  }
}


export async function getPresentationAll(token) {
  try {

    const url = `${PRESENTATION_SERVICE_URL}Presentation/GetAll`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Presentaciones encontradas: ', data);
      return data;
    }

    const error = new Error(data.message || 'Error');
    error.status = response.status;
    throw error;

  } catch (error) {
    console.error('Error al obtener todas las presentaciones:', error);
    throw error;
  }
}


export async function getPresentationsByUser(userId, token) {
  try {

    const url = `${PRESENTATION_SERVICE_URL}Presentation/GetUserPresentations/${userId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Presentaciones encontradas: ', data);
      return data;
    }

    const error = new Error(data.message || 'Error');
    error.status = response.status;
    throw error;

  } catch (error) {
    console.error('Error al obtener todas las presentaciones:', error);
    throw error;
  }
}


export async function createPresentationBackend(data, token) {
  try {
    const url = `${PRESENTATION_SERVICE_URL}presentation/create`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        //,'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("datos de respuesta del backend");
    console.log(result);

    if (!response.ok) {
      const error = new Error(result.message || 'Error al crear presentación');
      error.status = response.status;
      throw error;
    }

    return result;

  } catch (error) {
    console.error('Error al crear presentación:', error);
    throw error;
  }
}

export async function updatePresentationBackend(data, token) {
  try {
    const url = `${PRESENTATION_SERVICE_URL}presentation/update/${data.id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("datos de respuesta del backend");
    console.log(result);

    if (!response.ok) {
      const error = new Error(result.message || 'Error al crear presentación');
      error.status = response.status;
      throw error;
    }

    return result;

  } catch (error) {
    console.error('Error al modificar la presentación:', error);
    throw error;
  }
}


export async function deletePresentationBackend(id, token) {
  try {
    const url = `${PRESENTATION_SERVICE_URL}presentation/delete/${id}`;

    console.log(url);


    const response = await fetch(url, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      // Intentar parsear JSON solo si hay contenido
      let errorMessage = 'Error al eliminar la presentación';
      try {
        const result = await response.json();
        errorMessage = result.message || errorMessage;
      } catch {
        // No hay JSON, dejamos mensaje por defecto
      }
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }
    // O simplemente retornar true si todo OK:
    console.log('Presentación ' + id + ' eliminada con éxito');
    return true;

  } catch (error) {
    console.error('Error al eliminar la presentación:', error);
    throw error;
  }
}



export async function createSlide(data) {
  const res = await fetch(`${API_URL}/Slide`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear slide");

  return await res.json();
}

//fetch para registrar usuario

export async function registerUser(requestData) {
  try {
    const url = USER_SERVICE_URL + "api/User/register";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    console.log("Respuesta del registrar:", data);
    return data;
  } catch (error) {
    console.error("Error en la llamada registrar:", error);
    throw error;
  }
}

//fetch recuperar contraseña

export async function recoverPassword(requestData) {
  try {
    const url = USER_SERVICE_URL + "api/User/recover";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      return false;
    }

    console.log("Respuesta del recuperar: 200OK");
    return true;
  } catch (error) {
    console.error("Error en la llamada recuperar:", error);
    throw error;
  }
}