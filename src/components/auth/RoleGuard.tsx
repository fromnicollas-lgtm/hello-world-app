import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";
import type { UserRole } from "../../types/auth.types";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

const FullScreenLoader: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        Minerva Educação
      </p>
    </div>
  </div>
);

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  requireAuth = true,
}) => {
  const { user, roles, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Capture the originally requested path once, so redirects never chain.
  const initialPath = useRef(location.pathname);
  const redirected = useRef(false);

  const needsLogin = requireAuth && !isLoading && !user;

  const isSuperAdmin = roles.includes("super_admin");
  const lacksRole = Boolean(
    !isLoading &&
      user &&
      allowedRoles &&
      allowedRoles.length > 0 &&
      !isSuperAdmin &&
      !allowedRoles.some((r) => roles.includes(r)),
  );

  useEffect(() => {
    if (redirected.current) return;

    if (needsLogin) {
      redirected.current = true;
      navigate({ to: "/login", search: { redirect: initialPath.current }, replace: true });
      return;
    }

    if (lacksRole && allowedRoles) {
      redirected.current = true;
      navigate({
        to: "/access-denied",
        search: { requiredRole: allowedRoles.join(", ") },
        replace: true,
      });
    }
  }, [needsLogin, lacksRole, allowedRoles, navigate]);

  if (isLoading || needsLogin || lacksRole) {
    return <FullScreenLoader />;
  }

  return <>{children}</>;
};
