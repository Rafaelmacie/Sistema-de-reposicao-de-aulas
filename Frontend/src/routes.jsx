// src/routes.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layout e Contexto
import App from "./App.jsx";
import { useAuth } from "./context/AuthContext";

// Páginas Gerais/Autenticação
import InicioPage from "./pages/InicioPage.jsx";
import Login from './pages/Login/Login.jsx';
import CadastroPage from './pages/CadastroPage/CadastroPage.jsx';

// Páginas Públicas - Sem Navbar
import PaginaAssinatura from "./pages/PaginaAssinatura/PaginaAssinatura.jsx";
import TelaSucesso from "./pages/TelaSucesso/TelaSucesso.jsx";
import CadastroAlunoPage from './pages/CadastroAlunoPage/CadastroAlunoPage.jsx';

// Páginas Privadas - Com Navbar
import CoordenadorDashboard from "./pages/CoordenadorDashboard/CoordenadorDashboard.jsx";
import GerenciarProfessores from "./pages/GerenciarProfessores/GerenciarProfessores.jsx";
import ProfessorDashboard from "./pages/ProfessorDashboard/ProfessorDashboard.jsx";
import GerenciarTurmas from './pages/GerenciarTurmas/GerenciarTurmas.jsx';
import AprovarReposicoes from './pages/AprovarReposicoes/AprovarReposicoes.jsx';
import VisualizarAssinaturasPage from './pages/VisualizarAssinaturasPage/VisualizarAssinaturasPage.jsx';
import SolicitarReposicaoPage from './pages/SolicitarReposicoes/SolicitarReposicoes.jsx';
import MinhasReposicoesPage from './pages/MinhasReposicoes/MinhasReposicoes.jsx';
import ConfirmarAula from './pages/ConfirmarAula/ConfirmarAula.jsx';

/**
 * Componente Wrapper para proteger rotas privadas.
 * Se não estiver autenticado, redireciona para o login.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
  // Rotas públicas
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/assinar/:id_solicitacao/:matricula_aluno",
    element: <PaginaAssinatura />,
  },
  {
    path: "/obrigado",
    element: <TelaSucesso />,
  },
  {
    path: "/cadastro/aluno",
    element: <CadastroAlunoPage />,
  },
  {
    path: "/cadastro/:token_seguro",
    element: <CadastroPage />
  },

  // Rotas Privadas
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <InicioPage />,
      },
      {
        path: "/inicio",
        element: <InicioPage />,
      },
      // Coordenador
      {
        path: "/coordenador/dashboard",
        element: <CoordenadorDashboard />,
      },
      {
        path: "/coordenador/professores",
        element: <GerenciarProfessores />,
      },
      {
        path: '/coordenador/turmas',
        element: <GerenciarTurmas />,
      },
      {
        path: '/coordenador/aprovar-reposicoes',
        element: <AprovarReposicoes />,
      },
      // Professor
      {
        path: "/professor/dashboard",
        element: <ProfessorDashboard />,
      },
      {
        path: "/professor/minhas-reposicoes",
        element: <MinhasReposicoesPage />,
      },
      {
        path: '/professor/reposicao/:id_solicitacao/assinaturas',
        element: <VisualizarAssinaturasPage />,
      },
      {
        path: "/professor/solicitar-reposicao",
        element: <SolicitarReposicaoPage />,
      },
      {
        path: "/professor/confirmar-aula",
        element: <ConfirmarAula />,
      },
    ],
  },

  // Rota de 404 ou redirecionamento caso a rota não exista
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  }
]);