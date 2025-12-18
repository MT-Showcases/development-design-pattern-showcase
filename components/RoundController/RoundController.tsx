/**
 * COMPONENT TYPE: Container
 * SECTION: Game Logic
 *
 * ROLE:
 * - Control game rounds and category selection
 * - Display live scoreboard and round statistics
 * - Manage example display and solution reveal
 * - Award points to teams and advance to next round
 *
 * PATTERNS USED:
 * - Container/Presentational Split - Manages state and logic, delegates UI to ExampleViewer
 * - Redux Toolkit Slice Pattern - Dispatches actions to centralized game state
 * - Observer Pattern - Syncs teams with Redux on prop changes
 *
 * NOTES FOR CONTRIBUTORS:
 * - All game state is managed via Redux (roundNumber, currentExample, etc.)
 * - Teams prop synced to Redux for cross-window communication
 * - Category and pattern count selection determines example filtering
 * - Match Viewer opens in popup window for second-screen experience
 */

"use client";

import { useState, useEffect } from "react";
import type { Category, PatternExample, Team } from "@/lib/types";
import { getRandomExampleByPatternCount } from "@/lib/examples";
import ExampleViewer from "../ExampleViewer/ExampleViewer";
import CategoryButton from "../CategoryButton/CategoryButton";
import { Card, Button, Space } from "antd";
import {
    TrophyOutlined,
    EyeOutlined,
    ToolOutlined,
    BlockOutlined,
    ThunderboltOutlined,
    AppstoreOutlined,
    WarningOutlined,
} from "@ant-design/icons";
import "./RoundController.scss";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
    setTeams,
    setCurrentExample,
    setSelectedCategory,
    setSelectedPatternCount,
    revealSolution,
    awardPoint,
    nextRound,
} from "@/lib/store/gameSlice";

interface RoundControllerProps {
    teams: Team[];
    onUpdateTeams: (teams: Team[]) => void;
}

export default function RoundController({ teams, onUpdateTeams }: RoundControllerProps) {
    const dispatch = useAppDispatch();
    const {
        roundNumber,
        usedExampleIds,
        currentExample,
        selectedCategory,
        selectedPatternCount,
        solutionRevealed,
    } = useAppSelector((state) => state.game);

    // Check if solo mode (single player)
    const isSoloMode = teams.length === 1 && teams[0].id === 'solo-player';

    // PATTERN: Observer Pattern - Sync teams with Redux when props change
    useEffect(() => {
        dispatch(setTeams(teams));
    }, [teams, dispatch]);

    const handleCategorySelect = (category: Category | "all") => {
        dispatch(setSelectedCategory(category));
        dispatch(setSelectedPatternCount(null)); // Reset pattern count quando cambia categoria
    };

    const handlePatternCountSelect = (count: 1 | 2 | 3) => {
        dispatch(setSelectedPatternCount(count));
    };

    const handleShowExample = () => {
        if (!selectedCategory || !selectedPatternCount) return;

        const categoryFilter = selectedCategory === "all" ? null : selectedCategory;
        const usedIdsSet = new Set(usedExampleIds);
        const example = getRandomExampleByPatternCount(
            selectedPatternCount,
            categoryFilter,
            usedIdsSet
        );

        if (example) {
            dispatch(setCurrentExample(example));
        } else {
            alert(
                "Nessun esempio disponibile con questi criteri! Prova un'altra combinazione o ricarica la pagina."
            );
        }
    };

    const handleRevealSolution = () => {
        dispatch(revealSolution());
    };

    const handleAwardPoint = (teamId: string) => {
        dispatch(awardPoint(teamId));
        const updatedTeams = teams.map((team) =>
            team.id === teamId ? { ...team, score: team.score + 1 } : team
        );
        onUpdateTeams(updatedTeams);
        handleNextRound();
    };

    const handleNextRound = () => {
        dispatch(nextRound());
    };

    return (
        <div className="min-h-screen bg-navy-dark mb-24 md:mb-0">
            {/* Scoreboard Card */}
            <Card className="bg-beige-card rounded-lg p-6 md:p-4 mb-8 md:mb-6 border-2 border-navy-light">
                <div className="flex items-center gap-2 mb-6">
                    <TrophyOutlined className="text-2xl text-yellow-primary" />
                    <h2 className="m-0 text-navy-dark text-2xl font-bold">
                        {isSoloMode ? 'Punteggio' : 'Classifica'}
                    </h2>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 md:grid-cols-1 md:gap-3">
                    {[...teams]
                        .sort((a, b) => b.score - a.score)
                        .map((team, index) => (
                            <div
                                key={team.id}
                                className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-navy-light transition-all hover:border-pink-accent hover:-translate-y-0.5"
                            >
                                <div className="flex items-center gap-2 flex-1">
                                    {!isSoloMode && (
                                        <span className="text-yellow-primary min-w-[35px] font-bold">
                                            #{index + 1}
                                        </span>
                                    )}
                                    <div
                                        className="w-4 h-4 rounded-full border-2 border-navy-light"
                                        style={{ backgroundColor: team.color }}
                                    />
                                    <span className="font-semibold text-navy-dark">
                                        {isSoloMode ? 'Il tuo punteggio' : team.name}
                                    </span>
                                </div>
                                <span className="text-yellow-primary font-bold whitespace-nowrap">
                                    {team.score} {team.score === 1 ? "punto" : "punti"}
                                </span>
                            </div>
                        ))}
                </div>
            </Card>

            {/* Header with Round Number and Match Viewer */}
            <div className="flex justify-between items-center py-6 flex-col md:gap-4">
                <h2 className="m-0 text-yellow-primary text-3xl mb-3 font-bold">
                    Round {roundNumber}
                </h2>
                <Button
                    type="default"
                    size="large"
                    icon={<EyeOutlined />}
                    onClick={() =>
                        window.open(
                            "/match-viewer",
                            "MatchViewer",
                            "width=1400,height=900"
                        )
                    }
                    className="!no-underline"
                >
                    Match Viewer
                </Button>
            </div>

            {!currentExample ? (
                <Card className="bg-beige-card rounded-lg p-8 md:p-6 border-2 border-navy-light">
                    <Space orientation="vertical" size="large" className="w-full">
                        {/* Category Selection */}
                        <div>
                            <h3 className="text-navy-dark mb-4 text-xl font-semibold">
                                Scegli la categoria:
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <CategoryButton
                                    icon={<ToolOutlined />}
                                    label="Creazionali"
                                    selected={selectedCategory === "creational"}
                                    onClick={() => handleCategorySelect("creational")}
                                />
                                <CategoryButton
                                    icon={<BlockOutlined />}
                                    label="Strutturali"
                                    selected={selectedCategory === "structural"}
                                    onClick={() => handleCategorySelect("structural")}
                                />
                                <CategoryButton
                                    icon={<ThunderboltOutlined />}
                                    label="Comportamentali"
                                    selected={selectedCategory === "behavioral"}
                                    onClick={() => handleCategorySelect("behavioral")}
                                />
                                <CategoryButton
                                    icon={<WarningOutlined />}
                                    label="Anti-Pattern"
                                    selected={selectedCategory === "antipattern"}
                                    onClick={() => handleCategorySelect("antipattern")}
                                />
                                <CategoryButton
                                    icon={<AppstoreOutlined />}
                                    label="Tutte le categorie"
                                    selected={selectedCategory === "all"}
                                    onClick={() => handleCategorySelect("all")}
                                    fullWidth
                                />
                            </div>
                        </div>

                        {/* Pattern Count Selection */}
                        {selectedCategory && (
                            <div>
                                <h3 className="text-navy-dark mb-4 text-xl font-semibold">
                                    Quanti pattern deve contenere l'esempio?
                                </h3>
                                <div className="round-controller__pattern-count-buttons">
                                    <button
                                        onClick={() => handlePatternCountSelect(1)}
                                        className={`round-controller__pattern-count-button ${
                                            selectedPatternCount === 1
                                                ? "round-controller__pattern-count-button--selected"
                                                : ""
                                        }`}
                                    >
                                        <div className="round-controller__pattern-count-number">
                                            1
                                        </div>
                                        <div className="round-controller__pattern-count-label">
                                            Pattern singolo
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handlePatternCountSelect(2)}
                                        className={`round-controller__pattern-count-button ${
                                            selectedPatternCount === 2
                                                ? "round-controller__pattern-count-button--selected"
                                                : ""
                                        }`}
                                    >
                                        <div className="round-controller__pattern-count-number">
                                            2
                                        </div>
                                        <div className="round-controller__pattern-count-label">
                                            Pattern combinati
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handlePatternCountSelect(3)}
                                        className={`round-controller__pattern-count-button ${
                                            selectedPatternCount === 3
                                                ? "round-controller__pattern-count-button--selected"
                                                : ""
                                        }`}
                                    >
                                        <div className="round-controller__pattern-count-number">
                                            3
                                        </div>
                                        <div className="round-controller__pattern-count-label">
                                            Pattern avanzati
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Show Example Button */}
                        {selectedCategory && selectedPatternCount && (
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleShowExample}
                                block
                                className="px-12 py-4 font-semibold text-navy-dark bg-yellow-primary hover:bg-yellow-dark border-none rounded-lg"
                            >
                                Mostra esempio
                            </Button>
                        )}
                    </Space>
                </Card>
            ) : (
                <>
                    <ExampleViewer
                        example={currentExample}
                        solutionRevealed={solutionRevealed}
                        onRevealSolution={handleRevealSolution}
                    />

                    {solutionRevealed && (
                        <div className="mt-8">
                            <Card className="bg-beige-card">
                                <h3 className="m-0 mb-6 text-center text-navy-dark text-2xl font-bold">
                                    {isSoloMode ? 'Hai risposto correttamente?' : 'Assegna Punto'}
                                </h3>
                                <p className="text-center mb-6 text-gray-600">
                                    {isSoloMode
                                        ? 'Segna se hai risposto correttamente:'
                                        : 'Quale squadra ha risposto correttamente?'}
                                </p>
                                
                                {isSoloMode ? (
                                    // Solo mode: Simple correct/incorrect buttons
                                    <div className="grid grid-cols-1 gap-4">
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={() => handleAwardPoint(teams[0].id)}
                                            className="h-14 text-base font-semibold bg-green-600 hover:bg-green-700 border-0"
                                        >
                                            ✓ Risposta Corretta
                                        </Button>
                                        <Button
                                            size="large"
                                            onClick={handleNextRound}
                                            className="h-14 text-base font-semibold"
                                        >
                                            ✗ Risposta Sbagliata - Continua
                                        </Button>
                                    </div>
                                ) : (
                                    // Team mode: Team selection buttons
                                    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 md:grid-cols-1">
                                        {teams.map((team) => (
                                            <button
                                                key={team.id}
                                                onClick={() => handleAwardPoint(team.id)}
                                                className="flex items-center gap-2 px-5 py-4 bg-white border-[3px] rounded-lg font-semibold cursor-pointer transition-all text-navy-dark hover:-translate-y-0.5 hover:bg-beige-light"
                                                style={{ borderColor: team.color }}
                                            >
                                                <div
                                                    className="w-[18px] h-[18px] rounded-full border-2 border-navy-light"
                                                    style={{ backgroundColor: team.color }}
                                                />
                                                <span>{team.name}</span>
                                                <span className="text-gray-600 ml-auto">
                                                    ({team.score})
                                                </span>
                                            </button>
                                        ))}
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={handleNextRound}
                                            className="col-span-full"
                                        >
                                            Nessuna risposta corretta →
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        </div>
                    )}
                </>
            )}

            {/* Stats Footer */}
            <div className="mt-8 text-center text-white">
                <p className="my-1">Esempi usati: {usedExampleIds.length}</p>
            </div>
        </div>
    );
}
