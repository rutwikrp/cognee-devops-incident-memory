"use client";

import { useRouter } from "next/navigation";
import {
    FolderOpen,
    ArrowRight,
    Trash2,
} from "lucide-react";

export interface ProjectCardProps {

    id: string;

    name: string;

    description: string;

    onDelete?: (id: string) => void;

}

export default function ProjectCard({

    id,

    name,

    description,

    onDelete,

}: ProjectCardProps) {

    const router = useRouter();

    return (

        <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition">

            <div className="p-6">

                <div className="flex justify-between">

                    <FolderOpen
                        size={32}
                        className="text-cyan-500"
                    />

                    {onDelete && (

                        <button
                            onClick={(e) => {

                                e.stopPropagation();

                                if (
                                    confirm(
                                        "Delete this project?"
                                    )
                                ) {

                                    onDelete(id);

                                }

                            }}
                            className="text-red-500 hover:text-red-700"
                        >

                            <Trash2 size={18} />

                        </button>

                    )}

                </div>

                <h3 className="text-xl font-semibold mt-5">

                    {name}

                </h3>

                <p className="text-gray-500 mt-2 line-clamp-2">

                    {description || "No description"}

                </p>

                <button
                    onClick={() =>
                        router.push(`/projects/${id}`)
                    }
                    className="mt-6 flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium"
                >

                    Open Project

                    <ArrowRight size={18} />

                </button>

            </div>

        </div>

    );

}