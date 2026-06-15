import React from "react";
import "../../css/shareTray.css";

const LevelProgress = ({ level, shares }) => {
  const sharesForNextLevel = level * 5;
  const progressPercent = Math.min((shares / sharesForNextLevel) * 100, 100);

  return (
    <div className="level-progress-container">
      <div className="level-progress-header">
        <div className="level-badge">LVL {level}</div>
        <div className="shares-count">
          {shares} / {sharesForNextLevel} Share Points
        </div>
      </div>
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default LevelProgress;
