import styled from 'styled-components';
import { Todo } from '../../models/type';
import { calculateElapsedTime, formatToKoreanTime } from '../../utils/days';

type ListItemProps = {
  todo: Todo;
  isLoggedIn: boolean;
  handleRemove: (id: number) => void;
};

const ListItem = ({ todo, isLoggedIn, handleRemove }: ListItemProps) => {
  return (
    <AchievementItem isLoggedIn={isLoggedIn}>
      <div className='header'>
        <GameName>{todo.gameName}</GameName>
        <div className='exit' onClick={() => handleRemove(todo.todoId)}>
          X
        </div>
      </div>

      <AchievementTitle>{todo.achieveName}</AchievementTitle>
      <TimeInfo>
        시작시간: {formatToKoreanTime(todo.start)}
        <br />
        경과시간: {calculateElapsedTime(todo.start, todo.end)}
      </TimeInfo>
      <Status isCompleted={todo.end}>{todo.end ? '완료됨' : '미완료'}</Status>
    </AchievementItem>
  );
};

type AchievementItemProps = {
  isLoggedIn: boolean;
};

const AchievementItem = styled.div<AchievementItemProps>`
  padding: 10px;
  border: 1px solid #66c0f4;
  border-radius: 5px;
  background-color: #2a475e;
  color: #c7d5e0;
  ${(props) =>
    !props.isLoggedIn &&
    `
    filter: blur(2px);
    pointer-events: none;
  `}

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .exit {
      cursor: pointer;
    }
  }
`;

const GameName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #66c0f4;
`;

const AchievementTitle = styled.div`
  font-size: 16px;
  margin-top: 5px;
`;

const TimeInfo = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;

const Status = styled.div<{ isCompleted: string | null }>`
  margin-top: 10px;
  font-size: 14px;
  color: ${(props) => (props.isCompleted ? '#a1cd44' : '#ff8c00')};
  font-weight: bold;
`;

export default ListItem;
