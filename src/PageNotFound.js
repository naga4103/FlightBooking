import React from "react";
import "./index.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-not-found p-8">
      <Button variant="primary" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </div>
  );
};

export default PageNotFound;
