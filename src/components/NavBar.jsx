import AnimalIcon from './AnimalIcon';

export const NavBar = ({ courseList }) => {

  const navbarStyle = {
    /*
    position: 'fixed', 
    top: 0,            
    left: 0,           
    width: '100%',     
    zIndex: 1,  
    */    
  };

  return (
    <nav style={navbarStyle} className="h-full flex flex-1 justify-center border-2 border-purple-500">
      <ul className="flex gap-3 items-start">
        {courseList.map((course) => (
          <li key={course.courseId} className="border-2 border-rose-400 p-0">
            <AnimalIcon
              imageUrl={course.imageUrls}
              text={course.title}
              link= {course.id}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
