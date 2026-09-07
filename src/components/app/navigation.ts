import {
  BookOpen,
  CalendarRange,
  CircleHelp,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  MessagesSquare,
  Radio,
  Settings,
  Target,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  description?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/**
 * Estrutura de navegação da área autenticada.
 * Os módulos serão implementados progressivamente; aqui definimos a arquitetura.
 */
export const navGroups: NavGroup[] = [
  {
    label: "Visão geral",
    items: [
      {
        label: "Início",
        to: "/app",
        icon: LayoutDashboard,
        description: "Resumo da sua preparação",
      },
    ],
  },
  {
    label: "Estudar",
    items: [
      { label: "Cursos", to: "/app/cursos", icon: BookOpen, description: "Trilhas e videoaulas" },
      {
        label: "Questões",
        to: "/app/questoes",
        icon: Target,
        description: "Banco de questões por assunto",
      },
      {
        label: "Simulados",
        to: "/app/simulados",
        icon: GraduationCap,
        description: "Provas completas cronometradas",
      },
    ],
  },
  {
    label: "Acompanhamento",
    items: [
      {
        label: "Planejamento",
        to: "/app/planejamento",
        icon: CalendarRange,
        description: "Cronograma e metas de estudo",
      },
      {
        label: "Desempenho",
        to: "/app/desempenho",
        icon: LineChart,
        description: "Estatísticas e evolução",
      },
      {
        label: "Mentorias",
        to: "/app/mentorias",
        icon: Compass,
        description: "Acompanhamento tático",
      },
    ],
  },
  {
    label: "Comunidade",
    items: [
      { label: "Lives", to: "/app/lives", icon: Radio, description: "Aulas ao vivo e revisões" },
      {
        label: "Comunidade",
        to: "/app/comunidade",
        icon: MessagesSquare,
        description: "Discussões e dúvidas",
      },
    ],
  },
  {
    label: "Conta",
    items: [
      { label: "Perfil", to: "/app/perfil", icon: UserRound, description: "Seus dados" },
      {
        label: "Configurações",
        to: "/app/configuracoes",
        icon: Settings,
        description: "Preferências da plataforma",
      },
      { label: "Ajuda", to: "/app/ajuda", icon: CircleHelp, description: "Suporte e dúvidas" },
    ],
  },
];

export const allNavItems: NavItem[] = navGroups.flatMap((g) => g.items);
