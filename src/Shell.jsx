import { Dropdown } from "react-bootstrap"
import { Outlet, useLoaderData } from "react-router-dom"
import { NavBar } from "./components/NavBar"
import { useMyStoreActions } from "./store"
import { getAllCourses } from "./mock-database/mock-database"
import ScrollToTop from "./components/ScrollToTop"

/** @satisfies {import("react-router-dom").LoaderFunction} */
export const loader = () => {
	return getAllCourses()
}

export function Shell() {
	const allCourses = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData())
	const switchUser = useMyStoreActions((actions) => actions.switchUser)
	const changeMood = useMyStoreActions((actions) => actions.changeMood)
	const changeTreat = useMyStoreActions((actions) => actions.changeTreat)
	const changeDate = useMyStoreActions((actions) => actions.changeDate)

	const goToNextDay = () => {
		changeDate({ changeFunction: (d) => d.add(1, "day") })
		// Decrease mood by 5 for each course
		for (const course of allCourses) {
			changeMood({
				courseId: course.id,
				changeFunction: (m) => {
					return m > 5 ? m - 5 : m
				},
			})
		}
	}

	const maximumTreats = () => {
		for (const course of allCourses) {
			changeTreat({ courseId: course.id, changeFunction: () => 100 })
		}
	}

	const handleDropdownSelect = (eventKey) => {
		switch (eventKey) {
			case "switch-user":
				switchUser()
				break
			case "max-treats":
				maximumTreats()
				break
			case "next-day":
				goToNextDay()
				break

			default:
				break
		}
	}

	return (
		<>
			<ScrollToTop />
			<header className="mb-4 flex items-center justify-between px-8">
				<div>
					<Dropdown autoClose="outside" onSelect={handleDropdownSelect}>
						<Dropdown.Toggle variant="success" id="dropdown-basic" className="text-black">
							Profile
						</Dropdown.Toggle>

						<Dropdown.Divider />
						<Dropdown.Menu>
							<Dropdown.Item eventKey="switch-user">Switch User</Dropdown.Item>
							<Dropdown.Header>Admin</Dropdown.Header>
							<Dropdown.Item eventKey="next-day">Admin: Next day</Dropdown.Item>
							<Dropdown.Item eventKey="max-treats">Admin: 100 treats</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<NavBar courseList={allCourses} />
			</header>
			<Outlet />
		</>
	)
}
