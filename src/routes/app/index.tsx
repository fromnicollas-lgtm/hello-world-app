import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CalendarRange, LineChart, PlayCircle, Target, Trophy } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { PageHeader, Section, StatCard, ProgressBar } from "../../components/app/PageShell";
import { EmptyState } from "../../components/app/states";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Início | Portal do Aluno — Minerva Educação" },
      {
        name: "description",
        content: "Acompanhe sua preparação, metas e desempenho no portal da Minerva Educação.",
      },
      { property: "og:title", content: "Início | Portal do Aluno — Minerva Educação" },
      {
        property: "og:description",
        content: "Acompanhe sua preparação, metas e desempenho no portal da Minerva Educação.",
      },
    ],
  }),
  component: StudentHome,
});

function StudentHome() {
  const { user, profile, roles } = useAuth();
  const firstName = (profile?.full_name || user?.email?.split("@")[0] || "Aluno").split(" ")[0];

  return (
    <>
      <PageHeader
        title={`Olá, ${firstName}`}
        description="Este é o seu ponto de partida diário. Os módulos serão ativados progressivamente."
        actions={
          <Badge variant="outline" className="text-[10px] font-semibold uppercase">
            {roles.length ? roles.join(", ") : "student"}
          </Badge>
        }
      />

      <Section
        title="Resumo da preparação"
        description="Estrutura pronta — os indicadores reais chegam com os próximos módulos."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Cursos em andamento" value="—" hint="Aguardando módulo" icon={BookOpen} />
          <StatCard label="Questões resolvidas" value="—" hint="Aguardando módulo" icon={Target} />
          <StatCard label="Meta semanal" value="—" hint="Aguardando módulo" icon={CalendarRange} />
          <StatCard label="Desempenho" value="—" hint="Aguardando módulo" icon={LineChart} />
        </div>
      </Section>

      <Section title="Continuar estudando">
        <EmptyState
          icon={PlayCircle}
          title="Você ainda não iniciou nenhum curso."
          description="Quando o módulo de cursos for liberado, sua última aula aparecerá aqui para retomar em um toque."
        />
      </Section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Section title="Próximas metas">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <p className="text-xs text-muted-foreground">
              Área reservada para as metas do seu cronograma de estudos.
            </p>
            <ProgressBar value={0} label="Progresso semanal" />
            <Button asChild size="sm" variant="outline">
              <Link to="/app/planejamento">Abrir planejamento</Link>
            </Button>
          </div>
        </Section>

        <Section title="Atividades recentes">
          <EmptyState
            icon={Trophy}
            title="Nenhuma atividade registrada."
            description="Aulas assistidas, simulados e conquistas aparecerão nesta lista."
          />
        </Section>
      </div>
    </>
  );
}
