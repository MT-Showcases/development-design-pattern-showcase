/**
 * COMPONENT TYPE: Container
 * SECTION: Game Logic
 *
 * ROLE:
 * - Quiz game page with team setup and gameplay
 * - Manage team setup and game mode (teams or solo)
 * - Persist teams to localStorage for cross-session continuity
 *
 * PATTERNS USED:
 * - Container Component - Manages state and delegates to TeamSetup/RoundController
 * - State Persistence - localStorage for team data
 *
 * NOTES FOR CONTRIBUTORS:
 * - Shows TeamSetup when no teams configured
 * - Shows RoundController when teams are ready
 * - Reset button clears all state and reloads page
 * - Supports both team mode and solo mode
 */

"use client";

import { useState, useEffect } from "react";
import TeamSetup from "@/components/TeamSetup/TeamSetup";
import RoundController from "@/components/RoundController/RoundController";
import type { Team } from "@/lib/types";
import { App, Button } from "antd";
import { ExclamationCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import './page.scss';

export default function GamePage() {
  const { modal } = App.useApp();
  const [teams, setTeams] = useState<Team[] | null>(null);

  // Carica le squadre da localStorage al mount
  useEffect(() => {
    const savedTeams = localStorage.getItem("teams");
    if (savedTeams) {
      try {
        setTeams(JSON.parse(savedTeams));
      } catch (error) {
        console.error("Errore nel caricamento delle squadre:", error);
        localStorage.removeItem("teams");
      }
    }
  }, []);

  const handleStart = (newTeams: Team[]) => {
    setTeams(newTeams);
    // Save to localStorage for persistence
    localStorage.setItem("teams", JSON.stringify(newTeams));
  };

  const handleUpdateTeams = (updatedTeams: Team[]) => {
    setTeams(updatedTeams);
    // Update localStorage
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  const handleReset = () => {
    modal.confirm({
      title: "Nuova Partita",
      icon: <ExclamationCircleOutlined />,
      content: "Vuoi iniziare una nuova partita? Tutti i progressi attuali andranno persi.",
      okText: "Sì, inizia nuova partita",
      cancelText: "Annulla",
      okType: "danger",
      centered: true,
      onOk() {
        setTeams(null);
        localStorage.removeItem("teams");
        localStorage.removeItem("gameState");
        // Reload page to reset everything
        window.location.reload();
      },
    });
  };

  return (
    <main className="game__main">
      {!teams ? (
        <TeamSetup onStart={handleStart} />
      ) : (
        <>
          <RoundController teams={teams} onUpdateTeams={handleUpdateTeams} />
          <Button
            danger
            size="large"
            icon={<ReloadOutlined />}
            onClick={handleReset}
            className="game__reset-button"
          >
            Nuova Partita
          </Button>
        </>
      )}
    </main>
  );
}
