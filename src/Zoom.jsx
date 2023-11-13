import React, { useRef, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

export const Zoom = () => {
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
      <h1 style={{ fontSize: '1.5em', textDecoration: 'underline' }}><strong>Zoom Page</strong></h1>
      <br></br>
      <p>Here is where the link to our zoom meeting will be, click the link below and your page will be rerouted to a new page.</p>
      <br></br>
      <a style={{ fontSize: '1.2em', color: 'blue', fontWeight: 'bold', textDecoration: 'underline' }} href="https://ucincinnati.zoom.us/j/92459304063?pwd=RjRXcGI3RE9oS1VvbStkQzlVTWg1dz09&23=#success" target="_blank"><p>Click Here</p></a>
    </div>
  );
};