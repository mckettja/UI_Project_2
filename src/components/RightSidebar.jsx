import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const RightSidebar = ({ assignmentList }) => {
  return (
    <aside className="py-6  w-72">
      {assignmentList.map((assignment) => (
        <Card key={assignment.slug} className="mb-3" style={{ padding: '10px' }}>
          <Card.Body>
            <Card.Title>{assignment.title}</Card.Title>
            <div style={{ border: '1px solid #ddd', padding: '8px', marginBottom: '10px' }}>
              <Card.Text>{assignment.description}</Card.Text>
            </div>
            <Link to={`assignments/${assignment.slug}`}>
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

