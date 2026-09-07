import type { Session, User } from "@supabase/supabase-js";

export type UserRole =
  | "student"
  | "teacher"
  | "mentor"
  | "influencer"
  | "clipper"
  | "editor"
  | "support"
  | "admin"
  | "super_admin";

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  phone?: string | null;
  birth_date?: string | null;
  status: "active" | "inactive" | "suspended";
  created_at: string;
  updated_at: string;
}

export interface RoleRecord {
  id: string;
  name: UserRole;
  description?: string | null;
  created_at: string;
}

export interface UserRoleRecord {
  id: string;
  user_id: string;
  role_id: string;
  roles?: RoleRecord;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  roles: UserRole[];
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (fullName: string, email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  isAdmin: () => boolean;
}
