// src/components/LegacyPageViewer.js
import React from 'react';

function LegacyPageViewer() {
  return (
    <div>
      <h2>Visualizador de Página Legada</h2>
      <p>O conteúdo abaixo está sendo carregado de um arquivo HTML separado via iframe.</p>
      <iframe
        src="/legacy.html"
        title="Página Legada com jQuery"
        style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}
      />
    </div>
  );
}

export default LegacyPageViewer;