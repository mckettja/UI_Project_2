import { Link, useLoaderData, useParams } from "react-router-dom";
import { getFile } from "./mock-database/mock-database";

/** @satisfies {import("react-router-dom").LoaderFunction} */
export const loader = ({ params }) => {
	if (!params.courseId || !params.fileName) {
		return null;
	}
	return getFile(params.courseId, params.fileName);
};

export const FilePage = () => {
	const params = useParams();
	const data = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData());
	if (!data) {
		return null;
	}
	return (
		<div className="space-y-4">
      <h1 className="font-bold text-3xl">{data.item.title}</h1>
			<p>File name: {`${data.item.name}.pptx`}</p>
			<a
				href={`/${params.courseId}/presentations/${data.item.name}.pptx`}
				download={`${data.item.name}.pptx`}
				className="bg-rose-300 px-4 py-2 rounded-md inline-block"
			>
				Download file
			</a>
		</div>
	);
};
