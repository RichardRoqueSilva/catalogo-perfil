import React, { useReducer, useMemo } from 'react';
import { useTheme } from './context/ThemeContext';
import { appReducer, initialState } from './reducers/appReducer';
import { useUsers } from './hooks/useUsers';

import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import StatsPanel from './components/StatsPanel';
import './App.css';

function App() {
  // 1. Usando o useReducer para gerenciar todo o estado da aplicação.
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { users, selectedUser, loading, error, searchTerm } = state;

  // 2. Usando nosso hook customizado para buscar os dados.
  useUsers(dispatch);

  // 3. Usando nosso contexto de tema.
  const { theme, toggleTheme } = useTheme();

  // 4. Usando `useMemo` para otimizar a filtragem.
  // A lista só será refiltrada se `users` ou `searchTerm` mudarem.
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    // Aplicando a classe do tema dinamicamente
    <div className={`app-container ${theme}`}>
      <div className="container py-4">
        <header className="text-center p-3 mb-4 rounded shadow-sm header-custom">
          <h1>Catálogo de Perfis v2.0</h1>
          <button className="btn btn-sm btn-secondary" onClick={toggleTheme}>
            Alternar para Modo {theme === 'light' ? 'Escuro' : 'Claro'}
          </button>
        </header>

        <div className="row mb-4">
          <div className="col">
            <input
              type="search"
              className="form-control"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={e => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
              aria-label="Buscar por nome" // Melhoria de Acessibilidade
            />
          </div>
        </div>
        
        <main className="row">
          <section className="col-md-5" aria-labelledby="user-list-heading">
            <h2 id="user-list-heading" className="h4 mb-3">Lista de Usuários</h2>
            <StatsPanel users={filteredUsers} />
            {loading && <p role="status">Carregando...</p>} 
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {!loading && !error && (
              <UserList
                users={filteredUsers}
                selectedUser={selectedUser}
                onSelectUser={(user) => dispatch({ type: 'SET_SELECTED_USER', payload: user })}
              />
            )}
          </section>

          <section className="col-md-7" aria-labelledby="user-details-heading">
            <h2 id="user-details-heading" className="h4 mb-3">Detalhes do Usuário</h2>
            <UserDetails user={selectedUser} />
          </section>
        </main>
        
        {/* ======================= INÍCIO DA INTEGRAÇÃO CORRIGIDA ======================= */}
        <footer className="text-center mt-5 border-top pt-3 footer-custom">
          <p>
            Esta aplicação demonstra conceitos modernos de React. Para ver uma demonstração de manutenção em sistemas legados, acesse a página com jQuery.
          </p>
          {/*
            Este é um link HTML padrão (<a>). Ele causa um recarregamento completo da página,
            transportando o usuário da aplicação React (SPA) para a página HTML estática.
            Este é o método correto e seguro para navegar entre um sistema React e uma página legada.
          */}
          <a href="/legacy.html" className="btn btn-outline-warning btn-sm">
            Acessar Página Legada (jQuery)
          </a>
        </footer>
        {/* ======================= FIM DA INTEGRAÇÃO CORRIGIDA ======================= */}
        
      </div>
    </div>
  );
}

export default App;