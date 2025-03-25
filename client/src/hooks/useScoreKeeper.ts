import { useState, useEffect, useRef, useCallback } from "react";
import type { GameState, Team } from "@shared/schema";

// Default initial state
const DEFAULT_STATE: GameState = {
  teams: {
    home: { name: "Ellon", score: 0 },
    away: { name: "Opposition", score: 0 }
  },
  timeInSeconds: 0,
  timerRunning: false
};

export default function useScoreKeeper() {
  // State for the entire game
  const [gameState, setGameState] = useState<GameState>(DEFAULT_STATE);
  
  // Ref for the timer interval
  const timerIntervalRef = useRef<number | null>(null);

  // Load state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("scorekeeperState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState) as GameState;
        setGameState({
          ...parsedState,
          timerRunning: false // Always start with timer paused
        });
      } catch (e) {
        console.error("Error loading saved state:", e);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("scorekeeperState", JSON.stringify(gameState));
  }, [gameState]);

  // Handle timer interval
  useEffect(() => {
    if (gameState.timerRunning) {
      timerIntervalRef.current = window.setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeInSeconds: prev.timeInSeconds + 1
        }));
      }, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    // Clean up interval on unmount
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [gameState.timerRunning]);

  // Increment team score
  const incrementScore = useCallback((team: "home" | "away") => {
    setGameState((prev) => ({
      ...prev,
      teams: {
        ...prev.teams,
        [team]: {
          ...prev.teams[team],
          score: prev.teams[team].score + 1
        }
      }
    }));
  }, []);
  
  // Decrement team score
  const decrementScore = useCallback((team: "home" | "away") => {
    setGameState((prev) => ({
      ...prev,
      teams: {
        ...prev.teams,
        [team]: {
          ...prev.teams[team],
          score: Math.max(0, prev.teams[team].score - 1) // Prevent negative scores
        }
      }
    }));
  }, []);

  // Toggle timer state
  const toggleTimer = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning
    }));
  }, []);

  // Reset timer
  const resetTimer = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      timeInSeconds: 0,
      timerRunning: false
    }));
  }, []);

  // Update team name
  const updateTeamName = useCallback((team: "home" | "away", name: string) => {
    if (name.trim()) {
      setGameState((prev) => ({
        ...prev,
        teams: {
          ...prev.teams,
          [team]: {
            ...prev.teams[team],
            name: name.trim()
          }
        }
      }));
    }
  }, []);

  // Reset all game state
  const resetAll = useCallback(() => {
    if (window.confirm("Are you sure you want to reset the entire game?")) {
      setGameState(DEFAULT_STATE);
    }
  }, []);

  return {
    gameState,
    incrementScore,
    decrementScore,
    toggleTimer,
    resetTimer,
    updateTeamName,
    resetAll
  };
}
