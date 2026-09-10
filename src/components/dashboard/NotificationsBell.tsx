import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { notificationsQuery } from "../../lib/dashboard.queries";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "../../lib/utils";

export const NotificationsBell: React.FC<{ userId: string | undefined }> = ({ userId }) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    ...notificationsQuery(userId ?? ""),
    enabled: Boolean(userId),
  });

  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "notifications", userId] });
    },
  });

  const unread = (data ?? []).filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notificações">
          <Bell className="h-4 w-4" />
          {unread > 0 ? (
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
              {unread > 9 ? "9+" : unread}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto p-1">
          {isLoading ? (
            <div className="space-y-2 p-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : isError ? (
            <p className="p-3 text-xs text-destructive">
              Não foi possível carregar suas notificações.
            </p>
          ) : !data || data.length === 0 ? (
            <p className="p-4 text-center text-xs text-muted-foreground">
              Você não possui notificações.
            </p>
          ) : (
            data.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => !n.read && markAsRead.mutate(n.id)}
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-secondary",
                  !n.read && "bg-secondary/60",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-foreground">{n.title}</span>
                  {!n.read ? <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" /> : null}
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.message}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {new Date(n.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </button>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
