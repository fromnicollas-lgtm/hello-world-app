// Cliente único da plataforma (Lovable Cloud).
// O client gerado cuida das variáveis de ambiente e da persistência de sessão.
import { supabase } from "@/integrations/supabase/client";

export { supabase };

// Mantido por compatibilidade com o restante do app: com o backend conectado,
// a plataforma sempre opera com dados reais (sem modo de demonstração).
export const isSupabaseConfigured = true;
