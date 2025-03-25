import { Card } from "@/components/ui/card";

interface TimerDisplayProps {
  timeInSeconds: number;
  isRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
}

export default function TimerDisplay({ 
  timeInSeconds, 
  isRunning, 
  onToggleTimer,
  onResetTimer 
}: TimerDisplayProps) {
  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg p-4 mb-6 text-center shadow-lg">
      <div className="text-3xl font-bold tracking-wider">
        {formatTime(timeInSeconds)}
      </div>
      <div className="flex justify-center gap-3 mt-3">
        <button 
          className={`py-2 px-4 rounded-md shadow transition ${isRunning ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
          onClick={onToggleTimer}
        >
          <i className={`fas ${isRunning ? 'fa-pause' : 'fa-play'} mr-1`}></i> 
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>
        <button 
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md shadow transition"
          onClick={onResetTimer}
        >
          <i className="fas fa-undo-alt mr-1"></i> Reset
        </button>
      </div>
    </div>
  );
}
