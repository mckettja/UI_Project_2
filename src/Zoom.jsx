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
      }}
      onWheel={handleWheel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h1
        style={{
          fontSize: '1.5em',
          textDecoration: 'underline',
          marginBottom: '10px', // Add some space below the title
        }}
      >
        <strong>Zoom Page</strong>
      </h1>
      <br />
      <p>
        Here is where the link to our Zoom meeting will be. Click the link below, and your page will be rerouted to a new page.
      </p>
      <br />
      <a
        href="https://ucincinnati.zoom.us/j/92459304063?pwd=RjRXcGI3RE9oS1VvbStkQzlVTWg1dz09&23=#success"
        target="_blank"
        style={{
          fontSize: '1.2em',
          display: 'inline-block', // Make the link text inline
        }}
      >
        <span
          style={{
            color: 'white', // Text color
            fontWeight: 'bold',
            textDecoration: 'none', // Remove underline for a button-like appearance
            backgroundColor: 'rgb(0, 123, 255)', // Background color for the button
            padding: '10px 20px', // Padding inside the button
            borderRadius: '5px', // Rounded corners for the button
          }}
        >
          Click Here
        </span>
      </a>
    </div>
  );
};