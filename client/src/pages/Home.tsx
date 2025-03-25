import TeamScore from "@/components/ScoreKeeper/TeamScore";
import TimerDisplay from "@/components/ScoreKeeper/TimerDisplay";
import ControlPanel from "@/components/ScoreKeeper/ControlPanel";
import useScoreKeeper from "@/hooks/useScoreKeeper";

export default function Home() {
  const {
    gameState,
    incrementScore,
    decrementScore,
    resetAll,
    toggleTimer,
    resetTimer,
    updateTeamName
  } = useScoreKeeper();

  return (
    <div className="bg-gray-100 font-sans antialiased text-gray-900 min-h-screen">
      <div className="max-w-md mx-auto p-4 sm:p-6">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold">Ellon Score Keeper</h1>
          <p className="text-sm text-gray-600">Track scores and time your matches</p>
        </header>

        <TimerDisplay 
          timeInSeconds={gameState.timeInSeconds}
          isRunning={gameState.timerRunning || false}
          onToggleTimer={toggleTimer}
          onResetTimer={resetTimer}
        />

        <div className="grid grid-cols-2 gap-6 mb-6">
          <TeamScore 
            team="home"
            name={gameState.teams.home.name}
            score={gameState.teams.home.score}
            onIncrement={() => incrementScore("home")}
            onNameChange={(name) => updateTeamName("home", name)}
          />
          
          <TeamScore 
            team="away"
            name={gameState.teams.away.name}
            score={gameState.teams.away.score}
            onIncrement={() => incrementScore("away")}
            onNameChange={(name) => updateTeamName("away", name)}
          />
        </div>

        <ControlPanel onReset={resetAll} />

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Ellon Score Keeper &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
