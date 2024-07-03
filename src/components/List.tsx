import styled from 'styled-components';
import { Todo } from '../models/type';

type AchievementListProps = {
  todos: Todo[];
};

const AchievementList = ({ todos }: AchievementListProps) => {
  return (
    <ListContainer>
      <div className='title'>
        <h2>도전과제 수</h2>
        <h2>{todos.length} / 3</h2>
      </div>

      {todos.map((todo, index) => (
        <AchievementItem key={index}>
          <GameName>{todo.gameName}</GameName>
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
        </AchievementItem>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const AchievementItem = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
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

export default AchievementList;
