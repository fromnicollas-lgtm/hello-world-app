import React from "react";
import { Link } from "@tanstack/react-router";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/50 bg-white text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 lg:gap-12">
          {/* Coluna Marca e Proposta */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Minerva Educação"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground max-w-sm">
              Plataforma educacional premium de preparação de alto desempenho para concursos
              militares e vestibulares de alta concorrência.
            </p>
            <p className="text-[11px] text-muted-foreground/80 tracking-wide">
              AFA • EFOMM • EsPCEx • Escola Naval • ESA • EEAR • EPCAR • Colégio Naval
            </p>
          </div>

          {/* Coluna Preparação */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">
              Preparação
            </h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <a href="/#concursos" className="hover:text-foreground transition-colors">
                  Concursos
                </a>
              </li>
              <li>
                <a href="/#cursos" className="hover:text-foreground transition-colors">
                  Cursos
                </a>
              </li>
              <li>
                <a href="/#questoes" className="hover:text-foreground transition-colors">
                  Questões
                </a>
              </li>
              <li>
                <a href="/#simulados" className="hover:text-foreground transition-colors">
                  Simulados
                </a>
              </li>
              <li>
                <a href="/#mentorias" className="hover:text-foreground transition-colors">
                  Mentorias
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna Suporte */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">Suporte</h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link to="/support" className="hover:text-foreground transition-colors">
                  Central de ajuda
                </Link>
              </li>
              <li>
                <a href="/#faq" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@minervaeducacao.com.br"
                  className="hover:text-foreground transition-colors"
                >
                  Contato
                </a>
              </li>
              <li>
                <Link to="/app" className="hover:text-foreground transition-colors">
                  Área do Aluno
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna Legal & Institucional */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider text-foreground uppercase">Legal</h3>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Termos de Uso
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Privacidade
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Cookies
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Código de Conduta
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior com Copyright */}
        <div className="mt-14 border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Minerva Educação. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
            <span>Tecnologia • Estratégia • Disciplina</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
