import { useMyStoreState } from "../store"
import AnimalIcon from "./AnimalIcon"

export const NavBar = ({ courseList }) => {
	const user = useMyStoreState((state) => state.user)
	const currentDate = useMyStoreState(state => state.currentDate)

	return (
		<nav className="relative flex h-full flex-1 justify-center px-12">
			<div className="absolute left-0 top-0 p-[inherit] flex flex-col gap-2 justify-center h-full">
				<p>{user.name}</p>
				<p>Week: 8</p>
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
