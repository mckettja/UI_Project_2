import "bootstrap/dist/css/bootstrap.css"
import { StoreProvider } from "easy-peasy"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Announcements, loader as announmentsPageLoader } from "./Announcements"
import { loader as assignmentListLoader, AssignmentListPage } from "./AssignmentListPage"
import { loader as assignmentLoader, AssignmentPage } from "./AssignmentPage"
import { CourseLayout, loader as courseLayoutLoader } from "./CourseLayout"
import { DocumentPage, loader as documentPageLoader } from "./DocumentPage"
import { FilePage, loader as filePageLoader } from "./FilePage"
import "./global.scss"
import { Grades } from "./Grades"
import { HomePage, loader as homePageLoader } from "./HomePage"
import { Shell, loader as shellLoader } from "./Shell"
import { store } from "./store"
import { Syllabus, loader as syllabusPageLoader } from "./Syllabus"
import { Zoom } from "./Zoom"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Shell />,
		loader: shellLoader,
		children: [
			{
				path: "/",
				index: true,
				element: <div className="p-8 text-center">Please select a course on the navbar to get started</div>,
			},
			{
				path: "/:courseId",
				loader: courseLayoutLoader,
				element: <CourseLayout />,
				children: [
					{
						path: "/:courseId",
						index: true,
						loader: homePageLoader,
						element: <HomePage />,
					},
					{
						path: "/:courseId/assignments",
						loader: assignmentListLoader,
						element: <AssignmentListPage />,
					},
					{
						path: "/:courseId/announcements",
						loader: announmentsPageLoader,
						element: <Announcements />,
					},
					{
						path: "/:courseId/zoom",
						element: <Zoom />,
					},
					{
						path: "/:courseId/grades",
						loader: assignmentListLoader,
						element: <Grades />,
					},
					{
						path: "/:courseId/syllabus",
						loader: syllabusPageLoader,
						element: <Syllabus />,
					},
					{
						path: "/:courseId/assignments/:assignmentName",
						loader: assignmentLoader,
						element: <AssignmentPage />,
					},
					{
						path: "/:courseId/pages/:pageName",
						loader: documentPageLoader,
						element: <DocumentPage />
					},
					{
						path: "/:courseId/files/:fileName",
						loader: filePageLoader,
						element: <FilePage />,
					},
				],
			},
		],
	},
])

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StoreProvider store={store}>
			<RouterProvider router={router} />
		</StoreProvider>
	</React.StrictMode>,
)
