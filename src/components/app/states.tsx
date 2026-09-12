import React from "react";
import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";

/* ---------------------------------- Empty --------------------------------- */

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = Inbox,
  actionLabel,
  onAction,
  className,
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 px-6 py-12 text-center",
      className,
    )}
  >
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-muted-foreground">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
    {description ? (
      <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">{description}</p>
    ) : null}
    {actionLabel && onAction ? (
      <Button size="sm" variant="outline" className="mt-5" onClick={onAction}>
        {actionLabel}
      </Button>
    ) : null}
  </div>
);

/* ---------------------------------- Error --------------------------------- */

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Não conseguimos carregar este conteúdo.",
  description = "Verifique sua conexão e tente novamente em instantes.",
  onRetry,
  className,
}) => (
  <div
    role="alert"
    className={cn(
      "flex flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 px-6 py-12 text-center",
      className,
    )}
  >
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
      <AlertTriangle className="h-5 w-5" />
    </div>
    <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
    <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">{description}</p>
    {onRetry ? (
      <Button size="sm" variant="outline" className="mt-5" onClick={onRetry}>
        Tentar novamente
      </Button>
    ) : null}
  </div>
);

/* --------------------------------- Loading -------------------------------- */

export const Spinner: React.FC<{ className?: string; label?: string }> = ({
  className,
  label = "Carregando",
}) => (
  <span role="status" aria-label={label}>
    <Loader2 className={cn("h-4 w-4 animate-spin text-muted-foreground", className)} />
  </span>
);

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("surface-card rounded-xl p-5", className)}>
    <Skeleton className="h-3 w-24" />
    <Skeleton className="mt-3 h-7 w-20" />
    <Skeleton className="mt-3 h-3 w-32" />
  </div>
);

export const PageSkeleton: React.FC = () => (
  <div className="space-y-6" aria-busy="true">
    <div className="space-y-2">
      <Skeleton className="h-6 w-56" />
      <Skeleton className="h-3 w-80 max-w-full" />
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
    <Skeleton className="h-52 w-full rounded-xl" />
  </div>
);

export const ListSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => (
  <div className="space-y-3" aria-busy="true">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-4">
        <Skeleton className="h-9 w-9 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);
