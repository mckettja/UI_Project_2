import Card from "react-bootstrap/Card"
import { useLoaderData } from "react-router-dom"
import { getCourseModules } from "./mock-database/mock-database"

/** @satisfies {import("react-router-dom").LoaderFunction} */
export const loader = ({ params }) => {
	if (!params.courseId) return null
	return getCourseModules(params.courseId)
}

export const Announcements = () => {
	const modules = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData())

  if (!modules) {
    return null
  }

	return (
		<div className="flex w-full flex-col gap-4">
			{modules.map((module, index) => (
				<Card key={index} className="flex-1">
					<Card.Body>
						<Card.Title>📢 Announcement: {`Module ${index + 1} - ${module.title}`}</Card.Title>
						<Card.Text>{module.title} has been relased. Take a look at in the the Modules tab</Card.Text>
					</Card.Body>
				</Card>
			))}
		</div>
	)
}
