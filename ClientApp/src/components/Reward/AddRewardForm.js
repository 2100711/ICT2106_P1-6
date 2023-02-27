import React, { useState } from 'react';
// import RewardService from '../../RewardService'

export const AddRewardForm = () => {
  const [rewardName, setRewardName] = useState('');
  const [pointCost, setPointCost] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reward = {
      rewardName,
      pointCost,
      imageUrl,
    };
    try {
      // await RewardService.addReward(reward);
      alert('Reward added successfully');
    } catch (error) {
      console.log(error);
      alert('Failed to add reward');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="rewardName">Reward Name</label>
        <input type="text" className="form-control" id="rewardName" placeholder="Enter reward name" value={rewardName} onChange={(event) => setRewardName(event.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="pointCost">Point Cost</label>
        <input type="number" className="form-control" id="pointCost" placeholder="Enter point cost" value={pointCost} onChange={(event) => setPointCost(event.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" className="form-control" id="imageUrl" placeholder="Enter image URL" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary">Add Reward</button>
    </form>
  );
};