"use client";

import { useEffect, useState } from "react";
import { Upload } from "lucide-react";

import api from "@/services/api";

interface Document {
    id: string;
    filename: string;
    filepath: string;
    uploaded_at: string;
}

interface Props {
    projectId: string;
}

export default function DocumentPanel({ projectId }: Props) {

    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        loadDocuments();
    }, [projectId]);

    async function loadDocuments() {

        try {

            const response = await api.get(
                `/documents/${projectId}`
            );

            setDocuments(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="border rounded-xl p-6 h-[420px] flex flex-col">

            <div className="flex justify-between items-center">

                <h2 className="text-xl font-semibold">

                    Documents

                </h2>

                <button
                    className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800"
                >

                    <Upload size={18} />

                    Upload

                </button>

            </div>

            <div className="mt-6 flex-1 overflow-y-auto">

                {

                    documents.length === 0 ?

                    (

                        <div className="text-gray-500">

                            No documents uploaded.

                        </div>

                    )

                    :

                    (

                        documents.map(document => (

                            <div
                                key={document.id}
                                className="border rounded-lg p-3 mb-3 hover:bg-gray-50"
                            >

                                <div className="font-medium">

                                    {document.filename}

                                </div>

                                <div className="text-xs text-gray-500">

                                    Uploaded:

                                    {" "}

                                    {new Date(document.uploaded_at).toLocaleString()}

                                </div>

                            </div>

                        ))

                    )

                }

            </div>

        </div>

    );

}