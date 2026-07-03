import api from "./api";

export interface DashboardStats {

    projects: number;

    documents: number;

    memory_status: string;

}

export async function getDashboardStats() {

    const response = await api.get<DashboardStats>(
        "/dashboard/stats"
    );

    return response.data;

}