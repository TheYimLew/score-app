import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FiEdit } from "react-icons/fi";

interface TeamScoreProps {
  team: "home" | "away";
  name: string;
  score: number;
  onIncrement: () => void;
  onDecrement?: () => void;
  onNameChange: (name: string) => void;
}

export default function TeamScore({ 
  team, 
  name, 
  score, 
  onIncrement,
  onDecrement, 
  onNameChange 
}: TeamScoreProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);

  // Ellon's colors for home team, Opposition colors for away team
  const teamColor = team === "home" ? {
    bg: "bg-yellow-100",
    border: "border-maroon",
    text: "text-maroon",
    button: "bg-maroon hover:bg-maroon/90"
  } : {
    bg: "bg-red-100",
    border: "border-red-800",
    text: "text-red-800",
    button: "bg-red-800 hover:bg-red-900"
  };

  const handleEditToggle = () => {
    setIsEditing(true);
    setEditValue(name);
  };

  const handleSaveName = () => {
    onNameChange(editValue);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveName();
    }
  };

  return (
    <div className={`team-score ${teamColor.bg} rounded-lg p-4 shadow-md border-2 ${teamColor.border}`}>
      <div className="team-name-container relative">
        {!isEditing ? (
          <>
            <div className="flex items-center justify-center space-x-2">
              <h2 className={`team-name text-xl font-bold ${teamColor.text} mb-2 text-center`}>
                {name}
              </h2>
              <button 
                className="edit-name-btn p-1 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 hover:text-gray-800"
                onClick={handleEditToggle}
                title="Edit team name"
              >
                <FiEdit size={14} />
              </button>
            </div>
          </>
        ) : (
          <input 
            type="text"
            className="w-full text-center border border-gray-300 rounded p-1 text-sm mb-2"
            placeholder="Team name"
            maxLength={20}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSaveName}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        )}
      </div>
      <div className={`score text-[5rem] font-black text-center ${teamColor.text} my-4`}>
        {score}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button 
          className={`increment-score w-full py-3 ${teamColor.button} text-white rounded-md font-bold text-lg shadow-md transition active:transform active:scale-95`}
          onClick={onIncrement}
        >
          +TRY
        </button>
        {onDecrement && (
          <button 
            className={`decrement-score w-full py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-bold text-lg shadow-md transition active:transform active:scale-95`}
            onClick={onDecrement}
          >
            -
          </button>
        )}
      </div>
    </div>
  );
}
