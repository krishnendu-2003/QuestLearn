import React from 'react';

const QuestionDetail = ({ question, onSubmit }) => {
  return (
    <div className="question-detail">
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      <button onClick={onSubmit}>Submit Answer</button>
    </div>
  );
};

export default QuestionDetail;
