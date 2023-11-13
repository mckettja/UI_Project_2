import { Dropdown } from "react-bootstrap"
import { Outlet, useLoaderData } from "react-router-dom"
import { NavBar } from "./components/NavBar"  
import { useMyStoreActions } from "./store"

export function Shell() {
	const allCourses = useLoaderData()
	const switchUser = useMyStoreActions((actions) => actions.switchUser)

	return (
		<>
			<header className="flex items-center justify-between px-8">
				<div>
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic" className="text-black">
							Profile
						</Dropdown.Toggle>

						<Dropdown.Divider />
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => switchUser()}>Switch User</Dropdown.Item>
							<Dropdown.Header>Admin</Dropdown.Header>
							<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
							<Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<NavBar courseList={allCourses} />
			</header>
			<Outlet />
		</>
	)
}
