import { useEffect } from 'react';
import axios from 'axios';

// Um Hook customizado é uma função JavaScript que começa com "use" e pode chamar outros Hooks.
// Ele nos permite extrair e reutilizar lógica com estado (stateful logic).
export function useUsers(dispatch) {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        // Em vez de chamar `setUsers`, disparamos uma ação para o reducer.
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: 'Falha ao buscar dados.' });
      }
    };

    fetchUsers();
    // O dispatch é garantido pelo React como estável, mas é boa prática incluí-lo.
  }, [dispatch]);
}