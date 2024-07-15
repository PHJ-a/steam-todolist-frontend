import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { SnackBarStatus } from '../../hooks/useSnackBar';

const enterAnimation = keyframes`
  0% {
    transform: translate(50px, 0); 
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
`;

const exitAnimation = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(50px, 0);
    opacity: 0;
  }
`;

const getAnimation = (animationClassName: string) => {
  if (animationClassName === 'enter') {
    return css`
      animation: ${enterAnimation} 500ms ease-out forwards;
    `;
  } else if (animationClassName === 'exit') {
    return css`
      animation: ${exitAnimation} 500ms ease-out forwards;
    `;
  } else {
    return '';
  }
};

const StyledSnackbarItem = styled.div<{ $animationClassName: string }>`
  display: flex;
  justify-content: center;
  opacity: 0;
  margin-top: 5px;
  width: 100%;
  min-width: 300px;
  max-width: 680px;
  padding: 15px 14px 12px;
  line-height: 1.47;
  font-size: 1.1rem;
  color: #fff;
  background-color: #1a73e8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  ${({ $animationClassName }) => getAnimation($animationClassName)}

  p {
    margin: 0;
    line-height: 1.47;
    font-size: 1.1rem;
    text-align: center;
  }

  b {
    font-weight: 700;
    color: #03c75a;
  }
`;

type SnackBarProps = {
  status: SnackBarStatus;
  setStatus: React.Dispatch<React.SetStateAction<SnackBarStatus>>;
  children: React.ReactNode;
};

const SnackbarItem = ({ status, setStatus, children }: SnackBarProps) => {
  const elemRef = useRef<HTMLDivElement>(null);
  const [animationClassName, setAnimationClassName] = useState<string>('enter');

  const handleAnimationEnd = () => {
    if (animationClassName === 'exit') {
      setStatus(null);
    }
  };

  useEffect(() => {
    setAnimationClassName(status === 'open' ? 'enter' : 'exit');
  }, [status]);

  return (
    <StyledSnackbarItem
      ref={elemRef}
      $animationClassName={animationClassName}
      onAnimationEnd={handleAnimationEnd}>
      {children}
    </StyledSnackbarItem>
  );
};

export default SnackbarItem;
