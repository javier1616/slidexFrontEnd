
import { SESSION_SERVICE_URL, SIGNALR_HUB } from '../../../data/config.js'
import { pintarSlide } from '../../../components/slideCards.js'


export async function joinSession(sessionCode) {

        console.log("iniciando joinSesison...")

        const url = SESSION_SERVICE_URL + 'session/join/private/' + sessionCode;

        const jwt = 'Bearer ' + localStorage.getItem("access_token");
        console.log("jwt para iniciar conexion como participante",jwt)
        

        try
        {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json'
                    }
                });
                
            if (!response.ok) {
                // Puedes lanzar error con más detalle si la API devuelve mensajes
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en la solicitud');
            }

            const data = await response.json();
                
            return data;

        }
        catch (error)
        {
            console.error('Error al iniciar sesión:', error.message);
        }
    }


export const connection = new signalR.HubConnectionBuilder()
                .withUrl(SIGNALR_HUB)
                .configureLogging(signalR.LogLevel.Information)
                .build();

export async function joinSessionHandler() {

            console.log("Iniciando joinSessionHandler...");

            const sessionCode = localStorage.getItem('accessCode');

            const json = await joinSession(sessionCode);


            // --- REVISAR ---

            console.log("datos de respuesta de la conexion");
            console.log(json);

            console.log("almacenando sessionId")
            localStorage.setItem("sessionId",JSON.stringify(json.sessionId));

            var sortedSlides = json.presentation.slides;
            //orden por posicion ascendente
            sortedSlides.sort((a, b) => a.position - b.position);
            localStorage.setItem("slides",JSON.stringify(sortedSlides));

            console.log("slides")
            console.log(json.presentation.slides)
            console.log("sorted slides")
            console.log(sortedSlides)

            if(json.currentSlide != 0)
            {
                console.log("cargando diapo actual: ", json.currentSlide)
                const slideContainer = document.getElementById('slide-container');
                
                console.log(sortedSlides[json.currentSlide-1]);
                slideContainer.innerHTML = pintarSlide(sortedSlides[json.currentSlide-1],2);
            }
            else
            {
                console.log("currentSlide por ahora es 0 (aguardando....)");
            }
           
            // ---------------

            var sessionStatus = document.getElementById('sessionStatusSpan');
            var sessionCodeSpan = document.getElementById('sessionCodeSpan');
            
            sessionStatus.textContent = "Conectado";
            sessionCodeSpan.innerHTML = sessionCode;
            sessionStatus.classList.remove("text-danger");
            sessionStatus.classList.add("text-success");
            sessionCodeSpan.classList.remove("text-danger");
            sessionCodeSpan.classList.add("text-success");

            
            console.log("Inicio de sesion exitoso.");
            console.log("iniciando conexion SignalR");


            //defino lo que sucede cuando reciba mensaje
            connection.on("ReceiveSlide", (slideIndex) => {
                console.log("MENSAJE RECIBIDO - PARTICIPANTE");
                localStorage.setItem('currentSlide',slideIndex);
                let sortedSlides = JSON.parse(localStorage.getItem("slides"));                
                const slideContainer = document.getElementById('slide-container');

                console.log("slide antes de ser enviado a showslide")
                console.log(sortedSlides[slideIndex-1]);

                slideContainer.innerHTML = pintarSlide(sortedSlides[slideIndex-1],2);
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
            
                    alert("Recibiendo respuesta - ESTOY EN PARTICIPANTE")

                    console.log("respuesta desde PARTICIPANTE: ",slideStats);

            });
 

            //inicio la conexion
            await connection.start()


            //agrego al grupo correspondiente
            await connection.invoke("JoinSession", JSON.parse(localStorage.getItem("sessionId")));


        }




   
        //creo variable para conectarme
           

            //cuando quieras implementar jwt
            // .withUrl("https://tuservicio.com/presentationHub", {
            //        accessTokenFactory: () => jwtToken
            // })
            //en el metodo del hub va el [Authorize]
            //[Authorize]
            //public class PresentationHub : Hub

        /*
        function sendAsk() {
            const slide = document.getElementById("slideInput").value;
            connection.invoke("SendSlide", slide).catch(err => console.error(err.toString()));
        }
        */