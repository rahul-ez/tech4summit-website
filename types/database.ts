export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'visitor' | 'participant' | 'admin'
export type RegistrationStatus = 'pending' | 'confirmed' | 'cancelled'
export type AnnouncementAudience = 'all' | 'participants' | 'admins'
export type SubmissionStatus = 'draft' | 'submitted' | 'under_review' | 'reviewed'

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          phone: string | null
          role: UserRole
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          role?: UserRole
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          role?: UserRole
          created_at?: string
        }
        Relationships: []
      }
      hackathon_config: {
        Row: {
          key: string
          value: Json | null
          updated_at: string
        }
        Insert: {
          key: string
          value?: Json | null
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          id: string
          profile_id: string
          team_id: string | null
          status: RegistrationStatus
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          team_id?: string | null
          status?: RegistrationStatus
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          team_id?: string | null
          status?: RegistrationStatus
          created_at?: string
        }
        Relationships: []
      }
      announcements: {
        Row: {
          id: string
          title: string
          body: string
          audience: AnnouncementAudience
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          body: string
          audience?: AnnouncementAudience
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          body?: string
          audience?: AnnouncementAudience
          published_at?: string | null
        }
        Relationships: []
      }
      colleges: {
        Row: {
          id: string
          name: string
          city: string | null
        }
        Insert: {
          id?: string
          name: string
          city?: string | null
        }
        Update: {
          id?: string
          name?: string
          city?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          id: string
          name: string
          lead_id: string
          registration_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          lead_id: string
          registration_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          lead_id?: string
          registration_id?: string | null
          created_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          team_id: string
          profile_id: string
          joined_at: string
        }
        Insert: {
          id?: string
          team_id: string
          profile_id: string
          joined_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          profile_id?: string
          joined_at?: string
        }
        Relationships: []
      }
      challenges: {
        Row: {
          id: string
          title: string
          description: string
          track: string | null
          published: boolean
        }
        Insert: {
          id?: string
          title: string
          description: string
          track?: string | null
          published?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string
          track?: string | null
          published?: boolean
        }
        Relationships: []
      }
      submissions: {
        Row: {
          id: string
          team_id: string | null
          profile_id: string | null
          status: SubmissionStatus
          storage_path: string | null
          submitted_at: string | null
        }
        Insert: {
          id?: string
          team_id?: string | null
          profile_id?: string | null
          status?: SubmissionStatus
          storage_path?: string | null
          submitted_at?: string | null
        }
        Update: {
          id?: string
          team_id?: string | null
          profile_id?: string | null
          status?: SubmissionStatus
          storage_path?: string | null
          submitted_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: UserRole
      registration_status: RegistrationStatus
      announcement_audience: AnnouncementAudience
      submission_status: SubmissionStatus
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

export type Profile = Tables<'profiles'>
export type HackathonConfig = Tables<'hackathon_config'>
export type Registration = Tables<'registrations'>
export type Announcement = Tables<'announcements'>
export type College = Tables<'colleges'>
export type Team = Tables<'teams'>
export type TeamMember = Tables<'team_members'>
export type Challenge = Tables<'challenges'>
export type Submission = Tables<'submissions'>
