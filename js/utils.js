export function resetStorage() {
    localStorage.clear();
    localStorage.removeItem('slidex_initialized'); // para que vuelva a limpiar en la próxima carga
  }
  