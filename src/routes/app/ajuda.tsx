import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ModulePlaceholder } from "../../components/app/PageShell";

export const Route = createFileRoute("/app/ajuda")({
  head: () => ({
    meta: [
      { title: "Ajuda | Minerva Educação" },
      { name: "description", content: "Central de suporte, perguntas frequentes e contato." },
      { property: "og:title", content: "Ajuda | Minerva Educação" },
      { property: "og:description", content: "Central de suporte, perguntas frequentes e contato." },
    ],
  }),
  component: AjudaPage,
});

function AjudaPage() {
  return (
    <>
      <PageHeader
        title="Ajuda"
        description="Central de suporte, perguntas frequentes e contato."
        breadcrumbs={[{ label: "Início", to: "/app" }, { label: "Ajuda" }]}
      />
      <ModulePlaceholder
        title="Módulo de ajuda"
        description="Central de suporte, perguntas frequentes e contato. Este módulo será liberado nas próximas etapas de desenvolvimento."
        bullets={["Perguntas frequentes","Abertura de chamados","Tutoriais da plataforma","Contato com o suporte"]}
      />
    </>
  );
}
