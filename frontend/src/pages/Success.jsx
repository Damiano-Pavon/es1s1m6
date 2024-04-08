import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth", JSON.stringify(token));
    }
  }, []);

  const navigate = useNavigate();

  const handleContinueClick = () => {
    navigate("/home"); 
  };

  return (
    <div className="text-center pt-5">
      <div>Successfully Login, Continue to Homepage</div>
      <Button variant="success" onClick={handleContinueClick} className="mt-2">
        Continue
      </Button>
    </div>
  );
};

export default Success;