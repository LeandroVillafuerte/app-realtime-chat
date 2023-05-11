import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const ButtonBack = () => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(-1)} className="back">
      <IoArrowBackCircleSharp />
    </Container>
  );
};

const Container = styled.div`
  font-size: 2rem;
  color: var(--white-font);
  cursor: pointer;
`;

export default ButtonBack;