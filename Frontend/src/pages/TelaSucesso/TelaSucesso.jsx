import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TelaSucesso.css';

const TelaSucesso = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        
        <h1 className="success-title">Resposta Registrada!</h1>
        
        <p className="success-message">
          Obrigado. Sua participação é fundamental para a organização e 
          formalização da reposição de aula.
        </p>

        <div className="success-footer">
          <p>Você já pode fechar esta aba com segurança.</p>
        </div>
        
        {/* Um botão  para o aluno voltar para algum site institucional, senão, remover. */}
        <button 
          className="btn-voltar" 
          onClick={() => window.location.href = 'https://ifce.edu.br/boaviagem'}
        >
          Ir para o site do IFCE
        </button>
      </div>
    </div>
  );
};

export default TelaSucesso;