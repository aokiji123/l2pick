import { ServerVote } from "./server";

export type Vote = {
  id: number;
  ip_address: string;
  voted_at: string;
  created_at: string;
  updated_at: string;
  server: ServerVote;
};

export type VotesHistoryResponse = {
  data: {
    total_votes: number;
    period_votes: number;
    chart_data: ChartDataPoint[];
    servers_data: ServerVoteData[];
  };
};

export type ChartDataPoint = {
  date: string;
  votes: number;
};

export type ServerVoteData = {
  server_id: number;
  server_name: string;
  votes: number;
};

export type CanVoteResponse = {
  canVote: boolean;
  next_vote_at: Date | null;
};

export type VoteResponse = {
  message: string;
  vote: Vote;
};
