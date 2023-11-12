import React from 'react'
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

/**
 * @typedef {Object} RightSidebarProps
 * @property {import('../mock-database/mock-database').AssignmentItem[]} assignmentList
 */

/**
 * @param {RightSidebarProps} props
 */
export const RightSidebar = ({ assignmentList }) => {
  return (
    <aside className="py-6  w-72">
      {assignmentList.map((a) => (
        <Card key={a.name} className="mb-3" style={{ padding: '10px' }}>
          <Card.Body>
            <Card.Title>{a.title}</Card.Title>
            <div style={{ border: '1px solid #ddd', padding: '8px', marginBottom: '10px' }}>
              <Card.Text>{a.name}</Card.Text>
            </div>
            <Link to={`assignments/${a.name}`}>
              <Button variant="primary" style={{ backgroundColor: '#007bff' }}>
                Submission Page
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
      </aside>
  );
};

