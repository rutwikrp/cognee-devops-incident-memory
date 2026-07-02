"use client";

import { useEffect, useState } from "react";
import { getProjects, Project } from "@/services/projectService";
import Link from "next/link";

export default function Sidebar() {

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {

        loadProjects();

    }, []);

    async function loadProjects() {

        const data = await getProjects();

        setProjects(data);
    }

    return (

        <aside className="w-72 border-r h-screen p-6">

            <h1 className="text-2xl font-bold">
                MemoryOps AI
            </h1>

            <p className="text-gray-500 text-sm">
                Persistent Engineering Memory
            </p>

            <button
                className="w-full mt-6 bg-black text-white rounded-lg p-2"
            >
                + New Project
            </button>

            <div className="mt-8">

                <h3 className="font-semibold mb-3">

                    Projects

                </h3>

                {

                    projects.map(project => (
                    <Link
                        href={`/projects/${project.id}`}
                        key={project.id}
                    >
                        <div
                            key={project.id}
                            className="border rounded-lg p-3 mb-2 cursor-pointer hover:bg-gray-100"
                        >

                            <div className="font-medium">

                                {project.name}

                            </div>

                            <div className="text-xs text-gray-500">

                                {project.description}

                            </div>

                        </div>
                    </Link>    
                    ))

                }

            </div>

        </aside>

    );

}