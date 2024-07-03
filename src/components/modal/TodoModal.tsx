import { ModalData } from '../../models/type';
import Modal from './Modal';
import img from '../../assets/eldenring.jpg';
import styled from 'styled-components';
import icon from '../../assets/도전과제 아이콘.jpg';

type TodoModalProps = {
  open: boolean;
  close: () => void;
  data: ModalData | null;
};

const TodoModal = ({ open, close, data }: TodoModalProps) => {
  return (
    <Modal open={open} onClickOutside close={close}>
      <Modal.Header title='도전과제 현황' close={close} />
      <Modal.Content>
        <GameImageWrapper>
          <GameImage src={img} alt={data?.gameName} />
          <AbsoluteText>{data?.gameName}</AbsoluteText>
        </GameImageWrapper>
        <Title>
          <img src={icon} className='icon' alt='Achievement Icon' />
          <div className='title'>{data?.achievementTitle}</div>
        </Title>
        <ChallengeDesc>{data?.achievementDesc}</ChallengeDesc>
        <StartTime>시작 시간: 2024년 7월 1일 14시 51분</StartTime>
        <ElapsedTime>경과 시간: 10시간</ElapsedTime>
        <ProgressContainer>
          <p>달성률 {data?.progress}%</p>
          <ProgressBar>
            <ProgressFill progress={data?.progress || 0} />
          </ProgressBar>
        </ProgressContainer>
        {data?.isCompleted ? (
          <Message className='SuccessMessage'>
            축하합니다 도전과제 성공하셨습니다!
          </Message>
        ) : (
          <Message className='ReminderMessage'>조금더 힘내주세요</Message>
        )}
      </Modal.Content>
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

const AbsoluteText = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
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

const ChallengeDesc = styled.div`
  width: 800px;
  margin-top: 10px;
  font-size: 16px;
  color: #555;
`;

const StartTime = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: #888;
`;

const ElapsedTime = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: #888;
`;

const ProgressContainer = styled.div`
  margin-top: 15px;
  p {
    margin-bottom: 5px;
    font-size: 16px;
    color: #333;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: ${(props) =>
    props.progress >= 75
      ? '#4caf50' /* 75% 이상 초록색 */
      : '#ff9800'}; /* 그 외 주황색 */
  transition: width 0.3s ease-in-out;
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: ${(props) =>
    props.className === 'SuccessMessage' ? '#4caf50' : '#ff5722'};
`;

export default TodoModal;
