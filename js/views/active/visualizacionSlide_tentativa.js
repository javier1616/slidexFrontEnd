import { startSignalRConnection, joinSessionGroup, getSlideActualIndex, onSlideChanged } from '../../SignalR/Manager.js';
import Navbar from '../../../components/navbar_auth.js';

export default async () => {
    const sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
        window.location.href = '#/error';
        return 'Sesión no encontrada';
    }

    await startSignalRConnection();

    console.log('SessionId :', sessionId);

    await joinSessionGroup(sessionId);


    const presentation = JSON.parse(localStorage.getItem("presentation"));
    


    const html = `${Navbar()}
    <div class="slide-container container-fluid py-3">
        <div class="row d-flex align-items-center">

            <div class="col-11 slide-title">
                <h3>Titulo del slide</h3>
            </div>
            <div class="col-1 slide-index text-center">
                <p id="slide-index">SLIDE 3</p>
            </div>

            <div class="col slide-img">
                <img
                id="slide-img" 
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=1200&h=-1&s=1"
                alt="Slide"
                class="slide-img"
                >
            </div>
            <div class="col-2 question-container d-none">
                <div class="question-title">
                    <h4>Titulo de la pregunta</h4>
                </div>
                <div class="question-answer">
                    <h6>Respuesta a la pregunta</h6>
                </div>
                <div class="question-answer">
                    <h6>Respuesta a la pregunta</h6>
                </div>
                <div class="question-answer">
                    <h6>Respuesta a la pregunta</h6>
                </div>
            </div>
        </div>
    </div>
    `;

    setTimeout(() => {
        const div = document.getElementById('slide-index');
        div.textContent = `Slide actual: ${getSlideActualIndex()}`;

        onSlideChanged((nuevoSlide) => {
            const d = document.getElementById('slide-index');
            if (d) d.textContent = `Slide actual: ${nuevoSlide}`;
        });
    }, 0);

    return html;
};
