import { PRESENTATION_SERVICE_URL} from '../data/config.js'

export const getPresentations = async (id) => {
  const response = await fetch(`${PRESENTATION_SERVICE_URL}presentation/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  return await response.json();
};

export const post = async (algo,otroAlgoPalBody) => {

  const body = {
    "key_one":algo,
    "key_two":otroAlgoPalBody,
  }

  const response = await fetch(`${SESSION_SERVICE_URL}/Session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

 const data = await response.json();    // --> con este json creo un objeto asi manejo las respuestas

  return {
        ok: response.ok,          // true si 2xx
        status: response.status,  // código numérico (200, 400, etc.)
        data: data                // el JSON del cuerpo
    };

};



