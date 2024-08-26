import React from 'react';
import './Achievements.css'; 

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
