/**
 * COMPONENT TYPE: Container
 * SECTION: Game Logic
 *
 * ROLE:
 * - Second-screen viewer for live game monitoring
 * - Sync with main game window via localStorage and events
 * - Display live scoreboard, timer, and current example
 *
 * PATTERNS USED:
 * - Observer Pattern - localStorage + storage events for cross-window sync
 * - Polling Fallback - 500ms interval ensures sync reliability
 * - Real-time Updates - Timer and state updates every second
 *
 * NOTES FOR CONTRIBUTORS:
 * - Opens in popup window from RoundController
 * - Uses storage events (primary) and polling (fallback)
 * - Dispatches hydrate action to sync Redux state
 * - Timer resets when new example is shown
 */

"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { hydrate } from "@/lib/store/gameSlice";
import {
    RocketOutlined,
    CodeOutlined,
    BulbOutlined,
    TrophyOutlined,
    BarChartOutlined,
    HistoryOutlined,
    AimOutlined,
    ClockCircleOutlined,
    PauseCircleOutlined,
} from "@ant-design/icons";
import "./page.scss";

export default function MatchViewer() {
    const dispatch = useAppDispatch();
    const {
        teams,
        roundNumber,
        currentExample,
        solutionRevealed,
        answerHistory,
        roundStartTime,
        isPaused,
    } = useAppSelector((state) => state.game);

    const [elapsedTime, setElapsedTime] = useState(0);

    // Sync with localStorage when window is in focus
    useEffect(() => {
        const syncFromLocalStorage = () => {
            const savedState = localStorage.getItem("gameState");
            if (savedState) {
                try {
                    const state = JSON.parse(savedState);
                    dispatch(hydrate(state));
                } catch (e) {
                    console.error("Errore nel parsing dello state:", e);
                }
            }
        };

        // Sync on startup
        syncFromLocalStorage();

        // Listen to changes from other windows
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "gameState") {
                syncFromLocalStorage();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("gameStateChanged", syncFromLocalStorage);

        // Polling fallback for safety (every 500ms)
        const pollingInterval = setInterval(syncFromLocalStorage, 500);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("gameStateChanged", syncFromLocalStorage);
            clearInterval(pollingInterval);
        };
    }, [dispatch]);

    // Timer
    useEffect(() => {
        if (!roundStartTime || isPaused) return;

        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - roundStartTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [roundStartTime, isPaused]);

    // Reset timer when example changes
    useEffect(() => {
        if (roundStartTime) {
            setElapsedTime(0);
        }
    }, [roundStartTime]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

    return (
        <div className="min-h-screen bg-navy-dark text-white">
            {/* Header */}
            <div className="bg-navy-medium rounded-2xl p-6 md:p-8 mb-8 border-2 border-yellow-primary flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl md:text-5xl font-bold text-yellow-primary m-0 flex items-center gap-3">
                    <RocketOutlined className="text-4xl md:text-5xl" /> Match Viewer
                </h1>
                <div className="flex gap-4 md:gap-8 items-center">
                    <div className="text-xl md:text-2xl px-6 py-2 bg-yellow-primary text-navy-dark rounded-full font-bold">
                        Round {roundNumber}
                    </div>
                    {roundStartTime && (
                        <div
                            className={`text-2xl md:text-4xl font-bold font-mono min-w-[120px] text-center flex items-center justify-center gap-2 ${
                                isPaused ? "text-yellow-primary" : "text-green-500"
                            }`}
                        >
                            {isPaused ? <PauseCircleOutlined /> : <ClockCircleOutlined />}{" "}
                            {formatTime(elapsedTime)}
                        </div>
                    )}
                </div>
            </div>

            {currentExample ? (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 mb-8">
                    {/* Main Content */}
                    <div className="space-y-6">
                        {/* Codice Esempio */}
                        <div className="bg-beige-card rounded-xl p-6 border-2 border-navy-light">
                            <h2 className="text-xl font-semibold text-navy-dark m-0 mb-4 flex items-center gap-2">
                                <CodeOutlined /> Codice Esempio
                            </h2>
                            <div className="text-2xl font-bold text-navy-dark mb-2">
                                {currentExample.title}
                            </div>
                            <span
                                className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold mb-4 match-viewer__category-badge--${currentExample.category}`}
                            >
                                {currentExample.category}
                            </span>
                            <div className="bg-navy-dark rounded-lg p-4 overflow-x-auto">
                                <pre className="text-white text-sm font-mono m-0">
                                    {currentExample.code}
                                </pre>
                            </div>
                        </div>

                        {/* Soluzione - Sempre visibile nel Match Viewer */}
                        <div className="bg-beige-card rounded-xl p-6 border-2 border-navy-light">
                            <h3 className="text-xl font-semibold text-navy-dark m-0 mb-4 flex items-center gap-2">
                                <BulbOutlined /> Soluzione
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {currentExample.solutionPatterns.map((pattern, index) => (
                                    <span
                                        key={index}
                                        className="bg-pink-accent text-white px-3 py-1 rounded text-sm font-semibold"
                                    >
                                        {pattern}
                                    </span>
                                ))}
                            </div>
                            <p
                                className="text-navy-dark text-base leading-relaxed m-0"
                                dangerouslySetInnerHTML={{
                                    __html: currentExample.solutionExplanation,
                                }}
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Classifica */}
                        <div className="bg-beige-card rounded-xl p-6 border-2 border-navy-light">
                            <h2 className="text-xl font-semibold text-navy-dark m-0 mb-4 flex items-center gap-2">
                                <TrophyOutlined /> Classifica
                            </h2>
                            <div className="space-y-3">
                                {sortedTeams.map((team, index) => (
                                    <div
                                        key={team.id}
                                        className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-navy-light"
                                    >
                                        <div className="text-yellow-primary min-w-[35px] font-bold text-lg">
                                            #{index + 1}
                                        </div>
                                        <div className="flex items-center gap-2 flex-1">
                                            <div
                                                className="w-4 h-4 rounded-full border-2 border-navy-light"
                                                style={{ backgroundColor: team.color }}
                                            />
                                            <span className="font-semibold text-navy-dark">
                                                {team.name}
                                            </span>
                                        </div>
                                        <div className="text-yellow-primary font-bold text-xl">
                                            {team.score}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Statistiche */}
                        <div className="bg-beige-card rounded-xl p-6 border-2 border-navy-light">
                            <h2 className="text-xl font-semibold text-navy-dark m-0 mb-4 flex items-center gap-2">
                                <BarChartOutlined /> Statistiche
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-white rounded-lg">
                                    <div className="text-3xl font-bold text-yellow-primary">
                                        {answerHistory.length}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Round completati
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg">
                                    <div className="text-3xl font-bold text-yellow-primary">
                                        {answerHistory.length > 0
                                            ? Math.floor(
                                                  answerHistory.reduce(
                                                      (sum, h) => sum + h.timeElapsed,
                                                      0
                                                  ) / answerHistory.length
                                              )
                                            : 0}
                                        s
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Tempo medio
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="text-6xl text-yellow-primary mb-4">
                        <AimOutlined />
                    </div>
                    <p className="text-xl text-gray-400">
                        In attesa del prossimo esempio...
                    </p>
                </div>
            )}

            {/* Storico */}
            <div className="bg-beige-card rounded-xl p-6 border-2 border-navy-light">
                <h2 className="text-xl font-semibold text-navy-dark m-0 mb-4 flex items-center gap-2">
                    <HistoryOutlined /> Storico Risposte
                </h2>
                {answerHistory.length > 0 ? (
                    <div className="space-y-4">
                        {[...answerHistory].reverse().map((item, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white rounded-lg border-l-4"
                                style={{
                                    borderLeftColor: item.winnerTeam?.color || "#666",
                                }}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-navy-dark">
                                        Round {item.roundNumber}
                                    </span>
                                    <span className="text-sm text-gray-600 font-mono">
                                        {formatTime(item.timeElapsed)}
                                    </span>
                                </div>
                                <div className="text-lg font-semibold text-navy-dark mb-2">
                                    {item.example.title}
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {item.example.solutionPatterns.map((pattern, i) => (
                                        <span
                                            key={i}
                                            className="bg-pink-accent text-white px-2 py-1 rounded text-xs font-semibold"
                                        >
                                            {pattern}
                                        </span>
                                    ))}
                                </div>
                                {item.winnerTeam && (
                                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{
                                                backgroundColor: item.winnerTeam.color,
                                            }}
                                        />
                                        <span className="text-sm text-gray-700">
                                            Vinto da {item.winnerTeam.name}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-400">
                        Nessuna risposta registrata ancora
                    </div>
                )}
            </div>
        </div>
    );
}
