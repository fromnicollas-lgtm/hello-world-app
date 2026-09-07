import React from "react";
import { Link } from "@tanstack/react-router";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-850 bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 lg:gap-12">
          {/* Coluna Marca e Proposta */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src="/logo-dark.png"
                alt="Minerva Educação"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-xs leading-relaxed text-neutral-400 max-w-sm">
              Plataforma educacional premium de preparação de alto desempenho para concursos
              militares e vestibulares de alta concorrência.
            </p>
            <p className="text-[11px] text-neutral-500 tracking-wide font-mono">
              AFA • EFOMM • EsPCEx • Escola Naval • ESA • EEAR • EPCAR • Colégio Naval
            </p>
          </div>

          {/* Coluna Preparação */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-neutral-200 uppercase">
              Preparação
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="/#concursos" className="hover:text-white transition-colors">
                  Concursos
                </a>
              </li>
              <li>
                <a href="/#plataforma" className="hover:text-white transition-colors">
                  Cursos
                </a>
              </li>
              <li>
                <a href="/#questoes-demo" className="hover:text-white transition-colors">
                  Questões
                </a>
              </li>
              <li>
                <a href="/#desempenho" className="hover:text-white transition-colors">
                  Simulados
                </a>
              </li>
              <li>
                <a href="/#mentoria" className="hover:text-white transition-colors">
                  Mentorias
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna Suporte */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-neutral-200 uppercase">Suporte</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link to="/support" className="hover:text-white transition-colors">
                  Central de ajuda
                </Link>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@minervaeducacao.com.br"
                  className="hover:text-white transition-colors"
                >
                  Contato
                </a>
              </li>
              <li>
                <Link to="/app" className="hover:text-white transition-colors">
                  Área do Aluno
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna Legal & Institucional */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-neutral-200 uppercase">Legal</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Termos de Uso
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacidade
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Cookies</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Segurança & RLS
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior com Copyright */}
        <div className="mt-14 border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Minerva Educação. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Estratégia • Disciplina • Alto Desempenho</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
