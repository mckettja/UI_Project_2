import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GlobalProvider } from "./GlobalContent";
import "./global.scss";
import { Announcements } from "./Announcements";
import { loader as assignmentListLoader, AssignmentListPage } from "./AssignmentListPage";
import { AssignmentPage, loader as assignmentLoader } from "./AssignmentPage";
import { CourseLayout, loader as courseLayoutLoader } from "./CourseLayout";
import "./global.scss";
import { Grades } from "./Grades";
import { HomePage, loader as homePageLoader } from "./HomePage";
import { getAllCourses, getCourseModules, getPageContent } from "./mock-database/mock-database";
import { Shell } from "./Shell";
import { Syllabus } from "./Syllabus";
import { Zoom } from "./Zoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GlobalProvider> {/* Wrap your main component with the GlobalProvider */}
        <Shell />
      </GlobalProvider>
    ),
    loader: () => getAllCourses(),
    children: [
      {
        path: "/",
        index: true,
        element: <div className="text-center p-8">Please select a course on the navbar to get started</div>
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
            element: <HomePage />
          },
          {
            path: "/:courseId/assignments",
            loader: assignmentListLoader,
            element: <AssignmentListPage />
          },
          {
            path: "/:courseId/announcements",
            loader: ({ params }) => getCourseModules(params.courseId),
            element: <Announcements />
          },
          {
            path: "/:courseId/zoom",
            element: <Zoom />
          },
          {
            path: "/:courseId/grades",
            loader: assignmentListLoader,
            element: <Grades />
          },
          {
            path: "/:courseId/syllabus",
            element: <Syllabus />
          },
          {
            path: "/:courseId/assignments/:assignmentName",
            loader: assignmentLoader,
            element: <AssignmentPage />
          },
          
          {
            path: "/:courseId/pages/:pageName",
            loader: ({ params }) => getPageContent(params.courseId, params.pageName),
            element: <div>This is a page from module</div>
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
