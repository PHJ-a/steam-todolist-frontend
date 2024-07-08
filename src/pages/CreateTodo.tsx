import styled from 'styled-components';
import GameList from '../components/CreateTodo/GameList';
import AchievementsList from '../components/CreateTodo/AchievementsList';
import useGames from '../hooks/useGames';
import useAchievements from '../hooks/useAchievements';
import axiosInstance from '../api/axios';
import useTodos from '../hooks/useTodos';
import { useNavigate } from 'react-router-dom';

export interface Game {
  appid: number;
  name: string;
}

export interface Achievement {
  id: number;
  displayName: string;
  description: string;
  achieved: number;
  img: string;
  completedRate: string;
}

const CreateTodo = () => {
  const { games, selectedGame, setSelectedGame } = useGames();
  const { achievements, selectedAchievement, setSelectedAchievement } =
    useAchievements(selectedGame);
  const { todos } = useTodos();
  const navigate = useNavigate();

  const handleCreateTodo = async () => {
    if (selectedAchievement !== null) {
      try {
        const response = await axiosInstance.post('/todo', {
          id: selectedAchievement.id,
        });
        // 성공시 home으로 이동
        navigate('/');
      } catch (error: any) {
        // TODO: 이미 생성된 todo인 경우 에러 처리 추가 예정
        console.error('Error creating todo:', error);
      }
    }
  };

  return (
    <CreateTodoStyle>
      <div>
        <h2>Games</h2>
        <GameList
          onSelectGame={setSelectedGame}
          games={games}
          selectedGame={selectedGame?.appid}
        />
      </div>
      {selectedGame && (
        <div>
          <h2>Achievements</h2>
          <AchievementsList
            achievements={achievements}
            onSelectAchievement={setSelectedAchievement}
            selectedAchievement={selectedAchievement}
          />
        </div>
      )}
      {selectedAchievement && (
        <div className='button-container'>
          {todos.length >= 3 && (
            <div className='warning-message'>
              Todo는 최대 3개까지만 생성할 수 있습니다.
            </div>
          )}
          <CreateButton onClick={handleCreateTodo} disabled={todos.length >= 3}>
            Todo 생성하기 {`${todos.length + 1}/3`}
          </CreateButton>
        </div>
      )}
    </CreateTodoStyle>
  );
};

const CreateTodoStyle = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 20px;

  h2 {
    margin: 0;
    margin-bottom: 20px;
  }
  padding: 10px;

  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
  }

  .warning-message {
    color: red;
    margin-top: 10px;
    font-size: 14px;
  }
`;

const CreateButton = styled.button`
  padding: 15px 30px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 200px;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default CreateTodo;
