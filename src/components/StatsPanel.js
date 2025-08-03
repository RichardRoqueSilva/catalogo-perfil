import React, { useMemo } from 'react';

// Este componente recebe a lista de usuários e calcula estatísticas.
function StatsPanel({ users }) {
  // `useMemo` "memoriza" o resultado de uma computação.
  // O cálculo só será refeito se a dependência `users` mudar.
  // Isso evita recálculos caros a cada renderização (ex: quando o tema muda).
  const totalUsers = useMemo(() => {
    console.log("Calculando total de usuários..."); // Para ver no console quando é executado
    return users.length;
  }, [users]);

  // Exemplo com `.reduce()`: aqui, estamos apenas contando, mas poderia ser
  // para somar valores, agrupar, etc.
  const userCountWithReduce = useMemo(() => {
    console.log("Calculando com reduce...");
    // `reduce` recebe um acumulador (acc) e o item atual (user).
    // Começa com o acumulador em 0.
    return users.reduce((acc, user) => acc + 1, 0);
  }, [users]);


  return (
    <div className="card bg-light mb-4">
      <div className="card-body">
        <h5 className="card-title">Estatísticas</h5>
        <p className="card-text">Total de Usuários na Lista: <strong>{totalUsers}</strong></p>
      </div>
    </div>
  );
}

export default StatsPanel;