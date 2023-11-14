import React, { useRef, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { getCourseModules } from "./mock-database/mock-database";

/**
 * @satisfies {import('react-router-dom').LoaderFunction}
 */
export const loader = ({ params }) => {
	if (!params.courseId) {
		return null;
	}
	return getCourseModules(params.courseId);
};

export const HomePage = () => {
	const modules = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData());
	/** @type {React.MutableRefObject<HTMLDivElement | null>} */
	const containerRef = useRef(null);
	const [isMouseOver, setIsMouseOver] = useState(false);

	if (!modules) {
		return null;
	}

	const handleMouseEnter = () => {
		setIsMouseOver(true);
	};

	const handleMouseLeave = () => {
		setIsMouseOver(false);
	};

	const handleWheel = (event) => {
		if (containerRef.current && isMouseOver) {
			containerRef.current.scrollTop += event.deltaY;
			event.preventDefault();
		}
	};

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
			{modules.map((module, index) => (
				<div
					key={index}
					style={{ flex: "0 0 auto", minWidth: "300px", marginBottom: "20px" }} // Adjust marginRight to marginBottom
				>
					<details open className="border-[1px] border-gray-400 p-3">
						<summary className="black cursor-pointer font-bold">
							Module {index + 1} - {module.title}
						</summary>
						<ul className="ml-8 mt-2">
							{module.items.map((moduleItem) => (
								<li key={moduleItem.name} className="mb-2 hover:underline">
									{moduleItem.type === "inclass" || moduleItem.type === "tutorial" ? (
										<Link to={`pages/${moduleItem.name}`}>📖 {moduleItem.title}</Link>
									) : moduleItem.type === "assignment" ? (
										<Link to={`assignments/${moduleItem.name}`}>✏️ {moduleItem.title}</Link>
									) : (
										<Link to={`files/${moduleItem.name}`}>🔗 {moduleItem.title}</Link>
									)}
								</li>
							))}
						</ul>
					</details>
				</div>
			))}
		</div>
	);
};
