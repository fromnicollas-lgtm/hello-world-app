import React, { useState, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  ArrowRight,
  Check,
  Play,
  Clock,
  Flame,
  CheckCircle,
  XCircle,
  TrendingUp,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

// 8 Concursos Militares - Lista Editorial
const CONCURSOS_EDITORIAL = [
  {
    num: "01",
    sigla: "AFA",
    nome: "Academia da Força Aérea",
    esfera: "Força Aérea Brasileira",
    foco: "Aviação, Intendência e Infantaria",
    grau: "Ensino Superior Militar",
    detalhe:
      "Formação de Oficiais Aviadores. Prova de alta exigência em Física, Matemática, Português e Inglês.",
  },
  {
    num: "02",
    sigla: "EFOMM",
    nome: "Escola de Formação de Oficiais da Marinha Mercante",
    esfera: "Marinha Mercante",
    foco: "Náutica e Máquinas",
    grau: "Ensino Superior",
    detalhe:
      "Centros de instrução CIAGA (Rio de Janeiro) e CIABA (Belém). Carreira internacional e remuneração expressiva.",
  },
  {
    num: "03",
    sigla: "EsPCEx",
    nome: "Escola Preparatória de Cadetes do Exército",
    esfera: "Exército Brasileiro",
    foco: "Linha de Ensino Bélico (AMAN)",
    grau: "Ensino Superior",
    detalhe:
      "Porta de entrada para a AMAN. Rigor disciplinar e amplo conteúdo programático de exatas e humanas.",
  },
  {
    num: "04",
    sigla: "ESCOLA NAVAL",
    nome: "Escola Naval",
    esfera: "Marinha do Brasil",
    foco: "Corpo da Armada, Fuzileiros e Intendência",
    grau: "Ensino Superior",
    detalhe:
      "A mais antiga instituição de ensino superior do país. Ênfase profunda em Cálculo, Física e Mecânica.",
  },
  {
    num: "05",
    sigla: "ESA",
    nome: "Escola de Sargentos das Armas",
    esfera: "Exército Brasileiro",
    foco: "Sargentos Combatentes de Carreira",
    grau: "Nível Médio Técnico",
    detalhe:
      "Formação operacional em Três Corações (MG). Alta concorrência nacional e plano de carreira estruturado.",
  },
  {
    num: "06",
    sigla: "EEAR",
    nome: "Escola de Especialistas de Aeronáutica",
    esfera: "Força Aérea Brasileira",
    foco: "Especialidades Técnicas e Operacionais",
    grau: "Nível Médio Técnico",
    detalhe:
      "O berço dos especialistas da FAB em Guaratinguetá (SP). Controle de tráfego aéreo, mecânica e eletrônica.",
  },
  {
    num: "07",
    sigla: "EPCAR",
    nome: "Escola Preparatória de Cadetes do Ar",
    esfera: "Força Aérea Brasileira",
    foco: "Ensino Médio Preparatório para a AFA",
    grau: "Ensino Médio",
    detalhe:
      "Sediada em Barbacena (MG). Uma das instituições de ensino médio mais exigentes e prestigiadas do Brasil.",
  },
  {
    num: "08",
    sigla: "COLÉGIO NAVAL",
    nome: "Colégio Naval",
    esfera: "Marinha do Brasil",
    foco: "Ensino Médio Preparatório para a EN",
    grau: "Ensino Médio",
    detalhe:
      "Localizado em Angra dos Reis (RJ). Formação de excelência matemática e preparatória para a Escola Naval.",
  },
];

// Dias para o Cronograma Tático
const CRONOGRAMA_DIAS = [
  {
    dia: "SEGUNDA",
    sigla: "SEG",
    materia: "MATEMÁTICA PURA",
    topico: "Geometria Analítica: Cônicas e Vetores",
    horas: "3h00",
    meta: "45 Questões Resolvidas",
    status: "CONCLUÍDO",
  },
  {
    dia: "TERÇA",
    sigla: "TER",
    materia: "PORTUGUÊS & REDAÇÃO",
    topico: "Sintaxe Oracional & Estrutura Dissertativa",
    horas: "2h30",
    meta: "1 Redação Corrigida",
    status: "EM ANDAMENTO",
  },
  {
    dia: "QUARTA",
    sigla: "QUA",
    materia: "FÍSICA CLÁSSICA",
    topico: "Dinâmica Newtoniana e Conservação de Energia",
    horas: "3h15",
    meta: "50 Questões AFA / EsPCEx",
    status: "PROGRAMADO",
  },
  {
    dia: "QUINTA",
    sigla: "QUI",
    materia: "INGLÊS INSTRUMENTAL",
    topico: "Compreensão Textual & Gramática Avançada",
    horas: "2h00",
    meta: "30 Questões Comentadas",
    status: "PROGRAMADO",
  },
  {
    dia: "SEXTA",
    sigla: "SEX",
    materia: "QUÍMICA / HISTÓRIA",
    topico: "Estequiometria & Formação do Brasil",
    horas: "2h30",
    meta: "Revisão Cumulativa",
    status: "PROGRAMADO",
  },
  {
    dia: "SÁBADO",
    sigla: "SÁB",
    materia: "SIMULADO GERAL",
    topico: "Simulado Inédito sob Condições Reais de Tempo",
    horas: "4h30",
    meta: "Rankings e Diagnóstico",
    status: "PROGRAMADO",
  },
];

// FAQ
const FAQS = [
  {
    p: "Qual é o diferencial pedagógico da Minerva Educação?",
    r: "A Minerva abandona o modelo de aulas genéricas e apostilas inchadas. Trabalhamos com engenharia reversa dos editais militares, aliando teoria densa e concisa, banco de questões rigorosamente classificado por padrão de banca e inteligência analítica para direcionar seu tempo exatamente onde ele gera pontos.",
  },
  {
    p: "Para quais carreiras militares a preparação é recomendada?",
    r: "Nossa estrutura cobre de forma dedicada os editais de AFA, EFOMM, EsPCEx, Escola Naval, ESA, EEAR, EPCAR e Colégio Naval. Cada concurso possui trilhas específicas que respeitam o peso e a particularidade de cada matéria.",
  },
  {
    p: "Como funciona o banco de questões na prática?",
    r: "Você filtra exercícios por concurso, disciplina, tópico específico do edital, ano e nível de dificuldade. Todas as questões contam com resolução técnica completa passo a passo, ensinando o método de resolução exigido pelas bancas.",
  },
  {
    p: "Como funcionam os simulados cronometrados?",
    r: "Os simulados reproduzem com exatidão as regras, a quantidade de questões, a ponderação de peso e o tempo limite de cada prova. Ao finalizar, você recebe um diagnóstico de rendimento comparativo e relatório de lacunas.",
  },
  {
    p: "Posso acessar a plataforma de múltiplos dispositivos?",
    r: "Sim. A plataforma é 100% responsiva e acessível em computadores, notebooks, tablets e smartphones com sincronização em tempo real de seu progresso e anotações.",
  },
  {
    p: "Como funciona a política de cancelamento?",
    r: "Você possui garantia incondicional de 7 dias após a contratação com reembolso integral caso decida não continuar. As assinaturas mensais podem ser encerradas a qualquer momento diretamente no seu painel sem nenhuma multa.",
  },
];

function LandingPage() {
  const { user } = useAuth();

  // Mouse Parallax sutil no Hero
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const heroSectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const rect = heroSectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseCoord({ x, y });
  };

  // Concurso Ativo na Lista Editorial
  const [activeConcurso, setActiveConcurso] = useState<number>(0);

  // Módulo Ativo no "Sistema Operacional da Preparação"
  const [activeOSModule, setActiveOSModule] = useState<
    "cursos" | "questoes" | "simulados" | "planejamento" | "desempenho"
  >("cursos");

  // Estado da Questão Interativa (Simulador Blueprint)
  const [selectedAlt, setSelectedAlt] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Dia Ativo no Cronograma Tático
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="flex min-h-screen flex-col bg-[#070709] text-white selection:bg-white selection:text-black font-sans antialiased">
      <Navbar />

      <main className="flex-1">
        {/* ==================================================================== */}
        {/* ATO I: HERO — A GEOMETRIA DA VISÃO E ESTRATÉGIA (PRETO PROFUNDO)     */}
        {/* ==================================================================== */}
        <section
          ref={heroSectionRef}
          onMouseMove={handleMouseMove}
          className="relative min-h-[95vh] flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#070709] overflow-hidden border-b border-neutral-900"
        >
          {/* Grid de Linhas Finas Técnicas e Marcadores + */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Grid Arquitetônico 60px */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:60px_60px]" />
            {/* Marcadores de Coordenadas Técnicas */}
            <span className="absolute top-24 left-8 text-[9px] font-mono text-neutral-600 hidden md:inline-block">
              + [SYS.COORD: 22°54'S / 43°12'W]
            </span>
            <span className="absolute top-24 right-8 text-[9px] font-mono text-neutral-600 hidden md:inline-block">
              + [TACTICAL_ENGINE: ACTIVE]
            </span>
            {/* Feixe de luz vertical ultra-sutil */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-white/15 via-white/5 to-transparent" />
          </div>

          {/* Área Central: Tipografia Monumental e Geometria do Lince */}
          <div className="relative mx-auto max-w-7xl w-full z-10 my-auto py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Bloco de Texto Editorial */}
              <div className="lg:col-span-7 space-y-8 text-left">
                {/* Metadado de Cabeçalho */}
                <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  <span className="h-1.5 w-1.5 bg-white shrink-0" />
                  <span>PREPARAÇÃO DE ALTO DESEMPENHO</span>
                  <span className="text-neutral-700">|</span>
                  <span className="text-neutral-500">ED. 2026</span>
                </div>

                {/* Título Monumental com Ritmo Tipográfico Contrastante */}
                <div className="space-y-1">
                  <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight uppercase leading-[0.98] text-white">
                    Sua aprovação
                  </h1>
                  <h2 className="text-4xl sm:text-6xl xl:text-7xl font-display font-light tracking-tight uppercase leading-[0.98] text-neutral-400">
                    começa com
                  </h2>
                  <h2 className="text-4xl sm:text-6xl xl:text-7xl font-display font-black tracking-tight uppercase leading-[0.98] text-white underline decoration-1 underline-offset-8 decoration-neutral-700">
                    estratégia.
                  </h2>
                </div>

                {/* Subtítulo Limpo */}
                <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-xl">
                  Cursos, questões, simulados, planejamento e acompanhamento para transformar sua
                  preparação em uma estratégia de alta performance.
                </p>

                {/* Ações Editoriais */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link
                    to="/register"
                    className="group inline-flex items-center justify-between sm:justify-center gap-3 bg-white text-black hover:bg-neutral-200 font-mono font-bold text-xs uppercase tracking-wider px-7 py-4 transition-all"
                  >
                    <span>COMEÇAR AGORA</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                  <a
                    href="#concursos"
                    className="inline-flex items-center justify-center border border-neutral-800 hover:border-neutral-500 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider px-7 py-4 transition-colors"
                  >
                    CONHECER A PLATAFORMA
                  </a>
                </div>
              </div>

              {/* Lado Direito: Composição Vetorial Abstrata do Lince (Visão / Foco) */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div
                  className="relative w-full max-w-md aspect-square flex items-center justify-center transition-transform duration-500 ease-out"
                  style={{
                    transform:
                      typeof window !== "undefined" && window.innerWidth >= 1024
                        ? `rotateY(${mouseCoord.x * 12}deg) rotateX(${-mouseCoord.y * 12}deg)`
                        : "none",
                  }}
                >
                  {/* Círculos e Linhas Concêntricas de Calibração */}
                  <div className="absolute inset-0 border border-neutral-800/80 rounded-full" />
                  <div className="absolute inset-8 border border-neutral-900 rounded-full" />
                  <div
                    className="absolute inset-20 border border-dashed border-neutral-850 rounded-full animate-spin"
                    style={{ animationDuration: "60s" }}
                  />

                  {/* Eixos de Mira Tática */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-neutral-850" />
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-neutral-850" />

                  {/* Silhueta Geométrica Vetorial do Lince da Minerva (Olhar + Orelhas Angulares) */}
                  <div className="relative z-10 w-4/5 h-4/5 flex flex-col items-center justify-center p-8 bg-neutral-950/90 border border-neutral-800 shadow-2xl">
                    <img
                      src="/mascot.png"
                      alt="Lince Minerva - Visão e Foco"
                      className="w-36 h-auto object-contain filter contrast-125 opacity-90 transition-transform duration-300 hover:scale-105"
                    />
                    <div className="mt-6 flex items-center gap-3 text-[10px] font-mono text-neutral-400">
                      <span className="h-1.5 w-1.5 bg-emerald-400 animate-ping" />
                      <span className="uppercase tracking-widest text-neutral-300">
                        VIGILÂNCIA & FOCO TÁTICO
                      </span>
                    </div>
                  </div>

                  {/* Tag Flutuante com Metadado */}
                  <div className="absolute -bottom-3 -right-2 bg-black border border-neutral-800 px-3 py-1.5 text-[10px] font-mono text-neutral-300">
                    STATUS: READY // 2026
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Faixa Ticker Contínua com Movimento Horizontal Suave */}
          <div className="relative z-10 w-full overflow-hidden border-t border-b border-neutral-900 py-3 bg-neutral-950">
            <div className="animate-marquee whitespace-nowrap text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              <span className="mx-6">ESTRATÉGIA</span>
              <span className="text-neutral-700">•</span>
              <span className="mx-6">DISCIPLINA</span>
              <span className="text-neutral-700">•</span>
              <span className="mx-6">PRECISÃO</span>
              <span className="text-neutral-700">•</span>
              <span className="mx-6">VISÃO DE LONGO ALCANCE</span>
              <span className="text-neutral-700">•</span>
              <span className="mx-6">ALTO DESEMPENHO MILITAR</span>
              <span className="text-neutral-700">•</span>
              <span className="mx-6">METODOLOGIA MINERVA</span>
              <span className="text-neutral-700">•</span>
              <span className="mx-6">ESTRATÉGIA</span>
              <span className="text-neutral-700">•</span>
              <span className="mx-6">DISCIPLINA</span>
              <span className="text-neutral-700">•</span>
              <span className="mx-6">PRECISÃO</span>
              <span className="text-neutral-700">•</span>
              <span className="mx-6">VISÃO DE LONGO ALCANCE</span>
              <span className="text-neutral-700">•</span>
              <span className="mx-6">ALTO DESEMPENHO MILITAR</span>
              <span className="text-neutral-700">•</span>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* ATO II: TRANSIÇÃO NARRATIVA & CONCURSOS EM LISTA EDITORIAL (BRANCO)  */}
        {/* ==================================================================== */}
        <section
          id="concursos"
          className="py-24 sm:py-32 bg-[#fafafa] text-neutral-950 border-b border-neutral-200"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Cabeçalho Editorial */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-300 pb-8 mb-12 gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600">
                  [ 01 // ESCOPO DE PREPARAÇÃO ]
                </p>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight uppercase leading-tight">
                  Prepare-se para os desafios
                  <br />
                  que realmente importam.
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal max-w-md leading-relaxed">
                Cada concurso possui uma linguagem própria. Nós organizamos o edital por relevância
                e profundidade de prova.
              </p>
            </div>

            {/* LISTA EDITORIAL DE CONCURSOS (Ruptura total com a grade de cards) */}
            <div className="border-t border-neutral-300 divide-y divide-neutral-200">
              {CONCURSOS_EDITORIAL.map((item, index) => {
                const isHovered = activeConcurso === index;
                return (
                  <div
                    key={item.sigla}
                    onMouseEnter={() => setActiveConcurso(index)}
                    className={`group py-6 sm:py-7 transition-all duration-200 cursor-pointer ${
                      isHovered ? "bg-white px-4 sm:px-6 shadow-xs" : "hover:bg-neutral-100/60"
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Número e Sigla Monumental */}
                      <div className="flex items-baseline gap-6 sm:gap-10">
                        <span className="font-mono text-xs text-neutral-500 font-bold">
                          {item.num}
                        </span>
                        <h3 className="text-2xl sm:text-4xl font-display font-black tracking-tight uppercase text-neutral-950 group-hover:translate-x-1 transition-transform">
                          {item.sigla}
                        </h3>
                        <span className="hidden md:inline-block text-xs font-mono text-neutral-600 uppercase">
                          {item.nome}
                        </span>
                      </div>

                      {/* Metadados e Detalhe */}
                      <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-mono">
                        <span className="px-2 py-0.5 border border-neutral-300 bg-neutral-100 text-neutral-800 uppercase font-bold text-[10px]">
                          {item.esfera}
                        </span>
                        <span className="text-neutral-600 text-[11px] hidden sm:inline-block">
                          {item.grau}
                        </span>
                        <div className="flex items-center gap-1.5 font-bold text-neutral-950 group-hover:text-black">
                          <span>VER TRILHA</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>

                    {/* Descrição Didática que abre no item ativo */}
                    {isHovered && (
                      <div className="mt-4 pt-3 border-t border-neutral-100 text-xs text-neutral-600 max-w-3xl animate-in fade-in duration-150">
                        <p className="leading-relaxed">
                          <strong>Foco do Edital:</strong> {item.foco}. {item.detalhe}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* ATO III: O SISTEMA OPERACIONAL DA PREPARAÇÃO (PRETO PROFUNDO)        */}
        {/* ==================================================================== */}
        <section
          id="plataforma"
          className="py-24 sm:py-36 bg-[#08080a] text-white border-b border-neutral-850"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-850 pb-8 mb-12 gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                  [ 02 // SISTEMA OPERACIONAL ]
                </p>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight uppercase leading-tight">
                  Uma plataforma.
                  <br />
                  Toda a sua preparação.
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 font-normal max-w-md leading-relaxed">
                Projetada não como um repositório passivo de arquivos, mas como uma central
                estratégica de execução de estudos.
              </p>
            </div>

            {/* Seletor Espacial dos Módulos */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border-b border-neutral-850 pb-4 mb-8 font-mono text-[11px] tracking-wider uppercase">
              {(
                [
                  { id: "cursos", label: "01. CURSOS" },
                  { id: "questoes", label: "02. BANCO DE QUESTÕES" },
                  { id: "simulados", label: "03. SIMULADOS" },
                  { id: "planejamento", label: "04. PLANEJAMENTO" },
                  { id: "desempenho", label: "05. MÉTRICAS" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveOSModule(tab.id)}
                  className={`py-2 px-3 text-left transition-all border-b-2 cursor-pointer ${
                    activeOSModule === tab.id
                      ? "border-white text-white font-bold bg-neutral-900/60"
                      : "border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Interface Central Dominante */}
            <div className="border border-neutral-800 bg-[#0c0c0f] p-4 sm:p-8 shadow-2xl">
              {activeOSModule === "cursos" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-850 pb-4 gap-2 font-mono text-xs">
                    <span className="text-neutral-400">
                      TRILHA: FÍSICA AFA / EsPCEx • MÓDULO MECÂNICA
                    </span>
                    <span className="text-white font-bold">PROGRESSO: 64%</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 aspect-video bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center text-center p-6 relative">
                      <div className="h-12 w-12 bg-white text-black flex items-center justify-center mb-3">
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </div>
                      <p className="text-sm font-bold font-mono text-white">
                        AULA 03: DINÂMICA DO MOVIMENTO CIRCULAR
                      </p>
                      <p className="text-xs text-neutral-400 mt-1">
                        Duração: 42min • Material de Apoio PDF Anexo
                      </p>
                    </div>
                    <div className="lg:col-span-4 border border-neutral-850 p-4 space-y-3 font-mono text-xs">
                      <p className="font-bold text-white border-b border-neutral-800 pb-2">
                        GRADE DO MÓDULO
                      </p>
                      <div className="space-y-2 text-[11px] text-neutral-400">
                        <p className="text-neutral-300">✓ 01. Cinemática Vetorial e Aceleração</p>
                        <p className="text-neutral-300">✓ 02. Leis de Newton e Força de Atrito</p>
                        <p className="text-white font-bold bg-neutral-900 p-1">
                          ► 03. Movimento Circular (Atual)
                        </p>
                        <p className="opacity-60">○ 04. Trabalho, Energia e Potência</p>
                        <p className="opacity-60">○ 05. Lista de Fixação: 50 Questões AFA</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeOSModule === "questoes" && (
                <div className="space-y-6 font-mono">
                  <div className="flex items-center justify-between border-b border-neutral-850 pb-4 text-xs">
                    <span className="text-neutral-400">
                      FILTROS: EFOMM / AFA • MATEMÁTICA • 2020-2024
                    </span>
                    <span className="text-emerald-400 font-bold">GABARITOS COMENTADOS: 100%</span>
                  </div>
                  <div className="p-6 bg-neutral-950 border border-neutral-850 space-y-4 text-xs">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>QUESTÃO #3189 • EFOMM</span>
                      <span>DIFICULDADE: EXPERT</span>
                    </div>
                    <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                      Sejam A e B matrizes quadradas de ordem 3 tais que det(A) = 4 e det(B) = -2. O
                      determinante da matriz M = 2·(A⁻¹)·(Bᵀ) é igual a:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 border border-neutral-800 bg-neutral-900">A) -4</div>
                      <div className="p-2 border border-white bg-white text-black font-bold">
                        B) -4 (Gabarito Oficial)
                      </div>
                      <div className="p-2 border border-neutral-800 bg-neutral-900">C) 8</div>
                      <div className="p-2 border border-neutral-800 bg-neutral-900">D) -16</div>
                    </div>
                  </div>
                </div>
              )}

              {activeOSModule === "simulados" && (
                <div className="space-y-6 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-neutral-850 pb-4">
                    <span className="text-neutral-400">SIMULADO INÉDITO GERAL • EsPCEx #04</span>
                    <span className="text-amber-400 font-bold">CRONÔMETRO ATIVO: 03:45:12</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-neutral-950 border border-neutral-850">
                      <p className="text-neutral-400 text-[10px]">TOTAL DE ITENS</p>
                      <p className="text-2xl font-bold text-white mt-1">100</p>
                    </div>
                    <div className="p-4 bg-neutral-950 border border-neutral-850">
                      <p className="text-neutral-400 text-[10px]">PESOS E CRITÉRIOS</p>
                      <p className="text-2xl font-bold text-white mt-1">OFICIAIS</p>
                    </div>
                    <div className="p-4 bg-neutral-950 border border-neutral-850">
                      <p className="text-neutral-400 text-[10px]">RANKING COMPARATIVO</p>
                      <p className="text-2xl font-bold text-white mt-1">TEMPO REAL</p>
                    </div>
                  </div>
                </div>
              )}

              {activeOSModule === "planejamento" && (
                <div className="space-y-6 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-neutral-850 pb-4">
                    <span className="text-neutral-400">
                      CICLO SEMANAL PERSONALIZADO • CARGA TOTAL: 28H
                    </span>
                    <span className="text-white font-bold">EXECUÇÃO: 78%</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-[10px]">
                    <div className="p-3 bg-white text-black font-bold">
                      SEG
                      <br />
                      MATEMÁTICA
                    </div>
                    <div className="p-3 bg-white text-black font-bold">
                      TER
                      <br />
                      PORTUGUÊS
                    </div>
                    <div className="p-3 bg-neutral-900 text-white">
                      QUA
                      <br />
                      FÍSICA
                    </div>
                    <div className="p-3 bg-neutral-900 text-white">
                      QUI
                      <br />
                      INGLÊS
                    </div>
                    <div className="p-3 bg-neutral-900 text-white">
                      SEX
                      <br />
                      QUÍMICA
                    </div>
                    <div className="p-3 bg-neutral-900 text-neutral-400">
                      SÁB
                      <br />
                      SIMULADO
                    </div>
                  </div>
                </div>
              )}

              {activeOSModule === "desempenho" && (
                <div className="space-y-6 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-neutral-850 pb-4">
                    <span className="text-neutral-400">RELATÓRIO MATEMÁTICO DE ACERTOS</span>
                    <span className="text-emerald-400 font-bold">TAXA GLOBAL: 84.6%</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[11px]">
                      <span>FÍSICA (MECÂNICA + TERMODINÂMICA)</span>
                      <span className="font-bold text-white">82%</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 overflow-hidden">
                      <div className="h-full bg-white" style={{ width: "82%" }} />
                    </div>
                    <div className="flex justify-between text-[11px] pt-2">
                      <span>MATEMÁTICA (ÁLGEBRA + GEOMETRIA)</span>
                      <span className="font-bold text-white">89%</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-900 overflow-hidden">
                      <div className="h-full bg-white" style={{ width: "89%" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* ATO IV: SEÇÃO DE QUESTÕES — PRATIQUE. ANALISE. EVOLUA. (BRANCO)      */}
        {/* ==================================================================== */}
        <section
          id="questoes"
          className="py-24 sm:py-32 bg-white text-neutral-950 border-b border-neutral-200"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Coluna Editorial Typográfica */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">
                  [ 03 // RESOLUÇÃO DE ALTO NÍVEL ]
                </p>

                <div className="space-y-1">
                  <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase leading-[0.95]">
                    PRATIQUE.
                  </h2>
                  <h3 className="text-4xl sm:text-6xl font-display font-light tracking-tight uppercase leading-[0.95] text-neutral-400">
                    ANALISE.
                  </h3>
                  <h3 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase leading-[0.95] text-neutral-950">
                    EVOLUA.
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed max-w-md">
                  A retenção de conteúdo não ocorre assistindo horas passivas de aula. Ela é
                  construída na trincheira da resolução de questões com correção imediata.
                </p>

                <div className="pt-2 font-mono text-xs text-neutral-700 space-y-2">
                  <p>+ Filtros rápidos por provas oficiais</p>
                  <p>+ Passo a passo algébrico e analítico</p>
                  <p>+ Mapeamento automático de pontos cegos</p>
                </div>
              </div>

              {/* Coluna Blueprint: Questão Técnica Interativa */}
              <div className="lg:col-span-7">
                <div className="border-2 border-neutral-950 bg-[#fafafa] p-6 sm:p-8 space-y-5 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-neutral-300 pb-3 text-[11px]">
                    <span className="font-bold text-neutral-950">[ QUESTÃO #4012 • AFA 2024 ]</span>
                    <span className="text-neutral-600">GEOMETRIA ANALÍTICA</span>
                  </div>

                  <p className="text-sm font-sans font-medium text-neutral-900 leading-relaxed">
                    Considere no plano cartesiano a circunferência de equação{" "}
                    <strong>x² + y² - 4x + 6y - 12 = 0</strong>. A reta tangente à circunferência no
                    ponto <strong>P(5, 1)</strong> possui equação geral dada por:
                  </p>

                  <div className="space-y-2 pt-2">
                    {[
                      { l: "A", text: "3x + 4y - 19 = 0", ok: true },
                      { l: "B", text: "4x - 3y - 17 = 0", ok: false },
                      { l: "C", text: "3x - 4y - 11 = 0", ok: false },
                      { l: "D", text: "2x + 5y - 15 = 0", ok: false },
                    ].map((alt) => {
                      const isSel = selectedAlt === alt.l;
                      return (
                        <button
                          key={alt.l}
                          onClick={() => {
                            setSelectedAlt(alt.l);
                            setShowAnswer(false);
                          }}
                          className={`w-full text-left p-3 border transition-all flex items-center justify-between cursor-pointer ${
                            showAnswer
                              ? alt.ok
                                ? "bg-neutral-950 text-white border-neutral-950 font-bold"
                                : isSel
                                  ? "bg-red-50 border-red-400 text-red-900"
                                  : "bg-white border-neutral-200 text-neutral-700"
                              : isSel
                                ? "bg-neutral-950 text-white border-neutral-950 font-bold"
                                : "bg-white border-neutral-200 text-neutral-800 hover:border-neutral-500"
                          }`}
                        >
                          <span>
                            {alt.l}) {alt.text}
                          </span>
                          {showAnswer && alt.ok && (
                            <span className="text-[10px] uppercase font-bold text-white">
                              [ CORRETA ]
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <Button
                      onClick={() => setShowAnswer(true)}
                      disabled={!selectedAlt}
                      className="w-full sm:w-auto bg-neutral-950 text-white hover:bg-neutral-800 font-mono text-xs uppercase px-6 py-2.5 rounded-none cursor-pointer"
                    >
                      VERIFICAR GABARITO
                    </Button>
                    <span className="text-[10px] text-neutral-500">
                      {showAnswer
                        ? selectedAlt === "A"
                          ? "✓ Correto! Resolução disponível."
                          : "✕ Incorreto. Analise a fundamentação."
                        : "Selecione uma alternativa."}
                    </span>
                  </div>

                  {showAnswer && (
                    <div className="p-4 bg-neutral-100 border border-neutral-300 text-[11px] leading-relaxed text-neutral-800 space-y-1">
                      <p className="font-bold text-neutral-950">RESOLUÇÃO DIDÁTICA:</p>
                      <p>
                        1. Completando os quadrados: (x-2)² + (y+3)² = 25. Centro C(2, -3) e Raio R
                        = 5.
                      </p>
                      <p>2. O vetor CP = P(5,1) - C(2,-3) = (3, 4) é normal à reta tangente.</p>
                      <p>
                        3. Equação da reta: 3x + 4y + c = 0. Substituindo P(5,1): 3(5) + 4(1) + c =
                        0 ⇒ c = -19.
                      </p>
                      <p className="font-bold text-neutral-950 mt-1">
                        Resposta: 3x + 4y - 19 = 0 (Opção A).
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* ATO V: DESEMPENHO EM ESCALA MONUMENTAL (BRANCO & ALTO CONTRASTE)     */}
        {/* ==================================================================== */}
        <section
          id="desempenho"
          className="py-24 sm:py-36 bg-[#f7f7f9] text-neutral-950 border-b border-neutral-200"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-3 mb-16 text-left">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">
                [ 04 // INTELIGÊNCIA DE DADOS ]
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase leading-tight">
                Você não precisa estudar mais.
                <br />
                Precisa estudar melhor.
              </h2>
              <p className="text-sm text-neutral-600 font-normal max-w-xl leading-relaxed">
                Estudar sem métricas é apenas esforço cego. A Minerva quantifica cada hora de
                dedicação para maximizar a conversão de tempo em acertos.
              </p>
            </div>

            {/* NÚMEROS COMO ELEMENTOS DE COMPOSIÇÃO (SEM CARDS ARREDONDADOS) */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-neutral-300 divide-y md:divide-y-0 md:divide-x divide-neutral-300 py-12">
              <div className="py-6 md:py-0 md:px-8 space-y-2">
                <p className="text-6xl sm:text-7xl font-mono font-black tracking-tighter text-neutral-950">
                  87<span className="text-neutral-400 font-light">%</span>
                </p>
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-800">
                  APROVEITAMENTO MÉDIO
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  Mapeamento de questões resolvidas e simulados com identificação de erros
                  reincidentes.
                </p>
              </div>

              <div className="py-6 md:py-0 md:px-8 space-y-2">
                <p className="text-6xl sm:text-7xl font-mono font-black tracking-tighter text-neutral-950">
                  42<span className="text-neutral-400 font-light">h</span>
                </p>
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-800">
                  HORAS ESTUDADAS NO CICLO
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  Cronometragem ativa de estudo real em blocos de alta concentração, sem distrações.
                </p>
              </div>

              <div className="py-6 md:py-0 md:px-8 space-y-2">
                <p className="text-6xl sm:text-7xl font-mono font-black tracking-tighter text-neutral-950">
                  1.420
                </p>
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-800">
                  QUESTÕES CONCLUÍDAS
                </p>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  Resolução estruturada cobrindo todo o histórico de bancas examinadoras militares.
                </p>
              </div>
            </div>

            <p className="pt-6 text-[10px] font-mono text-neutral-400 uppercase tracking-widest text-right">
              * Indicadores e métricas analíticas geradas pelo sistema do aluno
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* ATO VI: PLANEJAMENTO SEMANAL TÁTICO (CLARA)                          */}
        {/* ==================================================================== */}
        <section
          id="planejamento"
          className="py-24 sm:py-32 bg-white text-neutral-950 border-b border-neutral-200"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-300 pb-8 mb-12 gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">
                  [ 05 // CRONOGRAMA TÁTICO ]
                </p>
                <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight uppercase leading-tight">
                  Seu estudo deixa de ser improviso
                  <br />e passa a ter estratégia.
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal max-w-md leading-relaxed">
                Distribuição equilibrada por ciclo de disciplinas para evitar o esquecimento e
                garantir cobertura completa do edital.
              </p>
            </div>

            {/* Linha da Semana em Tabela Arquitetônica */}
            <div className="border border-neutral-300 divide-y divide-neutral-200 font-mono text-xs">
              {CRONOGRAMA_DIAS.map((item, idx) => (
                <div
                  key={item.dia}
                  onClick={() => setActiveDay(idx)}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                    activeDay === idx ? "bg-neutral-100 font-bold" : "hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span className="w-16 font-bold text-neutral-950">{item.dia}</span>
                    <span className="text-sm font-sans font-bold text-neutral-900">
                      {item.materia}
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 text-neutral-600 text-[11px]">
                    <span className="hidden md:inline-block">{item.topico}</span>
                    <span className="font-bold text-neutral-950">{item.horas}</span>
                    <span className="px-2 py-0.5 border border-neutral-300 bg-white text-[10px]">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* ATO VII: MENTORIA — NÃO ESTUDE SOZINHO (PRETO)                       */}
        {/* ==================================================================== */}
        <section
          id="mentoria"
          className="py-24 sm:py-36 bg-[#070709] text-white border-b border-neutral-850"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-3 mb-16 text-left">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                [ 06 // ORIENTAÇÃO TÁTICA ]
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase leading-tight">
                Não estude sozinho.
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed">
                Acompanhamento e suporte tático de quem conhece de ponta a ponta as peculiaridades
                das bancas examinadoras militares.
              </p>
            </div>

            {/* 3 Colunas Separadas por Linhas Finas */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-neutral-800 divide-y md:divide-y-0 md:divide-x divide-neutral-800 py-10 font-mono">
              <div className="py-6 md:py-0 md:px-8 space-y-3">
                <p className="text-xs font-bold text-neutral-400">01 // METAS TÁTICAS</p>
                <h3 className="text-xl font-bold font-sans text-white">Planejamento Individual</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans font-normal">
                  Metas semanais ajustadas à sua rotina real para manter consistência sem
                  esgotamento mental.
                </p>
              </div>

              <div className="py-6 md:py-0 md:px-8 space-y-3">
                <p className="text-xs font-bold text-neutral-400">02 // DIAGNÓSTICO CONTÍNUO</p>
                <h3 className="text-xl font-bold font-sans text-white">
                  Blindagem de Pontos Cegos
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans font-normal">
                  Análise matemática dos assuntos em que você mais perde pontos para orientar
                  revisões de choque.
                </p>
              </div>

              <div className="py-6 md:py-0 md:px-8 space-y-3">
                <p className="text-xs font-bold text-neutral-400">03 // COMUNIDADE DE ELITE</p>
                <h3 className="text-xl font-bold font-sans text-white">Ambiente Focado</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans font-normal">
                  Espaço exclusivo para discussão de resolução de questões difíceis com outros
                  estudantes dedicados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* ATO VIII: METODOLOGIA EM 4 ETAPAS (LINHA CONECTADA)                  */}
        {/* ==================================================================== */}
        <section className="py-24 sm:py-32 bg-[#fafafa] text-neutral-950 border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16 space-y-2 text-left">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500">
                [ 07 // MÉTODO LINEAR ]
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight uppercase">
                Como funciona a sua jornada
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  n: "01",
                  t: "ESCOLHA SEU OBJETIVO",
                  d: "Defina o concurso militar almejado e acesse a grade de peso oficial do edital.",
                },
                {
                  n: "02",
                  t: "MONTE SUA ESTRATÉGIA",
                  d: "Estruture suas horas de estudo em ciclos balanceados de teoria e resolução.",
                },
                {
                  n: "03",
                  t: "EXECUTE SEU PLANO",
                  d: "Resolva milhares de itens comentados e consolide matérias com videoaulas HD.",
                },
                {
                  n: "04",
                  t: "ACOMPANHE SUA EVOLUÇÃO",
                  d: "Realize simulados sob tempo real e aperfeiçoe sua velocidade de prova.",
                },
              ].map((step) => (
                <div key={step.n} className="border-t-2 border-neutral-950 pt-4 space-y-2">
                  <span className="font-mono text-4xl font-black text-neutral-950">{step.n}</span>
                  <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-neutral-950">
                    {step.t}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* ATO IX: MOMENTO DE SILÊNCIO VISUAL (BRANCO PURO)                     */}
        {/* ==================================================================== */}
        <section className="py-32 sm:py-44 bg-white text-neutral-950 border-b border-neutral-200 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              MANIFESTO // MINERVA EDUCAÇÃO
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight uppercase leading-[1.05] text-neutral-950">
              "Grandes aprovações não acontecem por acaso.
            </h2>
            <p className="text-2xl sm:text-4xl font-display font-light uppercase tracking-tight text-neutral-500">
              Elas são construídas todos os dias."
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* ATO X: PLANOS COMERCIAIS (PRETO)                                     */}
        {/* ==================================================================== */}
        <section
          id="planos"
          className="py-24 sm:py-36 bg-[#070709] text-white border-b border-neutral-850"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                [ 08 // PLANOS & ADESÃO ]
              </p>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight uppercase">
                Escolha seu plano de estudos
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                Flexibilidade absoluta. Cancele quando quiser com garantia incondicional de 7 dias.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto font-mono">
              {/* Essencial */}
              <div className="border border-neutral-800 bg-neutral-950 p-7 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase text-neutral-400">ESSENCIAL</p>
                  <p className="text-4xl font-black text-white font-mono">
                    R$ 59<span className="text-xs text-neutral-500 font-normal">/mês*</span>
                  </p>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    A base sólida de questões e simulados para consolidar sua preparação.
                  </p>
                  <ul className="pt-4 border-t border-neutral-900 space-y-2 text-xs text-neutral-300">
                    <li>+ Banco de Questões Militares Completo</li>
                    <li>+ Filtros por Concurso e Dificuldade</li>
                    <li>+ Gabaritos e Resoluções Didáticas</li>
                    <li>+ Simulados Inéditos Cronometrados</li>
                  </ul>
                </div>
                <Link
                  to="/register"
                  className="w-full py-3 text-center border border-neutral-700 text-white font-mono text-xs uppercase hover:bg-white hover:text-black transition-colors"
                >
                  SELECIONAR ESSENCIAL
                </Link>
              </div>

              {/* Completo (Mais Escolhido) */}
              <div className="relative border-2 border-white bg-[#0e0e12] p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
                <div className="absolute -top-3 left-6 bg-white text-black px-3 py-0.5 text-[9px] font-bold uppercase tracking-widest">
                  MAIS ESCOLHIDO
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase text-white">COMPLETO</p>
                  <p className="text-4xl font-black text-white font-mono">
                    R$ 97<span className="text-xs text-neutral-500 font-normal">/mês*</span>
                  </p>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                    O ecossistema integral de teoria, videoaulas, questões e planejamento.
                  </p>
                  <ul className="pt-4 border-t border-neutral-800 space-y-2 text-xs text-white">
                    <li>+ Tudo incluso no plano Essencial</li>
                    <li>+ Cursos completos em videoaulas HD</li>
                    <li>+ Apostilas teóricas em PDF para download</li>
                    <li>+ Módulo de Planejamento e Cronogramas</li>
                    <li>+ Painel analítico de desempenho por matéria</li>
                  </ul>
                </div>
                <Link
                  to="/register"
                  className="w-full py-3 text-center bg-white text-black font-mono font-bold text-xs uppercase hover:bg-neutral-200 transition-colors"
                >
                  SELECIONAR COMPLETO →
                </Link>
              </div>

              {/* Premium */}
              <div className="border border-neutral-800 bg-neutral-950 p-7 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase text-neutral-400">PREMIUM</p>
                  <p className="text-4xl font-black text-white font-mono">
                    R$ 189<span className="text-xs text-neutral-500 font-normal">/mês*</span>
                  </p>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Acompanhamento tático individual e correção prioritária de redações.
                  </p>
                  <ul className="pt-4 border-t border-neutral-900 space-y-2 text-xs text-neutral-300">
                    <li>+ Tudo incluso no plano Completo</li>
                    <li>+ Sessões periódicas de mentoria individual</li>
                    <li>+ Diagnóstico tático contínuo de metas</li>
                    <li>+ Correção detalhada de redações militares</li>
                  </ul>
                </div>
                <Link
                  to="/register"
                  className="w-full py-3 text-center border border-neutral-700 text-white font-mono text-xs uppercase hover:bg-white hover:text-black transition-colors"
                >
                  SELECIONAR PREMIUM
                </Link>
              </div>
            </div>

            <p className="text-center text-[10px] font-mono text-neutral-500 mt-8">
              * Valores meramente demonstrativos para personalização administrativa.
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* ATO XI: FAQ EDITORIAL (PRETO)                                        */}
        {/* ==================================================================== */}
        <section
          id="faq"
          className="py-24 sm:py-32 bg-[#070709] text-white border-b border-neutral-850"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-left max-w-xl mb-12 space-y-2">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                [ 09 // DÚVIDAS FREQUENTES ]
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight uppercase">
                Perguntas Frequentes
              </h2>
            </div>

            {/* Accordion com Divisores de Linha Simples (Sem Cards) */}
            <Accordion
              type="single"
              collapsible
              className="w-full divide-y divide-neutral-850 border-t border-b border-neutral-850"
            >
              {FAQS.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border-none py-2">
                  <AccordionTrigger className="text-left text-sm font-mono uppercase font-bold text-white hover:no-underline py-4">
                    {faq.p}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs font-sans leading-relaxed text-neutral-400 pt-1 pb-4">
                    {faq.r}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* ATO XII: CTA FINAL (PRETO PROFUNDO & CONVERSÃO)                      */}
        {/* ==================================================================== */}
        <section className="py-28 sm:py-40 bg-[#070709] text-white relative overflow-hidden text-center">
          <div className="relative mx-auto max-w-4xl px-4 space-y-6 z-10">
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              CONCURSOS MILITARES // ALTO DESEMPENHO
            </p>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase leading-[1.02]">
              Seu próximo nível começa agora.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto font-normal leading-relaxed">
              Transforme sua preparação em estratégia, consistência e evolução. Crie sua conta e
              ingresse na Minerva Educação.
            </p>
            <div className="pt-4 flex justify-center">
              <Link
                to="/register"
                className="group inline-flex items-center gap-3 bg-white text-black hover:bg-neutral-200 font-mono font-bold text-xs uppercase tracking-wider px-9 py-4 transition-all"
              >
                <span>COMEÇAR AGORA</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
