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
  padding: 20px;
  text-align: center;
  color: #333;
  animation: ${fadeIn} 0.3s ease-out;
`;

const Icon = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 10px;
  margin-bottom: 40px;
`;

const Message = styled.p`
  margin: 0 0 20px;
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
`;

const StyledCloseButton = styled.button`
  padding: 10px 20px;
  background-color: #255e94;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px;
`;
