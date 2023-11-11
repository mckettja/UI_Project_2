import React, { useRef, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

export const Syllabus = () => {
  const modules = useLoaderData();
  const containerRef = useRef(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

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
      {"this is the syllabus page"}
    </div>
  );
};