import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";
import { Vote } from "../types/vote";

const getUserVotes = async (): Promise<Vote[]> => {
  const response = await axiosInstance.get("/user/votes");
  return response.data;
};

export const useGetUserVotes = () => {
  return useQuery({
    queryKey: ["votes", "user"],
    queryFn: getUserVotes,
    staleTime: 60 * 1000,
  });
};
