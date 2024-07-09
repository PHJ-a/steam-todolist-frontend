import Modal from './Modal';
import styled, { keyframes } from 'styled-components';

type ErrorModalProps = {
  open: boolean;
  close: () => void;
  title: string;
  message: string;
  icon: string;
};

const ErrorModal = ({ open, close, title, message, icon }: ErrorModalProps) => {
  return (
    <Modal open={open} onClickOutside close={close}>
      <Modal.Content>
        <StyledModalContent>
          <Icon src={icon} alt='icon' />
          <Title>{title}</Title>
          <Message>{message}</Message>
        </StyledModalContent>
      </Modal.Content>
      <Modal.Footer>
        <StyledCloseButton onClick={close}>닫기</StyledCloseButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  color: #333;
  animation: ${fadeIn} 0.3s ease-out;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 10px;
  margin-bottom: 20px;
`;

const Message = styled.p`
  margin: 0 0 20px;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
`;

const StyledCloseButton = styled.button`
  padding: 12px 24px;
  background-color: #155d91;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 20px;
`;
