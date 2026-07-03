import api from "./api";

export interface ChatRequest {
    project_id: string;
    question: string;
}

export interface ChatResponse {
    answer: string;
}

export async function askQuestion(
    projectId: string,
    question: string
): Promise<ChatResponse> {

    const response = await api.post("/chat/", {
        project_id: projectId,
        question,
    });

    return response.data;
}