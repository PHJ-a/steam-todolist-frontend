import styled from 'styled-components';
import icon from '../../assets/SnackBarIcon.png';
import useSnackBar from '../../hooks/useSnackBar';
import { Todo } from '../../models/type';

type ListItemProps = {
  todo: Todo;
  isLoggedIn: boolean;
};

const ListItem = ({ todo, isLoggedIn }: ListItemProps) => {
  const { snackbar, open } = useSnackBar(
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <img src={icon} width={50} height={50} />
      <p>삭제가 완료되었습니다</p>
    </div>,
  );

  const handleRemove = () => {
    open();
  };

  return (
    <AchievementItem isLoggedIn={isLoggedIn}>
      <div className='header'>
        <GameName>{todo.gameName}</GameName>
        <div className='exit' onClick={handleRemove}>
          X
        </div>
      </div>

      <AchievementTitle>{todo.achievementTitle}</AchievementTitle>
      <TimeInfo>
        시작시간: {todo.startDate.toLocaleString()}
        <br />
        경과시간:{' '}
        {todo.endDate
          ? todo.endDate.toLocaleString()
          : new Date(Date.now()).toLocaleString()}
      </TimeInfo>
      <Status isCompleted={todo.endDate}>
        {todo.endDate ? '완료됨' : '미완료'}
      </Status>
      {snackbar}
    </AchievementItem>
  );
};

type AchievementItemProps = {
  isLoggedIn: boolean;
};
const AchievementItem = styled.div<AchievementItemProps>`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  ${(props) =>
    !props.isLoggedIn &&
    `
    filter: blur(2px);
    pointer-events: none; /* 클릭 이벤트 무시 */
  `}

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const GameName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const AchievementTitle = styled.div`
  font-size: 16px;
  margin-top: 5px;
`;

const TimeInfo = styled.div`
  font-size: 14px;
  margin-top: 5px;
  color: #555;
`;

const Status = styled.div<{ isCompleted: Date | null }>`
  margin-top: 10px;
  font-size: 14px;
  color: ${(props) => (props.isCompleted ? 'green' : 'red')};
  font-weight: bold;
`;

export default ListItem;
