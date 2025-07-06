export default () => {
  return `
  <nav class="navbar navbar-expand-lg custom-navbar-2">
    <div class="container-fluid">
      <a class="navbar-brand fade-in d-flex align-items-center" href="#/home">
      <img src="http://127.0.0.1:5501/img/favicon.png" alt="SlideX logo" width="72" height="65" class="me-2">
      SlideX
      </a>


      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">

          <li class="nav-item">
            <a class="nav-link" href="#/home">
              <i class="bi bi-house-door-fill me-2"></i>Home
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#/joinsession">
              <i class="bi bi-people-fill me-2"></i>Unirse a sesión
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#/presentations/create">
              <i class="bi bi-plus-square-fill me-2"></i>Crear presentación
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#/presentations">
              <i class="bi bi-collection-play-fill me-2"></i>Mis presentaciones
            </a>
          </li>
        </ul>

        <ul class="navbar-nav ms-auto">
          <li class="nav-item auth">
            <a class="nav-link" href="#/account">
              <i class="bi bi-person-circle me-2"></i>Mi cuenta
            </a>
          </li>
          <li class="nav-item auth">
            <a class="nav-link" href="#/landing">
              <i class="bi bi-box-arrow-right me-2"></i>Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `;
};
