import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { Todo } from '../../models/type';
import ListItem from './ListItem';

type AchievementListProps = {
  todos: Todo[];
};

const AchievementList = ({ todos }: AchievementListProps) => {
  const { isLoggedIn } = useAuth();

  return (
    <ListContainer>
      <div className='title'>
        <h2>도전과제 수</h2>
        <h2>{isLoggedIn ? todos.length : 0} / 3</h2>
      </div>

      {todos.map((todo, index) => (
        <ListItem key={index} todo={todo} isLoggedIn={isLoggedIn} />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #66c0f4;
  }
`;

export default AchievementList;
