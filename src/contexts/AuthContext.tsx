import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { AuthContextType, UserProfile, UserRole } from "../types/auth.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_STORAGE_KEY = "minerva_demo_auth_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch profile and roles from Supabase
  const loadUserData = useCallback(async (userId: string) => {
    try {
      // 1. Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (profileError) {
        console.warn("Error fetching profile:", profileError.message);
      } else if (profileData) {
        setProfile(profileData as unknown as UserProfile);
      }

      // 2. Fetch roles
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("roles(name)")
        .eq("user_id", userId);

      if (rolesError) {
        console.warn("Error fetching user roles:", rolesError.message);
      } else if (rolesData) {
        const parsedRoles = (rolesData as Array<{ roles: { name: string } | null }>)
          .map((item) => item.roles?.name)
          .filter((name): name is UserRole => Boolean(name));

        // Default to student if no roles found
        setRoles(parsedRoles.length > 0 ? parsedRoles : ["student"]);
      }
    } catch (err) {
      console.error("Failed to load user data:", err);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await loadUserData(user.id);
    }
  }, [user, loadUserData]);

  // Initialize session
  useEffect(() => {
    let mounted = true;

    async function initAuth(): Promise<(() => void) | undefined> {
      try {
        if (isSupabaseConfigured) {
          const {
            data: { session: initialSession },
            error,
          } = await supabase.auth.getSession();
          if (error) {
            console.warn("Get session error:", error.message);
          }

          if (mounted) {
            if (initialSession?.user) {
              setSession(initialSession);
              setUser(initialSession.user);
              await loadUserData(initialSession.user.id);
            }
          }

          // Listen for Supabase auth state changes
          const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
              if (!mounted) return;

              setSession(newSession);
              setUser(newSession?.user ?? null);

              if (newSession?.user) {
                await loadUserData(newSession.user.id);
              } else {
                setProfile(null);
                setRoles([]);
              }
            },
          );

          return () => {
            authListener.subscription.unsubscribe();
          };
        } else {
          // Supabase credentials not configured in .env - check for local demo session
          if (typeof window !== "undefined") {
            const savedDemo = window.localStorage.getItem(DEMO_STORAGE_KEY);
            if (savedDemo) {
              try {
                const parsed = JSON.parse(savedDemo);
                setUser(parsed.user);
                setProfile(parsed.profile);
                setRoles(parsed.roles || ["student"]);
              } catch {
                window.localStorage.removeItem(DEMO_STORAGE_KEY);
              }
            }
          }
        }
      } catch (e) {
        console.error("Error during auth initialization:", e);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
      return undefined;
    }

    const cleanupPromise = initAuth();
    return () => {
      mounted = false;
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, [loadUserData]);

  // Sign In
  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    if (!isSupabaseConfigured) {
      // Demo authentication mode
      const mockUser: User = {
        id: "demo-student-id",
        app_metadata: {},
        user_metadata: { full_name: email.split("@")[0] },
        aud: "authenticated",
        created_at: new Date().toISOString(),
        email: email,
        phone: "",
        role: "authenticated",
        updated_at: new Date().toISOString(),
      };
      const mockProfile: UserProfile = {
        id: "demo-profile-id",
        user_id: mockUser.id,
        full_name: email.split("@")[0] ?? email,
        email: email,
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const demoRoles: UserRole[] = email.includes("admin")
        ? ["admin", "super_admin"]
        : email.includes("teacher")
          ? ["teacher"]
          : email.includes("mentor")
            ? ["mentor"]
            : ["student"];

      setUser(mockUser);
      setProfile(mockProfile);
      setRoles(demoRoles);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          DEMO_STORAGE_KEY,
          JSON.stringify({ user: mockUser, profile: mockProfile, roles: demoRoles }),
        );
      }
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error ? new Error(error.message) : null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err : new Error("Falha ao autenticar") };
    }
  };

  // Sign Up
  const signUp = async (
    fullName: string,
    email: string,
    password: string,
  ): Promise<{ error: Error | null }> => {
    if (!isSupabaseConfigured) {
      // Demo signup mode
      const mockUser: User = {
        id: "demo-student-id-" + Date.now(),
        app_metadata: {},
        user_metadata: { full_name: fullName },
        aud: "authenticated",
        created_at: new Date().toISOString(),
        email: email,
        phone: "",
        role: "authenticated",
        updated_at: new Date().toISOString(),
      };
      const mockProfile: UserProfile = {
        id: "demo-profile-id-" + Date.now(),
        user_id: mockUser.id,
        full_name: fullName,
        email: email,
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const defaultRoles: UserRole[] = ["student"];

      setUser(mockUser);
      setProfile(mockProfile);
      setRoles(defaultRoles);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          DEMO_STORAGE_KEY,
          JSON.stringify({ user: mockUser, profile: mockProfile, roles: defaultRoles }),
        );
      }
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        return { error: new Error(error.message) };
      }

      // If user was created immediately and has an ID
      if (data.user) {
        // Explicitly create profile fallback if trigger hasn't fired yet
        try {
          await supabase.from("profiles").upsert({
            user_id: data.user.id,
            full_name: fullName,
            email: email,
            status: "active",
          } as never);
        } catch {
          // Ignored if trigger handles it
        }
      }

      return { error: null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err : new Error("Falha ao cadastrar") };
    }
  };

  // Sign Out
  const signOut = async () => {
    if (!isSupabaseConfigured) {
      setUser(null);
      setSession(null);
      setProfile(null);
      setRoles([]);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(DEMO_STORAGE_KEY);
      }
      return;
    }

    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error during signOut:", err);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(null);
      setRoles([]);
    }
  };

  // Reset Password
  const resetPassword = async (email: string): Promise<{ error: Error | null }> => {
    if (!isSupabaseConfigured) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        ...(typeof window !== "undefined"
          ? { redirectTo: `${window.location.origin}/login` }
          : {}),
      });
      return { error: error ? new Error(error.message) : null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err : new Error("Falha na recuperação de senha") };
    }
  };

  // Check Role
  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (roles.includes("super_admin")) return true;
    if (Array.isArray(role)) {
      return role.some((r) => roles.includes(r));
    }
    return roles.includes(role);
  };

  // Check Admin
  const isAdmin = (): boolean => {
    return roles.includes("admin") || roles.includes("super_admin");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        roles,
        isLoading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signUp,
        signOut,
        resetPassword,
        refreshProfile,
        hasRole,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
