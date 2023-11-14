import { useLoaderData } from "react-router-dom"
import { getPageContent } from "./mock-database/mock-database"

/** @satisfies {import("react-router-dom").LoaderFunction} */
export const loader = ({ params }) => {
	if (!params.courseId || !params.pageName) {
		return null
	}
	return getPageContent(params.courseId, params.pageName)
}

export const DocumentPage = () => {
	const data = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData())
	if (!data) {
		return null
	}

	return (
		<div>
			<h2 className="mb-4 text-2xl font-bold">{data.item.title}</h2>
			<div dangerouslySetInnerHTML={{ __html: data.content }} className="page w-auto"></div>
		</div>
	)
}
