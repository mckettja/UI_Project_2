import React from "react"
import { NavLink, Outlet, useLoaderData } from "react-router-dom"
import { RightSidebar } from "./components/RightSidebar"
import { getCourseAssignments, getCourseData } from "./mock-database/mock-database"
import { useMyStoreState } from "./store"

/**
 * @satisfies {import('react-router-dom').LoaderFunction}
 */
export const loader = async ({ params }) => {
	if (!params.courseId) return null
	const courseInfo = await getCourseData(params.courseId)
	return {
		id: courseInfo.id,
		title: courseInfo.title,
		code: courseInfo.code,
		assignments: await getCourseAssignments(params.courseId),
	}
}

export const CourseLayout = () => {
	const courseData = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData())
	const user = useMyStoreState((state) => state.user)

	if (!courseData?.assignments) {
		return "Something wrong with the CourseLayout page"
	}

	const unsubmittedAssignments = courseData.assignments.filter(
		(a) => !user.courseData[courseData.id].assignmentSubmissions.map((s) => s.name).includes(a.name),
	)

	return (
		<main>
			<h1 className="fancy text-2xl font-bold">
				{courseData.title} - {courseData.code}
			</h1>
			<div className="grid grid-cols-[15%_1fr_auto] gap-12 px-8">
				<nav>
					<ul className="flex flex-col gap-3 px-0 py-6">
						{["Modules", "Assignments", "Syllabus", "Grades", "Zoom", "Announcements"].map((tabName) => (
							<li className="text-black no-underline hover:font-bold hover:underline" key={tabName}>
								<NavLink
									end
									to={`${tabName === "Modules" ? "" : tabName.toLowerCase()}`}
									className={({ isActive }) => `${isActive ? "font-bold" : ""}`}
								>
									{tabName}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
				<div className="flex max-w-3xl flex-col gap-6 py-6">
					<Outlet />
				</div>
				<RightSidebar assignmentList={unsubmittedAssignments} />
			</div>
		</main>
	)
}
