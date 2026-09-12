import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { contestsQuery, profileQuery } from "../../lib/dashboard.queries";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const ObjectiveCard: React.FC<{ userId: string }> = ({ userId }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const profile = useQuery(profileQuery(userId));
  const contests = useQuery({ ...contestsQuery(), enabled: open });

  const mutation = useMutation({
    mutationFn: async (contestId: string) => {
      const { error } = await supabase
        .from("profiles")
        .update({ target_contest_id: contestId })
        .eq("user_id", userId);
      if (error) throw new Error(error.message);
    },
    onSuccess: async () => {
      setOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["dashboard", "profile", userId] });
    },
  });

  return (
    <div className="surface-card card-lift flex items-center gap-3 rounded-2xl px-4 py-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Target className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Seu objetivo
        </p>
        {profile.isLoading ? (
          <Skeleton className="mt-1 h-4 w-24" />
        ) : (
          <p className="text-sm font-semibold leading-tight text-foreground">
            {profile.data?.targetContestName ?? "Defina seu objetivo"}
          </p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto shrink-0">
            {profile.data?.targetContestName ? "Alterar" : "Escolher concurso"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escolha seu concurso</DialogTitle>
            <DialogDescription>
              Seu objetivo principal orienta o conteúdo e as recomendações da plataforma.
            </DialogDescription>
          </DialogHeader>

          {contests.isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : contests.isError ? (
            <p className="text-sm text-destructive">Não foi possível carregar os concursos.</p>
          ) : (
            <div className="grid max-h-80 gap-2 overflow-y-auto">
              {(contests.data ?? []).map((contest) => (
                <button
                  key={contest.id}
                  type="button"
                  disabled={mutation.isPending}
                  onClick={() => mutation.mutate(contest.id)}
                  className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-left text-sm font-medium transition-colors hover:border-primary/50 hover:bg-secondary/50 disabled:opacity-60"
                >
                  <span>{contest.name}</span>
                  {profile.data?.targetContestId === contest.id ? (
                    <span className="text-xs text-primary">Atual</span>
                  ) : null}
                </button>
              ))}
            </div>
          )}
          {mutation.isError ? (
            <p className="text-sm text-destructive">Não foi possível salvar seu objetivo.</p>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};
