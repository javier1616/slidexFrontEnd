import Navbar from '../../components/navbar_auth.js';

export default () => {
    const access_token = localStorage.getItem('access_token');
    const expires_in = localStorage.getItem('expires_in');
    const refresh_token = localStorage.getItem('refresh_token');
    const role = localStorage.getItem('role');
    const token_type = localStorage.getItem('token_type');
    const user_id = localStorage.getItem('user_id');
    const user_name = localStorage.getItem('user_name');
  
    return `${Navbar()}
      <div class="container mt-4">
        <h2>Sesión Iniciada</h2>
        <div class="card p-3">
          <p><strong>Access Token:</strong> ${access_token}</p>
          <p><strong>User Name:</strong> ${user_name}</p>
          <p><strong>Expires In:</strong> ${expires_in}</p>
          <p><strong>Refresh Token:</strong> ${refresh_token}</p>
          <p><strong>Role:</strong> ${role}</p>
          <p><strong>Token Type:</strong> ${token_type}</p>
          <p><strong>User ID:</strong> ${user_id}</p>
        </div>
      </div>
    `;
  };
