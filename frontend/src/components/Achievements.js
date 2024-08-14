import React from 'react';

const Achievements = ({ badges }) => {
  return (
    <div className="achievements">
      <h3>Achievements</h3>
      <ul>
        {badges.map((badge, index) => (
          <li key={index}>{badge}</li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
