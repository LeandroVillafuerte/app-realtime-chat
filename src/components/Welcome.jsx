import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo(1).svg'

const Welcome = ({currentUser}) => {
  return (
    <Container>
        <img src={logo} alt="logo" />
        <h1>
            Welcome, <span>{currentUser?.username}!</span>
        </h1>
        <h3>Please select a chat.</h3>
    </Container>
  )
}

const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
color:white;
img{
    height:20rem;
}
span{
    color:#4e0eff
}
`;

export default Welcome