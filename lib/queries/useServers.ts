import axiosInstance from "../api";
import { useQuery } from "@tanstack/react-query";
import { ServerResponse } from "../types/server";

type ServerStatus =
  | "coming_soon"
  | "today"
  | "tomorrow"
  | "yesterday"
  | "opened";
type ServerSort = "votes" | "rating" | "launch date";
type SortOrder = "asc" | "desc";

type GetServersParams = {
  chronicle_id?: number;
  rate?: number;
  status?: ServerStatus;
  search?: string;
  my_servers?: 0 | 1;
  sort?: ServerSort;
  order?: SortOrder;
  per_page?: number;
};

const getServers = async (
  params?: GetServersParams
): Promise<ServerResponse> => {
  const response = await axiosInstance.get("/servers", { params });
  return response.data;
};

const getTop5Servers = async (): Promise<ServerResponse> => {
  const response = await axiosInstance.get("/servers/top");
  return response.data;
};

export const useServers = (params?: GetServersParams) => {
  return useQuery({
    queryKey: ["servers", params],
    queryFn: () => getServers(params),
  });
};

export const useTop5Servers = () => {
  return useQuery({
    queryKey: ["top5-servers"],
    queryFn: getTop5Servers,
  });
};
