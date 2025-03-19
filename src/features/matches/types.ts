
export interface Match {
  id: string;
  name: string;
  logo: string;
  industry: string;
  compatibility: number;
  status: "pending" | "connected";
  description: string;
}

export type MatchFilter = "all" | "pending" | "connected";
