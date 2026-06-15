import React from "react";
import { Trophy, Star, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../../css/shareTray.css";

const RewardsList = ({ shares, challenges }) => {
  const getRewardStatusColor = (requiredShares) => {
    return shares >= requiredShares ? "#facc15" : "#9ca3af";
  };

  const icons = {
    "🌟": Star,
    "👑": Crown,
    "🦋": Trophy
  };

  return (
    <div className="rewards-list-container">
      <h4 className="rewards-list-title">Rewards</h4>
      <div className="rewards-grid">
        <AnimatePresence>
          {challenges.map((challenge, index) => {
            const Icon = icons[challenge.icon] || Trophy;
            const isCompleted = shares >= (challenge.shares || 0);

            return (
              <motion.div
                key={challenge.title}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`challenge-card ${isCompleted ? 'challenge-card-completed' : ''}`}
              >
                <Icon 
                  style={{ 
                    width: '20px', 
                    height: '20px', 
                    color: getRewardStatusColor(challenge.shares || 0) 
                  }} 
                />
                <div className="challenge-info">
                  <p className="challenge-title">{challenge.title}</p>
                  <p className="challenge-desc"> {challenge.Description} </p>
                </div>
                <div className="reward-badge">⭐ {challenge.reward}</div>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ color: '#facc15' }}
                  >
                    ✨
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RewardsList;
