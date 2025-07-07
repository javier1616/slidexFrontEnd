/*

export const PRESENTATION_SERVICE_URL = "https://localhost:7112/api/v1/";
export const USER_SERVICE_URL = "https://localhost:59542/";
export const SESSION_SERVICE_URL = "https://localhost:6662/api/v1/";
export const HISTORY_SERVICE_URL = "https://localhost:7280/api";

export const SIGNALR_HUB = "https://localhost:6662/sessionHub/";
export const API_URL = "https://localhost:7112/api/v1/";

export const WEB_SERVER = "http://127.0.0.1:3000/";

*/

// Constantes de configuracion para deploy web


export const WEB_SERVER = 'https://slidex-front-end.vercel.app/'

const SESSION_MS_TUNNEL = 'lcd-mpegs-employed-discharge'
const PRESENTATION_MS_TUNNEL = 'tim-iii-graph-nice'
const USER_MS_TUNNEL = 'symphony-gba-slope-alabama'
const HISTORY_MS_TUNNEL = 'investments-yale-orientation-assurance'

export const USER_SERVICE_URL = `https://${USER_MS_TUNNEL}.trycloudflare.com/`

export  const PRESENTATION_SERVICE_URL = `https://${PRESENTATION_MS_TUNNEL}.trycloudflare.com/api/v1/`
export const API_URL = `https://${PRESENTATION_MS_TUNNEL}.trycloudflare.com/api/v1/`

export const SESSION_SERVICE_URL = `https://${SESSION_MS_TUNNEL}.trycloudflare.com/api/v1/`
export const SIGNALR_HUB = `https://${SESSION_MS_TUNNEL}.trycloudflare.com/sessionHub/`

export const HISTORY_SERVICE_URL = `https://${HISTORY_MS_TUNNEL}.trycloudflare.com/api`

export const LOGO_URL='https://i.ibb.co/5xTzvQ9G/favicon.png'

