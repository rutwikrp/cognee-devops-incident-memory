"use client";

import {
    FolderOpen,
    BrainCircuit,
    FileText,
    Calendar,
} from "lucide-react";

interface Props {

    name: string;

    description: string;

    documents: number;

    memoryStatus: string;

}

export default function ProjectHeader({

    name,

    description,

    documents,

    memoryStatus,

}: Props) {

    return (

        <div className="bg-white rounded-xl border shadow-sm p-8 mb-8">

            <div className="flex justify-between items-start">

                <div>

                    <div className="flex items-center gap-3">

                        <FolderOpen
                            size={34}
                            className="text-cyan-500"
                        />

                        <h1 className="text-4xl font-bold">

                            {name}

                        </h1>

                    </div>

                    <p className="text-gray-500 mt-4 text-lg">

                        {description}

                    </p>

                </div>

                <div className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">

                    🧠 {memoryStatus}

                </div>

            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">

                <div className="flex items-center gap-3">

                    <FileText
                        className="text-blue-500"
                    />

                    <div>

                        <div className="text-sm text-gray-500">

                            Documents

                        </div>

                        <div className="font-semibold">

                            {documents}

                        </div>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <BrainCircuit
                        className="text-purple-500"
                    />

                    <div>

                        <div className="text-sm text-gray-500">

                            Memory

                        </div>

                        <div className="font-semibold">

                            Persistent

                        </div>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <Calendar
                        className="text-orange-500"
                    />

                    <div>

                        <div className="text-sm text-gray-500">

                            Status

                        </div>

                        <div className="font-semibold">

                            Active

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}