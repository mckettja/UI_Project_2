import React, { useRef, useState } from "react";
import Card from 'react-bootstrap/Card';
import { useLoaderData } from "react-router-dom";

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
      onWheel={handleWheel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col gap-4 w-full"
    >
      {modules.map((module, index) => (
        <Card key={index} className="flex-1">
          <Card.Body>
            <Card.Title>{`Module ${index + 1} - ${module.title}`}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Subtitle</Card.Subtitle>
            <Card.Text>
              {module.description}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};