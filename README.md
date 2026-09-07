# MINERVA EDUCAÇÃO

Plataforma educacional SaaS premium de alta performance, projetada para a preparação aos concursos militares e vestibulares de elite do Brasil:

- **AFA** (Academia da Força Aérea)
- **EFOMM** (Escola de Formação de Oficiais da Marinha Mercante)
- **EsPCEx** (Escola Preparatória de Cadetes do Exército)
- **Escola Naval** (Escola Naval - Marinha do Brasil)
- **ESA** (Escola de Sargentos das Armas)
- **EEAR** (Escola de Especialistas de Aeronáutica)
- **EPCAR** (Escola Preparatória de Cadetes do Ar)
- **Colégio Naval** (Colégio Naval - Marinha do Brasil)

---

## 🏛️ Arquitetura & Stack Tecnológica

- **Frontend & SSR**: React 19, TypeScript, TanStack Start & TanStack Router (roteamento baseado em arquivos).
- **Estilização & Design System**: Tailwind CSS v4, Radix UI, componentes estilizados com tokens oklch, estética clean, minimalista e premium.
- **Backend & Dados**: Supabase (PostgreSQL, Supabase Auth, Row Level Security).
- **Segurança**: Row Level Security (RLS) habilitado em 100% das tabelas, controle granular de acesso baseado em papéis (RBAC com 9 roles).

---

## 👥 Papéis de Usuário (RBAC)

1. `student` - Acesso a cursos, videoaulas, simulados, banco de questões e cronogramas.
2. `teacher` - Gestão de aulas, materiais teóricos e resolução de dúvidas.
3. `mentor` - Acompanhamento tático de alunos mentorados e metas.
4. `influencer` - Painel de afiliados, métricas de conversão e comissões.
5. `clipper` - Painel de submissão de cortes de vídeos e pontuação.
6. `editor` - Catalogação e revisão de questões, apostilas em PDF e módulos.
7. `support` - Atendimento a alunos, notificações e resolução de chamados.
8. `admin` - Gestão operacional de usuários, conteúdos e relatórios.
9. `super_admin` - Controle total irrestrito do ecossistema.

---

## 🗄️ Estrutura do Banco de Dados & Migrações

O script completo de criação das tabelas, índices, enums, triggers automáticos e políticas de Row Level Security está localizado em:
[`supabase/migrations/0001_initial_schema.sql`](./supabase/migrations/0001_initial_schema.sql)

### Execução no Supabase

1. Acesse o painel do seu projeto Supabase (ou Lovable Supabase integration).
2. Abra a aba **SQL Editor**.
3. Cole o conteúdo de `supabase/migrations/0001_initial_schema.sql` e execute.

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (ou configure no painel Lovable) baseado em `.env.example`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

_Nota: Na ausência das variáveis de ambiente, a plataforma ativa automaticamente o modo de simulação local para testes rápidos dos fluxos e papéis._

---

## 🚀 Como Executar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Compilar para produção
npm run build

# 4. Verificar linting e formatação
npm run lint
npm run format
```
