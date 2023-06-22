export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Drivers: {
        Row: {
          Adresse: string | null
          created_at: string | null
          id: number
          ID_card: string | null
          image_path: string[] | null
          phone_number: number | null
          user_id: string | null
          Verified_Driver: boolean | null
          age: number | null

        }
        Insert: {
          Adresse?: string | null
          created_at?: string | null
          id?: number
          ID_card?: string | null
          image_path?: string[] | null
          phone_number?: number | null
          user_id?: string | null
          Verified_Driver?: boolean | null
          age: number | null
        }
        Update: {
          Adresse?: string | null
          created_at?: string | null
          id?: number
          ID_card?: string | null
          image_path?: string[] | null
          phone_number?: number | null
          user_id?: string | null
          Verified_Driver?: boolean | null
          age: number | null

        }
        Relationships: [
          {
            foreignKeyName: "Drivers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}