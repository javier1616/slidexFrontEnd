import Navbar from '../../components/navbar.js';

export default async () => { 

  return `
     ${Navbar()}
    <div class="container">
      <h2>Otra vista</h2>
      <a href="#/" class="btn btn-primary">Ir a Home</a>
    </div>`;
};
