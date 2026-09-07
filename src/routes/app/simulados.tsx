import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ModulePlaceholder } from "../../components/app/PageShell";

export const Route = createFileRoute("/app/simulados")({
  head: () => ({
    meta: [
      { title: "Simulados | Minerva Educação" },
      { name: "description", content: "Provas completas cronometradas com correção e estatísticas." },
      { property: "og:title", content: "Simulados | Minerva Educação" },
      { property: "og:description", content: "Provas completas cronometradas com correção e estatísticas." },
    ],
  }),
  component: SimuladosPage,
});

function SimuladosPage() {
  return (
    <>
      <PageHeader
        title="Simulados"
        description="Provas completas cronometradas com correção e estatísticas."
        breadcrumbs={[{ label: "Início", to: "/app" }, { label: "Simulados" }]}
      />
      <ModulePlaceholder
        title="Módulo de simulados"
        description="Provas completas cronometradas com correção e estatísticas. Este módulo será liberado nas próximas etapas de desenvolvimento."
        bullets={["Simulados oficiais e inéditos","Cronômetro e folha de respostas","Correção automática","Comparativo com outros alunos"]}
      />
    </>
  );
}
