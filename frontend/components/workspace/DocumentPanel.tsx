"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, FileText } from "lucide-react";
import { deleteDocument } from "@/services/documentService";

import {
    Document,
    getDocuments,
    uploadDocument,
} from "@/services/documentService";

interface Props {
    projectId: string;
    onUploadSuccess?: () => void;
}

export default function DocumentPanel({ projectId, onUploadSuccess }: Props) {

    const [documents, setDocuments] = useState<Document[]>([]);
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        loadDocuments();

    }, [projectId]);

    async function loadDocuments() {

        try {

            const docs = await getDocuments(projectId);

            setDocuments(docs);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const file = event.target.files?.[0];

        if (!file) return;
        

        try {

            setUploading(true);

            await uploadDocument(projectId, file);

            await loadDocuments();
            onUploadSuccess?.();

        } catch (error) {

            console.error(error);

            alert("Upload failed");

        } finally {

            setUploading(false);

            // Allows selecting the same file again later
            event.target.value = "";

        }

    }
    async function handleDelete(
    documentId: string
        ) {

            try {

                await deleteDocument(documentId);

                await loadDocuments();

                onUploadSuccess?.();

            } catch (error) {

                console.error(error);

            }

        }

    return (

        <div className="bg-white rounded-xl border shadow-sm h-[650px] flex flex-col">

            {/* Header */}

            <div className="border-b p-6">

                <h2 className="text-2xl font-bold">

                    Documents

                </h2>

                <p className="text-gray-500 mt-1">

                    Upload PDFs to build persistent memory.

                </p>

            </div>

            {/* Upload Area */}

            <div className="p-6">

                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 rounded-xl p-10 cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 transition text-center"
                >

                    <Upload
                        size={42}
                        className="mx-auto text-cyan-600"
                    />

                    <div className="mt-4 text-lg font-semibold">

                        {uploading
                            ? "Building Memory..."
                            : "Upload Knowledge"}

                    </div>

                    <div className="text-sm text-gray-500 mt-2">

                        Click to upload PDF documents

                    </div>

                </div>

            </div>

            {/* Documents */}

            <div className="px-6 pb-6 flex-1 overflow-y-auto">

                <h3 className="font-semibold mb-4">

                    Uploaded Documents

                </h3>

                {documents.length === 0 ? (

                    <div className="border rounded-xl p-8 text-center text-gray-400">

                        📄

                        <div className="mt-3">

                            No documents uploaded

                        </div>

                    </div>

                ) : (

                    documents.map((document) => (

                        <div
                            key={document.id}
                            className="border rounded-xl p-4 mb-4 hover:shadow-md transition flex justify-between items-center"
                        >

                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">

                                    <FileText
                                    size={22}
                                    className="text-cyan-600"
                                />

                                </div>

                                <div>

                                    <div className="font-semibold">

                                        {document.filename}

                                    </div>

                                    <div className="text-sm text-gray-500 mt-1">

                                        {new Date(
                                            document.uploaded_at
                                        ).toLocaleString()}

                                    </div>

                                </div>

                            </div>

                            <button
                                onClick={async () => {

                                    if (
                                        !window.confirm(
                                            "Delete this document?"
                                        )
                                    ) {
                                        return;
                                    }

                                    await handleDelete(
                                        document.id
                                    );

                                }}
                                className="text-red-500 hover:text-red-700"
                            >

                                <Trash2 size={20} />

                            </button>

                        </div>

                    ))

                )}

            </div>

            <input
                type="file"
                hidden
                accept=".pdf"
                ref={fileInputRef}
                onChange={handleUpload}
            />

        </div>

    );

}