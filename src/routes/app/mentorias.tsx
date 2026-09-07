import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ModulePlaceholder } from "../../components/app/PageShell";

export const Route = createFileRoute("/app/mentorias")({
  head: () => ({
    meta: [
      { title: "Mentorias | Minerva Educação" },
      { name: "description", content: "Acompanhamento tático individual com um mentor." },
      { property: "og:title", content: "Mentorias | Minerva Educação" },
      { property: "og:description", content: "Acompanhamento tático individual com um mentor." },
    ],
  }),
  component: MentoriasPage,
});

function MentoriasPage() {
  return (
    <>
      <PageHeader
        title="Mentorias"
        description="Acompanhamento tático individual com um mentor."
        breadcrumbs={[{ label: "Início", to: "/app" }, { label: "Mentorias" }]}
      />
      <ModulePlaceholder
        title="Módulo de mentorias"
        description="Acompanhamento tático individual com um mentor. Este módulo será liberado nas próximas etapas de desenvolvimento."
        bullets={["Agenda de sessões","Metas acordadas com o mentor","Feedbacks e anotações","Histórico de acompanhamento"]}
      />
    </>
  );
}
