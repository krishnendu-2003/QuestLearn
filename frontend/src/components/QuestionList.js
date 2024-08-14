import React from 'react';

const QuestionList = ({ questions, onSelect }) => {
  return (
    <div className="question-list">
      <h3>Questions</h3>
      <ul>
        {questions.map((question) => (
          <li key={question.id} onClick={() => onSelect(question)}>
            {question.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
