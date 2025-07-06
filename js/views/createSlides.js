import Navbar from '../../components/navbar_auth.js';
import { createSlide } from '../../js/api.js';

export default () => {
  return `${Navbar()}
    <div class="container mt-4">
      <h2>Agregar Slide</h2>
      <form id="formCreateSlide">
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input type="text" id="slideTitle" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Color de fondo</label>
          <input type="color" id="backgroundColor" class="form-control form-control-color" value="#ffffff"/>
        </div>
        <div class="mb-3">
          <label class="form-label">URL de imagen</label>
          <input type="url" id="slideUrl" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success">Agregar Slide</button>
      </form>
    </div>
  `;
};

document.addEventListener("submit", async (e) => {
  if (e.target.id === "formCreateSlide") {
    e.preventDefault();

    const slide = {
      title: document.getElementById("slideTitle").value,
      backgroundColor: document.getElementById("backgroundColor").value,
      url: document.getElementById("slideUrl").value,
      idPresentation: localStorage.getItem("presentationId"),
      position: 1 
    };

    const token = localStorage.getItem("token");

    try {
      await createSlide(slide, token);
      alert("Slide creada con éxito");
    } catch (error) {
      alert("Error al crear slide");
    }
  }
});
