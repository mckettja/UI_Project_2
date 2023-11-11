import React, { useRef, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

export const HomePage = () => {
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
      containerRef.current.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", overflowX: "auto", maxWidth: "1000px" }}
      onWheel={handleWheel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {modules.map((module, index) => (
        <div
          key={index}
          style={{ flex: "0 0 auto", minWidth: "300px", marginRight: "20px" }}
        >
          <details
            open
            style={{
              border: "1px solid #ddd",
              padding: "5px",
              marginBottom: "10px",
            }}
          >
            <summary style={{ cursor: "pointer", fontWeight: "bold" }}>{module.title}</summary>
            <ul>
              {module.items.map((moduleItem) => (
                <li key={moduleItem.slug}>
                  <Link to={`pages/${moduleItem.slug}`}>{moduleItem.title}</Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
};
