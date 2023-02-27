import React from 'react';

export const Reward = ({ reward }) => {
  return (
    <div className="reward">
      <img src={reward.imageUrl} alt={reward.name} />
      <div className="details">
        <h3>{reward.name}</h3>
        <p>{reward.description}</p>
        <p>Point Cost: {reward.pointCost}</p>
      </div>
    </div>
  );
};
