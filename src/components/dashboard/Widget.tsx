import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/utils";

interface WidgetProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const Widget: React.FC<WidgetProps> = ({
  title,
  description,
  action,
  className,
  children,
}) => (
  <section
    className={cn(
      "surface-card card-lift relative overflow-hidden rounded-2xl p-5",
      className,
    )}
  >
    <span
      aria-hidden
      className="aura -top-16 -right-12 h-32 w-32 opacity-20 animate-pulse-glow"
    />
    {(title || action) && (
      <header className="relative mb-4 flex items-start justify-between gap-3">
        <div>
          {title ? (
            <h2 className="font-heading flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground">
              <span aria-hidden className="bg-gradient-primary h-3.5 w-1 rounded-full" />
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </header>
    )}
    {children}
  </section>
);

export const WidgetSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className="h-4 w-full" style={{ width: `${100 - i * 12}%` }} />
    ))}
  </div>
);

export const WidgetError: React.FC<{ message?: string; onRetry?: () => void }> = ({
  message = "Não foi possível carregar estas informações.",
  onRetry,
}) => (
  <div role="alert" className="flex flex-col items-start gap-3 rounded-xl bg-destructive/5 p-4">
    <div className="flex items-center gap-2 text-xs text-destructive">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
    {onRetry ? (
      <Button size="sm" variant="outline" onClick={onRetry}>
        Tentar novamente
      </Button>
    ) : null}
  </div>
);

export const WidgetEmpty: React.FC<{
  title: string;
  description?: string | undefined;
  action?: React.ReactNode;
}> = ({ title, description, action }) => (
  <div className="rounded-xl border border-dashed border-border bg-secondary/30 px-4 py-8 text-center">
    <p className="text-sm font-medium text-foreground">{title}</p>
    {description ? (
      <p className="mx-auto mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    ) : null}
    {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
  </div>
);
