import { ServerVote } from "./server";

export type Vote = {
  id: number;
  ip_address: string;
  voted_at: string;
  created_at: string;
  updated_at: string;
  server: ServerVote;
};
