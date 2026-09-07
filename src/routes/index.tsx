import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  BarChart3,
  Calendar,
  Layers,
  Sparkles,
  BookOpen,
  Award,
  Users,
  Compass,
  Repeat,
  Video,
  FileText,
  Play,
  Check,
  ChevronRight,
  ShieldCheck,
  Target,
  Clock,
  Flame,
  HelpCircle,
  TrendingUp,
  LayoutDashboard,
  BrainCircuit,
  SlidersHorizontal,
  FolderTree,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

// 8 Concursos Militares
const CONCURSOS = [
  {
    id: "afa",
    name: "AFA",
    title: "Academia da Força Aérea",
    description: "Preparação para Oficiais Aviadores, Intendentes e de Infantaria da Aeronáutica.",
    badge: "Aeronáutica",
  },
  {
    id: "efomm",
    name: "EFOMM",
    title: "Oficiais da Marinha Mercante",
    description: "Formação para Oficiais de Náutica e de Máquinas no CIAGA (RJ) e CIABA (PA).",
    badge: "Marinha Mercante",
  },
  {
    id: "espcex",
    name: "EsPCEx",
    title: "Cadetes do Exército",
    description:
      "A preparação completa para o ingresso na AMAN e na carreira de Oficial do Exército.",
    badge: "Exército",
  },
  {
    id: "escola-naval",
    name: "Escola Naval",
    title: "Oficiais da Marinha do Brasil",
    description: "Corpo da Armada, Fuzileiros Navais e Intendentes da Marinha.",
    badge: "Marinha",
  },
  {
    id: "esa",
    name: "ESA",
    title: "Sargentos das Armas",
    description: "Preparação para as especialidades de combate do Exército Brasileiro.",
    badge: "Exército",
  },
  {
    id: "eear",
    name: "EEAR",
    title: "Especialistas de Aeronáutica",
    description: "Formação técnica de Sargentos da FAB em diversas especialidades operacionais.",
    badge: "Aeronáutica",
  },
  {
    id: "epcar",
    name: "EPCAR",
    title: "Cadetes do Ar",
    description: "Ensino Médio de elite e acesso preferencial direto à Academia da Força Aérea.",
    badge: "Aeronáutica",
  },
  {
    id: "colegio-naval",
    name: "Colégio Naval",
    title: "Ensino Médio Preparatório",
    description: "Tradicional instituição preparatória de Ensino Médio da Marinha do Brasil.",
    badge: "Marinha",
  },
];

// 8 Recursos da Plataforma
const RECURSOS = [
  {
    icon: BookOpen,
    title: "Cursos",
    description: "Conteúdo organizado em uma jornada de estudos.",
    tag: "Teoria Estruturada",
  },
  {
    icon: Database,
    title: "Banco de questões",
    description: "Pratique por concurso, matéria e assunto.",
    tag: "Filtros Dinâmicos",
  },
  {
    icon: Award,
    title: "Simulados",
    description: "Teste sua preparação em condições próximas da prova.",
    tag: "TRI & Cronômetro",
  },
  {
    icon: Calendar,
    title: "Planejamento",
    description: "Organize sua rotina e suas metas.",
    tag: "Ciclos Inteligentes",
  },
  {
    icon: BarChart3,
    title: "Desempenho",
    description: "Entenda exatamente onde precisa evoluir.",
    tag: "Métricas Reais",
  },
  {
    icon: Repeat,
    title: "Revisões",
    description: "Não deixe o conteúdo desaparecer depois de estudado.",
    tag: "Espaçamento Ativo",
  },
  {
    icon: Compass,
    title: "Mentorias",
    description: "Acompanhamento e orientação para sua preparação.",
    tag: "Estratégia Tática",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Aprenda, compartilhe e evolua com outros alunos.",
    tag: "Ambiente Focado",
  },
];

// 4 Etapas de Como Funciona
const ETAPAS = [
  {
    numero: "01",
    titulo: "Escolha seu objetivo",
    descricao: "Defina o concurso que você deseja alcançar.",
    detalhe: "Acesso imediato à trilha de matérias e pesos específicos do edital selecionado.",
  },
  {
    numero: "02",
    titulo: "Organize sua preparação",
    descricao: "Tenha acesso a conteúdos e ferramentas estruturadas.",
    detalhe:
      "Cronogramas diários adaptáveis e ciclo de estudos dividido por blocos de concentração.",
  },
  {
    numero: "03",
    titulo: "Estude e pratique",
    descricao: "Combine aulas, questões, revisões e simulados.",
    detalhe: "Resoluções comentadas alternativa por alternativa e PDFs sintetizados.",
  },
  {
    numero: "04",
    titulo: "Acompanhe sua evolução",
    descricao: "Use seus dados para melhorar sua estratégia.",
    detalhe: "Identificação imediata de pontos fracos com diagnósticos de acertos por assunto.",
  },
];

// Diferenciais
const DIFERENCIAIS = [
  {
    titulo: "Conteúdo estruturado",
    descricao: "Organização para você saber exatamente o que estudar.",
    detalhe: "Fim do desperdício de tempo com apostilas dispersas ou materiais desatualizados.",
    icone: FolderTree,
  },
  {
    titulo: "Dados para decidir",
    descricao: "Acompanhe seu desempenho e identifique oportunidades de melhoria.",
    detalhe: "Estatísticas precisas sobre onde você precisa de mais repetição e reforço.",
    icone: BrainCircuit,
  },
  {
    titulo: "Tudo em um só lugar",
    descricao: "Cursos, questões, simulados e planejamento integrados.",
    detalhe: "Sem a necessidade de assinar múltiplas plataformas para cobrir teoria e prática.",
    icone: Layers,
  },
  {
    titulo: "Experiência premium",
    descricao: "Uma plataforma criada para tornar sua preparação mais organizada.",
    detalhe: "Design limpo, navegação fluida, sem ruídos e foco total no seu aprendizado.",
    icone: ShieldCheck,
  },
];

// Planos Comerciais
const PLANOS = [
  {
    nome: "ESSENCIAL",
    descricao: "A base sólida de questões e simulados para consolidar sua preparação.",
    preco: "R$ 59",
    periodo: "/mês",
    destaque: false,
    badge: null,
    recursos: [
      "Acesso ao Banco de Questões Militares",
      "Filtros por concurso, banca e ano",
      "Gabaritos e resoluções completas",
      "Simulados inéditos periódicos",
      "Acompanhamento básico de acertos",
      "Suporte via central de ajuda",
    ],
    cta: "Começar com Essencial",
  },
  {
    nome: "COMPLETO",
    descricao: "O ecossistema completo de cursos, videoaulas, questões e planejamento.",
    preco: "R$ 97",
    periodo: "/mês",
    destaque: true,
    badge: "Mais escolhido",
    recursos: [
      "Tudo incluído no plano Essencial",
      "Cursos completos de todas as matérias",
      "Videoaulas de alta definição e apostilas PDF",
      "Módulo de Planejamento e Cronogramas",
      "Painel analítico avançado de desempenho",
      "Acesso à Comunidade oficial de alunos",
      "Revisões programadas e flashcards",
    ],
    cta: "Começar com Completo",
  },
  {
    nome: "PREMIUM",
    descricao: "Para quem busca mentoria estratégica individual e aceleração máxima.",
    preco: "R$ 189",
    periodo: "/mês",
    destaque: false,
    badge: "Máximo Desempenho",
    recursos: [
      "Tudo incluído no plano Completo",
      "Sessões periódicas com mentores",
      "Diagnóstico tático individual de rendimento",
      "Correção prioritária de redações",
      "Acesso antecipado a simulados de véspera",
      "Canal de contato direto com a equipe pedagógica",
    ],
    cta: "Começar com Premium",
  },
];

// Perguntas Frequentes (FAQ)
const FAQS = [
  {
    pergunta: "Para quais concursos a Minerva Educação oferece preparação?",
    resposta:
      "A plataforma foca especificamente nos principais concursos militares brasileiros: AFA (Aeronáutica), EFOMM (Marinha Mercante), EsPCEx (Exército), Escola Naval (Marinha), ESA (Sargentos do Exército), EEAR (Sargentos da Aeronáutica), EPCAR e Colégio Naval. A arquitetura modular da Minerva foi construída para permitir a expansão para novos vestibulares futuramente.",
  },
  {
    pergunta: "Posso estudar pelo celular?",
    resposta:
      "Sim. A plataforma foi desenvolvida com arquitetura mobile-first, sendo 100% responsiva em smartphones, tablets, notebooks e desktops, permitindo assistir aulas, resolver questões e acompanhar seu cronograma de onde estiver com conforto e fluidez.",
  },
  {
    pergunta: "Como funcionam os cursos?",
    resposta:
      "Cada curso é organizado em trilhas de aprendizagem estruturadas por módulos e lições progressivas. Cada aula conta com videoaulas objetivas, apostilas e materiais complementares em PDF, além de listas de fixação com questões de provas anteriores do respectivo concurso.",
  },
  {
    pergunta: "Existe banco de questões?",
    resposta:
      "Sim. O Banco de Questões da Minerva permite filtrar por concurso militar, matéria, tópico do edital, dificuldade e ano. Cada questão conta com gabarito oficial e explicação detalhada da resposta correta.",
  },
  {
    pergunta: "Existem simulados?",
    resposta:
      "Sim. Oferecemos simulados com cronometragem em tempo real que reproduzem a estrutura, o número de itens e o tempo oficial das provas de cada carreira militar, gerando rankings e relatórios detalhados de acertos.",
  },
  {
    pergunta: "Como funciona a mentoria?",
    resposta:
      "O programa de mentoria conecta o estudante a mentores experientes que orientam o ciclo de estudos, analisam os dados de desempenho, definem metas de horas semanais e ajustam a estratégia de preparação para o edital almejado.",
  },
  {
    pergunta: "Como funciona o período de teste?",
    resposta:
      "Garantimos transparência absoluta: você pode se cadastrar gratuitamente para conhecer a interface e a estrutura da plataforma. Nas assinaturas pagas, você conta com garantia incondicional de 7 dias para cancelamento com reembolso integral caso decida não continuar.",
  },
  {
    pergunta: "Posso cancelar minha assinatura?",
    resposta:
      "Sim, a qualquer momento e com apenas um clique diretamente no painel da sua conta, sem multas, carências ou burocracia. O acesso continuará ativo até o encerramento do ciclo mensal já contratado.",
  },
];

function LandingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "curso" | "questoes" | "simulado" | "desempenho"
  >("dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-white text-foreground selection:bg-foreground selection:text-background font-sans antialiased">
      <Navbar />

      <main className="flex-1">
        {/* ==================================================================== */}
        {/* HERO SECTION                                                         */}
        {/* ==================================================================== */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/60 px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-foreground">
                <Sparkles className="h-3 w-3" />
                <span>PREPARAÇÃO DE ALTO DESEMPENHO</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl sm:leading-[1.12]">
                Sua aprovação começa com uma estratégia melhor.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal">
                Uma plataforma completa para quem leva a preparação a sério. Cursos, questões,
                simulados, planejamento e acompanhamento em um só lugar.
              </p>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                {user ? (
                  <Button
                    size="lg"
                    className="w-full sm:w-auto font-semibold bg-foreground text-background hover:bg-foreground/90 h-12 px-7 text-sm shadow-sm"
                    asChild
                  >
                    <Link to="/app">
                      Acessar Meu Painel
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto font-semibold bg-foreground text-background hover:bg-foreground/90 h-12 px-7 text-sm shadow-sm"
                      asChild
                    >
                      <Link to="/register">
                        Começar agora
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto font-medium h-12 px-7 text-sm border-border/80 hover:bg-secondary/40"
                      asChild
                    >
                      <a href="#produto">Conhecer a plataforma</a>
                    </Button>
                  </>
                )}
              </div>

              {/* Trust Text */}
              <p className="pt-2 text-xs font-medium text-muted-foreground/90">
                Preparação para AFA, EFOMM, EsPCEx, Escola Naval, ESA, EEAR e outros concursos.
              </p>
            </div>

            {/* ================================================================ */}
            {/* HERO VISUAL (Mockup Realista da Área do Aluno)                   */}
            {/* ================================================================ */}
            <div className="mt-14 sm:mt-18 relative mx-auto max-w-5xl">
              {/* Moldura da Interface */}
              <div className="rounded-2xl border border-border/80 bg-white p-2 sm:p-3.5 shadow-xl shadow-foreground/5 ring-1 ring-border/50">
                <div className="rounded-xl border border-border/60 bg-secondary/15 overflow-hidden">
                  {/* Topo do navegador simulado */}
                  <div className="flex items-center justify-between border-b border-border/60 bg-white px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-border" />
                      <div className="h-2.5 w-2.5 rounded-full bg-border" />
                      <div className="h-2.5 w-2.5 rounded-full bg-border" />
                      <div className="ml-2 text-[11px] font-mono text-muted-foreground hidden sm:inline-block">
                        app.minervaeducacao.com.br
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] uppercase font-semibold text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>Interface do Aluno</span>
                    </div>
                  </div>

                  {/* Conteúdo do Mockup Realista */}
                  <div className="p-4 sm:p-6 space-y-5 bg-background">
                    {/* Header do Aluno */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/50 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Plano de Estudos Ativo
                          </span>
                          <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground">
                            EsPCEx 2026
                          </span>
                        </div>
                        <h2 className="text-lg font-bold text-foreground mt-0.5">
                          Painel de Preparação Integrada
                        </h2>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                          <p className="text-[11px] text-muted-foreground">
                            Meta diária de estudos
                          </p>
                          <p className="text-xs font-bold text-foreground">85 / 120 min</p>
                        </div>
                        <div className="h-9 w-9 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-xs">
                          M
                        </div>
                      </div>
                    </div>

                    {/* Grid de Cards da Interface */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Card 1: Curso em Andamento */}
                      <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium text-muted-foreground">
                            Curso Atual
                          </span>
                          <span className="text-[10px] font-semibold text-foreground bg-secondary px-1.5 py-0.5 rounded">
                            Física
                          </span>
                        </div>
                        <p className="text-sm font-bold text-foreground">
                          Mecânica: Dinâmica Newtoniana
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] text-muted-foreground">
                            <span>Progresso do Módulo</span>
                            <span>68%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full bg-foreground rounded-full"
                              style={{ width: "68%" }}
                            />
                          </div>
                        </div>
                        <div className="pt-1 flex items-center gap-1 text-[11px] text-foreground font-medium">
                          <Play className="h-3 w-3 fill-current" />
                          <span>Continuar aula 04</span>
                        </div>
                      </div>

                      {/* Card 2: Prática & Questões */}
                      <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium text-muted-foreground">
                            Banco de Questões
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            84% acertos
                          </span>
                        </div>
                        <p className="text-sm font-bold text-foreground">
                          1.420 questões resolvidas
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Última lista: Cinemática Escalar (AFA / EFOMM)
                        </p>
                        <div className="pt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-foreground" />
                          <span>Meta semanal atingida</span>
                        </div>
                      </div>

                      {/* Card 3: Próximo Simulado */}
                      <div className="rounded-xl border border-border/70 bg-card p-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium text-muted-foreground">
                            Simulado Agendado
                          </span>
                          <span className="text-[10px] font-semibold text-foreground bg-secondary px-1.5 py-0.5 rounded">
                            Domingo
                          </span>
                        </div>
                        <p className="text-sm font-bold text-foreground">
                          Simulado Geral EsPCEx #03
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          100 questões inéditas • Cronômetro oficial
                        </p>
                        <div className="pt-1 flex items-center gap-1.5 text-[11px] text-foreground font-medium">
                          <Clock className="h-3 w-3" />
                          <span>Duração: 4h30min</span>
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer de Mockup Transparente */}
                    <div className="pt-2 text-center">
                      <span className="text-[10px] text-muted-foreground/70 tracking-wide uppercase">
                        * Elementos visuais demonstrativos da experiência de estudos no Minerva
                        Educação
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO DE CONCURSOS                                                   */}
        {/* ==================================================================== */}
        <section
          id="concursos"
          className="py-20 sm:py-28 bg-secondary/25 border-b border-border/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <span className="text-xs font-bold tracking-wider text-foreground uppercase">
                Concursos Contemplados
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mt-1.5">
                Preparação para os grandes desafios
              </h2>
              <p className="text-sm text-muted-foreground mt-2.5">
                Escolha seu objetivo. A Minerva cuida do caminho.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CONCURSOS.map((contest) => (
                <Card
                  key={contest.id}
                  className="group relative border border-border/80 bg-white hover:border-foreground/50 transition-all duration-200 hover:shadow-xs flex flex-col justify-between"
                >
                  <CardContent className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-extrabold tracking-tight text-foreground">
                        {contest.name}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-medium border-border/80 uppercase"
                      >
                        {contest.badge}
                      </Badge>
                    </div>

                    <h3 className="text-xs font-semibold text-foreground">{contest.title}</h3>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {contest.description}
                    </p>

                    <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-foreground group-hover:text-foreground/80">
                      <span>Ver preparação</span>
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO DE RECURSOS                                                    */}
        {/* ==================================================================== */}
        <section id="cursos" className="py-20 sm:py-28 border-b border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <span className="text-xs font-bold tracking-wider text-foreground uppercase">
                Ecossistema Acadêmico
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mt-1.5">
                Tudo o que você precisa para evoluir.
              </h2>
              <p className="text-sm text-muted-foreground mt-2.5">
                Ferramentas integradas para cobrir todas as etapas da sua jornada de preparação.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {RECURSOS.map((rec) => {
                const IconComponent = rec.icon;
                return (
                  <div
                    key={rec.title}
                    id={rec.title.toLowerCase().replace(/\s+/g, "-")}
                    className="p-6 rounded-xl border border-border/70 bg-white hover:border-foreground/40 transition-colors space-y-3"
                  >
                    <div className="h-10 w-10 rounded-lg bg-foreground text-background flex items-center justify-center">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        {rec.tag}
                      </span>
                      <h3 className="text-sm font-bold text-foreground">{rec.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {rec.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO "COMO FUNCIONA"                                               */}
        {/* ==================================================================== */}
        <section className="py-20 sm:py-28 bg-secondary/20 border-b border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-bold tracking-wider text-foreground uppercase">
                Metodologia
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mt-1.5">
                Como funciona a Minerva Educação
              </h2>
              <p className="text-sm text-muted-foreground mt-2.5">
                Um fluxo linear e inteligente para transformar esforço em resultado prático.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {ETAPAS.map((etapa, idx) => (
                <div key={etapa.numero} className="relative space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-foreground/40 font-mono">
                      {etapa.numero}
                    </span>
                    <div className="h-px flex-1 bg-border/80" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{etapa.titulo}</h3>
                  <p className="text-xs font-medium text-foreground/90">{etapa.descricao}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{etapa.detalhe}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO DE PRODUTO (Apresentação SaaS com Mockups Detalhados)          */}
        {/* ==================================================================== */}
        <section id="produto" className="py-20 sm:py-28 border-b border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-2.5">
              <span className="text-xs font-bold tracking-wider text-foreground uppercase">
                Experiência de Produto
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Uma plataforma pensada para o seu estudo.
              </h2>
              <p className="text-sm text-muted-foreground">
                Navegue pelos módulos internos e conheça como cada detalhe foi projetado para alta
                performance.
              </p>
            </div>

            {/* Seletor de Módulos (Tabs) */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { id: "dashboard", label: "Dashboard" },
                { id: "curso", label: "Página de Curso" },
                { id: "questoes", label: "Banco de Questões" },
                { id: "simulado", label: "Simulado com Cronômetro" },
                { id: "desempenho", label: "Métricas de Desempenho" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-foreground text-background shadow-xs"
                      : "bg-secondary/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mockup Interativo da Tela Selecionada */}
            <div className="rounded-2xl border border-border/80 bg-white p-3 sm:p-5 shadow-lg shadow-foreground/5 max-w-5xl mx-auto">
              {activeTab === "dashboard" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4 text-foreground" />
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Visão Geral do Aluno
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Status: Em dia com o edital
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="border border-border/60 rounded-lg p-3.5 bg-secondary/15">
                      <p className="text-[11px] text-muted-foreground">Horas Estudadas na Semana</p>
                      <p className="text-xl font-bold text-foreground mt-1">24h 40min</p>
                    </div>
                    <div className="border border-border/60 rounded-lg p-3.5 bg-secondary/15">
                      <p className="text-[11px] text-muted-foreground">Exercícios Concluídos</p>
                      <p className="text-xl font-bold text-foreground mt-1">320 itens</p>
                    </div>
                    <div className="border border-border/60 rounded-lg p-3.5 bg-secondary/15">
                      <p className="text-[11px] text-muted-foreground">Índice Médio de Acerto</p>
                      <p className="text-xl font-bold text-foreground mt-1">82.4%</p>
                    </div>
                  </div>
                  <div className="border border-border/60 rounded-lg p-4 bg-white">
                    <p className="text-xs font-bold text-foreground mb-2">Cronograma de Hoje</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded bg-secondary/30">
                        <span>Matemática: Geometria Espacial • Esfera e Cone</span>
                        <span className="text-emerald-600 font-semibold">Concluído</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-secondary/30">
                        <span>Física: Eletrostática • Campo e Potencial Elétrico</span>
                        <span className="text-foreground font-semibold">Em andamento (50%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "curso" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-foreground" />
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Ambiente de Aula & Materiais
                      </span>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      Física Geral
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 rounded-lg bg-neutral-950 aspect-video flex flex-col items-center justify-center text-white relative">
                      <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Play className="h-5 w-5 fill-current text-white" />
                      </div>
                      <span className="text-xs mt-3 font-medium text-neutral-300">
                        Videoaula 03: Leis de Newton e Aplicações em Planos Inclinados
                      </span>
                    </div>
                    <div className="border border-border/60 rounded-lg p-3 space-y-2 bg-secondary/10">
                      <p className="text-xs font-bold text-foreground">Conteúdo do Módulo</p>
                      <div className="space-y-1 text-[11px] text-muted-foreground">
                        <p className="text-foreground font-semibold">
                          ✓ 01. Conceitos de Força e Inércia
                        </p>
                        <p className="text-foreground font-semibold">✓ 02. Segunda Lei e Atrito</p>
                        <p className="font-semibold text-foreground">
                          ► 03. Planos Inclinados (atual)
                        </p>
                        <p>○ 04. Dinâmica do Movimento Circular</p>
                        <p>○ 05. Lista de Questões AFA / EsPCEx</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "questoes" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-foreground" />
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Banco de Questões Militar
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Filtros: AFA • Matemática • 2024
                    </span>
                  </div>
                  <div className="border border-border/60 rounded-lg p-4 space-y-3 bg-white">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-foreground">Questão #4208 • AFA 2024</span>
                      <Badge variant="outline" className="text-[10px]">
                        Dificuldade: Difícil
                      </Badge>
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">
                      Considere no plano cartesiano a circunferência de equação x² + y² - 4x + 6y -
                      12 = 0. A reta r tangencia essa circunferência no ponto P(5, 1). A equação
                      geral da reta r é dada por:
                    </p>
                    <div className="space-y-1.5 text-xs text-muted-foreground pl-2">
                      <p className="p-1.5 rounded hover:bg-secondary/30">A) 3x + 4y - 19 = 0</p>
                      <p className="p-1.5 rounded bg-emerald-50 text-emerald-800 font-semibold">
                        B) 3x + 4y - 19 = 0 (Gabarito Correto com Resolução Comentada)
                      </p>
                      <p className="p-1.5 rounded hover:bg-secondary/30">C) 4x - 3y - 17 = 0</p>
                      <p className="p-1.5 rounded hover:bg-secondary/30">D) 2x + 5y - 15 = 0</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "simulado" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-foreground" />
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Simulado Cronometrado
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Tempo restante: 02:44:18</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-3 border border-border/60 rounded-lg p-4 space-y-3 bg-white">
                      <p className="text-xs font-bold text-foreground">
                        Item 34 de 100 • Prova EsPCEx 1º Dia
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Na oração "Aos jovens cumpria combater o desânimo", o termo destacado exerce
                        função sintática de:
                      </p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p className="p-1.5 rounded bg-secondary/30">A) Objeto direto</p>
                        <p className="p-1.5 rounded bg-secondary/30">B) Sujeito oracional</p>
                        <p className="p-1.5 rounded bg-secondary/30">C) Objeto indireto</p>
                      </div>
                    </div>
                    <div className="border border-border/60 rounded-lg p-3 bg-secondary/15 space-y-2">
                      <p className="text-[11px] font-bold text-foreground">Cartão Resposta</p>
                      <div className="grid grid-cols-5 gap-1 text-[10px] text-center font-mono">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div
                            key={i}
                            className={`p-1 rounded ${
                              i < 12
                                ? "bg-foreground text-background"
                                : "bg-white border border-border/60 text-muted-foreground"
                            }`}
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "desempenho" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-foreground" />
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Diagnóstico por Disciplina
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      Atualizado após o último simulado
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { materia: "Matemática", acerto: "88%", status: "Ponto Forte" },
                      { materia: "Física", acerto: "74%", status: "Evoluindo" },
                      { materia: "Química", acerto: "62%", status: "Atenção Necessária" },
                      { materia: "Língua Portuguesa", acerto: "91%", status: "Excelente" },
                      { materia: "Inglês", acerto: "85%", status: "Ponto Forte" },
                    ].map((item) => (
                      <div
                        key={item.materia}
                        className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-white text-xs"
                      >
                        <span className="font-bold text-foreground">{item.materia}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-foreground">{item.acerto}</span>
                          <span className="text-[10px] font-semibold text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO DE DIFERENCIAIS                                                */}
        {/* ==================================================================== */}
        <section className="py-20 sm:py-28 bg-secondary/15 border-b border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14">
              <span className="text-xs font-bold tracking-wider text-foreground uppercase">
                Vantagens Competitivas
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mt-1.5">
                Menos improviso. Mais estratégia.
              </h2>
              <p className="text-sm text-muted-foreground mt-2.5">
                Por que a preparação na Minerva gera resultados consistentes para os concursos mais
                difíceis do país.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DIFERENCIAIS.map((dif) => {
                const IconComponent = dif.icone;
                return (
                  <div
                    key={dif.titulo}
                    className="p-6 rounded-xl border border-border/70 bg-white hover:border-foreground/50 transition-colors space-y-3"
                  >
                    <div className="h-10 w-10 rounded-lg bg-foreground text-background flex items-center justify-center">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{dif.titulo}</h3>
                    <p className="text-xs font-medium text-foreground/90">{dif.descricao}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{dif.detalhe}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO DE PLANOS COMERCIAIS                                           */}
        {/* ==================================================================== */}
        <section id="planos" className="py-20 sm:py-28 border-b border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2.5">
              <span className="text-xs font-bold tracking-wider text-foreground uppercase">
                Planos & Investimento
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Escolha a melhor forma de estudar.
              </h2>
              <p className="text-sm text-muted-foreground">
                Planos flexíveis com acesso imediato a todas as ferramentas essenciais. Cancele
                quando quiser.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {PLANOS.map((plano) => (
                <div
                  key={plano.nome}
                  className={`relative rounded-2xl border p-7 sm:p-8 bg-white flex flex-col justify-between transition-all ${
                    plano.destaque
                      ? "border-foreground shadow-lg ring-1 ring-foreground/20"
                      : "border-border/80 hover:border-foreground/40"
                  }`}
                >
                  {plano.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background">
                      {plano.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground uppercase tracking-wide">
                        {plano.nome}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">
                        {plano.descricao}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-1 pt-2 border-t border-border/40">
                      <span className="text-3xl font-extrabold text-foreground tracking-tight">
                        {plano.preco}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {plano.periodo}
                      </span>
                    </div>

                    <ul className="space-y-2.5 pt-4 text-xs text-foreground/90 border-t border-border/40">
                      {plano.recursos.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <Button
                      asChild
                      className={`w-full h-11 text-xs font-semibold rounded-lg ${
                        plano.destaque
                          ? "bg-foreground text-background hover:bg-foreground/90"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      <Link to="/register">{plano.cta}</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-8">
              * Valores configuráveis pela administração. Sem taxa de matrícula ou fidelidade
              contratual.
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* FAQ SECTION                                                          */}
        {/* ==================================================================== */}
        <section id="faq" className="py-20 sm:py-28 bg-secondary/15 border-b border-border/40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
              <span className="text-xs font-bold tracking-wider text-foreground uppercase">
                Tire suas dúvidas
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Perguntas Frequentes
              </h2>
              <p className="text-sm text-muted-foreground">
                Respostas diretas para as perguntas mais comuns sobre o funcionamento da Minerva
                Educação.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-border/70 bg-white px-5 py-1"
                >
                  <AccordionTrigger className="text-left text-sm font-bold text-foreground hover:no-underline py-4">
                    {faq.pergunta}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs leading-relaxed text-muted-foreground pt-1 pb-4">
                    {faq.resposta}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* CTA FINAL DE CONVERSÃO                                               */}
        {/* ==================================================================== */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Seu objetivo merece uma preparação à altura.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto font-normal">
              Una método, dados e disciplina em uma plataforma pensada para a sua aprovação. Crie
              sua conta e comece agora.
            </p>
            <div className="pt-2 flex justify-center">
              <Button
                size="lg"
                className="font-semibold bg-foreground text-background hover:bg-foreground/90 h-12 px-9 text-sm shadow-sm"
                asChild
              >
                <Link to="/register">
                  Começar agora
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
