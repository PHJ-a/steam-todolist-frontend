import Modal from './Modal';
import styled from 'styled-components';
import info from '../../assets/info.png';
import { useNavigate } from 'react-router-dom';
type InfoModalProps = {
  open: boolean;
  close: () => void;
};

const InfoModal = ({ open, close }: InfoModalProps) => {
  const navigate = useNavigate();
  const handleClick = (msg: string) => {
    if (msg === 'notComplted') {
      localStorage.setItem('isChecked', 'true');
      window.location.href =
        'https://steamcommunity.com/profiles/76561199730329309/edit/settings';
    } else {
      localStorage.setItem('isChecked', 'true');
      navigate('/create/games');
    }
  };
  return (
    <Modal open={open} close={close}>
      <Modal.Header title='주의사항' close={close} />
      <Modal.Content>
        <GameImageWrapper>
          <GameImage src={info} alt='info' />
        </GameImageWrapper>
        <Title>
          <div className='title'>
            게임을 만들기전에 설정을 public으로 해주셔야 합니다
          </div>
        </Title>
      </Modal.Content>
      <Modal.Footer>
        <StyledButton onClick={() => handleClick('completed')}>
          설정을 했습니다
        </StyledButton>
        <StyledButton onClick={() => handleClick('notComplted')}>
          설정하러 가기
        </StyledButton>
      </Modal.Footer>
    </Modal>
  );
};

const GameImageWrapper = styled.div`
  width: 800px;
  position: relative;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GameImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;

  .icon {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    object-fit: cover;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;

const StyledButton = styled.button`
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
export default InfoModal;
