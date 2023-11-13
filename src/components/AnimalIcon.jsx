import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'react-router-dom';
import { useMyStoreActions, useMyStoreState } from '../store';

const AnimalIcon = ({ courseId, imageUrl, text, link}) => {
  const user = useMyStoreState(state => state.user)
  const updateTreat = useMyStoreActions(state => state.changeTreat)
  const updateMood = useMyStoreActions(state => state.changeMood)

  const treatNum = user.courseData[courseId].treats
  const moodNum = user.courseData[courseId].mood

  const textStyle = {
    textAlign: 'center',
  };

  const progressBarStyle = {
    width: '100px',
    transform: 'rotate(-90deg)',
  };

  const handleButtonClick = () => {
    if (treatNum > 0){
      if (moodNum !== 100) {
        updateMood({courseId, changeFunction: (m) => Math.min(m + 5, 100)}); // Increase mood by 5
        updateTreat({courseId, changeFunction: (t) => Math.max(t - 5, 0)}) // Decrease treat by 5
      } else {
        alert("Your pet is already full!");
      }
    } else {
      alert("You're out of treats! Turn in assignments to get more.");
    }
  };
  
  return (
    <div className="animal-icon">
      <div className='flex items-center'>
        <img
          src={imageUrl[moodNum >= 75 ? 2 : moodNum < 50 ? 0 : 1]} //changes what image is rendered depending on moodIndex
          alt="Animal"
          className='w-[12vh]'
        />
        <div className='-mx-8'>
          <div className='flex flex-col items-center'>
            <ProgressBar
              variant={moodNum >= 75 ? 'success' : moodNum < 50 ? 'danger' : 'warning'} //changes color of progress bar depending on moodIndex
              now={moodNum}
              style={progressBarStyle}
            />
            <button onClick={handleButtonClick}>
              <img src={"/images/add.png"} alt="Animal" className='w-[1.5vh] aspect-square relative top-[5vh]' />
            </button>
          </div>
        </div>
      </div>
      <Link to={link} className="no-underline text-black hover:underline" style={{ ...textStyle, display: 'block', textAlign: 'center' }}>
      {text}
      <div>
      {`Treats: ${treatNum}`}
      </div>
      </Link>
    </div>
  );
};

export default AnimalIcon;
