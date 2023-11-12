import React from "react";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "./GlobalContent";
import { getPageContent } from "./mock-database/mock-database";

/** @satisfies {import("react-router-dom").LoaderFunction} */
export const loader = ({ params }) => {
	if (!params.courseId || !params.assignmentName) {
		return "";
	}

	return getPageContent(params.courseId, params.assignmentName);
};

export const AssignmentPage = () => {
	const htmlContent = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData());
	const { treatNum, updateTreatNum } = useGlobalContext();

	/**
   * 
   * @param {React.FormEvent<HTMLFormElement>} event 
   */
	const handleFormSubmit = (event) => {
		event.preventDefault(); // Prevent the button from reloading the page
		const newTreatNum = treatNum + 5;
		updateTreatNum(newTreatNum);
	};

	return (
		<div>
			<div dangerouslySetInnerHTML={{ __html: htmlContent }} className="page w-auto"></div>
			<form onSubmit={handleFormSubmit}>
				<button
					type="button" // Use type="button" to prevent the default form submission
					className="rounded-md border-0 bg-red-200 px-4 py-2"
				>
					Submit
				</button>
			</form>
		</div>
	);
};
