import React, { useState } from 'react';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';
import ProgressBar from './ProgressBar';
import Achievements from './Achievements';

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
      setProgress(progress + 20); // Assuming each submission gives 20 points
    }

    if (progress + 20 >= 100) {
      setBadges([...badges, 'New Badge']); // Reward badge when progress reaches 100
    }
  };

  return (
    <div className="course-page">
      <div className="question-section">
        <QuestionList questions={questions} onSelect={setSelectedQuestion} />
      </div>
      <div className="detail-section">
        <QuestionDetail question={selectedQuestion} onSubmit={handleSubmit} />
        <ProgressBar progress={progress} />
      </div>
      <Achievements badges={badges} />
    </div>
  );
};

export default CoursePage;
