"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (
        name: string,
        description: string
    ) => Promise<void> | void;
}

export default function NewProjectModal({
    open,
    onClose,
    onCreate,
}: Props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) {
        return null;
    }

    async function handleSubmit() {

        if (!name.trim()) {
            alert("Project name is required.");
            return;
        }

        try {

            setLoading(true);

            await onCreate(
                name,
                description
            );

            setName("");
            setDescription("");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-[450px]">

                <div className="flex items-center justify-between p-6 border-b">

                    <h2 className="text-xl font-semibold">

                        Create Project

                    </h2>

                    <button
                        onClick={onClose}
                    >
                        <X size={20}/>
                    </button>

                </div>

                <div className="p-6 space-y-5">

                    <div>

                        <label className="block text-sm font-medium mb-2">

                            Project Name

                        </label>

                        <input
                            value={name}
                            onChange={(e)=>
                                setName(e.target.value)
                            }
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="Kubernetes Migration"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">

                            Description

                        </label>

                        <textarea
                            value={description}
                            onChange={(e)=>
                                setDescription(e.target.value)
                            }
                            className="w-full border rounded-lg px-4 py-3 h-28 resize-none"
                            placeholder="Migration runbook..."
                        />

                    </div>

                </div>

                <div className="border-t p-6 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg border"
                    >

                        Cancel

                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 disabled:bg-gray-400"
                    >

                        {loading
                            ? "Creating..."
                            : "Create"}

                    </button>

                </div>

            </div>

        </div>

    );

}