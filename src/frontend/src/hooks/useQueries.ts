import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Alert, Job } from "../backend.d";
import type { Type } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllJobs() {
  const { actor, isFetching } = useActor();
  return useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllActiveJobs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllAlerts() {
  const { actor, isFetching } = useActor();
  return useQuery<Alert[]>({
    queryKey: ["alerts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllActiveAlerts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetJobsByCategory(category: Type | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Job[]>({
    queryKey: ["jobs", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (!category) return actor.getAllActiveJobs();
      return actor.getJobsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSampleData() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.addSampleData("admin123");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
      qc.invalidateQueries({ queryKey: ["alerts"] });
    },
  });
}

export function useAddJob() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      password: string;
      title: string;
      department: string;
      category: Type;
      vacancies: bigint;
      lastDate: string;
      qualification: string;
      applyLink: string;
      postedDate: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addJob(
        params.password,
        params.title,
        params.department,
        params.category,
        params.vacancies,
        params.lastDate,
        params.qualification,
        params.applyLink,
        params.postedDate,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export function useDeleteJob() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { password: string; id: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteJob(params.password, params.id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}

export function useAddAlert() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      password: string;
      title: string;
      description: string;
      date: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addAlert(
        params.password,
        params.title,
        params.description,
        params.date,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alerts"] });
    },
  });
}

export function useDeleteAlert() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { password: string; id: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteAlert(params.password, params.id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["alerts"] });
    },
  });
}

export type { Job, Alert, Type };
