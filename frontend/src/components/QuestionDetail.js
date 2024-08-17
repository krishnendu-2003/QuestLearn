import React from 'react';
import './QuestionDetail.css'

const QuestionDetail = ({ question, selectedOption, onOptionChange, onSubmit }) => {
  return (
    <div className="question-detail">
      <h2>{question.title}</h2>
      <p>{question.description}</p>
      <div className="options">
        {question.options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={() => onOptionChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
      {selectedOption && (
        <button onClick={onSubmit} className="verify-btn">
          Verify
        </button>
      )}
    </div>
  );
};

export default QuestionDetail;
