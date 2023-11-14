import React, { useRef, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { getCourseSyllabus } from "./mock-database/mock-database"

/** @satisfies {import("react-router-dom").LoaderFunction} */
export const loader = ({ params }) => {
	if (!params.courseId) {
		return null
	}
	return getCourseSyllabus(params.courseId)
}

export const Syllabus = () => {
	const data = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData())
	const containerRef = useRef(null)
	const [isMouseOver, setIsMouseOver] = useState(false)

	const handleMouseEnter = () => {
		setIsMouseOver(true)
	}

	const handleMouseLeave = () => {
		setIsMouseOver(false)
	}

	const handleWheel = (event) => {
		if (containerRef.current && isMouseOver) {
			containerRef.current.scrollTop += event.deltaY
			event.preventDefault()
		}
	}

  if (!data) {
    return null
  }

	return (
		<div
			ref={containerRef}
			style={{
				display: "flex",
				flexDirection: "column",
				overflow: "auto",
				maxWidth: "1000px",
			}}
			onWheel={handleWheel}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div id="course_syllabus" className="page" dangerouslySetInnerHTML={{ __html: data.content }}></div>
		</div>
	)
}
