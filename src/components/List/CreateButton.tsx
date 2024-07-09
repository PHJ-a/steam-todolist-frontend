import React from 'react';
import styled from 'styled-components';

type CreateButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};
const CreateButton = ({ children, onClick }: CreateButtonProps) => {
  return (
    <StyleCreateButton>
      <Button onClick={onClick}>{children}</Button>
    </StyleCreateButton>
  );
};

const StyleCreateButton = styled.div`
  text-align: center;
  font-size: 14px;
  color: #a3a3a3;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #2a475e;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 14px;
`;

export default CreateButton;
