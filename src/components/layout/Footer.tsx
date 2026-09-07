import React from "react";
import { Link } from "@tanstack/react-router";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/60 bg-background text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Coluna Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background font-semibold text-xs">
                M
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground uppercase">
                Minerva Educação
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Plataforma premium e tecnológica de preparação de alta performance para os
              vestibulares militares mais concorridos do Brasil.
            </p>
          </div>

          {/* Coluna Concursos Militares */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase mb-3">
              Concursos
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-foreground transition-colors cursor-default">
                  AFA • Aeronáutica
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-default">
                  EFOMM • Marinha Mercante
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-default">
                  EsPCEx • Exército
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-default">
                  Escola Naval • Marinha
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-default">
                  ESA • Sargentos do Exército
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-default">
                  EEAR • Sargentos da Aeronáutica
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-default">
                  EPCAR & Colégio Naval
                </span>
              </li>
            </ul>
          </div>

          {/* Coluna Recursos do Ecossistema */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase mb-3">
              Ecossistema
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/app" className="hover:text-foreground transition-colors">
                  Banco de Questões
                </Link>
              </li>
              <li>
                <Link to="/app" className="hover:text-foreground transition-colors">
                  Simulados Inéditos
                </Link>
              </li>
              <li>
                <Link to="/app" className="hover:text-foreground transition-colors">
                  Planejamento e Cronogramas
                </Link>
              </li>
              <li>
                <Link to="/app" className="hover:text-foreground transition-colors">
                  Comunidade de Estudos
                </Link>
              </li>
              <li>
                <Link to="/influencer" className="hover:text-foreground transition-colors">
                  Programa de Afiliados
                </Link>
              </li>
              <li>
                <Link to="/clipper" className="hover:text-foreground transition-colors">
                  Programa de Clipadores
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna Plataforma & Institucional */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase mb-3">
              Institucional
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/login" className="hover:text-foreground transition-colors">
                  Portal do Aluno
                </Link>
              </li>
              <li>
                <Link to="/teacher" className="hover:text-foreground transition-colors">
                  Área do Professor
                </Link>
              </li>
              <li>
                <Link to="/mentor" className="hover:text-foreground transition-colors">
                  Área do Mentor
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-foreground transition-colors">
                  Central de Suporte
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Termos de Uso e Privacidade</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Minerva Educação. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-muted-foreground tracking-wide">
            Excelência • Rigor • Aprovação
          </p>
        </div>
      </div>
    </footer>
  );
};
