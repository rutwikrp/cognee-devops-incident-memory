import api from "./api";

export interface Document {
    id: string;
    project_id: string;
    filename: string;
    filepath: string;
    uploaded_at: string;
}

export async function getDocuments(projectId: string): Promise<Document[]> {

    const response = await api.get(`/documents/${projectId}`);

    return response.data;

}

export async function uploadDocument(
    projectId: string,
    file: File
): Promise<Document> {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        `/documents/${projectId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;

}
export async function deleteDocument(
    documentId: string
) {

    await api.delete(
        `/documents/${documentId}`
    );

}