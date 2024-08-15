// import React, { useState } from 'react';
// import QuestionList from './QuestionList';
// import QuestionDetail from './QuestionDetail';
// import ProgressBar from './ProgressBar';
// import Achievements from './Achievements';
// import './CoursePage.css';

// const questions = [
//   { id: 1, title: 'Question 1', description: 'What is blockchain?' },
//   { id: 2, title: 'Question 2', description: 'Explain smart contracts.' },
//   // Add more questions as needed
// ];

// const CoursePage = () => {
//   const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
//   const [progress, setProgress] = useState(0);
//   const [badges, setBadges] = useState([]);

//   const handleSubmit = () => {
//     if (progress < 100) {
//       setProgress(progress + 20); 
//     }

//     if (progress + 20 >= 100) {
//       setBadges([...badges, 'New Badge']);
//     }
//   };

//   return (
//     <div className="course-page robotic-theme">
//       <div className="question-section">
//         <QuestionList questions={questions} onSelect={setSelectedQuestion} />
//         <div className="progress-container">
//           <h3>Progress</h3>
//           <ProgressBar progress={progress} />
//         </div>
//       </div>
//       <div className="detail-section">
//         <QuestionDetail question={selectedQuestion} onSubmit={handleSubmit} />
//       </div>
//       <Achievements badges={badges} />
//     </div>
//   );
// };

// export default CoursePage;





import React, { useState } from 'react';
import { ethers } from 'ethers';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';
import ProgressBar from './ProgressBar';
import Achievements from './Achievements';
import RewardContractABI from '../abi/RewardContract.json'; // ABI of your contract
import './CoursePage.css';

// Replace with your deployed contract address
const contractAddress = '0xE15b7292eF850113e1F2285E4D64eD2613bebDb5';
const questions = [
  { id: 1, title: 'Question 1', description: 'What is blockchain?' },
  { id: 2, title: 'Question 2', description: 'Explain smart contracts.' },
  // Add more questions as needed
];

const CoursePage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [progress, setProgress] = useState(0);
  const [badges, setBadges] = useState([]);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [rewardContract, setRewardContract] = useState(null);

  // Initialize ethers provider and contract
  React.useEffect(() => {
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

  const handleSubmit = async () => {
    if (progress < 100) {
      setProgress(progress + 20);
    }

    if (progress + 20 >= 100) {
      setBadges([...badges, 'New Badge']);
      try {
        if (rewardContract) {
          const tx = await rewardContract.claimReward(10); // Assuming you claim 10 EDU as reward
          await tx.wait(); // Wait for the transaction to be mined
          console.log("Reward claimed successfully");
        }
      } catch (error) {
        console.error("Error claiming reward:", error);
      }
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
