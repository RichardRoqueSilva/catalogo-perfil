import React from 'react';

// REQUISITOS ATENDIDOS:
// - React JS: Props, Renderização Condicional de Classes
// - HTML5: Uso de <button> para acessibilidade em itens acionáveis
// - UX: Fornece feedback visual claro para o item selecionado

// O componente recebe `selectedUser` do componente pai (`App.js`)
// para saber qual item deve ser marcado como ativo.
function UserList({ users, onSelectUser, selectedUser }) {
  return (
    <div className="list-group user-list">
      {users.map(user => (
        <button
          key={user.id}
          type="button"
          // --- AQUI ESTÁ A LÓGICA DA SELEÇÃO ---
          // Usamos um template literal para construir a string de classes dinamicamente.
          // 1. As classes base são sempre aplicadas.
          // 2. Usamos um operador ternário:
          //    - SE `selectedUser` existir E seu ID for igual ao ID do `user` atual...
          //    - ENTÃO adicionamos a string ' active'
          //    - SENÃO, adicionamos uma string vazia ''
          className={`list-group-item list-group-item-action ${
            selectedUser && selectedUser.id === user.id ? 'active' : ''
          }`}
          onClick={() => onSelectUser(user)}
        >
          {user.name}
        </button>
      ))}
    </div>
  );
}

export default UserList;