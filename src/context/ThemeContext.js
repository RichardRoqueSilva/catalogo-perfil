import React, { createContext, useState, useContext } from 'react';

// 1. Criamos o Contexto. Ele vai expor o tema e a função para trocá-lo.
const ThemeContext = createContext();

// 2. Criamos o "Provedor" (Provider). É um componente que vai encapsular nossa aplicação
// e fornecer o estado do tema para todos os componentes filhos.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light'); // Estado inicial: 'light'

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // O `value` do Provider é o que será acessível por todos os componentes filhos.
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Criamos um hook customizado para facilitar o uso do contexto.
// Em vez de importar `useContext` e `ThemeContext` em todo lugar,
// só importaremos `useTheme`.
export function useTheme() {
  return useContext(ThemeContext);
}