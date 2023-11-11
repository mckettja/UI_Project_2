import React, { useRef, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

export const Announcements = () => {
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
      {modules.map((module, index) => (
        <Card key={index} style={{ width: '60rem', marginBottom: '20px' }}>
          <Card.Body>
            <Card.Title>{`Module ${index + 1} - ${module.title}`}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Subtitle</Card.Subtitle>
            <Card.Text>
              {module.description}
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};