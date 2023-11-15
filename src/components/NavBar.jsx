import dayjs from "dayjs"
import { useMyStoreState } from "../store"
import AnimalIcon from "./AnimalIcon"

const SEMESTER_START_DATE = "2022-08-21"

export const NavBar = ({ courseList }) => {
	const user = useMyStoreState((state) => state.user)
	const currentDate = useMyStoreState((state) => state.currentDate)

	return (
		<nav className="relative flex h-full flex-1 justify-center px-12">
			<div className="absolute left-0 top-0 flex h-full flex-col justify-center gap-2 p-[inherit]">
				<p>{user.name}</p>
				<p>Week: {dayjs(currentDate).diff(dayjs(SEMESTER_START_DATE), "week")}</p>
				<p>Date: {currentDate.format("MM/DD/YYYY")}</p>
				<p></p>
			</div>
			<ul className="flex items-start gap-16">
				{courseList.map((course) => (
					<li key={course.id}>
						<AnimalIcon courseId={course.id} imageUrl={course.imageUrls} text={course.title} link={course.id} />
					</li>
				))}
			</ul>
		</nav>
	)
}
