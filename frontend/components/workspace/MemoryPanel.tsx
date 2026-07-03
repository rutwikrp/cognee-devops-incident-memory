"use client";

import { useEffect, useState } from "react";
import {

BrainCircuit,

Database,

Activity

} from "lucide-react";
import { getMemoryStatus } from "@/services/memoryService";

interface Props {
    projectId: string;
    refresh: number;
}

interface MemoryStatus {

    status: string;

    dataset_name: string;

    documents: number;

    session: string;

    memory: string;

}

export default function MemoryPanel({
    projectId, refresh
}: Props) {

    const [memory, setMemory] =
        useState<MemoryStatus | null>(null);
    const [refreshMemory, setRefreshMemory] = useState(0);

    useEffect(() => {

        loadMemory();

    }, [projectId, refresh]);

    async function loadMemory() {

        try {

            const data =
                await getMemoryStatus(projectId);

            setMemory(data);

        } catch (error) {

            console.error(error);

        }

    }

    if (!memory) {

        return (

            <div className="border rounded-xl p-6">

                Loading...

            </div>

        );

    }

    return (

        <div className="bg-white rounded-xl border shadow-sm h-[650px] flex flex-col">

            {/* Header */}

            <div className="border-b p-6">

                <h2 className="text-2xl font-bold flex items-center gap-2">

                    <div className="flex items-center gap-2">

                        <BrainCircuit
                        size={22}
                        className="text-cyan-600"
                        />

                        <h2 className="text-2xl font-bold">

                        Memory Status

                        </h2>

                        </div>

                </h2>

                <p className="text-gray-500 mt-1">

                    Live status of your Cognee knowledge base.

                </p>

            </div>

            {/* Body */}

            <div className="flex-1 p-6 overflow-y-auto">

                {/* Status Badge */}

                <div className="flex justify-center mb-8">

                    <div
                        className={`px-6 py-3 rounded-full font-semibold ${
                            memory.status === "Ready"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                    >

                        {memory.status === "Ready"
                            ? "🟢 Ready"
                            : "🟡 Waiting for Documents"}

                    </div>

                </div>

                {/* Information Cards */}

                <div className="space-y-4">

                    <div className="border rounded-xl p-4">

                        <div className="text-sm text-gray-500">

                            Dataset

                        </div>

                        <div className="font-semibold text-lg mt-1">

                            {memory.dataset_name}

                        </div>

                    </div>

                    <div className="border rounded-xl p-4">

                        <div className="text-sm text-gray-500">

                            Documents Indexed

                        </div>

                        <div className="text-3xl font-bold mt-2">

                            {memory.documents}

                        </div>

                    </div>

                    <div className="border rounded-xl p-4 flex justify-between">

                        <div>

                            <div className="text-sm text-gray-500">

                                Session

                            </div>

                            <div className="font-semibold mt-1">

                                {memory.session}

                            </div>

                        </div>

                        <div className="text-green-600 text-xl">

                            🟢

                        </div>

                    </div>

                    <div className="border rounded-xl p-4 flex justify-between">

                        <div>

                            <div className="text-sm text-gray-500">

                                Memory Type

                            </div>

                            <div className="font-semibold mt-1">

                                {memory.memory}

                            </div>

                        </div>

                        <div className="text-purple-600 text-xl">

                            🧠

                        </div>

                    </div>

                </div>

                {/* Knowledge Graph */}

                <div className="mt-8">

                    <div className="font-semibold mb-3">

                        Knowledge Graph

                    </div>

                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">

                        <div
                            className="h-full bg-cyan-500 rounded-full"
                            style={{

                                width:
                                    memory.documents > 0
                                        ? "100%"
                                        : "10%",

                            }}
                        />

                    </div>

                </div>

                {/* Vector Memory */}

                <div className="mt-6">

                    <div className="font-semibold mb-3">

                        Vector Memory

                    </div>

                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">

                        <div
                            className="h-full bg-purple-500 rounded-full"
                            style={{

                                width:
                                    memory.documents > 0
                                        ? "100%"
                                        : "10%",

                            }}
                        />

                    </div>

                </div>

                {/* Footer */}

                <div className="mt-8 text-center text-sm text-gray-500">

                    Last synchronized

                    <div className="font-semibold mt-2">

                        Just now

                    </div>

                </div>

            </div>

        </div>

    );

}