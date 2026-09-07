import React, { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
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
  BookOpen,
  Award,
  Users,
  Compass,
  Repeat,
  Play,
  Check,
  ChevronRight,
  Flame,
  Target,
  Zap,
  CheckCircle,
  XCircle,
  BrainCircuit,
  Clock,
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
    description:
      "Preparação para Oficiais Aviadores, Intendentes e de Infantaria da Força Aérea Brasileira.",
    badge: "Aeronáutica",
    vagas: "Ensino Superior Militar",
  },
  {
    id: "efomm",
    name: "EFOMM",
    title: "Oficiais da Marinha Mercante",
    description:
      "Carreira internacional de Oficiais de Náutica e Máquinas no CIAGA (RJ) e CIABA (PA).",
    badge: "Marinha Mercante",
    vagas: "Ensino Superior",
  },
  {
    id: "espcex",
    name: "EsPCEx",
    title: "Cadetes do Exército",
    description:
      "A preparação completa para ingresso na Academia Militar das Agulhas Negras (AMAN).",
    badge: "Exército",
    vagas: "Ensino Superior AMAN",
  },
  {
    id: "escola-naval",
    name: "Escola Naval",
    title: "Oficiais da Marinha do Brasil",
    description:
      "Corpo da Armada, Fuzileiros Navais e Intendentes da mais antiga academia militar do país.",
    badge: "Marinha",
    vagas: "Oficiais da Armada",
  },
  {
    id: "esa",
    name: "ESA",
    title: "Sargentos das Armas",
    description:
      "Preparação de alta densidade para Sargentos Combatentes do Exército Brasileiro.",
    badge: "Exército",
    vagas: "Nível Médio Técnico",
  },
  {
    id: "eear",
    name: "EEAR",
    title: "Especialistas de Aeronáutica",
    description:
      "Formação técnica e operacional de Sargentos da FAB em diversas especialidades.",
    badge: "Aeronáutica",
    vagas: "Nível Médio Técnico",
  },
  {
    id: "epcar",
    name: "EPCAR",
    title: "Cadetes do Ar",
    description:
      "Ensino Médio de elite preparatório em Barbacena com acesso preferencial à AFA.",
    badge: "Aeronáutica",
    vagas: "Ensino Médio FAB",
  },
  {
    id: "colegio-naval",
    name: "Colégio Naval",
    title: "Ensino Médio Preparatório",
    description:
      "Tradicional instituição preparatória da Marinha em Angra dos Reis para ingresso na EN.",
    badge: "Marinha",
    vagas: "Ensino Médio Marinha",
  },
];

// Cronograma Semanal Inteligente
const DIAS_CRONOGRAMA = [
  {
    dia: "SEGUNDA",
    materia: "MATEMÁTICA",
    topico: "Geometria Analítica & Funções Modulares",
    carga: "2h30min",
    tipo: "Teoria + 40 Questões AFA / EsPCEx",
    meta: "Cálculo de retas tangentes, cônicas e propriedades modulares",
  },
  {
    dia: "TERÇA",
    materia: "PORTUGUÊS & REDAÇÃO",
    topico: "Sintaxe do Período Composto & Proposta Dissertativa",
    carga: "2h00min",
    tipo: "Aulas + 1 Redação Corrigida com Critérios de Banca",
    meta: "Conectivos argumentativos, paralelismo e orações reduzidas",
  },
  {
    dia: "QUARTA",
    materia: "FÍSICA",
    topico: "Mecânica Clássica: Dinâmica e Conservação de Energia",
    carga: "2h45min",
    tipo: "Resoluções Passo a Passo + Exercícios de Fixação",
    meta: "Atrito estático e cinético em planos inclinados com tração",
  },
  {
    dia: "QUINTA",
    materia: "INGLÊS",
    topico: "Leitura Instrumental & Phrasal Verbs de Prova",
    carga: "1h45min",
    tipo: "Textos de Exames Anteriores + Gramática Aplicada",
    meta: "Vocabulário contextualizado e tempos verbais compostos",
  },
  {
    dia: "SEXTA",
    materia: "QUÍMICA / HISTÓRIA",
    topico: "Estequiometria Avançada & Brasil República",
    carga: "2h15min",
    tipo: "Questões Comentadas EsPCEx & EFOMM",
    meta: "Rendimento de reações com pureza e cálculo volumétrico",
  },
  {
    dia: "SÁBADO",
    materia: "REVISÃO & SIMULADO",
    topico: "Simulado Geral Cronometrado Inédito",
    carga: "4h00min",
    tipo: "Execução sob Condições Reais de Prova",
    meta: "Controle de tempo, ritmo de resolução e mapeamento de lacunas",
  },
];

// Perguntas Frequentes (FAQ)
const FAQS = [
  {
    pergunta: "Como funciona a metodologia da Minerva Educação?",
    resposta:
      "A Minerva reúne em um ecossistema único todo o ciclo de preparação para carreiras militares: diagnóstico inicial de nivelamento, trilhas curriculares organizadas por matéria, banco de questões com resoluções comentadas, simulados periódicos com cronometragem oficial e acompanhamento analítico para que você estude com estratégia e consistência.",
  },
  {
    pergunta: "Para quais concursos a plataforma oferece preparação?",
    resposta:
      "Atendemos inicialmente os 8 principais concursos militares do Brasil: AFA, EFOMM, EsPCEx, Escola Naval, ESA, EEAR, EPCAR e Colégio Naval. A arquitetura modular do sistema foi desenhada para permitir a inclusão de novas carreiras com o mesmo rigor de qualidade.",
  },
  {
    pergunta: "Como funciona o banco de questões?",
    resposta:
      "Nosso banco de questões é calibrado por concurso, disciplina, tópico do edital, ano e nível de dificuldade. Cada item possui gabarito e resolução pedagógica estruturada, permitindo que o aluno aprenda a linha de raciocínio exigida pelas bancas examinadoras militares.",
  },
  {
    pergunta: "Como funcionam os simulados cronometrados?",
    resposta:
      "Os simulados reproduzem as condições oficiais de cada prova: número de questões idêntico ao edital, divisão por disciplinas, tempo de prova rigoroso com cronômetro regressivo e geração de relatório de acertos com ranking entre os estudantes.",
  },
  {
    pergunta: "Posso acessar os materiais pelo celular ou tablet?",
    resposta:
      "Sim. A Minerva foi desenvolvida com arquitetura mobile-first, garantindo navegação rápida, fluida e confortável em qualquer dispositivo, seja para assistir videoaulas, resolver listas de exercícios ou revisar cronogramas.",
  },
  {
    pergunta: "Como funciona o acompanhamento e mentoria?",
    resposta:
      "O programa de mentoria orienta os estudantes na organização do plano de estudos, identifica os pontos de menor rendimento através de relatórios analíticos e estabelece metas semanais para maximizar a retenção dos tópicos de maior peso na prova.",
  },
  {
    pergunta: "Existe período de garantia ou cancelamento?",
    resposta:
      "Sim. Oferecemos garantia incondicional de 7 dias com reembolso integral caso você decida não prosseguir. As assinaturas mensais não possuem fidelidade contratual e podem ser encerradas a qualquer momento diretamente nas configurações de sua conta.",
  },
  {
    pergunta: "Como posso iniciar minha preparação hoje?",
    resposta:
      "Basta clicar em 'Começar agora', preencher seu cadastro gratuitamente e acessar seu painel de estudos para conhecer a estrutura acadêmica e escolher seu concurso-alvo.",
  },
];

function LandingPage() {
  // Efeito Parallax suave no Hero Desktop via coordenadas do mouse
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Estado da Questão Interativa do Banco de Questões
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questionSubmitted, setQuestionSubmitted] = useState<boolean>(false);

  // Estado do Dia Ativo no Cronograma Tático
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white selection:bg-white selection:text-neutral-950 font-sans antialiased overflow-x-clip">
      <Navbar />

      <main className="flex-1">
        {/* ==================================================================== */}
        {/* SEÇÃO 1: HERO CINEMATOGRÁFICO & MOCKUP MODERNO (ESCURO)              */}
        {/* ==================================================================== */}
        <section
          ref={heroRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative min-h-[92vh] flex items-center pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 overflow-hidden bg-neutral-950 border-b border-neutral-850"
        >
          {/* Fundo Tecnológico Abstrato (Iluminação Ambiental + Grid de Linhas Finas) */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Iluminação suave no centro-topo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_70%)] blur-2xl" />
            {/* Grid geométrico discreto de 40px */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px]" />
            {/* Vinheta lateral sutil */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#070709_100%)]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Coluna de Texto Principal */}
              <div className="lg:col-span-6 space-y-6 text-left">
                {/* Badge de Destaque Tecnológico */}
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/90 px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-neutral-300 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  <span>PREPARAÇÃO DE ALTO DESEMPENHO</span>
                </div>

                {/* Headline Principal */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                  Sua aprovação começa com uma estratégia melhor.
                </h1>

                {/* Subheadline */}
                <p className="text-sm sm:text-base lg:text-lg text-neutral-400 font-normal leading-relaxed max-w-xl">
                  Cursos, questões, simulados, planejamento e acompanhamento para transformar sua
                  rotina em uma preparação tática de alta performance.
                </p>

                {/* CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <Button
                    size="lg"
                    asChild
                    className="h-12 px-7 bg-white text-neutral-950 hover:bg-neutral-200 font-semibold text-sm rounded-xl shadow-lg shadow-white/5 transition-all cursor-pointer min-h-[48px]"
                  >
                    <Link to="/register">
                      <span>Começar agora</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="h-12 px-7 border-neutral-800 bg-neutral-900/60 text-white hover:bg-neutral-800 hover:text-white font-medium text-sm rounded-xl transition-all cursor-pointer min-h-[48px]"
                  >
                    <a href="#concursos">Conhecer a plataforma</a>
                  </Button>
                </div>

                {/* Texto de Confiança */}
                <div className="pt-4 border-t border-neutral-900/80 flex items-center gap-2.5 text-xs text-neutral-400 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                  <span>
                    Preparação para AFA, EFOMM, EsPCEx, Escola Naval, ESA, EEAR, EPCAR e Colégio
                    Naval.
                  </span>
                </div>
              </div>

              {/* Coluna Visual: Mockup da Plataforma (Responsivo & Dedicado no Mobile) */}
              <div className="lg:col-span-6 relative">
                {/* VERSÃO DESKTOP (Com Parallax 3D suave no mouse) */}
                <div
                  className="hidden sm:block relative transition-transform duration-300 ease-out will-change-transform"
                  style={{
                    transform:
                      typeof window !== "undefined" && window.innerWidth >= 1024
                        ? `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg)`
                        : "none",
                  }}
                >
                  {/* Moldura da Interface Principal */}
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 sm:p-5 shadow-2xl shadow-black/80 backdrop-blur-xl">
                    {/* Barra Superior do Sistema */}
                    <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                        <div className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                        <div className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                        <span className="ml-2 text-[11px] font-mono text-neutral-400">
                          minerva.app/aluno/dashboard
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-medium text-neutral-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span>EsPCEx & AFA • 2026</span>
                      </div>
                    </div>

                    {/* Miolo do Mockup */}
                    <div className="p-3 sm:p-4 space-y-3.5 text-white">
                      {/* Banner de Boas-vindas com Streak de Estudos */}
                      <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/60">
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-mono text-neutral-400 uppercase">
                            Sequência Ativa
                          </p>
                          <p className="text-sm font-bold text-white flex items-center gap-1.5">
                            <Flame className="h-4 w-4 text-amber-400 fill-amber-400" />
                            14 dias consecutivos de estudo
                          </p>
                        </div>
                        {/* 7 pips da semana */}
                        <div className="flex items-center gap-1.5">
                          {["S", "T", "Q", "Q", "S", "S", "D"].map((dia, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1">
                              <span className="text-[9px] font-mono text-neutral-400">{dia}</span>
                              <div
                                className={`h-5 w-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                                  idx < 5
                                    ? "bg-white text-neutral-950"
                                    : idx === 5
                                      ? "bg-neutral-800 text-white border border-neutral-700"
                                      : "bg-neutral-900 text-neutral-500"
                                }`}
                              >
                                {idx < 5 ? "✓" : ""}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cards de Métricas e Banco de Questões */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* Bloco 1: Meta de Estudo Diária */}
                        <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/40 space-y-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-neutral-400 font-medium">Meta Diária</span>
                            <span className="font-mono text-white font-bold">85 / 120 min</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                            <div
                              className="h-full bg-white rounded-full transition-all duration-1000"
                              style={{ width: "71%" }}
                            />
                          </div>
                          <p className="text-[10px] text-neutral-400">
                            Faltam 35 min para cumprir o ciclo de Física.
                          </p>
                        </div>

                        {/* Bloco 2: Banco de Questões */}
                        <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/40 space-y-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-neutral-400 font-medium">Questões na Semana</span>
                            <span className="font-mono text-emerald-400 font-bold">
                              86.2% acertos
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold font-mono text-white">248</span>
                            <span className="text-[11px] text-neutral-400">itens resolvidos</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-neutral-300">
                            <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-neutral-300 font-mono">
                              AFA 2024
                            </span>
                            <span>Geometria Analítica</span>
                          </div>
                        </div>
                      </div>

                      {/* Módulo em Andamento */}
                      <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/40 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                              Aula 04
                            </span>
                            <span className="text-xs font-bold text-white">
                              Dinâmica dos Corpos e Força de Atrito
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400">
                            Física I • Módulo 03 • Prof. Minerva
                          </p>
                        </div>
                        <div className="h-8 w-8 rounded-lg bg-white text-neutral-950 flex items-center justify-center shrink-0">
                          <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Notificação Demonstrativa */}
                      <div className="pt-1 flex items-center justify-between text-[10px] text-neutral-400 border-t border-neutral-800">
                        <span className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-emerald-400" />
                          Simulado Geral #03 Agendado para Sábado às 08h00
                        </span>
                        <span className="font-mono text-neutral-500 uppercase">
                          Painel do Aluno
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VERSÃO MOBILE DEDICADA (Clara, nativa, proporcional para telas verticais 360px-430px) */}
                <div className="block sm:hidden w-full">
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-900/95 p-4 shadow-xl space-y-3">
                    {/* Header Mobile do App */}
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold text-white">EsPCEx & AFA 2026</span>
                      </div>
                      <span className="text-[10px] font-mono bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                        MINERVA OS
                      </span>
                    </div>

                    {/* Streak Compacto */}
                    <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-950/70 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="h-5 w-5 text-amber-400 fill-amber-400 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-white">14 dias seguidos</p>
                          <p className="text-[10px] text-neutral-400">Sequência ativa</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {["S", "T", "Q", "Q", "S"].map((d, i) => (
                          <span
                            key={i}
                            className="h-5 w-5 rounded bg-white text-neutral-950 text-[10px] font-bold flex items-center justify-center"
                          >
                            ✓
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Meta Diária */}
                    <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-950/50 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Meta de hoje: Física</span>
                        <span className="font-mono text-white font-bold">85 / 120 min</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                        <div className="h-full bg-white rounded-full w-[71%]" />
                      </div>
                    </div>

                    {/* Resumo de Questões */}
                    <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-950/50 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-neutral-400">Semana de exercícios</p>
                        <p className="text-base font-bold font-mono text-white">
                          248 <span className="text-xs font-normal text-neutral-400">questões</span>
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-md">
                        86.2% acertos
                      </span>
                    </div>

                    {/* Aula Atual com Botão Play */}
                    <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-950/60 flex items-center justify-between">
                      <div className="space-y-0.5 pr-2">
                        <span className="text-[9px] font-mono uppercase text-neutral-400">
                          Aula 04 • Dinâmica
                        </span>
                        <p className="text-xs font-bold text-white truncate max-w-[200px]">
                          Força de Atrito & Planos
                        </p>
                      </div>
                      <div className="h-8 w-8 rounded-lg bg-white text-neutral-950 flex items-center justify-center shrink-0">
                        <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* TRANSIÇÃO ELEGANTE PARA SEÇÃO CLARA                                  */}
        {/* ==================================================================== */}
        <div className="h-8 sm:h-12 bg-gradient-to-b from-neutral-950 to-[#fbfbfb]" />

        {/* ==================================================================== */}
        {/* SEÇÃO 2: PREPARE-SE PARA OS PRINCIPAIS CONCURSOS (CLARA)             */}
        {/* ==================================================================== */}
        <section
          id="concursos"
          className="py-16 sm:py-24 bg-[#fbfbfb] text-neutral-950 border-b border-neutral-200"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 sm:mb-14 space-y-2 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-neutral-700">
                <span>CONCURSOS EM FOCO</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
                Prepare-se para os desafios que realmente importam.
              </h2>
              <p className="text-xs sm:text-base text-neutral-600 font-normal leading-relaxed">
                Trilhas especializadas desenhadas especificamente para os editais militares mais
                concorridos do Brasil.
              </p>
            </div>

            {/* Grid dos 8 Concursos (2 colunas no Mobile, 4 no Desktop) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {CONCURSOS.map((contest) => (
                <div
                  key={contest.id}
                  className="group relative rounded-xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-neutral-900 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950 font-mono">
                        {contest.name}
                      </span>
                      <span className="self-start sm:self-auto text-[9px] sm:text-[10px] font-semibold text-neutral-600 uppercase bg-neutral-100 px-2 py-0.5 rounded">
                        {contest.badge}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                      {contest.title}
                    </h3>

                    <p className="hidden sm:block text-xs text-neutral-500 leading-relaxed font-normal">
                      {contest.description}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-950">
                    <span className="text-[10px] sm:text-[11px] text-neutral-600 truncate mr-1">
                      {contest.vagas}
                    </span>
                    <span className="flex items-center gap-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform text-neutral-950">
                      <span className="hidden sm:inline">Explorar</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 3: UMA PLATAFORMA. TODA A SUA PREPARAÇÃO. (ESCURA)             */}
        {/* ==================================================================== */}
        <section
          id="plataforma"
          className="py-20 sm:py-28 bg-neutral-950 text-white border-b border-neutral-850"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 sm:mb-16 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                <Layers className="h-3.5 w-3.5" />
                <span>ECOSSISTEMA INTEGRADO</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Uma plataforma. Toda a sua preparação.
              </h2>
              <p className="text-xs sm:text-base text-neutral-400 font-normal leading-relaxed">
                Chega de assinar diferentes sites para teoria, questões e simulados. A Minerva
                unifica todas as ferramentas que você precisa em uma interface única e veloz.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Card 1 (Span 2 colunas): Cursos Estruturados */}
              <div className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 sm:p-7 space-y-4 hover:border-neutral-700 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-white text-neutral-950 flex items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Cursos por Trilha Acadêmica
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                    Conteúdo organizado em uma jornada lógica: módulos sequenciais, videoaulas
                    gravadas em alta resolução e apostilas em PDF com a teoria exata do edital.
                  </p>
                </div>
                <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                    <p className="text-[10px] text-neutral-400 uppercase">Organização</p>
                    <p className="font-bold text-white mt-0.5">Por Tópico do Edital</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                    <p className="text-[10px] text-neutral-400 uppercase">Material</p>
                    <p className="font-bold text-white mt-0.5">Apostilas em PDF</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Banco de Questões */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 sm:p-7 space-y-4 hover:border-neutral-700 transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-white text-neutral-950 flex items-center justify-center">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Banco de Questões</h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Filtros por concurso, matéria, assunto e banca com resoluções comentadas.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  Milhares de itens catalogados
                </span>
              </div>

              {/* Card 3: Simulados Cronometrados */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 sm:p-7 space-y-4 hover:border-neutral-700 transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-white text-neutral-950 flex items-center justify-center">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Simulados Inéditos</h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Provas com tempo real, distribuição de peso oficial e ranking de desempenho.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  Condições reais de prova
                </span>
              </div>

              {/* Card 4 (Span 2 colunas): Planejamento e Metas */}
              <div className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 sm:p-7 space-y-4 hover:border-neutral-700 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-white text-neutral-950 flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Planejamento & Metas Inteligentes
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                    Defina suas horas disponíveis e receba um cronograma balanceado para cobrir
                    todas as matérias com revisões periódicas programadas.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-300">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-white" /> Ciclos semanais
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-white" /> Metas de minutos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-white" /> Revisão espaçada
                  </span>
                </div>
              </div>

              {/* Card 5: Desempenho Analítico */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 sm:p-7 space-y-4 hover:border-neutral-700 transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-white text-neutral-950 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Métricas Precisas</h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Entenda exatamente onde precisa evoluir por disciplina e assunto.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">Diagnóstico contínuo</span>
              </div>

              {/* Card 6: Revisões Espaçadas */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 sm:p-7 space-y-4 hover:border-neutral-700 transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-white text-neutral-950 flex items-center justify-center">
                    <Repeat className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">Revisões Ativas</h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Não deixe o conteúdo desaparecer da memória após ser estudado.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  Retenção de longo prazo
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 4: BANCADA DE TESTES INTERATIVA — BANCO DE QUESTÕES (CLARA)    */}
        {/* ==================================================================== */}
        <section
          id="questoes-demo"
          className="py-16 sm:py-24 bg-white text-neutral-950 border-b border-neutral-200"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Coluna Esquerda: Texto de Chamada */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-100 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-neutral-800">
                  <Zap className="h-3 w-3" />
                  <span>EXPERIMENTE NA PRÁTICA</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 leading-tight">
                  Pratique. Analise. Evolua.
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                  Experimente como funciona o Banco de Questões da Minerva. Selecione uma
                  alternativa ao lado para testar a validação imediata e ver a resolução comentada
                  passo a passo.
                </p>
                <div className="space-y-2 pt-2 text-xs text-neutral-700">
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                    <span>Filtros instantâneos por carreira (AFA, EsPCEx, EFOMM, ESA)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                    <span>Resoluções didáticas passo a passo</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                    <span>Histórico de erros e acertos salvo automaticamente</span>
                  </p>
                </div>
              </div>

              {/* Coluna Direita: Simulador Interativo da Questão */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-neutral-300 bg-neutral-50/70 p-4 sm:p-7 shadow-sm space-y-4 sm:space-y-5">
                  {/* Cabeçalho da Questão */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-neutral-950 text-white px-2 py-0.5 text-[10px] font-bold font-mono">
                        AFA • 2024
                      </span>
                      <span className="text-xs font-bold text-neutral-800">Matemática</span>
                      <span className="text-[11px] text-neutral-500">• Geometria Analítica</span>
                    </div>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Dificuldade: Alta
                    </span>
                  </div>

                  {/* Enunciado */}
                  <div className="space-y-2 text-xs sm:text-sm text-neutral-900 leading-relaxed font-medium">
                    <p>
                      Considere no plano cartesiano a circunferência de equação{" "}
                      <strong>x² + y² - 4x + 6y - 12 = 0</strong>. A reta <em>r</em> tangencia essa
                      circunferência exatamente no ponto <strong>P(5, 1)</strong>.
                    </p>
                    <p className="text-neutral-700">
                      A equação geral da reta <em>r</em> é expressa por:
                    </p>
                  </div>

                  {/* Alternativas Interativas */}
                  <div className="space-y-2 text-xs font-mono">
                    {[
                      { letra: "A", texto: "3x + 4y - 19 = 0", correta: true },
                      { letra: "B", texto: "4x - 3y - 17 = 0", correta: false },
                      { letra: "C", texto: "3x - 4y - 11 = 0", correta: false },
                      { letra: "D", texto: "2x + 5y - 15 = 0", correta: false },
                    ].map((alt) => {
                      const isSelected = selectedOption === alt.letra;
                      let optionClasses =
                        "border-neutral-200 bg-white hover:border-neutral-400 text-neutral-900";

                      if (questionSubmitted) {
                        if (alt.correta) {
                          optionClasses =
                            "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                        } else if (isSelected && !alt.correta) {
                          optionClasses = "border-red-400 bg-red-50 text-red-900";
                        }
                      } else if (isSelected) {
                        optionClasses =
                          "border-neutral-950 bg-neutral-100 font-bold text-neutral-950";
                      }

                      return (
                        <button
                          key={alt.letra}
                          onClick={() => {
                            setSelectedOption(alt.letra);
                            setQuestionSubmitted(false);
                          }}
                          className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${optionClasses} min-h-[44px]`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="h-6 w-6 rounded-md bg-neutral-100 text-neutral-900 flex items-center justify-center font-bold text-xs shrink-0">
                              {alt.letra}
                            </span>
                            <span className="break-all sm:break-normal">{alt.texto}</span>
                          </div>
                          {questionSubmitted && alt.correta && (
                            <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                          )}
                          {questionSubmitted && isSelected && !alt.correta && (
                            <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Botão de Responder e Feedback */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    <Button
                      size="sm"
                      onClick={() => setQuestionSubmitted(true)}
                      disabled={!selectedOption}
                      className="bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-bold px-5 h-10 rounded-xl cursor-pointer"
                    >
                      Verificar Resposta
                    </Button>
                    <span className="text-[11px] text-neutral-500 font-mono text-center sm:text-right">
                      {questionSubmitted
                        ? selectedOption === "A"
                          ? "✓ Parabéns! Resposta exata."
                          : "✕ Incorreto. Analise a resolução abaixo."
                        : "Selecione uma alternativa e clique para verificar."}
                    </span>
                  </div>

                  {/* Resolução Comentada que surge ao responder */}
                  {questionSubmitted && (
                    <div className="mt-3 p-3.5 rounded-xl bg-neutral-100 border border-neutral-200 text-xs space-y-1.5 animate-in fade-in duration-200">
                      <p className="font-bold text-neutral-950">Resolução Passo a Passo:</p>
                      <p className="text-neutral-700 leading-relaxed">
                        1. Completando quadrados, temos o centro C(2, -3) e raio R = 5.
                        <br />
                        2. O vetor normal da reta tangente coincide com o vetor CP = P(5,1) - C(2,-3)
                        = (3, 4).
                        <br />
                        3. Logo, a equação da reta é da forma 3x + 4y + k = 0. Substituindo P(5, 1):
                        3(5) + 4(1) + k = 0 ⇒ k = -19.
                        <br />
                        Portanto: <strong>3x + 4y - 19 = 0 (Alternativa A)</strong>.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 5: DESEMPENHO — "ESTUDAR MELHOR" (ESCURA)                      */}
        {/* ==================================================================== */}
        <section
          id="desempenho"
          className="py-20 sm:py-28 bg-[#09090c] text-white border-b border-neutral-850"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 sm:mb-16 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                <BarChart3 className="h-3.5 w-3.5" />
                <span>INTELIGÊNCIA DE DADOS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Você não precisa estudar mais. Precisa estudar melhor.
              </h2>
              <p className="text-xs sm:text-base text-neutral-400 font-normal leading-relaxed">
                Acompanhe gráficos analíticos de evolução real e descubra com exatidão matemática
                quais matérias exigem reforço antes da prova.
              </p>
            </div>

            {/* Mockup do Painel de Desempenho Analítico */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 sm:p-7 shadow-2xl backdrop-blur-md space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-neutral-800 pb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Diagnóstico Geral por Disciplina
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Baseado nas últimas 420 questões resolvidas e simulados
                  </p>
                </div>
                <span className="self-start sm:self-auto text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full font-bold">
                  Aproveitamento Global: 81.4%
                </span>
              </div>

              {/* Barras Analíticas de Matérias */}
              <div className="space-y-3.5">
                {[
                  { disciplina: "Matemática", acertos: "88%", bar: "88%", status: "Ponto Forte" },
                  { disciplina: "Física", acertos: "78%", bar: "78%", status: "Evoluindo" },
                  { disciplina: "Português", acertos: "92%", bar: "92%", status: "Excelente" },
                  { disciplina: "Inglês", acertos: "84%", bar: "84%", status: "Consistente" },
                  {
                    disciplina: "Química / Redação",
                    acertos: "70%",
                    bar: "70%",
                    status: "Atenção Necessária",
                  },
                ].map((item) => (
                  <div key={item.disciplina} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{item.disciplina}</span>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="font-mono text-neutral-300 font-bold">{item.acertos}</span>
                        <span className="text-[9px] sm:text-[10px] text-neutral-400 font-mono uppercase bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded">
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-950 overflow-hidden border border-neutral-800/80">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-700"
                        style={{ width: item.bar }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-neutral-800/85 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400">
                <span>Relatórios com histórico diário, semanal e mensal de estudo.</span>
                <span className="font-mono text-neutral-500 text-[10px] uppercase tracking-wider">
                  * Interface demonstrativa de acompanhamento
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 6: PLANEJAMENTO E CRONOGRAMA TÁTICO (CLARA)                    */}
        {/* ==================================================================== */}
        <section
          id="cronograma"
          className="py-16 sm:py-24 bg-[#f8f8fa] text-neutral-950 border-b border-neutral-200"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 sm:mb-14 space-y-2 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-neutral-700">
                <Calendar className="h-3 w-3" />
                <span>PLANEJAMENTO SEMANAL</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
                Seu estudo deixa de ser improviso e passa a ter estratégia.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                Clique nos dias da semana para visualizar a distribuição inteligente de blocos de
                estudo.
              </p>
            </div>

            {/* Seletor de Dias (Scroll horizontal no mobile ou grid de 3) */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
              {DIAS_CRONOGRAMA.map((item, idx) => (
                <button
                  key={item.dia}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer min-h-[44px] ${
                    selectedDayIndex === idx
                      ? "bg-neutral-950 text-white border-neutral-950 shadow-md"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-semibold opacity-70">
                    {item.dia}
                  </p>
                  <p className="text-xs font-bold mt-0.5 truncate">{item.materia.split(" ")[0]}</p>
                </button>
              ))}
            </div>

            {/* Detalhe do Dia Selecionado */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-neutral-100 pb-3.5">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-neutral-500">
                    {DIAS_CRONOGRAMA[selectedDayIndex]!.dia} • PLANO DIÁRIO
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mt-0.5">
                    {DIAS_CRONOGRAMA[selectedDayIndex]!.materia}
                  </h3>
                </div>
                <span className="self-start sm:self-auto rounded-full bg-neutral-100 text-neutral-900 border border-neutral-200 px-3 py-1 text-xs font-bold font-mono">
                  Tempo Estimado: {DIAS_CRONOGRAMA[selectedDayIndex]!.carga}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <p className="font-bold text-neutral-900">Tópico do Edital</p>
                  <p className="text-neutral-600 leading-relaxed">
                    {DIAS_CRONOGRAMA[selectedDayIndex]!.topico}
                  </p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <p className="font-bold text-neutral-900">Atividade Programada</p>
                  <p className="text-neutral-600 leading-relaxed">
                    {DIAS_CRONOGRAMA[selectedDayIndex]!.tipo}
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-500 font-medium">
                <strong>Meta de aprendizado:</strong> {DIAS_CRONOGRAMA[selectedDayIndex]!.meta}
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 7: MENTORIA — "NÃO ESTUDE SOZINHO" (ESCURA)                    */}
        {/* ==================================================================== */}
        <section
          id="mentoria"
          className="py-20 sm:py-28 bg-neutral-950 text-white border-b border-neutral-850"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 sm:mb-16 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                <Compass className="h-3.5 w-3.5" />
                <span>ORIENTAÇÃO TÁTICA</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Não estude sozinho.
              </h2>
              <p className="text-xs sm:text-base text-neutral-400 font-normal leading-relaxed">
                Acompanhamento e suporte de quem conhece de ponta a ponta as peculiaridades das
                bancas e os caminhos de aprovação.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              <div className="p-6 sm:p-7 rounded-2xl border border-neutral-800 bg-neutral-900/70 space-y-3 hover:border-neutral-700 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-white text-neutral-950 flex items-center justify-center">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">Metas & Diagnósticos</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Definição de metas de estudo semanais personalizadas com base na carreira militar
                  escolhida e na sua rotina disponível.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl border border-neutral-800 bg-neutral-900/70 space-y-3 hover:border-neutral-700 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-white text-neutral-950 flex items-center justify-center">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Acompanhamento de Rendimento
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Orientação periódica sobre quando acelerar o conteúdo teórico e quando priorizar
                  resolução maciça de provas antigas.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl border border-neutral-800 bg-neutral-900/70 space-y-3 hover:border-neutral-700 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-white text-neutral-950 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Comunidade & Ambiente Focado
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Espaço exclusivo para troca de dúvidas de exercícios difíceis com outros
                  estudantes com a mesma meta de aprovação.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 8: COMO FUNCIONA (CLARA COM 4 PASSOS)                          */}
        {/* ==================================================================== */}
        <section className="py-16 sm:py-24 bg-white text-neutral-950 border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 sm:mb-16 space-y-2 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-100 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-neutral-700">
                <span>PASSO A PASSO</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
                Como funciona a sua preparação
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                Quatro passos bem definidos para sair da inércia e alcançar o topo da classificação.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  step: "01",
                  titulo: "Escolha seu objetivo",
                  desc: "Selecione o concurso militar que deseja alcançar e tenha acesso imediato à grade do respectivo edital.",
                },
                {
                  step: "02",
                  titulo: "Monte sua estratégia",
                  desc: "Organize sua rotina com o módulo de cronogramas para distribuir as horas de estudo por matéria.",
                },
                {
                  step: "03",
                  titulo: "Execute seu plano",
                  desc: "Combine videoaulas didáticas, apostilas teóricas e resolução de milhares de questões comentadas.",
                },
                {
                  step: "04",
                  titulo: "Acompanhe sua evolução",
                  desc: "Realize simulados cronometrados e use as métricas analíticas para blindar seus pontos fracos.",
                },
              ].map((etapa) => (
                <div key={etapa.step} className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-neutral-950">
                      {etapa.step}
                    </span>
                    <div className="h-px flex-1 bg-neutral-200" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-950">{etapa.titulo}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{etapa.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 9: FRASE DE IMPACTO (ESCURA - MINIMALISTA)                     */}
        {/* ==================================================================== */}
        <section className="py-20 sm:py-28 bg-neutral-950 text-white border-b border-neutral-850 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-4">
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400">
              MINERVA EDUCAÇÃO • ALTO DESEMPENHO
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              &quot;Grandes aprovações não acontecem por acaso.&quot;
            </h2>
            <p className="text-base sm:text-xl text-neutral-400 font-light tracking-wide">
              Elas são construídas todos os dias.
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 10: PLANOS (CLARA)                                             */}
        {/* ==================================================================== */}
        <section
          id="planos"
          className="py-16 sm:py-24 bg-[#fbfbfb] text-neutral-950 border-b border-neutral-200"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-neutral-700">
                <span>INVESTIMENTO TRANSPARENTE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
                Escolha a melhor forma de estudar.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Planos modulares para cada fase de sua preparação. Cancele quando quiser sem multas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* Plano 1: Essencial */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-400 transition-all shadow-xs">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 uppercase tracking-wide">
                      ESSENCIAL
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      A base de questões e simulados para consolidar sua preparação.
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 pt-2 border-t border-neutral-100">
                    <span className="text-3xl font-extrabold text-neutral-950 font-mono">R$ 59</span>
                    <span className="text-xs text-neutral-500">/mês (placeholder)</span>
                  </div>

                  <ul className="space-y-2.5 pt-4 text-xs text-neutral-700 border-t border-neutral-100">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Acesso integral ao Banco de Questões</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Filtros por concurso, ano e dificuldade</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Gabaritos com resoluções comentadas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Simulados inéditos com cronômetro</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 sm:pt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-11 text-xs font-bold border-neutral-300 hover:bg-neutral-100 text-neutral-950 rounded-xl cursor-pointer"
                  >
                    <Link to="/register">Começar com Essencial</Link>
                  </Button>
                </div>
              </div>

              {/* Plano 2: Completo (Mais Escolhido) */}
              <div className="relative rounded-2xl border-2 border-neutral-950 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-xl ring-1 ring-neutral-950/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neutral-950 px-3.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Mais escolhido
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 uppercase tracking-wide">
                      COMPLETO
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      O ecossistema completo de cursos, videoaulas, questões e planejamento.
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 pt-2 border-t border-neutral-100">
                    <span className="text-3xl font-extrabold text-neutral-950 font-mono">R$ 97</span>
                    <span className="text-xs text-neutral-500">/mês (placeholder)</span>
                  </div>

                  <ul className="space-y-2.5 pt-4 text-xs text-neutral-900 border-t border-neutral-100 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Tudo incluso no plano Essencial</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Cursos completos em videoaulas HD</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Apostilas e materiais teóricos em PDF</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Módulo de Planejamento e Cronogramas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Painel analítico avançado de desempenho</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 sm:pt-8">
                  <Button
                    asChild
                    className="w-full h-11 text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 rounded-xl shadow-md cursor-pointer"
                  >
                    <Link to="/register">Começar com Completo</Link>
                  </Button>
                </div>
              </div>

              {/* Plano 3: Premium */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-400 transition-all shadow-xs">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 uppercase tracking-wide">
                      PREMIUM
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Acompanhamento tático individual de mentoria e aceleração máxima.
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 pt-2 border-t border-neutral-100">
                    <span className="text-3xl font-extrabold text-neutral-950 font-mono">
                      R$ 189
                    </span>
                    <span className="text-xs text-neutral-500">/mês (placeholder)</span>
                  </div>

                  <ul className="space-y-2.5 pt-4 text-xs text-neutral-700 border-t border-neutral-100">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Tudo incluso no plano Completo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Sessões periódicas de mentoria</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Diagnóstico tático contínuo de metas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-neutral-950 shrink-0" />
                      <span>Correção prioritária de redações</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 sm:pt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-11 text-xs font-bold border-neutral-300 hover:bg-neutral-100 text-neutral-950 rounded-xl cursor-pointer"
                  >
                    <Link to="/register">Começar com Premium</Link>
                  </Button>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-neutral-500 mt-8">
              * Valores meramente demonstrativos para personalização administrativa. Garantia
              incondicional de 7 dias.
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 11: FAQ INTERATIVO (ESCURA)                                    */}
        {/* ==================================================================== */}
        <section
          id="faq"
          className="py-20 sm:py-28 bg-neutral-950 text-white border-b border-neutral-850"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-2">
              <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase">
                Tire suas dúvidas
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Perguntas Frequentes
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Respostas diretas sobre como a Minerva Educação apoia sua preparação.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 sm:px-5 py-0.5 text-left"
                >
                  <AccordionTrigger className="text-left text-xs sm:text-sm font-bold text-white hover:no-underline py-4">
                    {faq.pergunta}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs leading-relaxed text-neutral-400 pt-1 pb-4">
                    {faq.resposta}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* SEÇÃO 12: CTA FINAL CINEMATOGRÁFICO (ESCURA)                         */}
        {/* ==================================================================== */}
        <section className="py-20 sm:py-32 bg-neutral-950 text-white relative overflow-hidden">
          {/* Iluminação de Fundo */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[250px] sm:h-[350px] bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.07),transparent_70%)] blur-2xl" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 space-y-6 z-10">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Seu próximo nível começa agora.
            </h2>
            <p className="text-xs sm:text-base text-neutral-400 max-w-xl mx-auto font-normal leading-relaxed">
              Transforme sua preparação em estratégia, consistência e evolução. Crie sua conta e
              ingresse na Minerva Educação.
            </p>
            <div className="pt-2 flex justify-center">
              <Button
                size="lg"
                className="h-12 px-8 sm:px-10 text-sm font-semibold bg-white text-neutral-950 hover:bg-neutral-200 rounded-xl shadow-xl shadow-white/5 transition-all cursor-pointer min-h-[48px]"
                asChild
              >
                <Link to="/register">
                  <span>Começar agora</span>
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
