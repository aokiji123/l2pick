import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";

const getReviews = async (projectId: number) => {
  const response = await axiosInstance.get(`projects/${projectId}/reviews`);
  return response.data;
};

export const useReviewsForProject = (projectId: number) => {
  return useQuery({
    queryKey: ["reviews", projectId],
    queryFn: () => getReviews(projectId),
  });
};
