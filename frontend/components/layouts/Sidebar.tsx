"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    Plus,
    FolderOpen,
    Trash2,
    BrainCircuit,
} from "lucide-react";

import {
    getProjects,
    createProject,
    deleteProject,
} from "@/services/projectService";

import NewProjectModal from "@/components/project/NewProjectModal";

interface Project {
    id: string;
    name: string;
    description: string;
}

export default function Sidebar() {

    const router = useRouter();
    const pathname = usePathname();

    const [projects, setProjects] = useState<Project[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    async function loadProjects() {

        try {

            const data = await getProjects();

            setProjects(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadProjects();

    }, []);

    async function handleCreateProject(
        name: string,
        description: string
    ) {

        try {

            const project = await createProject(
                name,
                description
            );

            setProjects((prev) => [
                ...prev,
                project,
            ]);

            setShowModal(false);

            router.push(`/projects/${project.id}`);

        } catch (error) {

            console.error(error);

        }

    }

    async function handleDeleteProject(
        id: string
    ) {

        const confirmed = window.confirm(
            "Delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteProject(id);

            setProjects((prev) =>
                prev.filter((p) => p.id !== id)
            );

            router.push("/");

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <>
            <aside className="w-72 h-screen bg-slate-900 text-white flex flex-col">

                <div className="p-6 border-b border-slate-800">

                    <div className="flex items-center gap-3">

                        <BrainCircuit
                            size={28}
                            className="text-cyan-400"
                        />

                        <div>

                            <h1 className="font-bold text-lg">

                                Cognee Memory

                            </h1>

                            <p className="text-xs text-slate-400">

                                DevOps Incident Assistant

                            </p>

                        </div>

                    </div>

                </div>

                <div className="p-4">

                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 py-3 font-medium transition"
                    >

                        <Plus size={18} />

                        New Project

                    </button>

                </div>

                <div className="flex-1 overflow-y-auto px-3 pb-4">

                    <div className="text-xs uppercase text-slate-400 mb-3 px-2">

                        Projects

                    </div>

                    {loading && (

                        <div className="text-slate-400 px-2">

                            Loading...

                        </div>

                    )}

                    {!loading &&
                        projects.map((project) => {

                            const active =
                                pathname ===
                                `/projects/${project.id}`;

                            return (

                                <div
                                    key={project.id}
                                    className={`group flex items-center justify-between rounded-lg p-3 mb-2 cursor-pointer transition ${
                                        active
                                            ? "bg-cyan-600"
                                            : "hover:bg-slate-800"
                                    }`}
                                    onClick={() =>
                                        router.push(
                                            `/projects/${project.id}`
                                        )
                                    }
                                >

                                    <div className="flex items-center gap-3 overflow-hidden">

                                        <FolderOpen
                                            size={18}
                                        />

                                        <div className="overflow-hidden">

                                            <div className="font-medium truncate">

                                                {project.name}

                                            </div>

                                            <div className="text-xs text-slate-300 truncate">

                                                {
                                                    project.description
                                                }

                                            </div>

                                        </div>

                                    </div>

                                    <button
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            handleDeleteProject(
                                                project.id
                                            );

                                        }}
                                        className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition"
                                    >

                                        <Trash2
                                            size={16}
                                        />

                                    </button>

                                </div>

                            );

                        })}

                </div>

            </aside>

            <NewProjectModal
                open={showModal}
                onClose={() =>
                    setShowModal(false)
                }
                onCreate={handleCreateProject}
            />

        </>

    );

}