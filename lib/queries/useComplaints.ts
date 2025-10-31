import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api";
import { ComplaintResponse } from "../types/complaint";

const makeComplaint = async (params: {
  serverId: string;
  reason?: string;
}): Promise<ComplaintResponse> => {
  const { serverId, reason = "Нарушение правил" } = params;
  const response = await axiosInstance.post(`/servers/${serverId}/complaints`, {
    reason,
  });
  return response.data;
};

export const useMakeComplaint = () => {
  return useMutation({
    mutationFn: makeComplaint,
    onError: (error: any) => {
      console.error(
        "Failed to submit complaint:",
        error?.response?.data || error.message,
      );
    },
  });
};
