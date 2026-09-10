import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ModulePlaceholder } from "../../components/app/PageShell";

export const Route = createFileRoute("/app/lives")({
  head: () => ({
    meta: [
      { title: "Lives | Minerva Educação" },
      { name: "description", content: "Aulas ao vivo, revisões e resoluções em tempo real." },
      { property: "og:title", content: "Lives | Minerva Educação" },
      { property: "og:description", content: "Aulas ao vivo, revisões e resoluções em tempo real." },
    ],
  }),
  component: LivesPage,
});

function LivesPage() {
  return (
    <>
      <PageHeader
        title="Lives"
        description="Aulas ao vivo, revisões e resoluções em tempo real."
        breadcrumbs={[{ label: "Início", to: "/app" }, { label: "Lives" }]}
      />
      <ModulePlaceholder
        title="Módulo de lives"
        description="Aulas ao vivo, revisões e resoluções em tempo real. Este módulo será liberado nas próximas etapas de desenvolvimento."
        bullets={["Agenda de transmissões","Sala ao vivo com chat","Gravações anteriores","Lembretes de aulas"]}
      />
    </>
  );
}
