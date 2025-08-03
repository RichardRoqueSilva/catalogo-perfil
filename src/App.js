import React, { useReducer, useMemo } from 'react';
import { useTheme } from './context/ThemeContext';
import { appReducer, initialState } from './reducers/appReducer';
import { useUsers } from './hooks/useUsers';

import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import StatsPanel from './components/StatsPanel';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { users, selectedUser, loading, error, searchTerm } = state;

  useUsers(dispatch);

  const { theme, toggleTheme } = useTheme();

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div className={`app-container ${theme}`}>
      <div className="container py-4">
        <header className="text-center p-3 mb-4 rounded shadow-sm header-custom">
          <h1>Catálogo de Perfis v2.0 (React)</h1>
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
              aria-label="Buscar por nome"
            />
          </div>
        </div>
        
        <main className="row">
          <section className="col-md-5" aria-labelledby="user-list-heading">
            <h2 id="user-list-heading" className="h4 mb-3">Lista de Usuários</h2>

            {/* ===== PONTO FORTE DO REACT ===== */}
            <div className="card bg-light mb-4">
                <div className="card-body">
                    <h5 className="card-title">Ponto Forte do React: Reatividade</h5>
                    <p className="card-text small">
                        O estado é centralizado. Quando você busca, a lista e o painel de estatísticas
                        atualizam juntos, instantaneamente.
                    </p>
                    <StatsPanel users={filteredUsers} />
                </div>
            </div>
            
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

            {selectedUser && (
            <div className="card mt-4 border-danger">
                <div className="card-body">
                    <h5 className="card-title text-danger">Ponto Fraco (Potencial) do Bootstrap</h5>
                    <p className="card-text small">
                        Aparência genérica "Bootstrap". Para um design único, seria necessário
                        sobrescrever muitas classes, o que pode aumentar a complexidade do CSS.
                    </p>
                </div>
            </div>
            )}

          </section>
        </main>
        
        <footer className="text-center mt-5 border-top pt-3 footer-custom">
          <p className="mb-2"><strong>Navegar para outras versões:</strong></p>
          <div>
            <a href="/legacy.html" className="btn btn-outline-warning btn-sm m-1">
              jQuery + Bootstrap
            </a>
            <a href="/custom-css.html" className="btn btn-outline-info btn-sm m-1">
              Vanilla JS + Custom CSS
            </a>

          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;