"use client";

import { useEffect, useRef, useState } from "react";
import {
    Bot,
    User
} from "lucide-react";
import { askQuestion } from "@/services/chatService";
import { improveMemory } from "@/services/memoryService";

interface Props {
    projectId: string;
}

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatPanel({ projectId }: Props) {

    const [messages, setMessages] = useState<Message[]>([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedbackGiven, setFeedbackGiven] = useState<number[]>([]);
    const [improving, setImproving] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    async function sendMessage() {

        if (!question.trim() || loading) {
            return;
        }

        const userQuestion = question;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: userQuestion,
            },
        ]);

        setQuestion("");

        setLoading(true);

        try {

            const response = await askQuestion(
                projectId,
                userQuestion
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: response.answer,
                },
            ]);

        } catch (error) {

            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Something went wrong while querying memory.",
                },
            ]);

        } finally {

            setLoading(false);

        }

    }
    async function handleFeedback(
    index: number,
    _positive: boolean
) {
    
    try {
        
        setImproving(true);
        await improveMemory(projectId);

            setFeedbackGiven((prev) => [
                ...prev,
                index,
            ]);

        } catch (error) {

            console.error(error);

        }finally {

            setImproving(false);

        }

    }
    return (

        <div className="bg-white rounded-xl border shadow-sm h-[650px] flex flex-col">

            {/* Header */}

            <div className="border-b p-6">

                <h2 className="text-2xl font-bold flex items-center gap-2">

                    🤖 AI Assistant

                </h2>

                <p className="text-gray-500 mt-1">

                    Ask questions about your engineering knowledge base.

                </p>

            </div>

            {/* Chat */}

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">

                {messages.length === 0 && (

                    <div className="text-center mt-16">

                        <div className="text-5xl">

                            💬

                        </div>

                        <h3 className="text-xl font-semibold mt-4">

                            Start a Conversation

                        </h3>

                        <p className="text-gray-500 mt-2">

                            Ask anything about your uploaded documents.

                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-3">

                            <button
                                onClick={() =>
                                    setQuestion("Explain this document.")
                                }
                                className="border rounded-full px-4 py-2 hover:bg-white"
                            >

                                Explain this document

                            </button>

                            <button
                                onClick={() =>
                                    setQuestion("Summarize the uploaded PDF.")
                                }
                                className="border rounded-full px-4 py-2 hover:bg-white"
                            >

                                Summarize PDF

                            </button>

                            <button
                                onClick={() =>
                                    setQuestion("What are the important concepts?")
                                }
                                className="border rounded-full px-4 py-2 hover:bg-white"
                            >

                                Key Concepts

                            </button>

                        </div>

                    </div>

                )}

                {messages.map((message, index) => (

                    <div
                        key={index}
                        className={`flex ${
                            message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >

                        <div
                            className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-sm ${
                                message.role === "user"
                                    ? "bg-cyan-600 text-white"
                                    : "bg-white border"
                            }`}
                        >

                            <div className="text-xs font-semibold mb-2">

                                {message.role === "user"
                                    ? "👤 You"
                                    : "🤖 Assistant"}

                            </div>

                            <div className="whitespace-pre-wrap leading-7">

                                {message.content}

                            </div>

                            {message.role === "assistant" && (

                                <div className="mt-4 flex items-center gap-4">

                                    {feedbackGiven.includes(index) ? (

                                        <span className="text-green-600 text-sm">

                                            ✅ Feedback received

                                        </span>

                                    ) : (

                                        <>

                                            <button
                                                disabled={improving}
                                                onClick={() =>
                                                    handleFeedback(index, true)
                                                }
                                                className="hover:scale-110 transition disabled:opacity-40"
                                            >

                                                👍

                                            </button>

                                            <button
                                                disabled={improving}
                                                onClick={() =>
                                                    handleFeedback(index, false)
                                                }
                                                className="hover:scale-110 transition disabled:opacity-40"
                                            >

                                                👎

                                            </button>

                                        </>

                                    )}

                                </div>

                            )}

                        </div>

                    </div>

                ))}

                {loading && (

                    <div className="flex justify-start">

                        <div className="bg-white border rounded-2xl px-5 py-4 shadow-sm">

                            <div className="font-semibold mb-2">

                                <Bot
                                    size={18}
                                    className="text-cyan-600"
                                />
                                Assistant

                            </div>

                            <div className="animate-pulse">

                                🧠 Searching memory...

                            </div>

                        </div>

                    </div>

                )}

                <div ref={bottomRef} />

            </div>

            {/* Input */}

            <div className="border-t p-5 bg-white">

                <div className="flex gap-3">

                    <input
                        type="text"
                        value={question}
                        onChange={(e) =>
                            setQuestion(e.target.value)
                        }
                        onKeyDown={(e) => {

                            if (
                                e.key === "Enter" &&
                                !loading
                            ) {

                                sendMessage();

                            }

                        }}
                        placeholder="Ask about your documents..."
                        className="flex-1 border rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <button
                        disabled={
                            loading ||
                            question.trim() === ""
                        }
                        onClick={sendMessage}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl px-8 disabled:bg-gray-400"
                    >

                        Send

                    </button>

                </div>

            </div>

        </div>

    );
}