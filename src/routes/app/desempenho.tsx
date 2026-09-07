import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ModulePlaceholder } from "../../components/app/PageShell";

export const Route = createFileRoute("/app/desempenho")({
  head: () => ({
    meta: [
      { title: "Desempenho | Minerva Educação" },
      { name: "description", content: "Estatísticas de evolução por matéria e assunto." },
      { property: "og:title", content: "Desempenho | Minerva Educação" },
      { property: "og:description", content: "Estatísticas de evolução por matéria e assunto." },
    ],
  }),
  component: DesempenhoPage,
});

function DesempenhoPage() {
  return (
    <>
      <PageHeader
        title="Desempenho"
        description="Estatísticas de evolução por matéria e assunto."
        breadcrumbs={[{ label: "Início", to: "/app" }, { label: "Desempenho" }]}
      />
      <ModulePlaceholder
        title="Módulo de desempenho"
        description="Estatísticas de evolução por matéria e assunto. Este módulo será liberado nas próximas etapas de desenvolvimento."
        bullets={["Evolução por matéria","Pontos fortes e fracos","Histórico de simulados","Projeção de aprovação"]}
      />
    </>
  );
}
