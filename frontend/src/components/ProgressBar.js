import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div style={{ width: `${progress}%` }} className="progress-fill"></div>
      <span>{progress} / 100 Points</span>
    </div>
  );
};

export default ProgressBar;

