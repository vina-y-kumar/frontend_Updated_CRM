import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const FlowGraph = () => {
  const [showOutputNodes, setShowOutputNodes] = useState(false);

  const handleButtonClick = (option) => {
    // Logic to handle button clicks and show output nodes
    setShowOutputNodes(true);
    // Add more logic based on the selected option if needed
  };

  return (
    <div className="container mt-4">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Starting Card</Card.Title>
          <Card.Text>
            This card contains buttons and content.
          </Card.Text>
          <Row>
            <Col>
              <Button variant="success" onClick={() => handleButtonClick('yes')}>
                Yes
              </Button>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => handleButtonClick('no')}>
                No
              </Button>
            </Col>
            <Col>
              <Button variant="secondary" onClick={() => handleButtonClick('default')}>
                Default
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      {showOutputNodes && (
        <div>
          {/* Output Node 1 */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Output Node 1</Card.Title>
              <Card.Text>
                This is the first output node.
              </Card.Text>
            </Card.Body>
          </Card>
          
          {/* Output Node 2 */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Output Node 2</Card.Title>
              <Card.Text>
                This is the second output node.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FlowGraph;
