import React from "react";
import { Navigate, useLocation } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";
import type { UserRole } from "../../types/auth.types";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  requireAuth = true,
}) => {
  const { user, roles, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Minerva Educação
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (requireAuth && !user) {
    return <Navigate to="/login" search={{ redirect: location.pathname }} replace />;
  }

  // Check roles if specific roles are required
  if (allowedRoles && allowedRoles.length > 0) {
    const isSuperAdmin = roles.includes("super_admin");
    const hasRequiredRole = isSuperAdmin || allowedRoles.some((r) => roles.includes(r));

    if (!hasRequiredRole) {
      return (
        <Navigate to="/access-denied" search={{ requiredRole: allowedRoles.join(", ") }} replace />
      );
    }
  }

  return <>{children}</>;
};
