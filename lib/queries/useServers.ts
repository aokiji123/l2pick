import axiosInstance from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ServerResponse,
  Server,
  GroupedServersResponse,
  CreateServerRequest,
  ServerType,
  ServerTypesResponse,
} from "../types/server";

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
  rate?: string;
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

const getServerBySlug = async (slug: string): Promise<Server> => {
  const response = await axiosInstance.get(`/servers/${slug}`);
  return response.data;
};

const getGroupedServers = async (
  params?: GetServersParams
): Promise<GroupedServersResponse> => {
  const response = await axiosInstance.get("/servers/grouped", { params });
  return response.data;
};

const createServer = async (data: CreateServerRequest): Promise<Server> => {
  const response = await axiosInstance.post("/servers", data);
  return response.data;
};

const getServerTypes = async (): Promise<ServerTypesResponse> => {
  const response = await axiosInstance.get("/server-types");
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

export const useServerBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["server", slug],
    queryFn: () => getServerBySlug(slug),
    enabled: !!slug,
  });
};

export const useGroupedServers = (params?: GetServersParams) => {
  return useQuery({
    queryKey: ["grouped-servers", params],
    queryFn: () => getGroupedServers(params),
  });
};

export const useCreateServer = () => {
  return useMutation({
    mutationFn: createServer,
  });
};

export const useGetServerTypes = () => {
  return useQuery({
    queryKey: ["server-types"],
    queryFn: getServerTypes,
  });
};
