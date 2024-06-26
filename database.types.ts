export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      chats: {
        Row: {
          chat_id: string
          created_at: string
          max_length_tokens: number | null
          temp: number | null
          title: string | null
          top_p: number | null
          user_id: string
        }
        Insert: {
          chat_id: string
          created_at?: string
          max_length_tokens?: number | null
          temp?: number | null
          title?: string | null
          top_p?: number | null
          user_id?: string
        }
        Update: {
          chat_id?: string
          created_at?: string
          max_length_tokens?: number | null
          temp?: number | null
          title?: string | null
          top_p?: number | null
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_id: string | null
          created_at: string
          instructions: string | null
          message_content: string | null
          messages_id: string
          role: Database["public"]["Enums"]["role"] | null
          user_id: string
        }
        Insert: {
          chat_id?: string | null
          created_at?: string
          instructions?: string | null
          message_content?: string | null
          messages_id?: string
          role?: Database["public"]["Enums"]["role"] | null
          user_id?: string
        }
        Update: {
          chat_id?: string | null
          created_at?: string
          instructions?: string | null
          message_content?: string | null
          messages_id?: string
          role?: Database["public"]["Enums"]["role"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["chat_id"]
          },
        ]
      }
      prompt: {
        Row: {
          categories_id: string | null
          created_at: string
          id: string
          input: string | null
          instructions: string | null
          published: boolean
          title: string | null
          user_id: string
        }
        Insert: {
          categories_id?: string | null
          created_at?: string
          id?: string
          input?: string | null
          instructions?: string | null
          published?: boolean
          title?: string | null
          user_id?: string
        }
        Update: {
          categories_id?: string | null
          created_at?: string
          id?: string
          input?: string | null
          instructions?: string | null
          published?: boolean
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_categories_id_fkey"
            columns: ["categories_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
          prompt_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          prompt_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          prompt_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompt"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_all_chat_messages_for_user: {
        Args: {
          p_user_id: string
        }
        Returns: {
          chat_id: string
          chat_created_at: string
          user_id: string
          temp: number
          max_length_tokens: number
          top_p: number
          title: string
          messages: Json
        }[]
      }
      hello: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      insert_chat_messages: {
        Args: {
          p_chat_id: string
          message_content: string
          instructions: string
          role: Database["public"]["Enums"]["role"]
          temp: number
          max_length_tokens: number
          top_p: number
          title: string
        }
        Returns: {
          chat_id: string
          created_at: string
          max_length_tokens: number | null
          temp: number | null
          title: string | null
          top_p: number | null
          user_id: string
        }[]
      }
    }
    Enums: {
      role: "assistant" | "user" | "function" | "system"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
