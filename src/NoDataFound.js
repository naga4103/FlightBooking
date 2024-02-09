import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";

const NoDataFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <Container fluid>
        <Card>
          <Card.Body style={{ width: "100%", minHeight: "100vh" }}>
            <Button onClick={() => navigate("/home")}>Go to Home</Button>
            <Card.Img
              variant="top"
              src="https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png"
              alt="error-image"
              style={{ width: "100%", minHeight: "100vh" }}
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default NoDataFound;
