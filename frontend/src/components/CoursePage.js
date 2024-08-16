import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';
import ProgressBar from './ProgressBar';
import Achievements from './Achievements';
import RewardContractABI from '../abi/RewardContract.json';
import './CoursePage.css';

const contractAddress = '0xE15b7292eF850113e1F2285E4D64eD2613bebDb5';

const questions = [
  {
    id: 1,
    title: 'Question 1',
    description: 'When the sum of squares of two sides of a triangle is equal to the square of the length of the third side, then it is called a:',
    options: ['Scalene triangle', 'Right triangle', 'Isosceles triangle', 'Equilateral triangle'],
    correctAnswer: 'Right triangle',
  },
  {
    id: 2,
    title: 'Question 2',
    description: 'What is blockchain?',
    options: ['A type of database', 'A cryptocurrency', 'A financial institution', 'A programming language'],
    correctAnswer: 'A type of database',
  },
  {
    id: 3,
    title: 'Question 3',
    description: 'Explain smart contracts.',
    options: ['Self-executing contracts', 'Paper-based contracts', 'Contracts that require manual execution', 'None of the above'],
    correctAnswer: 'Self-executing contracts',
  },
  {
    id: 4,
    title: 'Question 4',
    description: 'Which of the following is a decentralized finance platform?',
    options: ['Ethereum', 'JPMorgan Chase', 'PayPal', 'Bitcoin'],
    correctAnswer: 'Ethereum',
  },
  {
    id: 5,
    title: 'Question 5',
    description: 'Who invented Bitcoin?',
    options: ['Vitalik Buterin', 'Satoshi Nakamoto', 'Elon Musk', 'Jeff Bezos'],
    correctAnswer: 'Satoshi Nakamoto',
  },
];

const CoursePage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [progress, setProgress] = useState(0);
  const [badges, setBadges] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  // eslint-disable-next-line
  const [provider, setProvider] = useState(null);
  // eslint-disable-next-line
  const [signer, setSigner] = useState(null);
  const [rewardContract, setRewardContract] = useState(null);

  // Initialize ethers provider and contract
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const init = async () => {
        const tempProvider = new ethers.BrowserProvider(window.ethereum);
        const tempSigner = await tempProvider.getSigner();
        const tempContract = new ethers.Contract(contractAddress, RewardContractABI, tempSigner);
        setProvider(tempProvider);
        setSigner(tempSigner);
        setRewardContract(tempContract);
      };
      init();
    }
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsCorrect(option === selectedQuestion.correctAnswer);
  };

  const handleSubmit = async () => {
    if (isCorrect && progress < 100) {
      const newProgress = progress + 20;
      setProgress(newProgress);

      if (newProgress >= 100) {
        // Award the badge and then call the smart contract
        setBadges([...badges, 'New Badge']);
        try {
          if (rewardContract) {
            const tx = await rewardContract.claimReward(10); // Claim 10 EDU as reward
            await tx.wait(); // Wait for the transaction to be mined
            console.log('Reward claimed successfully');
          }
        } catch (error) {
          console.error('Error claiming reward:', error);
        }
      } else {
        // Move to the next question
        const nextQuestionIndex = questions.findIndex(q => q.id === selectedQuestion.id) + 1;
        if (nextQuestionIndex < questions.length) {
          setSelectedQuestion(questions[nextQuestionIndex]);
        }
        setSelectedOption(''); // Reset the selected option
        setIsCorrect(false);
      }
    }
  };

  return (
    <div className="course-page">
      <div className="sidebar">
        <QuestionList questions={questions} onSelect={setSelectedQuestion} />
        <ProgressBar progress={progress} />
      </div>
      <div className="main-content">
        <QuestionDetail
          question={selectedQuestion}
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="reward-section">
        <Achievements badges={badges} />
      </div>
    </div>
  );
};

export default CoursePage;
