-- 1. Data API grants
GRANT SELECT ON public.roles, public.concursos, public.subjects, public.courses, public.course_modules, public.lessons, public.plans TO anon;

GRANT SELECT ON public.roles, public.permissions, public.role_permissions, public.concursos, public.subjects, public.courses, public.course_modules, public.lessons, public.questions, public.question_options, public.exams, public.exam_questions, public.plans, public.coupons, public.achievements, public.mentorships, public.community_groups, public.user_points, public.user_achievements, public.user_roles, public.subscriptions, public.payments, public.affiliate_profiles, public.affiliate_referrals, public.affiliate_commissions, public.clipper_profiles TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles, public.enrollments, public.lesson_progress, public.question_attempts, public.exam_attempts, public.study_sessions, public.study_goals, public.study_plans, public.notifications, public.posts, public.comments, public.likes, public.group_members, public.mentorship_members, public.clip_submissions TO authenticated;

GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- 2. Objetivo principal do aluno
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS target_contest_id UUID REFERENCES public.concursos(id) ON DELETE SET NULL;

-- 3. Políticas para tabelas que estavam sem nenhuma política
CREATE POLICY "Admins gerenciam permissões"
    ON public.permissions FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins gerenciam permissões por papel"
    ON public.role_permissions FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Afiliado e admin leem indicações"
    ON public.affiliate_referrals FOR SELECT
    TO authenticated
    USING (
        public.is_admin(auth.uid())
        OR EXISTS (
            SELECT 1 FROM public.affiliate_profiles ap
            WHERE ap.id = affiliate_referrals.affiliate_id
              AND ap.user_id = auth.uid()
        )
    );

CREATE POLICY "Admins gerenciam indicações"
    ON public.affiliate_referrals FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Autenticados leem cupons ativos"
    ON public.coupons FOR SELECT
    TO authenticated
    USING (status = 'active' OR public.is_admin(auth.uid()));

CREATE POLICY "Admins gerenciam cupons"
    ON public.coupons FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Autenticados leem grupos da comunidade"
    ON public.community_groups FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins gerenciam grupos da comunidade"
    ON public.community_groups FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Usuário gerencia sua participação em grupos"
    ON public.group_members FOR ALL
    TO authenticated
    USING (auth.uid() = user_id OR public.is_admin(auth.uid()))
    WITH CHECK (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "Autenticados leem mentorias ativas"
    ON public.mentorships FOR SELECT
    TO authenticated
    USING (status = 'active' OR public.is_admin(auth.uid()));

CREATE POLICY "Admins gerenciam mentorias"
    ON public.mentorships FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Autenticados leem questões dos simulados"
    ON public.exam_questions FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins gerenciam questões dos simulados"
    ON public.exam_questions FOR ALL
    TO authenticated
    USING (public.is_admin(auth.uid()))
    WITH CHECK (public.is_admin(auth.uid()));

-- 4. Endurecimento das funções
ALTER FUNCTION public.has_role(uuid, text) SET search_path = public;
ALTER FUNCTION public.is_admin(uuid) SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;