import AnimalIcon from "./AnimalIcon"
import Button from "react-bootstrap/Button"
import { useMyStoreActions, useMyStoreState } from "../store"

export const NavBar = ({ courseList }) => {
	const user = useMyStoreState((state) => state.user)
	const changeMood = useMyStoreActions((actions) => actions.changeMood)
	const changeTreat = useMyStoreActions((actions) => actions.changeTreat)

	const handleNextDayClick = () => {
		for (const course of courseList) {
			changeMood({
				courseId: course.id,
				changeFunction: (m) => {
					return m > 5 ? m - 5 : m
				},
			})
		}
	}

	const handleTreatClick = () => {
		for (const course of courseList) {
			changeTreat({ courseId: course.id, changeFunction: () => 100 })
		}
	}

	return (
		<nav className="relative flex h-full flex-1 justify-center px-12">
			<div className="absolute left-0 top-0 p-[inherit]">
				<p>{user.name}</p>
				<p>Week: 8</p>
			</div>
			<ul className="flex items-start gap-3">
				{courseList.map((course) => (
					<li key={course.id} className="border-2 border-rose-400 p-0">
						<AnimalIcon courseId={course.id} imageUrl={course.imageUrls} text={course.title} link={course.id} />
					</li>
				))}
				<Button variant="secondary" onClick={handleNextDayClick}>
					Admin: Next Day
				</Button>
				<Button variant="secondary" onClick={handleTreatClick}>
					Admin: 100 Treats
				</Button>
			</ul>
		</nav>
	)
}
