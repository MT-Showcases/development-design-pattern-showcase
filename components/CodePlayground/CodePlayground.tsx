/**
 * COMPONENT TYPE: Container
 * SECTION: UI Components
 *
 * ROLE:
 * - Interactive code playground with editor and console
 * - Execute JavaScript code safely in isolated environment
 * - Display console output (logs, errors, warnings)
 *
 * PATTERNS USED:
 * - Container/Presentational Split - Manages state, delegates UI to child components
 * - Facade Pattern - Simplifies complex Monaco Editor + execution environment
 * - Observer Pattern - Captures console.log/error/warn calls
 *
 * NOTES FOR CONTRIBUTORS:
 * - Code execution happens in Function() constructor (safer than eval)
 * - Console methods are intercepted to capture output
 * - Split layout: Editor (60%) | Console (40%)
 * - Modal is full-screen on mobile, large on desktop
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { Modal, Button, Space } from "antd";
import {
    PlayCircleOutlined,
    ReloadOutlined,
    CloseOutlined,
    CommentOutlined,
} from "@ant-design/icons";
import { openChatGPT } from "@/lib/chatgpt";
import PlaygroundEditor, { PlaygroundEditorRef } from "./PlaygroundEditor";
import PlaygroundConsole, { ConsoleLog } from "./PlaygroundConsole";
import "./CodePlayground.scss";

interface CodePlaygroundProps {
    open: boolean;
    onClose: () => void;
    initialCode: string;
    title?: string;
}

export default function CodePlayground({
    open,
    onClose,
    initialCode,
    title = "JavaScript Playground",
}: CodePlaygroundProps) {
    const [code, setCode] = useState(initialCode);
    const [logs, setLogs] = useState<ConsoleLog[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const editorRef = useRef<PlaygroundEditorRef>(null);

    // Track active timers and intervals for cleanup
    const activeTimers = useRef<Set<number>>(new Set());
    const activeIntervals = useRef<Set<number>>(new Set());

    // Detect OS for keyboard shortcut hint
    const isMac =
        typeof window !== "undefined" &&
        navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const isMobile =
        typeof window !== "undefined" &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
    const shortcutHint = isMobile ? "" : isMac ? "(⌘+Enter)" : "(Ctrl+Enter)";

    // Cleanup all active timers and intervals
    const cleanupTimers = () => {
        activeTimers.current.forEach((id) => clearTimeout(id));
        activeIntervals.current.forEach((id) => clearInterval(id));
        activeTimers.current.clear();
        activeIntervals.current.clear();
    };

    const handleReset = () => {
        cleanupTimers();
        setCode(initialCode);
        setLogs([]);
    };

    const handleClearConsole = () => {
        setLogs([]);
    };

    const addLog = (type: ConsoleLog["type"], ...args: any[]) => {
        const message = args
            .map((arg) => {
                if (typeof arg === "object") {
                    try {
                        return JSON.stringify(arg, null, 2);
                    } catch {
                        return String(arg);
                    }
                }
                return String(arg);
            })
            .join(" ");

        setLogs((prev) => [...prev, { type, message, timestamp: Date.now() }]);
    };

    const executeCode = (codeToExecute?: string) => {
        setIsRunning(true);
        setLogs([]); // Clear previous output
        
        // Cleanup previous execution timers
        cleanupTimers();

        // Use provided code or current state
        const actualCode = codeToExecute || code;

        // Create a safe execution environment with async support
        try {
            // Intercept console methods
            const customConsole = {
                log: (...args: any[]) => addLog("log", ...args),
                error: (...args: any[]) => addLog("error", ...args),
                warn: (...args: any[]) => addLog("warn", ...args),
                info: (...args: any[]) => addLog("info", ...args),
            };

            // Custom setTimeout that tracks timer IDs
            const customSetTimeout = (callback: Function, delay?: number, ...args: any[]) => {
                const timerId = window.setTimeout(() => {
                    try {
                        callback(...args);
                    } catch (error: any) {
                        addLog("error", `Errore in setTimeout: ${error.message}`);
                    }
                    activeTimers.current.delete(timerId);
                }, delay);
                activeTimers.current.add(timerId);
                return timerId;
            };

            // Custom setInterval that tracks interval IDs
            const customSetInterval = (callback: Function, delay?: number, ...args: any[]) => {
                const intervalId = window.setInterval(() => {
                    try {
                        callback(...args);
                    } catch (error: any) {
                        addLog("error", `Errore in setInterval: ${error.message}`);
                        window.clearInterval(intervalId);
                        activeIntervals.current.delete(intervalId);
                    }
                }, delay);
                activeIntervals.current.add(intervalId);
                return intervalId;
            };

            // Custom clearTimeout
            const customClearTimeout = (timerId: number) => {
                window.clearTimeout(timerId);
                activeTimers.current.delete(timerId);
            };

            // Custom clearInterval
            const customClearInterval = (intervalId: number) => {
                window.clearInterval(intervalId);
                activeIntervals.current.delete(intervalId);
            };

            // Execute code in isolated scope with async support
            // Wrap in async function to support top-level await
            const asyncExecutionFunction = new Function(
                "console",
                "setTimeout",
                "setInterval",
                "clearTimeout",
                "clearInterval",
                `
                return (async () => {
                    ${actualCode}
                })();
                `
            );

            // Execute and handle potential promises
            const result = asyncExecutionFunction(
                customConsole,
                customSetTimeout,
                customSetInterval,
                customClearTimeout,
                customClearInterval
            );

            // Handle async execution
            if (result && typeof result.then === 'function') {
                result
                    .then(() => {
                        if (logs.length === 0) {
                            addLog("info", "Codice eseguito con successo (nessun output)");
                        }
                    })
                    .catch((error: any) => {
                        addLog("error", `Errore asincrono: ${error.message}`);
                    })
                    .finally(() => {
                        setIsRunning(false);
                    });
            } else {
                // Synchronous execution completed
                if (logs.length === 0) {
                    addLog("info", "Codice eseguito con successo (nessun output)");
                }
                setIsRunning(false);
            }
        } catch (error: any) {
            addLog("error", `Errore di esecuzione: ${error.message}`);
            setIsRunning(false);
        }
    };

    // Cleanup timers when modal closes
    useEffect(() => {
        if (!open) {
            cleanupTimers();
        }
    }, [open]);

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            cleanupTimers();
        };
    }, []);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={title}
            width="90vw"
            centered
            footer={null}
            closeIcon={<CloseOutlined />}
            className="code-playground-modal"
        >
            <div className="code-playground">
                {/* Toolbar */}
                <div className="code-playground__toolbar">
                    <Space direction="vertical" className="code-playground__buttons">
                        <Button
                            type="primary"
                            icon={<PlayCircleOutlined />}
                            onClick={() => {
                                const currentCode = editorRef.current?.getCurrentCode() || code;
                                executeCode(currentCode);
                            }}
                            loading={isRunning}
                            className="code-playground__run-button w-full"
                        >
                            Esegui Codice
                            {shortcutHint && (
                                <span className="code-playground__shortcut-hint">
                                    {shortcutHint}
                                </span>
                            )}
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={handleReset}
                            className="code-playground__reset-button w-full"
                        >
                            Reset
                        </Button>
                        <Button
                            icon={<CommentOutlined />}
                            onClick={() =>
                                openChatGPT({ code, language: "javascript", title })
                            }
                            className="w-full"
                        >
                            Chiedi a ChatGPT
                        </Button>
                    </Space>
                </div>

                {/* Split View: Editor + Console */}
                <div className="code-playground__content">
                    <div className="code-playground__editor-panel">
                        <PlaygroundEditor
                            ref={editorRef}
                            code={code}
                            onChange={(value) => setCode(value || "")}
                            onRun={executeCode}
                            language="javascript"
                        />
                    </div>
                    <div className="code-playground__console-panel">
                        <PlaygroundConsole logs={logs} onClear={handleClearConsole} />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
