import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ModulePlaceholder } from "../../components/app/PageShell";

export const Route = createFileRoute("/app/cursos")({
  head: () => ({
    meta: [
      { title: "Cursos | Minerva Educação" },
      { name: "description", content: "Trilhas completas, módulos e videoaulas para cada concurso." },
      { property: "og:title", content: "Cursos | Minerva Educação" },
      { property: "og:description", content: "Trilhas completas, módulos e videoaulas para cada concurso." },
    ],
  }),
  component: CursosPage,
});

function CursosPage() {
  return (
    <>
      <PageHeader
        title="Cursos"
        description="Trilhas completas, módulos e videoaulas para cada concurso."
        breadcrumbs={[{ label: "Início", to: "/app" }, { label: "Cursos" }]}
      />
      <ModulePlaceholder
        title="Módulo de cursos"
        description="Trilhas completas, módulos e videoaulas para cada concurso. Este módulo será liberado nas próximas etapas de desenvolvimento."
        bullets={["Catálogo de cursos por concurso","Módulos e videoaulas com progresso","Materiais em PDF anexos","Retomada automática da última aula"]}
      />
    </>
  );
}
