import React, { useState, useEffect } from 'react';
import {Reward} from './Reward';

export const Rewards = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    async function fetchRewards() {
      const response = await fetch('/api/rewards');
      const data = await response.json();
      setRewards(data);
    }

    fetchRewards();
  }, []);

  return (
    <div className="rewards">
      <h2>Available Rewards</h2>
      {rewards.map(reward => (
        <Reward key={reward.id} reward={reward} />
      ))}
    </div>
  );
};