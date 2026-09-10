import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ModulePlaceholder } from "../../components/app/PageShell";

export const Route = createFileRoute("/app/comunidade")({
  head: () => ({
    meta: [
      { title: "Comunidade | Minerva Educação" },
      { name: "description", content: "Espaço de discussão, dúvidas e troca entre alunos." },
      { property: "og:title", content: "Comunidade | Minerva Educação" },
      { property: "og:description", content: "Espaço de discussão, dúvidas e troca entre alunos." },
    ],
  }),
  component: ComunidadePage,
});

function ComunidadePage() {
  return (
    <>
      <PageHeader
        title="Comunidade"
        description="Espaço de discussão, dúvidas e troca entre alunos."
        breadcrumbs={[{ label: "Início", to: "/app" }, { label: "Comunidade" }]}
      />
      <ModulePlaceholder
        title="Módulo de comunidade"
        description="Espaço de discussão, dúvidas e troca entre alunos. Este módulo será liberado nas próximas etapas de desenvolvimento."
        bullets={["Fóruns por matéria","Dúvidas respondidas por professores","Grupos por concurso","Regras de convivência"]}
      />
    </>
  );
}
