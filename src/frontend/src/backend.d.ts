import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Job {
    id: bigint;
    title: string;
    applyLink: string;
    postedDate: string;
    vacancies: bigint;
    isActive: boolean;
    category: Type;
    department: string;
    lastDate: string;
    qualification: string;
}
export interface Alert {
    id: bigint;
    title: string;
    date: string;
    description: string;
    isActive: boolean;
}
export enum Type {
    csc = "csc",
    railway = "railway",
    stateGovt = "stateGovt",
    banking = "banking",
    defence = "defence",
    centralGovt = "centralGovt"
}
export interface backendInterface {
    addAlert(password: string, title: string, description: string, date: string): Promise<void>;
    addJob(password: string, title: string, department: string, category: Type, vacancies: bigint, lastDate: string, qualification: string, applyLink: string, postedDate: string): Promise<void>;
    addSampleData(password: string): Promise<void>;
    deleteAlert(password: string, id: bigint): Promise<void>;
    deleteJob(password: string, id: bigint): Promise<void>;
    getAllActiveAlerts(): Promise<Array<Alert>>;
    getAllActiveJobs(): Promise<Array<Job>>;
    getJobById(id: bigint): Promise<Job>;
    getJobsByCategory(category: Type): Promise<Array<Job>>;
    updateAlert(password: string, id: bigint, title: string, description: string, date: string, isActive: boolean): Promise<void>;
    updateJob(password: string, id: bigint, title: string, department: string, category: Type, vacancies: bigint, lastDate: string, qualification: string, applyLink: string, isActive: boolean, postedDate: string): Promise<void>;
}
