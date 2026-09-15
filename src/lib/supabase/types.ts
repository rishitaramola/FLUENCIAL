// =============================================================================
// Database types — hand-authored to match migrations 0000 through 0005
// Regenerate with `supabase gen types typescript` once Supabase CLI is set up.
// =============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ─── Enums ───────────────────────────────────────────────────────────────────

export type AppRole = 'ADMIN' | 'TEACHER' | 'STUDENT'
export type CourseStatus = 'draft' | 'published' | 'archived'
export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'FOLLOW_UP'
  | 'INTERESTED'
  | 'REGISTERED'
  | 'CONVERTED'
  | 'CLOSED'
export type StudentStatus = 'LEAD' | 'ENROLLED' | 'ACTIVE' | 'COMPLETED' | 'INACTIVE'
export type PaymentStatus = 'CREATED' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE'
export type Skill =
  | 'SPEAKING'
  | 'LISTENING'
  | 'READING'
  | 'WRITING'
  | 'GRAMMAR'
  | 'VOCABULARY'
  | 'PRONUNCIATION'
  | 'MOCK_EXAM'

// ─── Database ─────────────────────────────────────────────────────────────────

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: AppRole
          full_name: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: AppRole
          full_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: AppRole
          full_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          user_id: string
          role: AppRole
        }
        Insert: {
          user_id: string
          role?: AppRole
        }
        Update: {
          user_id?: string
          role?: AppRole
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          id: string
          role: AppRole
          permission: string
        }
        Insert: {
          id?: string
          role: AppRole
          permission: string
        }
        Update: {
          id?: string
          role?: AppRole
          permission?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          id: string
          title: string
          slug: string
          level: string
          short_description: string
          description: string
          syllabus: Json
          duration: string
          mode: string
          batch_size: number
          start_date: string | null
          fee: number
          registration_fee: number
          installment_available: boolean
          material_included: boolean
          mock_tests: number
          speaking_practice: boolean
          brochure_url: string | null
          status: CourseStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          level: string
          short_description: string
          description: string
          syllabus?: Json
          duration: string
          mode: string
          batch_size: number
          start_date?: string | null
          fee: number
          registration_fee: number
          installment_available?: boolean
          material_included?: boolean
          mock_tests?: number
          speaking_practice?: boolean
          brochure_url?: string | null
          status?: CourseStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          level?: string
          short_description?: string
          description?: string
          syllabus?: Json
          duration?: string
          mode?: string
          batch_size?: number
          start_date?: string | null
          fee?: number
          registration_fee?: number
          installment_available?: boolean
          material_included?: boolean
          mock_tests?: number
          speaking_practice?: boolean
          brochure_url?: string | null
          status?: CourseStatus
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      teachers: {
        Row: {
          id: string
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'teachers_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      students: {
        Row: {
          id: string
          teacher_id: string | null
          status: StudentStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          teacher_id?: string | null
          status?: StudentStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          teacher_id?: string | null
          status?: StudentStatus
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'students_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'students_teacher_id_fkey'
            columns: ['teacher_id']
            isOneToOne: false
            referencedRelation: 'teachers'
            referencedColumns: ['id']
          },
        ]
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          course_id: string | null
          status: LeadStatus
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          course_id?: string | null
          status?: LeadStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          course_id?: string | null
          status?: LeadStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'leads_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
        ]
      }
      webhook_events: {
        Row: {
          id: string
          razorpay_event_id: string
          event_type: string
          payload: Json
          created_at: string
        }
        Insert: {
          id?: string
          razorpay_event_id: string
          event_type: string
          payload: Json
          created_at?: string
        }
        Update: {
          id?: string
          razorpay_event_id?: string
          event_type?: string
          payload?: Json
          created_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          id: string
          order_id: string
          payment_id: string | null
          student_id: string | null
          course_id: string | null
          amount_paise: number
          currency: string
          status: PaymentStatus
          method: string | null
          razorpay_event_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          payment_id?: string | null
          student_id?: string | null
          course_id?: string | null
          amount_paise: number
          currency?: string
          status?: PaymentStatus
          method?: string | null
          razorpay_event_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          payment_id?: string | null
          student_id?: string | null
          course_id?: string | null
          amount_paise?: number
          currency?: string
          status?: PaymentStatus
          method?: string | null
          razorpay_event_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'payments_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'students'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'payments_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'payments_razorpay_event_id_fkey'
            columns: ['razorpay_event_id']
            isOneToOne: false
            referencedRelation: 'webhook_events'
            referencedColumns: ['razorpay_event_id']
          },
        ]
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          category: string | null
          display_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string | null
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string | null
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          id: string
          student_name: string
          course_name: string
          score_achievement: string
          testimonial_text: string
          video_url: string | null
          avatar_url: string | null
          is_featured: boolean | null
          display_order: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_name: string
          course_name: string
          score_achievement: string
          testimonial_text: string
          video_url?: string | null
          avatar_url?: string | null
          is_featured?: boolean | null
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_name?: string
          course_name?: string
          score_achievement?: string
          testimonial_text?: string
          video_url?: string | null
          avatar_url?: string | null
          is_featured?: boolean | null
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      batches: {
        Row: {
          id: string
          course_id: string | null
          batch_name: string
          start_date: string
          end_date: string | null
          schedule_text: string
          capacity: number
          enrolled_count: number
          teacher_id: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id?: string | null
          batch_name: string
          start_date: string
          end_date?: string | null
          schedule_text: string
          capacity?: number
          enrolled_count?: number
          teacher_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string | null
          batch_name?: string
          start_date?: string
          end_date?: string | null
          schedule_text?: string
          capacity?: number
          enrolled_count?: number
          teacher_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'batches_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'batches_teacher_id_fkey'
            columns: ['teacher_id']
            isOneToOne: false
            referencedRelation: 'teachers'
            referencedColumns: ['id']
          },
        ]
      }
      enrollments: {
        Row: {
          id: string
          student_id: string | null
          course_id: string | null
          batch_id: string | null
          teacher_id: string | null
          amount_paid: number
          balance: number
          status: string
          enrollment_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id?: string | null
          course_id?: string | null
          batch_id?: string | null
          teacher_id?: string | null
          amount_paid?: number
          balance?: number
          status?: string
          enrollment_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string | null
          course_id?: string | null
          batch_id?: string | null
          teacher_id?: string | null
          amount_paid?: number
          balance?: number
          status?: string
          enrollment_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'enrollments_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'students'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'enrollments_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'enrollments_batch_id_fkey'
            columns: ['batch_id']
            isOneToOne: false
            referencedRelation: 'batches'
            referencedColumns: ['id']
          },
        ]
      }
      demo_bookings: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          current_level: string | null
          purpose: string | null
          preferred_date: string | null
          preferred_time: string | null
          status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone?: string | null
          current_level?: string | null
          purpose?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          current_level?: string | null
          purpose?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string | null
          created_at?: string
        }
        Relationships: []
      }
      trainers: {
        Row: {
          id: string
          name: string
          role: string
          bio: string
          qualifications: string
          specialization: string
          languages: string
          avatar_url: string | null
          is_featured: boolean | null
          is_published: boolean | null
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          bio: string
          qualifications: string
          specialization: string
          languages?: string
          avatar_url?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          bio?: string
          qualifications?: string
          specialization?: string
          languages?: string
          avatar_url?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          display_order?: number | null
          created_at?: string
        }
        Relationships: []
      }
      attendance: {
        Row: {
          id: string
          student_id: string | null
          batch_id: string | null
          date: string
          status: AttendanceStatus
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id?: string | null
          batch_id?: string | null
          date?: string
          status?: AttendanceStatus
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string | null
          batch_id?: string | null
          date?: string
          status?: AttendanceStatus
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'attendance_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'students'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'attendance_batch_id_fkey'
            columns: ['batch_id']
            isOneToOne: false
            referencedRelation: 'batches'
            referencedColumns: ['id']
          },
        ]
      }
      progress: {
        Row: {
          id: string
          student_id: string | null
          course_id: string | null
          speaking_score: number | null
          listening_score: number | null
          reading_score: number | null
          writing_score: number | null
          grammar_score: number | null
          vocabulary_score: number | null
          mock_exam_score: number | null
          evaluated_by: string | null
          evaluated_at: string
        }
        Insert: {
          id?: string
          student_id?: string | null
          course_id?: string | null
          speaking_score?: number | null
          listening_score?: number | null
          reading_score?: number | null
          writing_score?: number | null
          grammar_score?: number | null
          vocabulary_score?: number | null
          mock_exam_score?: number | null
          evaluated_by?: string | null
          evaluated_at?: string
        }
        Update: {
          id?: string
          student_id?: string | null
          course_id?: string | null
          speaking_score?: number | null
          listening_score?: number | null
          reading_score?: number | null
          writing_score?: number | null
          grammar_score?: number | null
          vocabulary_score?: number | null
          mock_exam_score?: number | null
          evaluated_by?: string | null
          evaluated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'progress_student_id_fkey'
            columns: ['student_id']
            isOneToOne: false
            referencedRelation: 'students'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'progress_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
        ]
      }
      brochures: {
        Row: {
          id: string
          title: string
          course_id: string | null
          file_url: string
          is_active: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          course_id?: string | null
          file_url: string
          is_active?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          course_id?: string | null
          file_url?: string
          is_active?: boolean | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'brochures_course_id_fkey'
            columns: ['course_id']
            isOneToOne: false
            referencedRelation: 'courses'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: { requested_permission: string }
        Returns: boolean
      }
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
    }
    Enums: {
      app_role: AppRole
      course_status: CourseStatus
      lead_status: LeadStatus
      student_status: StudentStatus
      payment_status: PaymentStatus
      attendance_status: AttendanceStatus
      skill: Skill
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]
