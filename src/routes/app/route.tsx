import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "../../components/app/AppShell";
import { RoleGuard } from "../../components/auth/RoleGuard";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <RoleGuard>
      <AppShell>
        <Outlet />
      </AppShell>
    </RoleGuard>
  );
}
