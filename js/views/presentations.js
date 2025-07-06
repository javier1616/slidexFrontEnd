import Navbar from '../../components/navbar_auth.js';
import { getPresentationAll, getPresentationsByUser } from '../api.js';

export default async () => {
  let presentations = [];

  try {
    const token = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');

    presentations = await getPresentationsByUser(userId, token);
  } catch (err) {
    console.error('Error al cargar presentaciones:', err);
  }

  const listItems = presentations.map((p, i) => {
    const slideQty = p.slides?.length ?? 0;
    const safeTitle = p.title?.trim() || `Presentación ${i + 1}`;

    return `
      <div class="sx-item">
        <div class="sx-item__info">
          <strong class="sx-item__title">
            <i class="bi bi-easel2-fill me-2"></i>${safeTitle}
          </strong>
          <span class="sx-badge">
            <i class="bi bi-file-slides me-1"></i>Contiene ${slideQty} slide${slideQty !== 1 ? 's' : ''}
          </span>
        </div>

        <div class="sx-buttons">
          <button id="present-presentation-${p.id}" data-id="${p.id}" data-action="present" class="sx-btn sx-btn--primary">
            <i class="bi bi-play-fill me-1"></i>Presentar
          </button>
          <a href="#/presentations/edit/${p.id}" class="sx-btn sx-btn--secondary">
            <i class="bi bi-pencil-square me-1"></i>Editar
          </a>
          <button id="delete-presentation-${p.id}" data-id="${p.id}" data-action="delete" class="sx-btn sx-btn--danger">
            <i class="bi bi-trash3 me-1"></i>Eliminar
          </button>
        </div>
      </div>`;
  }).join('');

  return /*html*/`
    ${Navbar()}
    <section class="sx-container container">
      <h2 class="sx-heading">
        <i class="bi bi-layout-text-window me-2"></i>Lista de presentaciones
      </h2>

      <div class="sx-list">
        ${listItems || '<p class="text-muted"><i class="bi bi-info-circle me-1"></i>No hay presentaciones disponibles.</p>'}
      </div>
    </section>`;
};
