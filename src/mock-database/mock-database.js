import data from "./data.json";

export const getAllCourses = () => {
  const result = data.map((course) => ({
    courseId: course.courseId,
    pet: course.pet,
    courseAnimal: course.courseAnimal,
  }));
  return result;
};

/**
 * @typedef {Object} Course
 * @property {string} id - Id code of the course, e.g. cs1230
 * @property {string} name - Name of course
 * @property {string} pet - Pet of the course
 * @property {string} code - Class code
 * @property {Array<ModuleItem | AssignmentItem | SyllabusItem | PresentationItem>} items
 */

/**
 * @typedef {Object} ModuleItem
 * @property {string} name - file name of the item
 * @property {string} folder - folder location
 * @property {'module'} type
 * @property {string} module - the module this assignment belongs to
 */

/**
 * @typedef {Object} AssignmentItem
 * @property {string} name - file name of the item
 * @property {string} title - Title of the assignment
 * @property {string} folder - folder location
 * @property {'assignment'} type
 * @property {string} end_or_due - date string, e.g. 09/09/2023
 * @property {number} points - Points of the assignment
 * @property {string} module - name of the ModuleItem this assignment belongs to
 */

/**
 * @typedef {Object} SyllabusItem
 * @property {string} name - file name of the item
 * @property {string} title - Title of the syllabus
 * @property {string} folder - folder location
 * @property {'syllabus'} type
 */

/**
 * @typedef {Object} PageItem
 * @property {string} name - file name of the item
 * @property {string} folder - folder location
 * @property {string} title - Title of the page
 * @property {inclass' | 'tutorial'} type
 * @property {string} module - name of the ModuleItem this assignment belongs to
 */

/**
 * @typedef {Object} PresentationItem
 * @property {string} name - File name of the item
 * @property {string} folder - Folder location
 * @property {string} title - Title of the presentation
 * @property {'lecture'} type
 * @property {string} module - name of the ModuleItem this assignment belongs to
 */

/**
 * @param  {string} courseId
 */
export const getCourseData = async (courseId) => {
  /**@type {Course} */
  const data = await import(`./course-data/${courseId}.json`);
  return data;
};

/**
 * @param  {string} courseId
 */
export const getCourseModules = async (courseId) => {
  const courseData = await getCourseData(courseId);
  /**@type {ModuleItem[]}*/
  const moduleItems = courseData.items.filter((i) => i.type === "module");
  const modulesData = moduleItems.map((module) => {
    return {
      module: module.name,
      /**@type {Array<AssignmentItem | SyllabusItem | PageItem | PresentationItem>}*/
      items: courseData.items.filter(
        (i) => i.type !== "module" && i.module === module.name,
      ),
    };
  });
  return modulesData;
};

/**
 * @param  {string} courseId
 */
export const getCourseSyllabus = async (courseId) => {
  const courseData = await getCourseData(courseId);
  /** @type {SyllabusItem[]} */
  const syllabusItems = courseData.items.filter((i) => i.type === "syllabus");
  if (syllabusItems.length > 0) {
    return syllabusItems[0];
  }
  return null;
};

/**
 * @param  {string} courseId
 */
export const getCourseAssignments = async (courseId) => {
  const courseData = await getCourseData(courseId);
  /** @type {AssignmentItem[]} */
  const assignmentItems = courseData.items.filter(
    (i) => i.type === "assignment",
  );
  return assignmentItems;
};
