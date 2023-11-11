import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "./GlobalContent";

export const AssignmentPage = () => {
  const htmlContent = useLoaderData();
  const { treatNum, updateTreatNum } = useGlobalContext();

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent the button from reloading the page
    const newTreatNum = treatNum + 5;
    updateTreatNum(newTreatNum);
  };

  return (
    <div className="max-w-3xl">
      {/* <p className="text-xl font-bold">{assignment.title}</p>
      <p>Due at: {assignment.dueDate}</p> */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="w-auto"></div>
      <form>
        <button
          type="button" // Use type="button" to prevent the default form submission
          className="border-0 px-4 py-2 bg-red-200 rounded-md"
          onClick={handleButtonClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
