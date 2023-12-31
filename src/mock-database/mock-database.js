/**
 * @typedef {Object} Course
 * @property {string} id - Id code of the course, e.g. ui, senior-design
 * @property {string} title - Title of the course
 * @property {string} code - Number code of course, e.g. cs1000
 * @property {string} pet - Pet of the course
 * @property {string[]} imageUrls
 * @property {string} code - Class code
 * @property {Array<ModuleItem | AssignmentItem | SyllabusItem | PresentationItem | PageItem>} items
 */

/**
 * @typedef {Object} ModuleItem
 * @property {string} name - File name of the item
 * @property {string} folder - folder location
 * @property {string} title - Title of the module
 * @property {'module'} type
 * @property {string} module - the module this assignment belongs to
 */

/**
 * @typedef {Object} AssignmentItem
 * @property {string} name - File name of the item
 * @property {string} title - Title of the assignment
 * @property {string} folder - folder location
 * @property {'assignment' | 'project' | 'exams'} type
 * @property {string} end_or_due - date string, e.g. 9/9/2022
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
 * @property {'inclass' | 'tutorial'} type
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
	const courseIds = ["ui", "senior-design", "computer-graphics"];
	return Promise.all(
		courseIds.map(async (id) => {
			const data = await getCourseData(id);
			return {
				id: data.id,
				imageUrls: data.imageUrls,
				code: data.code,
				title: data.title,
			};
		}),
	);
};

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
	const moduleItems = courseData.items.filter(/** @returns {i is ModuleItem} */ (i) => i.type === "module");
	const modulesData = moduleItems.map((module) => {
		return {
			...module,
			items: courseData.items.filter(
				/** @returns {i is PageItem | AssignmentItem | PresentationItem} */
				(i) => i.type !== "module" && i.type !== "syllabus" && i.module === module.name,
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
	const syllabusItem = courseData.items.find(/** @returns {i is SyllabusItem} */ (i) => i.type === "syllabus");

	if (!syllabusItem) {
		return null
	}

	/** @type string */
	const textContent = (await import(`./course-data/${courseId}/${syllabusItem.folder}/${syllabusItem.name}.html?raw`)).default;
	return { item: syllabusItem, content: textContent };
};

/**
 * @param  {string} courseId
 */
export const getCourseAssignments = async (courseId) => {
	const courseData = await getCourseData(courseId);
	const assignmentItems = courseData.items.filter(
		/** @returns {i is AssignmentItem} */
		(i) => i.type === "assignment" || i.type === "project" || i.type === "exams",
	);
	return assignmentItems;
};

/**
 * @param  {string} courseId
 * @param  {string} itemName
 *
 */
export const getPageContent = async (courseId, itemName) => {
	const courseData = await getCourseData(courseId);
	const item = courseData.items.find((i) => i.name === itemName);
	if (!item) {
		return null;
	}
	/** @type string */
	const textContent = (await import(`./course-data/${courseId}/${item.folder}/${item.name}.html?raw`)).default;
	return { item: item, content: textContent };
};

/**
 * @param  {string} courseId
 * @param  {string} fileName
 *
 */
export const getFile = async (courseId, fileName) => {
	const courseData = await getCourseData(courseId);
	const item = courseData.items.find((i) => i.name === fileName);
	if (!item) {
		return null;
	}
	/** @type string */
	return { item: item };
};
