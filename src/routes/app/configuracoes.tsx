import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ModulePlaceholder } from "../../components/app/PageShell";

export const Route = createFileRoute("/app/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações | Minerva Educação" },
      { name: "description", content: "Preferências da plataforma, notificações e privacidade." },
      { property: "og:title", content: "Configurações | Minerva Educação" },
      { property: "og:description", content: "Preferências da plataforma, notificações e privacidade." },
    ],
  }),
  component: ConfiguracoesPage,
});

function ConfiguracoesPage() {
  return (
    <>
      <PageHeader
        title="Configurações"
        description="Preferências da plataforma, notificações e privacidade."
        breadcrumbs={[{ label: "Início", to: "/app" }, { label: "Configurações" }]}
      />
      <ModulePlaceholder
        title="Módulo de configurações"
        description="Preferências da plataforma, notificações e privacidade. Este módulo será liberado nas próximas etapas de desenvolvimento."
        bullets={["Notificações por e-mail e push","Preferências de exibição","Privacidade e dados","Sessões ativas"]}
      />
    </>
  );
}
