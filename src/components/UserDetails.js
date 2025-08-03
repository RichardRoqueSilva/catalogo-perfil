import React from 'react';

// ===================================================================
// REQUISITOS ATENDIDOS NESTE ARQUIVO:
// - React JS: Props, Renderização Condicional
// - Bootstrap: Componente Card
// ===================================================================

function UserDetails({ user }) {
  // [React: Renderização Condicional] - Se nenhum usuário foi selecionado, mostra uma mensagem.
  if (!user) {
    return (
      <div className="alert alert-info" role="alert">
        Selecione um usuário na lista para ver os detalhes.
      </div>
    );
  }

  // Se um usuário foi selecionado, mostra seus detalhes em um card.
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text"><strong>Email:</strong> {user.email}</p>
        <p className="card-text"><strong>Telefone:</strong> {user.phone}</p>
        <p className="card-text"><strong>Website:</strong> {user.website}</p>
      </div>
    </div>
  );
}

export default UserDetails;