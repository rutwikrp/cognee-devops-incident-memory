import api from "./api";

export async function improveMemory(
    projectId: string
) {

    await api.post("/memory/improve", {
        project_id: projectId,
    });

}
export async function getMemoryStatus(
    projectId: string
) {

    const response = await api.get(
        `/memory/${projectId}`
    );

    return response.data;

}