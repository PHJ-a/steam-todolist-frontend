import styled, { keyframes } from 'styled-components';

const cubeAnimation = keyframes`
  0% {
    transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
  }
  50% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
  }
  100% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
  }
`;

const Cube = styled.div`
  animation: ${cubeAnimation} 2s infinite ease;
  height: 40px;
  transform-style: preserve-3d;
  width: 40px;
  position: relative;

  div {
    background-color: rgba(255, 255, 255, 0.25);
    height: 100%;
    position: absolute;
    width: 100%;
    border: 2px solid white;
  }

  div:nth-of-type(1) {
    transform: translateZ(-20px) rotateY(180deg);
  }
  div:nth-of-type(2) {
    transform: rotateY(-270deg) translateX(50%);
    transform-origin: top right;
  }
  div:nth-of-type(3) {
    transform: rotateY(270deg) translateX(-50%);
    transform-origin: center left;
  }
  div:nth-of-type(4) {
    transform: rotateX(90deg) translateY(-50%);
    transform-origin: top center;
  }
  div:nth-of-type(5) {
    transform: rotateX(-90deg) translateY(50%);
    transform-origin: bottom center;
  }
  div:nth-of-type(6) {
    transform: translateZ(20px);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Loading = () => {
  return (
    <LoaderContainer>
      <Cube>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </Cube>
    </LoaderContainer>
  );
};

export default Loading;
