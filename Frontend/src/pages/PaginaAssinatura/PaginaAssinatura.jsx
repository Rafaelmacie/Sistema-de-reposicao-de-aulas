// PaginaAssinatura/PaginaAssinatura.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buscar_reposicao_por_id, assinar_reposicao } from '../../services/api';
import './PaginaAssinatura.css';

const PaginaAssinatura = () => {
    const { id_solicitacao, matricula_aluno } = useParams();
    const navigate = useNavigate();

    const [solicitacao, setSolicitacao] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const data = await buscar_reposicao_por_id(id_solicitacao);
                setSolicitacao(data);
            } catch (error) {
                console.error("Erro ao buscar solicitação:", error);
            } finally {
                setLoading(false);
            }
        };
        carregarDados();
    }, [id_solicitacao]);

    const handleVoto = async (concorda) => {
        setEnviando(true);
        try {
            // ✅ Usando a função do api.js que já tem a rota correta
            await assinar_reposicao(id_solicitacao, {
                matricula_aluno: parseInt(matricula_aluno),
                concorda: concorda
            });
            navigate('/obrigado');
        } catch (error) {
            alert(error.message || "Erro ao processar assinatura.");
        } finally {
            setEnviando(false);
        }
    };

    if (loading) return <div className="loading-state">Buscando informações da aula...</div>;
    if (!solicitacao) return <div className="loading-state">Solicitação não encontrada ou expirada.</div>;

    return (
        <div className="assinatura-container">
            <div className="assinatura-card">
                <div className="assinatura-header">
                    <h1>Assinatura de Reposição</h1>
                </div>

                <div className="assinatura-detalhes">
                    <div className="info-item">
                        <label>Motivo</label>
                        <p>{solicitacao.motivo}</p>
                    </div>
                    <div className="info-item">
                        <label>Data Agendada</label>
                        <p>{new Date(solicitacao.data).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="info-item">
                        <label>Horário e Sala</label>
                        <p>{solicitacao.horario} — Sala {solicitacao.sala}</p>
                    </div>
                </div>

                <div className="assinatura-pergunta">
                    <h3>Você concorda com esta reposição?</h3>
                    <div className="assinatura-acoes">
                        <button
                            className="btn btn-sim"
                            onClick={() => handleVoto(true)}
                            disabled={enviando}
                        >
                            {enviando ? "Gravando..." : "Sim, concordo"}
                        </button>
                        <button
                            className="btn btn-nao"
                            onClick={() => handleVoto(false)}
                            disabled={enviando}
                        >
                            Não concordo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginaAssinatura;