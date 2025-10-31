import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";
import { Vote, VotesHistoryResponse } from "../types/vote";

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
