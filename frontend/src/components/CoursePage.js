import React, { useState } from 'react';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';
import ProgressBar from './ProgressBar';
import Achievements from './Achievements';
import './CoursePage.css';

const questions = [
  { id: 1, title: 'Question 1', description: 'What is blockchain?' },
  { id: 2, title: 'Question 2', description: 'Explain smart contracts.' },
  // Add more questions as needed
];

const CoursePage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [progress, setProgress] = useState(0);
  const [badges, setBadges] = useState([]);

  const handleSubmit = () => {
    if (progress < 100) {
      setProgress(progress + 20); 
    }

    if (progress + 20 >= 100) {
      setBadges([...badges, 'New Badge']);
    }
  };

  return (
    <div className="course-page robotic-theme">
      <div className="question-section">
        <QuestionList questions={questions} onSelect={setSelectedQuestion} />
        <div className="progress-container">
          <h3>Progress</h3>
          <ProgressBar progress={progress} />
        </div>
      </div>
      <div className="detail-section">
        <QuestionDetail question={selectedQuestion} onSubmit={handleSubmit} />
      </div>
      <Achievements badges={badges} />
    </div>
  );
};

export default CoursePage;
