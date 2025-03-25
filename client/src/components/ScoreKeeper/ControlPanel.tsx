import { Card } from "@/components/ui/card";

interface ControlPanelProps {
  onReset: () => void;
}

export default function ControlPanel({ onReset }: ControlPanelProps) {
  return (
    <div className="control-panel bg-white rounded-lg p-4 shadow-md border border-gray-200">
      <div className="flex justify-center">
        <button 
          className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-md shadow transition font-bold"
          onClick={onReset}
        >
          <i className="fas fa-sync-alt mr-2"></i> Reset Game
        </button>
      </div>
    </div>
  );
}
