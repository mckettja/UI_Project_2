import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";

export const AssignmentPage = () => {
  const htmlContent = useLoaderData();

  return (
    <div className="max-w-3xl">
      {/* <p className="text-xl font-bold">{assignment.title}</p>
      <p>Due at: {assignment.dueDate}</p> */}
      <div dangerouslySetInnerHTML={{__html: htmlContent}} className="w-auto"></div>
      <form>
        <button className="border-0 px-4 py-2 bg-red-200 rounded-md">Submit</button>
      </form>
    </div>
  );
};
