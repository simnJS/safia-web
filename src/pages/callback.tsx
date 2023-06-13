import { useEffect } from 'react';
import axios from 'axios';
import { stringify } from 'querystring';

const Callback = () => {
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const code = new URLSearchParams(window.location.search).get('code');
        const response = await axios.post('http://localhost:3000/api/auth/callback', { code });
        const token = await response.data.token;

        localStorage.setItem('token', token);

        // Redirigez l'utilisateur vers votre tableau de bord ou la page souhaitée
        window.location.href = '/dashboard';
      } catch (error) {
        console.error(error);
      }
    };

    fetchToken();
  }, []);

  return <div>Redirection en cours...</div>;
};

export default Callback;
