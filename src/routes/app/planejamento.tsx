import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ModulePlaceholder } from "../../components/app/PageShell";

export const Route = createFileRoute("/app/planejamento")({
  head: () => ({
    meta: [
      { title: "Planejamento | Minerva Educação" },
      { name: "description", content: "Cronograma de estudos, metas diárias e revisões programadas." },
      { property: "og:title", content: "Planejamento | Minerva Educação" },
      { property: "og:description", content: "Cronograma de estudos, metas diárias e revisões programadas." },
    ],
  }),
  component: PlanejamentoPage,
});

function PlanejamentoPage() {
  return (
    <>
      <PageHeader
        title="Planejamento"
        description="Cronograma de estudos, metas diárias e revisões programadas."
        breadcrumbs={[{ label: "Início", to: "/app" }, { label: "Planejamento" }]}
      />
      <ModulePlaceholder
        title="Módulo de planejamento"
        description="Cronograma de estudos, metas diárias e revisões programadas. Este módulo será liberado nas próximas etapas de desenvolvimento."
        bullets={["Cronograma semanal","Metas diárias de minutos","Revisões espaçadas","Checklists de conteúdo"]}
      />
    </>
  );
}
