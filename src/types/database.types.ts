export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      roles: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      permissions: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      role_permissions: {
        Row: {
          id: string;
          role_id: string;
          permission_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          role_id: string;
          permission_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          role_id?: string;
          permission_id?: string;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          email: string;
          avatar_url: string | null;
          phone: string | null;
          birth_date: string | null;
          status: "active" | "inactive" | "suspended";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name: string;
          email: string;
          avatar_url?: string | null;
          phone?: string | null;
          birth_date?: string | null;
          status?: "active" | "inactive" | "suspended";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string;
          email?: string;
          avatar_url?: string | null;
          phone?: string | null;
          birth_date?: string | null;
          status?: "active" | "inactive" | "suspended";
          created_at?: string;
          updated_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role_id?: string;
          created_at?: string;
        };
      };
      concursos: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          logo_url: string | null;
          status: "active" | "inactive";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          logo_url?: string | null;
          status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          logo_url?: string | null;
          status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
      };
      subjects: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          status: "active" | "inactive";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          thumbnail_url: string | null;
          status: "draft" | "published" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          thumbnail_url?: string | null;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          thumbnail_url?: string | null;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };
      };
      course_modules: {
        Row: {
          id: string;
          course_id: string;
          name: string;
          description: string | null;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          name: string;
          description?: string | null;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          name?: string;
          description?: string | null;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          name: string;
          description: string | null;
          video_url: string | null;
          material_url: string | null;
          duration: number;
          position: number;
          status: "draft" | "published";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          module_id: string;
          name: string;
          description?: string | null;
          video_url?: string | null;
          material_url?: string | null;
          duration?: number;
          position?: number;
          status?: "draft" | "published";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          module_id?: string;
          name?: string;
          description?: string | null;
          video_url?: string | null;
          material_url?: string | null;
          duration?: number;
          position?: number;
          status?: "draft" | "published";
          created_at?: string;
          updated_at?: string;
        };
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          status: "active" | "expired" | "canceled";
          started_at: string;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          status?: "active" | "expired" | "canceled";
          started_at?: string;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          status?: "active" | "expired" | "canceled";
          started_at?: string;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      lesson_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          progress: number;
          completed: boolean;
          last_position: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          progress?: number;
          completed?: boolean;
          last_position?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          progress?: number;
          completed?: boolean;
          last_position?: number;
          updated_at?: string;
        };
      };
      questions: {
        Row: {
          id: string;
          subject_id: string | null;
          contest_id: string | null;
          statement: string;
          explanation: string | null;
          difficulty: "easy" | "medium" | "hard" | "expert";
          source: string | null;
          year: number | null;
          status: "active" | "review" | "inactive";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          subject_id?: string | null;
          contest_id?: string | null;
          statement: string;
          explanation?: string | null;
          difficulty?: "easy" | "medium" | "hard" | "expert";
          source?: string | null;
          year?: number | null;
          status?: "active" | "review" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          subject_id?: string | null;
          contest_id?: string | null;
          statement?: string;
          explanation?: string | null;
          difficulty?: "easy" | "medium" | "hard" | "expert";
          source?: string | null;
          year?: number | null;
          status?: "active" | "review" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
      };
      question_options: {
        Row: {
          id: string;
          question_id: string;
          option_text: string;
          is_correct: boolean;
          position: number;
        };
        Insert: {
          id?: string;
          question_id: string;
          option_text: string;
          is_correct?: boolean;
          position?: number;
        };
        Update: {
          id?: string;
          question_id?: string;
          option_text?: string;
          is_correct?: boolean;
          position?: number;
        };
      };
      question_attempts: {
        Row: {
          id: string;
          user_id: string;
          question_id: string;
          selected_option_id: string | null;
          is_correct: boolean;
          time_spent: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          question_id: string;
          selected_option_id?: string | null;
          is_correct: boolean;
          time_spent?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          question_id?: string;
          selected_option_id?: string | null;
          is_correct?: boolean;
          time_spent?: number;
          created_at?: string;
        };
      };
      exams: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          contest_id: string | null;
          duration: number;
          status: "draft" | "published" | "archived";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          contest_id?: string | null;
          duration?: number;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          contest_id?: string | null;
          duration?: number;
          status?: "draft" | "published" | "archived";
          created_at?: string;
          updated_at?: string;
        };
      };
      exam_questions: {
        Row: {
          id: string;
          exam_id: string;
          question_id: string;
          position: number;
        };
        Insert: {
          id?: string;
          exam_id: string;
          question_id: string;
          position?: number;
        };
        Update: {
          id?: string;
          exam_id?: string;
          question_id?: string;
          position?: number;
        };
      };
      exam_attempts: {
        Row: {
          id: string;
          user_id: string;
          exam_id: string;
          started_at: string;
          finished_at: string | null;
          score: number | null;
          correct_answers: number | null;
          total_questions: number | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          exam_id: string;
          started_at?: string;
          finished_at?: string | null;
          score?: number | null;
          correct_answers?: number | null;
          total_questions?: number | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          exam_id?: string;
          started_at?: string;
          finished_at?: string | null;
          score?: number | null;
          correct_answers?: number | null;
          total_questions?: number | null;
        };
      };
      plans: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          billing_period: "monthly" | "quarterly" | "semiannual" | "annual" | "lifetime";
          status: "active" | "inactive";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price?: number;
          billing_period?: "monthly" | "quarterly" | "semiannual" | "annual" | "lifetime";
          status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          billing_period?: "monthly" | "quarterly" | "semiannual" | "annual" | "lifetime";
          status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_id: string;
          status: "trialing" | "active" | "past_due" | "canceled" | "expired";
          started_at: string;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_id: string;
          status?: "trialing" | "active" | "past_due" | "canceled" | "expired";
          started_at?: string;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_id?: string;
          status?: "trialing" | "active" | "past_due" | "canceled" | "expired";
          started_at?: string;
          expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: "info" | "success" | "warning" | "alert";
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type?: "info" | "success" | "warning" | "alert";
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: "info" | "success" | "warning" | "alert";
          read?: boolean;
          created_at?: string;
        };
      };
    };
  };
}
