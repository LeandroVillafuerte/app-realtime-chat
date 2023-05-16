import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const ButtonBack = ({url=-1}) => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(url)} className="back">
      <IoArrowBackCircleSharp />
    </Container>
  );
};

const Container = styled.div`
  font-size: 2rem;
  color: var(--white-font);
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 10rem;
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    font-size: 4rem;
  }
`;

export default ButtonBack;
