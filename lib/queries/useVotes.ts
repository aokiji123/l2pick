import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api";
import {
  CanVoteResponse,
  Vote,
  VoteResponse,
  VotesHistoryResponse,
} from "../types/vote";

const getUserVotes = async (): Promise<Vote[]> => {
  const response = await axiosInstance.get("/user/votes");
  return response.data;
};

const getVotesHistoryForProject = async (
  projectId: string,
): Promise<VotesHistoryResponse> => {
  const response = await axiosInstance.get(
    `/projects/${projectId}/votes/history`,
  );
  return response.data;
};

const getCanVoteForServer = async (
  serverId: string,
): Promise<CanVoteResponse> => {
  const response = await axiosInstance.get(`/servers/${serverId}/can-vote`);
  return response.data;
};

const voteForServer = async (serverId: string): Promise<VoteResponse> => {
  const response = await axiosInstance.post(`/servers/${serverId}/vote`);
  return response.data;
};

export const useGetUserVotes = () => {
  return useQuery({
    queryKey: ["votes", "user"],
    queryFn: getUserVotes,
    staleTime: 60 * 1000,
  });
};

export const useGetVotesHistory = (projectId: string) => {
  return useQuery({
    queryKey: ["votes", "history", projectId],
    queryFn: () => getVotesHistoryForProject(projectId),
    staleTime: 60 * 1000,
    enabled: !!projectId && projectId !== "",
  });
};

export const useCanVoteForServer = (serverId: string) => {
  return useQuery({
    queryKey: ["votes", "can-vote", serverId],
    queryFn: () => getCanVoteForServer(serverId),
    staleTime: 60 * 1000,
  });
};

export const useVoteForServer = (serverId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => voteForServer(serverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["votes", "user"] });
      queryClient.invalidateQueries({
        queryKey: ["votes", "can-vote", serverId],
      });
    },
  });
};
