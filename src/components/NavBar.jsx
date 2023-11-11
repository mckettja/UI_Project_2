import AnimalIcon from './AnimalIcon';
import Button from 'react-bootstrap/Button';
import { useGlobalContext } from '../GlobalContent';

export const NavBar = ({ courseList }) => {
  const { moodIndex, updateMoodIndex } = useGlobalContext();
  const { treatNum, updateTreatNum } = useGlobalContext();

  const handleNextDayClick = () => {
    let newMoodIndex = moodIndex;
    if (moodIndex > 0) {
      newMoodIndex -= 5;
    }
    updateMoodIndex(newMoodIndex);
  };

  const handleResetClick = () => {
    const newMoodIndex = 0;
    updateMoodIndex(newMoodIndex);
  };

  const handleTreatClick = () => {
    updateTreatNum(100);
  };
  

  return (
    <nav className="h-full flex flex-1 justify-center border-2 border-purple-500">
      <ul className="flex gap-3 items-start">
        {courseList.map((course) => (
          <li key={course.courseId} className="border-2 border-rose-400 p-0">
            <AnimalIcon
              imageUrl={course.imageUrls}
              text={course.title}
              link={course.id}
            />
          </li>
        ))}
        <Button variant="secondary" onClick={handleNextDayClick}>
          Admin: Next Day
        </Button>
        <Button variant="secondary" onClick={handleResetClick}>
          Admin: Reset
        </Button>
        <Button variant="secondary" onClick={handleTreatClick}>
          Admin: 100 Treats
        </Button>
      </ul>
    </nav>
  );
};
