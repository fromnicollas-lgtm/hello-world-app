import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Lock,
  Layers,
  Sparkles,
  BookOpen,
  Award,
  Users,
  Compass,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const CONCURSOS = [
  {
    name: "AFA",
    title: "Academia da Força Aérea",
    description: "Aviação, Intendência e Infantaria com formação de Oficiais Aviadores.",
    badge: "Oficiais FAB",
    category: "Aeronáutica",
  },
  {
    name: "EFOMM",
    title: "Oficiais da Marinha Mercante",
    description: "CIAGA e CIABA. Alta remuneração global e carreira mercante internacional.",
    badge: "Marinha Mercante",
    category: "Marinha",
  },
  {
    name: "EsPCEx",
    title: "Cadetes do Exército",
    description: "A porta de entrada definitiva para a Academia Militar das Agulhas Negras (AMAN).",
    badge: "Oficiais Exército",
    category: "Exército",
  },
  {
    name: "Escola Naval",
    title: "Oficiais da Marinha do Brasil",
    description: "Corpo da Armada, Intendentes e Fuzileiros Navais de carreira.",
    badge: "Oficiais Marinha",
    category: "Marinha",
  },
  {
    name: "ESA",
    title: "Sargentos das Armas",
    description:
      "Sargentos Combatentes do Exército Brasileiro com estabilidade e plano de carreira.",
    badge: "Sargentos Exército",
    category: "Exército",
  },
  {
    name: "EEAR",
    title: "Especialistas de Aeronáutica",
    description:
      "Formação técnica e operacional na Escola de Especialistas da FAB em Guaratinguetá.",
    badge: "Sargentos FAB",
    category: "Aeronáutica",
  },
  {
    name: "EPCAR",
    title: "Cadetes do Ar",
    description: "Ensino Médio de excelência e ingresso direto garantido na AFA.",
    badge: "Ensino Médio FAB",
    category: "Aeronáutica",
  },
  {
    name: "Colégio Naval",
    title: "Ensino Médio Preparatório",
    description: "A mais tradicional instituição militar de ensino médio preparatório da Marinha.",
    badge: "Ensino Médio Marinha",
    category: "Marinha",
  },
];

const FEATURES = [
  {
    icon: Database,
    title: "Banco de Questões Inteligente",
    description:
      "Filtros por concurso, matéria, ano, banca e dificuldade, com gabaritos detalhados.",
  },
  {
    icon: Award,
    title: "Simulados Inéditos & Rankings",
    description:
      "Provas com cronômetro real, estatísticas de desempenho comparativo e pontuação precisa.",
  },
  {
    icon: Compass,
    title: "Cronogramas & Planejamento",
    description:
      "Ciclos de estudo dinâmicos com metas diárias, registro de sessões e revisões periódicas.",
  },
  {
    icon: Users,
    title: "Mentorias & Comunidade",
    description:
      "Acompanhamento estratégico por aprovados e canais de discussão focados por carreira.",
  },
  {
    icon: Lock,
    title: "Segurança & RLS Nativo",
    description:
      "Isolamento estrito de dados com Row Level Security no PostgreSQL para alunos, professores e admins.",
  },
  {
    icon: Layers,
    title: "Ecossistema Integrado",
    description:
      "Afiliados, clipadores, videoaulas, flashcards e gamificação unidos em uma única plataforma SaaS.",
  },
];

function Index() {
  const { user, isConfigured } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-foreground selection:text-background">
      <Navbar />

      <main className="flex-1">
        {/* Banner de status do Supabase (elegante e sutil) */}
        {!isConfigured && (
          <div className="border-b border-border/80 bg-secondary/60 py-2.5 px-4 text-center text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Ambiente de Demonstração Ativo:</span>{" "}
            As variáveis{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-mono text-foreground">
              VITE_SUPABASE_URL
            </code>{" "}
            não estão configuradas localmente. Você pode testar cadastro e login de simulação
            perfeitamente!
          </div>
        )}

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/40 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/50 px-3.5 py-1 text-xs font-medium text-foreground mb-8">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Nova Geração em Educação Militar de Elite</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl sm:leading-[1.15]">
                MINERVA EDUCAÇÃO
              </h1>

              <p className="mt-4 text-lg font-medium text-muted-foreground sm:text-xl">
                Preparação de alta performance e rigor acadêmico para os concursos militares mais
                disputados do Brasil.
              </p>

              <p className="mt-2 text-sm text-muted-foreground/80 max-w-xl mx-auto">
                Metodologia orientada a resultados, banco de questões classificado, simulados
                analíticos e acompanhamento de métricas para sua aprovação.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                {user ? (
                  <Button size="lg" className="w-full sm:w-auto font-semibold px-8" asChild>
                    <Link to="/app">
                      Acessar Meu Painel
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto font-semibold px-8 bg-foreground text-background hover:bg-foreground/90"
                      asChild
                    >
                      <Link to="/register">
                        Iniciar Preparação
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto font-medium"
                      asChild
                    >
                      <Link to="/login">Já possuo uma conta</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Badges de Confiança */}
              <div className="mt-14 pt-8 border-t border-border/40 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  <span>8 Carreiras Oficiais</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  <span>Row Level Security</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  <span>Arquitetura SaaS Modular</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  <span>Foco em Alta Performance</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carreiras Militares Contempladas */}
        <section id="concursos" className="py-20 sm:py-28 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Carreiras Atendidas
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-foreground mt-1">
                  Concursos Militares em Foco
                </h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Estrutura acadêmica desenhada especificamente para cada edital, permitindo futura
                expansão sem reconstrução de código.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CONCURSOS.map((contest) => (
                <Card
                  key={contest.name}
                  className="group relative border border-border/80 bg-card hover:border-foreground/40 transition-all duration-200 hover:shadow-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black tracking-tight text-foreground">
                        {contest.name}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-semibold tracking-wide uppercase"
                      >
                        {contest.badge}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">{contest.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {contest.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recursos e Pilares da Plataforma */}
        <section id="metodologia" className="py-20 sm:py-28 border-t border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Metodologia & Tecnologia
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mt-1">
                Uma Plataforma Completa e Escalável
              </h2>
              <p className="text-sm text-muted-foreground mt-3">
                Projetada para atender desde o primeiro dia até a fase final de aprovação com
                tecnologia de ponta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="flex flex-col p-6 rounded-xl border border-border/60 bg-card hover:bg-secondary/20 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-lg bg-foreground text-background flex items-center justify-center mb-4">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{feat.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Chamada Final para Ação */}
        <section className="border-t border-border/40 bg-secondary/40 py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Construa sua aprovação com rigor e método.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
              Crie sua conta agora e tenha acesso imediato à estrutura acadêmica da Minerva
              Educação.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button
                size="lg"
                className="font-semibold bg-foreground text-background hover:bg-foreground/90"
                asChild
              >
                <Link to="/register">
                  Criar Minha Conta Gratuita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
