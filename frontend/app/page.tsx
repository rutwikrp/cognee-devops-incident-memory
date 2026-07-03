"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/layouts/Sidebar";
import { getProjects } from "@/services/projectService";
import ProjectCard from "@/components/project/ProjectCard";

import {
    FolderOpen,
    FileText,
    BrainCircuit,
    ArrowRight,
} from "lucide-react";
import {
    getDashboardStats,
    DashboardStats,
} from "@/services/dashboardService";
interface Project {
    id: string;
    name: string;
    description: string;
}

export default function DashboardPage() {

    const router = useRouter();

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    documents: 0,
    memory_status: "Loading...",
});

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
    async function loadStats() {

    try {

        const data = await getDashboardStats();

        setStats(data);

    } catch (error) {

        console.error(error);

    }

}

    useEffect(() => {

        loadProjects();
        loadStats();

    }, []);
    
    return (

        <div className="flex h-screen bg-slate-100">

            <Sidebar />

            <main className="flex-1 overflow-y-auto">

                {/* Header */}

                <div className="bg-white border-b px-10 py-6">

                    <h1 className="text-3xl font-bold">

                        Dashboard

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Persistent Engineering Memory powered by Cognee

                    </p>

                </div>

                <div className="p-10">

                    {/* Welcome */}

                    <div className="mb-10">

                        <h2 className="text-4xl font-bold">

                            Welcome to MemoryOps 👋

                        </h2>

                        <p className="text-gray-500 mt-3">

                            Build an AI-powered engineering memory using Cognee.

                        </p>

                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-3 gap-6 mb-10">

                        <div className="bg-white rounded-xl shadow-sm border p-6">

                            <div className="flex justify-between">

                                <div>

                                    <div className="text-gray-500">

                                        Projects

                                    </div>

                                    <div className="text-4xl font-bold mt-3">

                                        {stats.projects}

                                    </div>

                                </div>

                                <FolderOpen
                                    size={34}
                                    className="text-cyan-500"
                                />

                            </div>

                        </div>

                        <div className="bg-white rounded-xl shadow-sm border p-6">

                            <div className="flex justify-between">

                                <div>

                                    <div className="text-gray-500">

                                        Documents

                                    </div>

                                    <div className="text-4xl font-bold mt-3">

                                        {stats.documents}

                                    </div>

                                </div>

                                <FileText
                                    size={34}
                                    className="text-green-500"
                                />

                            </div>

                        </div>

                        <div className="bg-white rounded-xl shadow-sm border p-6">

                            <div className="flex justify-between">

                                <div>

                                    <div className="text-gray-500">

                                        Memory

                                    </div>

                                    <div className="text-2xl font-semibold mt-4 text-green-600">

                                       {stats.memory_status}

                                    </div>

                                </div>

                                <BrainCircuit
                                    size={34}
                                    className="text-purple-500"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Recent Projects */}

                    <div>

                        <h2 className="text-2xl font-bold mb-6">

                            Recent Projects

                        </h2>

                        {loading ? (

                            <div>

                                Loading...

                            </div>

                        ) : projects.length === 0 ? (

                            <div className="bg-white rounded-xl border p-10 text-center text-gray-500">

                                No projects yet.

                            </div>

                        ) : (

                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                                {projects.map((project) => (

                                    <ProjectCard

                                        key={project.id}

                                        id={project.id}

                                        name={project.name}

                                        description={project.description}

                                    />

                                ))}

                            </div>

                        )}

                    </div>

                </div>

            </main>

        </div>

    );

}