import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ModulePlaceholder } from "../../components/app/PageShell";

export const Route = createFileRoute("/app/questoes")({
  head: () => ({
    meta: [
      { title: "Questões | Minerva Educação" },
      { name: "description", content: "Banco de questões filtrável por matéria, assunto, banca e ano." },
      { property: "og:title", content: "Questões | Minerva Educação" },
      { property: "og:description", content: "Banco de questões filtrável por matéria, assunto, banca e ano." },
    ],
  }),
  component: QuestoesPage,
});

function QuestoesPage() {
  return (
    <>
      <PageHeader
        title="Questões"
        description="Banco de questões filtrável por matéria, assunto, banca e ano."
        breadcrumbs={[{ label: "Início", to: "/app" }, { label: "Questões" }]}
      />
      <ModulePlaceholder
        title="Módulo de questões"
        description="Banco de questões filtrável por matéria, assunto, banca e ano. Este módulo será liberado nas próximas etapas de desenvolvimento."
        bullets={["Filtros por matéria, assunto e banca","Resolução comentada","Cadernos personalizados","Histórico de acertos e erros"]}
      />
    </>
  );
}
