import { action, computed, createStore, createTypedHooks } from "easy-peasy";
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import user1 from "./mock-database/users/user-1.json"
import user2 from "./mock-database/users/user-2.json"

dayjs.extend(customParseFormat)

/**
 * @typedef {Object} UserData
 * @property {string} id - id of student
 * @property {string} name - Name of student, i.e. Jane Doe
 * @property {Record<string, UserCourseData>} courseData - grades, assignments, etc. info about each course user has
 */

/**
 * @typedef {Object} UserCourseData
 * @property {string} name - Name of course
 * @property {AssignmentSubmission[]} assignmentSubmissions
 */

/**
 * @typedef {Object} AssignmentSubmission
 * @property {string} name - Name of assignment item submited to
 * @property {boolean} isLate
 * @property {string} submitDate - Date of submission
 * @property {string | undefined} gradeDate - Date of grading
 * @property {string[]} content - Content of submission, either text submission, or list of file names
 * @property {number | undefined} grade - Grade given to this submission. undefined means not graded yet
 * @property {number} points - Total point of this assignment, denormalized from AssignmentItem
 * @property {boolean} isNewUpdate - is there any grade changes that the user has not seen yet
 * @property {string} dueDate - due Date of original assignment item
 * @property {string} title - Title of original assignment item
 */

/**
 * @typedef {import("./mock-database/mock-database").AssignmentItem} AssignmentItem
 */

/**
 * @typedef {Object} StoreModel
 * @property {UserData} user
 * @property {import('easy-peasy').Action<StoreModel, {courseId: string, assignment: AssignmentItem, content: string[]}>} submitAssignment
 * @property {import('easy-peasy').Action<StoreModel>} switchUser
 */

/**
 * @type {ReturnType<typeof createStore<StoreModel>>}
 */
export const store = createStore({
  user: user1,
  switchUser: action((state) => {
    state.user = state.user.id === '1' ? user2 : user1
  }),
  submitAssignment: action((state, payload) => {
    state.user.courseData[payload.courseId].assignmentSubmissions.push({
      content: payload.content,
      name: payload.assignment.name,
      grade: undefined,
      points: payload.assignment.points,
      submitDate: dayjs().format('M/D/YYYY'),
      gradeDate: undefined,
      isLate: dayjs() > dayjs(payload.assignment.end_or_due, 'M/D/YY'),
      isNewUpdate: false,
      title: payload.assignment.title,
      dueDate: payload.assignment.end_or_due
    });
  }),
});

/** @type {ReturnType<typeof createTypedHooks<StoreModel>>} */
const hook = createTypedHooks()

export const useMyStoreActions = hook.useStoreActions;
export const useMyStoreDispatch = hook.useStoreDispatch;
export const useMyStoreState = hook.useStoreState;