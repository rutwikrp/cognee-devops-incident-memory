"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatPanel from "@/components/workspace/ChatPanel";
import { getProject, Project } from "@/services/projectService";
import DocumentPanel from "@/components/workspace/DocumentPanel";
import MemoryPanel from "@/components/workspace/MemoryPanel";
import ProjectHeader from "@/components/workspace/ProjectHeader";
import { getMemoryStatus } from "@/services/memoryService";

export default function ProjectWorkspace() {

    const params = useParams();

    const id = params.id as string;

    const [project, setProject] = useState<Project | null>(null);
    const [refreshMemory, setRefreshMemory] = useState(0);
    const [memoryStatus, setMemoryStatus] = useState("Loading...");
    const [documentCount, setDocumentCount] = useState(0);


    async function loadProject() {

        try {

            const data = await getProject(id);

            setProject(data);

        } catch (error) {

            console.error(error);

        }

    }

    
    async function loadMemory() {

        try {

            const memory = await getMemoryStatus(id);

            setMemoryStatus(memory.status);

            setDocumentCount(memory.documents);

        } catch (error) {

            console.error(error);

        }

    }
    useEffect(() => {

        if (!id) {
            return;
        }

        loadProject();

        loadMemory();

    }, [id, refreshMemory]);
    if (!project) {

        return (
            <div className="p-8">
                Loading...
            </div>
        );

    }
    return (

        <div className="p-8">

            <ProjectHeader

                name={project.name}

                description={project.description}

                documents={documentCount}

                memoryStatus={memoryStatus}

            />

            <div className="grid grid-cols-3 gap-6 mt-10">

                <DocumentPanel
                    projectId={project.id}
                    onUploadSuccess={() =>
                        setRefreshMemory((prev) => prev + 1)}
                    />              

                <ChatPanel
                    projectId={project.id}
                />

                <MemoryPanel
                    projectId={project.id}
                    refresh={refreshMemory}
                />

            </div>

        </div>

    );

}