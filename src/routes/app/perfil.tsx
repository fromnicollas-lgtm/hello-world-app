import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ModulePlaceholder } from "../../components/app/PageShell";

export const Route = createFileRoute("/app/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil | Minerva Educação" },
      { name: "description", content: "Seus dados pessoais e preferências de estudo." },
      { property: "og:title", content: "Perfil | Minerva Educação" },
      { property: "og:description", content: "Seus dados pessoais e preferências de estudo." },
    ],
  }),
  component: PerfilPage,
});

function PerfilPage() {
  return (
    <>
      <PageHeader
        title="Perfil"
        description="Seus dados pessoais e preferências de estudo."
        breadcrumbs={[{ label: "Início", to: "/app" }, { label: "Perfil" }]}
      />
      <ModulePlaceholder
        title="Módulo de perfil"
        description="Seus dados pessoais e preferências de estudo. Este módulo será liberado nas próximas etapas de desenvolvimento."
        bullets={["Dados cadastrais","Foto e informações públicas","Concursos de interesse","Segurança da conta"]}
      />
    </>
  );
}
