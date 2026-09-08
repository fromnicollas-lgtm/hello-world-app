import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/* -------------------------------------------------------------------------- */
/* Helpers de data                                                            */
/* -------------------------------------------------------------------------- */

export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Segunda-feira 00:00 da semana corrente (horário local do aluno). */
export function startOfWeek(): Date {
  const d = startOfToday();
  const day = (d.getDay() + 6) % 7; // 0 = segunda
  d.setDate(d.getDate() - day);
  return d;
}

export function daysAgo(n: number): Date {
  const d = startOfToday();
  d.setDate(d.getDate() - n);
  return d;
}

function dayKey(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

export function formatMinutes(total: number): string {
  const safe = Math.max(0, Math.round(total));
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}min`;
}

/* -------------------------------------------------------------------------- */
/* Perfil + objetivo                                                          */
/* -------------------------------------------------------------------------- */

export interface DashboardProfile {
  fullName: string | null;
  targetContestId: string | null;
  targetContestName: string | null;
  targetContestSlug: string | null;
}

export const profileQuery = (userId: string) =>
  queryOptions({
    queryKey: ["dashboard", "profile", userId],
    queryFn: async (): Promise<DashboardProfile> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, target_contest_id, concursos:target_contest_id (name, slug)")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw new Error(error.message);

      const contest = (data?.concursos ?? null) as { name: string; slug: string } | null;
      return {
        fullName: data?.full_name ?? null,
        targetContestId: data?.target_contest_id ?? null,
        targetContestName: contest?.name ?? null,
        targetContestSlug: contest?.slug ?? null,
      };
    },
    staleTime: 60_000,
  });

export const contestsQuery = () =>
  queryOptions({
    queryKey: ["contests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("concursos")
        .select("id, name, slug")
        .eq("status", "active")
        .order("name");
      if (error) throw new Error(error.message);
      return data ?? [];
    },
    staleTime: 10 * 60_000,
  });

/* -------------------------------------------------------------------------- */
/* Sessões de estudo: horas + sequência                                       */
/* -------------------------------------------------------------------------- */

export interface StudyStats {
  minutesToday: number;
  minutesWeek: number;
  minutesMonth: number;
  streak: number;
  hasSessions: boolean;
}

export const studySessionsQuery = (userId: string) =>
  queryOptions({
    queryKey: ["dashboard", "study-sessions", userId],
    queryFn: async (): Promise<StudyStats> => {
      const { data, error } = await supabase
        .from("study_sessions")
        .select("duration, started_at")
        .eq("user_id", userId)
        .gte("started_at", daysAgo(120).toISOString())
        .order("started_at", { ascending: false });

      if (error) throw new Error(error.message);

      const sessions = data ?? [];
      const today = startOfToday().getTime();
      const week = startOfWeek().getTime();
      const month = daysAgo(30).getTime();

      let minutesToday = 0;
      let minutesWeek = 0;
      let minutesMonth = 0;
      const days = new Set<string>();

      for (const s of sessions) {
        const at = new Date(s.started_at).getTime();
        const minutes = s.duration ?? 0;
        if (at >= today) minutesToday += minutes;
        if (at >= week) minutesWeek += minutes;
        if (at >= month) minutesMonth += minutes;
        if (minutes > 0) days.add(dayKey(s.started_at));
      }

      // Sequência: dias consecutivos com estudo, contando de hoje (ou ontem) para trás.
      let streak = 0;
      const cursor = startOfToday();
      if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
      while (days.has(dayKey(new Date(cursor)))) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      }

      return {
        minutesToday,
        minutesWeek,
        minutesMonth,
        streak,
        hasSessions: sessions.length > 0,
      };
    },
    staleTime: 30_000,
  });

/* -------------------------------------------------------------------------- */
/* Questões: total, acerto, evolução e disciplinas                            */
/* -------------------------------------------------------------------------- */

export interface SubjectPerformance {
  subject: string;
  total: number;
  accuracy: number;
}

export interface QuestionStats {
  total: number;
  correct: number;
  accuracy: number | null;
  recentTotal: number;
  evolution: Array<{ date: string; label: string; accuracy: number; total: number }>;
  bySubject: SubjectPerformance[];
}

export const questionStatsQuery = (userId: string) =>
  queryOptions({
    queryKey: ["dashboard", "question-stats", userId],
    queryFn: async (): Promise<QuestionStats> => {
      const [totalRes, correctRes, recentRes] = await Promise.all([
        supabase
          .from("question_attempts")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId),
        supabase
          .from("question_attempts")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId)
          .eq("is_correct", true),
        supabase
          .from("question_attempts")
          .select("is_correct, created_at, questions ( subjects ( name ) )")
          .eq("user_id", userId)
          .gte("created_at", daysAgo(29).toISOString())
          .order("created_at", { ascending: true }),
      ]);

      if (totalRes.error) throw new Error(totalRes.error.message);
      if (correctRes.error) throw new Error(correctRes.error.message);
      if (recentRes.error) throw new Error(recentRes.error.message);

      const total = totalRes.count ?? 0;
      const correct = correctRes.count ?? 0;
      const recent = (recentRes.data ?? []) as Array<{
        is_correct: boolean;
        created_at: string;
        questions: { subjects: { name: string } | null } | null;
      }>;

      // Evolução dos últimos 7 dias
      const evolution: QuestionStats["evolution"] = [];
      for (let i = 6; i >= 0; i--) {
        const day = daysAgo(i);
        const key = dayKey(day);
        const rows = recent.filter((r) => dayKey(r.created_at) === key);
        const hits = rows.filter((r) => r.is_correct).length;
        evolution.push({
          date: key,
          label: day.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
          accuracy: rows.length > 0 ? Math.round((hits / rows.length) * 100) : 0,
          total: rows.length,
        });
      }

      // Desempenho por disciplina (últimos 30 dias)
      const map = new Map<string, { total: number; correct: number }>();
      for (const row of recent) {
        const name = row.questions?.subjects?.name;
        if (!name) continue;
        const entry = map.get(name) ?? { total: 0, correct: 0 };
        entry.total += 1;
        if (row.is_correct) entry.correct += 1;
        map.set(name, entry);
      }

      const bySubject: SubjectPerformance[] = [...map.entries()]
        .map(([subject, v]) => ({
          subject,
          total: v.total,
          accuracy: Math.round((v.correct / v.total) * 100),
        }))
        .sort((a, b) => b.accuracy - a.accuracy);

      return {
        total,
        correct,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : null,
        recentTotal: recent.length,
        evolution,
        bySubject,
      };
    },
    staleTime: 30_000,
  });

/* -------------------------------------------------------------------------- */
/* Continuar estudando                                                        */
/* -------------------------------------------------------------------------- */

export interface ContinueStudyingData {
  hasEnrollment: boolean;
  courseName: string | null;
  moduleName: string | null;
  lessonName: string | null;
  lessonId: string | null;
  courseId: string | null;
  progress: number;
  lessonsCompleted: number;
  lessonsTotal: number;
}

export const continueStudyingQuery = (userId: string) =>
  queryOptions({
    queryKey: ["dashboard", "continue-studying", userId],
    queryFn: async (): Promise<ContinueStudyingData> => {
      const empty: ContinueStudyingData = {
        hasEnrollment: false,
        courseName: null,
        moduleName: null,
        lessonName: null,
        lessonId: null,
        courseId: null,
        progress: 0,
        lessonsCompleted: 0,
        lessonsTotal: 0,
      };

      const { data: enrollments, error: enrollError } = await supabase
        .from("enrollments")
        .select("course_id, started_at, courses ( id, name )")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("started_at", { ascending: false });

      if (enrollError) throw new Error(enrollError.message);
      const enrollment = (enrollments ?? [])[0] as
        | { course_id: string; courses: { id: string; name: string } | null }
        | undefined;
      if (!enrollment) return empty;

      const { data: lessons, error: lessonsError } = await supabase
        .from("lessons")
        .select("id, name, position, course_modules!inner ( id, name, position, course_id )")
        .eq("course_modules.course_id", enrollment.course_id)
        .eq("status", "published")
        .order("position", { ascending: true });

      if (lessonsError) throw new Error(lessonsError.message);

      const allLessons = ((lessons ?? []) as Array<{
        id: string;
        name: string;
        position: number;
        course_modules: { id: string; name: string; position: number } | null;
      }>).sort(
        (a, b) =>
          (a.course_modules?.position ?? 0) - (b.course_modules?.position ?? 0) ||
          a.position - b.position,
      );

      if (allLessons.length === 0) {
        return {
          ...empty,
          hasEnrollment: true,
          courseId: enrollment.course_id,
          courseName: enrollment.courses?.name ?? null,
        };
      }

      const { data: progressRows, error: progressError } = await supabase
        .from("lesson_progress")
        .select("lesson_id, completed, progress, updated_at")
        .eq("user_id", userId)
        .in(
          "lesson_id",
          allLessons.map((l) => l.id),
        )
        .order("updated_at", { ascending: false });

      if (progressError) throw new Error(progressError.message);

      const progressList = progressRows ?? [];
      const completedIds = new Set(progressList.filter((p) => p.completed).map((p) => p.lesson_id));

      // 1) última aula iniciada e não concluída  2) próxima aula não concluída
      const startedNotFinished = progressList.find((p) => !p.completed);
      const target =
        allLessons.find((l) => l.id === startedNotFinished?.lesson_id) ??
        allLessons.find((l) => !completedIds.has(l.id)) ??
        allLessons[0]!;

      return {
        hasEnrollment: true,
        courseId: enrollment.course_id,
        courseName: enrollment.courses?.name ?? null,
        moduleName: target.course_modules?.name ?? null,
        lessonName: target.name,
        lessonId: target.id,
        progress: Math.round((completedIds.size / allLessons.length) * 100),
        lessonsCompleted: completedIds.size,
        lessonsTotal: allLessons.length,
      };
    },
    staleTime: 30_000,
  });

/* -------------------------------------------------------------------------- */
/* Metas                                                                      */
/* -------------------------------------------------------------------------- */

export interface GoalItem {
  id: string;
  title: string;
  targetMinutes: number;
  minutesDone: number;
  percent: number;
  deadline: string | null;
}

export const goalsQuery = (userId: string) =>
  queryOptions({
    queryKey: ["dashboard", "goals", userId],
    queryFn: async (): Promise<GoalItem[]> => {
      const weekStart = startOfWeek().toISOString();

      const [goalsRes, minutesRes] = await Promise.all([
        supabase
          .from("study_goals")
          .select("id, title, target_minutes, deadline, status")
          .eq("user_id", userId)
          .eq("status", "in_progress")
          .order("deadline", { ascending: true, nullsFirst: false })
          .limit(4),
        supabase
          .from("study_sessions")
          .select("duration")
          .eq("user_id", userId)
          .gte("started_at", weekStart),
      ]);

      if (goalsRes.error) throw new Error(goalsRes.error.message);
      if (minutesRes.error) throw new Error(minutesRes.error.message);

      const minutesDone = (minutesRes.data ?? []).reduce((sum, s) => sum + (s.duration ?? 0), 0);

      return (goalsRes.data ?? []).map((goal) => {
        const target = goal.target_minutes || 0;
        return {
          id: goal.id,
          title: goal.title,
          targetMinutes: target,
          minutesDone,
          percent: target > 0 ? Math.min(100, Math.round((minutesDone / target) * 100)) : 0,
          deadline: goal.deadline,
        };
      });
    },
    staleTime: 30_000,
  });

/* -------------------------------------------------------------------------- */
/* Próximas atividades (planos + metas com prazo)                             */
/* -------------------------------------------------------------------------- */

export interface UpcomingItem {
  id: string;
  title: string;
  when: string;
  kind: "plano" | "meta";
}

export const upcomingQuery = (userId: string) =>
  queryOptions({
    queryKey: ["dashboard", "upcoming", userId],
    queryFn: async (): Promise<UpcomingItem[]> => {
      const todayIso = startOfToday().toISOString();

      const [plansRes, goalsRes] = await Promise.all([
        supabase
          .from("study_plans")
          .select("id, name, start_date, end_date")
          .eq("user_id", userId)
          .eq("status", "active")
          .gte("end_date", todayIso.slice(0, 10))
          .order("start_date", { ascending: true })
          .limit(4),
        supabase
          .from("study_goals")
          .select("id, title, deadline")
          .eq("user_id", userId)
          .eq("status", "in_progress")
          .not("deadline", "is", null)
          .gte("deadline", todayIso)
          .order("deadline", { ascending: true })
          .limit(4),
      ]);

      if (plansRes.error) throw new Error(plansRes.error.message);
      if (goalsRes.error) throw new Error(goalsRes.error.message);

      const plans: UpcomingItem[] = (plansRes.data ?? []).map((p) => ({
        id: `plan-${p.id}`,
        title: p.name,
        when: `${new Date(`${p.start_date}T00:00:00`).toLocaleDateString("pt-BR")} — ${new Date(
          `${p.end_date}T00:00:00`,
        ).toLocaleDateString("pt-BR")}`,
        kind: "plano",
      }));

      const goals: UpcomingItem[] = (goalsRes.data ?? []).map((g) => ({
        id: `goal-${g.id}`,
        title: g.title,
        when: g.deadline
          ? new Date(g.deadline).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        kind: "meta",
      }));

      return [...plans, ...goals].slice(0, 5);
    },
    staleTime: 60_000,
  });

/* -------------------------------------------------------------------------- */
/* Atividade recente (derivada dos dados existentes)                          */
/* -------------------------------------------------------------------------- */

export interface ActivityItem {
  id: string;
  text: string;
  at: string;
  kind: "aula" | "questao" | "estudo";
}

export const recentActivityQuery = (userId: string) =>
  queryOptions({
    queryKey: ["dashboard", "recent-activity", userId],
    queryFn: async (): Promise<ActivityItem[]> => {
      const since = daysAgo(30).toISOString();

      const [lessonsRes, attemptsRes, sessionsRes] = await Promise.all([
        supabase
          .from("lesson_progress")
          .select("lesson_id, completed, updated_at, lessons ( name )")
          .eq("user_id", userId)
          .gte("updated_at", since)
          .order("updated_at", { ascending: false })
          .limit(5),
        supabase
          .from("question_attempts")
          .select("created_at")
          .eq("user_id", userId)
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(50),
        supabase
          .from("study_sessions")
          .select("id, duration, started_at, subjects ( name )")
          .eq("user_id", userId)
          .gte("started_at", since)
          .order("started_at", { ascending: false })
          .limit(5),
      ]);

      if (lessonsRes.error) throw new Error(lessonsRes.error.message);
      if (attemptsRes.error) throw new Error(attemptsRes.error.message);
      if (sessionsRes.error) throw new Error(sessionsRes.error.message);

      const items: ActivityItem[] = [];

      for (const row of (lessonsRes.data ?? []) as Array<{
        lesson_id: string;
        completed: boolean;
        updated_at: string;
        lessons: { name: string } | null;
      }>) {
        items.push({
          id: `lesson-${row.lesson_id}`,
          text: row.completed
            ? `Você concluiu a aula ${row.lessons?.name ?? ""}`.trim()
            : `Você avançou na aula ${row.lessons?.name ?? ""}`.trim(),
          at: row.updated_at,
          kind: "aula",
        });
      }

      // Agrupa tentativas por dia
      const perDay = new Map<string, { count: number; at: string }>();
      for (const row of attemptsRes.data ?? []) {
        const key = dayKey(row.created_at);
        const entry = perDay.get(key) ?? { count: 0, at: row.created_at };
        entry.count += 1;
        perDay.set(key, entry);
      }
      for (const [key, value] of perDay) {
        items.push({
          id: `attempts-${key}`,
          text: `Você resolveu ${value.count} ${value.count === 1 ? "questão" : "questões"}`,
          at: value.at,
          kind: "questao",
        });
      }

      for (const row of (sessionsRes.data ?? []) as Array<{
        id: string;
        duration: number;
        started_at: string;
        subjects: { name: string } | null;
      }>) {
        const subject = row.subjects?.name ? ` de ${row.subjects.name}` : "";
        items.push({
          id: `session-${row.id}`,
          text: `Você registrou ${formatMinutes(row.duration)}${subject} de estudo`,
          at: row.started_at,
          kind: "estudo",
        });
      }

      return items.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()).slice(0, 6);
    },
    staleTime: 30_000,
  });

/* -------------------------------------------------------------------------- */
/* Notificações                                                               */
/* -------------------------------------------------------------------------- */

export const notificationsQuery = (userId: string) =>
  queryOptions({
    queryKey: ["dashboard", "notifications", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("id, title, message, type, read, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw new Error(error.message);
      return data ?? [];
    },
    staleTime: 30_000,
  });
