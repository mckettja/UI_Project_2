import { action, computed, createStore, createTypedHooks } from "easy-peasy";
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

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

/** @type {UserData[]} */
const users = [
  {
    id: "1",
    name: "Yale Miller",
    courseData: {
      "ui": {
        name: "ui",
        assignmentSubmissions: [
          {
            name: "assignment_01",
            submitDate: "08/29/2022",
            gradeDate: "09/01/2022",
            isLate: false,
            points: 10,
            grade: 10,
            isNewUpdate: false,
            content: ["Yale Submission"],
            title: "Getting to know you",
            dueDate: '08/29/2022'
          },
          {
            name: "assignment_02",
            submitDate: "09/17/2022",
            gradeDate: "09/20/2022",
            isLate: true,
            points: 10,
            grade: 5,
            isNewUpdate: true,
            content: ["Yale Submission Assignment 2"],
            title: "Sketching practice",
            dueDate: "09/16/2022"
          },
        ],
      }
    }
  },
  {
    id: "2",
    name: "John Cena",
    courseData: {
      "ui": {
        name: "ui",
        assignmentSubmissions: [
          {
            name: "assignment_01",
            submitDate: "08/20/2022",
            gradeDate: "09/01/2022",
            isLate: false,
            points: 10,
            grade: 10,
            isNewUpdate: false,
            content: ["John Cena Submission"],
            title: "Getting to know you",
            dueDate: '08/29/2022'
          },
          {
            name: "assignment_02",
            submitDate: "09/05/2022",
            gradeDate: "09/20/2022",
            isLate: true,
            points: 10,
            grade: 5,
            isNewUpdate: true,
            content: ["John Cena Submission Assignment 2"],
            title: "Sketching practice",
            dueDate: "09/16/2022"
          },
        ],
      }
    }
  },
];

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
  user: users[0],
  switchUser: action((state) => {
    const otherUser = users.find(u => u.id !== state.user.id)
    if (!otherUser) return
    state.user = otherUser
  }),
  submitAssignment: action((state, payload) => {
    state.user.courseData[payload.courseId].assignmentSubmissions.push({
      content: payload.content,
      name: payload.assignment.name,
      grade: undefined,
      points: payload.assignment.points,
      submitDate: dayjs().format('MM/DD/YYYY'),
      gradeDate: undefined,
      isLate: dayjs().format('YYYY/MM/DD') > dayjs(payload.assignment.end_or_due, 'MM/DD/YY').format('YYYY/MM/DD'),
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