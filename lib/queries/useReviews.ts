import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";
import { ProjectReview } from "../types/project";

type ReviewsResponse = {
  data: ProjectReview[];
};

const getReviews = async (projectId: number): Promise<ReviewsResponse> => {
  const response = await axiosInstance.get(`projects/${projectId}/reviews`);
  return response.data;
};

const createReview = async (
  projectId: number,
  rating: number,
  comment: string
) => {
  const response = await axiosInstance.post(`projects/${projectId}/reviews`, {
    rating,
    comment,
  });
  return response.data;
};

const updateReview = async (
  reviewId: number,
  rating: number,
  comment: string
) => {
  const response = await axiosInstance.put(`reviews/${reviewId}`, {
    rating,
    comment,
  });
  return response.data;
};

const deleteReview = async (reviewId: number) => {
  const response = await axiosInstance.delete(`reviews/${reviewId}`);
  return response.data;
};

export const useReviewsForProject = (projectId: number) => {
  return useQuery({
    queryKey: ["reviews", projectId],
    queryFn: () => getReviews(projectId),
  });
};

export const useCreateReview = () => {
  return useMutation({
    mutationFn: ({
      projectId,
      rating,
      comment,
    }: {
      projectId: number;
      rating: number;
      comment: string;
    }) => createReview(projectId, rating, comment),
  });
};

export const useUpdateReview = () => {
  return useMutation({
    mutationFn: ({
      reviewId,
      rating,
      comment,
    }: {
      reviewId: number;
      rating: number;
      comment: string;
    }) => updateReview(reviewId, rating, comment),
  });
};

export const useDeleteReview = () => {
  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
  });
};
