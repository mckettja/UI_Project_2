/**
 * @typedef {Object} Course
 * @property {string} id - Id code of the course, e.g. ui, senior-design
 * @property {string} title - Title of the course
 * @property {string} code - Number code of course, e.g. cs1000
 * @property {string} pet - Pet of the course
 * @property {string[]} imageUrls
 * @property {string} code - Class code
 * @property {Array<ModuleItem | AssignmentItem | SyllabusItem | PresentationItem>} items
 */

/**
 * @typedef {Object} ModuleItem
 * @property {string} name - File name of the item
 * @property {string} folder - folder location
 * @property {'module'} type
 * @property {string} module - the module this assignment belongs to
 */

/**
 * @typedef {Object} AssignmentItem
 * @property {string} name - File name of the item
 * @property {string} title - Title of the assignment
 * @property {string} folder - folder location
 * @property {'assignment'} type
 * @property {string} end_or_due - date string, e.g. 09/09/2023
 * @property {number} points - Points of the assignment
 * @property {string} module - name of the ModuleItem this assignment belongs to
 */

/**
 * @typedef {Object} SyllabusItem
 * @property {string} name - File name of the item
 * @property {string} title - Title of the syllabus
 * @property {string} folder - folder location
 * @property {'syllabus'} type
 */

/**
 * @typedef {Object} PageItem
 * @property {string} name - File name of the item
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


export const getAllCourses = async () => {
  const courseIds = ['ui']
  return Promise.all(courseIds.map(async id => {
    const data = await getCourseData(id)
    return {
      id: data.id,
      imageUrls: data.imageUrls,
      code: data.code,
      title: data.title
    }
  }))
}

/**
 * @param  {string} courseId
 */
export const getCourseData = async (courseId) => {
  /**@type {Course} */
  const data = (await import(`./course-data/${courseId}/${courseId}.json`)).default;
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
  /** @type {SyllabusItem | undefined} */
  const syllabusItem = courseData.items.find((i) => i.type === "syllabus");
  return syllabusItem ?? null
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

/**
 * @param  {string} courseId
 * @param  {string} itemName
 * @param  {'assignment' | 'syllabus' | 'inclass' | 'tutorial'} type
 * 
 */
export const getPageContent = async (courseId, itemName) => {
  const courseData = await getCourseData(courseId);
  const item = courseData.items.find(i => i.name === itemName)
  if (!item) {
    return ""
  }
  /** @type string */
  const textContent = (await import(`./course-data/${courseId}/${item.folder}/${item.name}.html?raw`)).default
  return textContent
}
