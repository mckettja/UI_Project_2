import data from "./data.json";

export const getCourseData = (courseId) => {
  const result = data.filter((course) => course.courseId === courseId);
  if (result.length == 0) {
    return null;
  }
  return result[0]
};

export const getAllCourses = () => {
  const result = data.map((course) => ({ courseId: course.courseId, pet: course.pet }));
  return result
};
