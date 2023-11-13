import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../GlobalContent';

const AnimalIcon = ({ imageUrl, text, link}) => {
  const { treatNum, updateTreatNum } = useGlobalContext();
  const { moodIndex, updateMoodIndex} = useGlobalContext();

  const textStyle = {
    textAlign: 'center',
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const progressBarStyle = {
    width: '100px',
    transform: 'rotate(-90deg)',
  };

  const paddingStyle = {
    marginRight: '-30px',
    marginLeft: '-30px',
  };

  const imageStyle = {
    width: '1.5vh',
    height: 'auto',
    position: 'relative',
    zIndex: 1,
    top: '5vh',
  };

  const handleButtonClick = () => {
    if (treatNum > 0){
      if (moodIndex !== 100) {
        const newMoodIndex = Math.min(moodIndex + 5, 100);
        const newTreatNum = Math.max(treatNum - 5, 0);
        updateMoodIndex(newMoodIndex);
        updateTreatNum(newTreatNum);
      } else {
        alert("Your pet is already full!");
      }
    } else {
      alert("You're out of treats! Turn in assignments to get more.");
    }
  };
  
  return (
    <div className="animal-icon">
      <div style={containerStyle}>
        <img
          src={imageUrl[moodIndex >= 75 ? 2 : moodIndex < 50 ? 0 : 1]} //changes what image is rendered depending on moodIndex
          alt="Animal"
          style={{ width: '12vh', height: 'auto' }}
        />
        <div style={paddingStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ProgressBar
              variant={moodIndex >= 75 ? 'success' : moodIndex < 50 ? 'danger' : 'warning'} //changes color of progress bar depending on moodIndex
              now={moodIndex}
              style={progressBarStyle}
            />
            <button onClick={handleButtonClick}>
              <img src={"/images/add.png"} alt="Animal" style={imageStyle} />
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
