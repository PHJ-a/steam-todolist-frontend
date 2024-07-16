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
    if (msg === 'notCompleted') {
      localStorage.setItem('isChecked', 'true');
      window.location.href =
        'https://steamcommunity.com/profiles/76561199730329309/edit/settings';
    } else {
      localStorage.setItem('isChecked', 'true');
      navigate('/create/games');
    }
  };

  return (
    <StyledModal open={open} close={close}>
      <Modal.Header title='주의사항' close={close} />
      <StyledContent>
        <GameImageWrapper>
          <GameImage src={info} alt='info' />
        </GameImageWrapper>
        <Title>
          게임을 만들기 전에 설정을 public으로 해주셔야 합니다, 추가로 설정을
          완료 하셨다면 로그아웃 후 다시 로그인 해주세요
        </Title>
      </StyledContent>
      <StyledFooter>
        <StyledButton primary onClick={() => handleClick('completed')}>
          설정을 했습니다
        </StyledButton>
        <StyledButton onClick={() => handleClick('notCompleted')}>
          설정하러 가기
        </StyledButton>
      </StyledFooter>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  background-color: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const StyledContent = styled(Modal.Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const GameImageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;
  margin-bottom: 30px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
`;

const GameImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 30px;
`;

const StyledFooter = styled(Modal.Footer)`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px 30px 30px;
`;

const StyledButton = styled.button<{ primary?: boolean }>`
  padding: 12px 24px;
  background-color: ${(props) => (props.primary ? '#4a90e2' : '#6c757d')};
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => (props.primary ? '#357ae8' : '#5a6268')};
  }

  &:active {
    transform: translateY(0);
  }
`;

export default InfoModal;
