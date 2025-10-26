import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api";
import { ProjectDetail, Project } from "../types/project";

type ProjectsResponse = Project[];

const getProjects = async (): Promise<ProjectsResponse> => {
  const response = await axiosInstance.get("/projects");
  return response.data;
};

const getProjectBySlug = async (slug: string): Promise<ProjectDetail> => {
  const response = await axiosInstance.get(`/projects/${slug}`);
  return response.data;
};

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectBySlug(slug),
    enabled: !!slug,
  });
};
