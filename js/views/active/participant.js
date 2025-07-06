import { startSignalRConnection, joinSessionGroup, getSlideActualIndex, onSlideChanged } from '../../SignalR/Manager.js';
import Navbar from '../../../components/navbar_auth.js';

export default async () => {
    
    const sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
        window.location.href = '#/error';
        return 'Sesión no encontrada';
    }

    //Iniciar la conexión al hub
    await startSignalRConnection();

    console.log('SessionId :', sessionId);

    //ingresar al grupo
    await joinSessionGroup(sessionId);


    //Tomar los datos de la presentación
    const presentation = JSON.parse(localStorage.getItem("presentation"));


    // Función para formatear fechas (opcional)
    const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

    // Construir HTML con toda la info de presentation
    const slidesHtml = presentation.slides.map(slide => {
        const optionsHtml = slide.ask?.options.map(opt => `
            <li>
                <strong>Opción:</strong> ${opt.optionText} <br>
                <strong>Correcta:</strong> ${opt.isCorrect ? 'Sí' : 'No'} <br>
                <small>Creada: ${formatDate(opt.createdAt)} | Modificada: ${formatDate(opt.modifiedAt)}</small>
            </li>
        `).join('') ?? '';

        return `
            <div class="slide mb-4 p-3 border rounded">
                <h4>Slide: ${slide.title}</h4>
                <p><strong>ID:</strong> ${slide.idSlide}</p>
                <p><strong>URL imagen:</strong> ${slide.url}</p>
                <p><strong>Color de fondo:</strong> ${slide.backgroundColor}</p>
                <p><strong>Creado:</strong> ${formatDate(slide.createAt)}</p>
                <p><strong>Modificado:</strong> ${formatDate(slide.modifiedAt)}</p>
                <p><strong>Posición:</strong> ${slide.position}</p>

                ${slide.ask ? `
                <div class="ask mt-3 p-2 bg-light rounded">
                    <h5>Pregunta: ${slide.ask.askText}</h5>
                    <p><strong>Nombre:</strong> ${slide.ask.name}</p>
                    <p><strong>Descripción:</strong> ${slide.ask.description}</p>
                    <p><strong>Creada:</strong> ${formatDate(slide.ask.createdAt)}</p>
                    <p><strong>Modificada:</strong> ${formatDate(slide.ask.modifiedAt)}</p>
                    <ul>
                        ${optionsHtml}
                    </ul>
                </div>
                ` : '<p>No hay pregunta asociada.</p>'}
            </div>
        `;
    }).join('');

    const html = `${Navbar()}
    <div class="container py-3">
        <h1 id="slide-index"></h1>
        <h2>Presentación: ${presentation.title}</h2>
        <p><strong>Estado activo:</strong> ${presentation.activityStatus ? 'Sí' : 'No'}</p>
        <p><strong>Creada:</strong> ${formatDate(presentation.createdAt)}</p>
        <p><strong>Modificada:</strong> ${formatDate(presentation.modifiedAt)}</p>
        <p><strong>ID Usuario creador:</strong> ${presentation.idUserCreat}</p>

        <hr>

        <h3>Slides (${presentation.slides.length})</h3>
        ${slidesHtml}
    </div>
    `;

    // RECIBIR SLIDE Y CAMBIARLO --> Acá se cambiaria el slide
    setTimeout(() => {
        const div = document.getElementById('slide-index');
        if(div) div.textContent = `Slide actual: ${getSlideActualIndex()}`;

        onSlideChanged((nuevoSlide) => {
            const d = document.getElementById('slide-index');
            if (d) d.textContent = `Slide actual: ${nuevoSlide}`;
        });
    }, 0);

    return html;
};
