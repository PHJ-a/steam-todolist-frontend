import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

type ModalProps = {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
  onClickOutside?: boolean;
};

const Modal = ({ open, close, children, onClickOutside }: ModalProps) => {
  return (
    open &&
    createPortal(
      <StyleModal onClick={onClickOutside ? close : undefined}>
        <div className='modal' onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </StyleModal>,
      document.querySelector('#modalRoot')!,
    )
  );
};

type ModalHeader = {
  title: string;
  close: () => void;
  children?: React.ReactNode;
};

const ModalHeader = ({ title, close, children }: ModalHeader) => {
  return (
    <StyleModalHeader>
      <div className='title'>{title}</div>
      {children}
      <div className='close' onClick={close}>
        X
      </div>
    </StyleModalHeader>
  );
};

type ModalContent = {
  children: React.ReactNode;
};
const ModalContent = ({ children }: ModalContent) => {
  return <StyleModalContent>{children}</StyleModalContent>;
};

type ModalFooter = {
  children: React.ReactNode;
};

const ModalFooter = ({ children }: ModalFooter) => {
  return <StyleModalFooter>{children}</StyleModalFooter>;
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

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
const StyleModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal {
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    max-width: calc(100vw - 80px);
    max-height: calc(100vh - 80px);
    min-width: 250px;
    border: 1px solid black;
    border-radius: 6px;
    background-color: white;
    position: absolute;
    animation: ${fadeIn} 0.3s ease-out;
  }
`;

const StyleModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 10px;

  .title {
    flex-grow: 1;
  }
  .close {
    width: 40px;
    height: 40px;
    text-align: center;
    cursor: pointer;
  }
`;
const StyleModalContent = styled.div`
  padding: 20px;
  position: relative;
`;

const StyleModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid #eee;
`;

export default Modal;
