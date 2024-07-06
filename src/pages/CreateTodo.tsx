import styled from 'styled-components';
import GameList from '../components/CreateTodo/GameList';
import AchievementsList from '../components/CreateTodo/AchievementsList';
import useGames from '../hooks/useGames';
import useAchievements from '../hooks/useAchievements';
import axiosInstance from '../api/axios';

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
  // 배경화면
  const { games, selectedGame, setSelectedGame } = useGames();
  const { achievements, selectedAchievement, setSelectedAchievement } =
    useAchievements(selectedGame);

  const handleCreateTodo = async () => {
    if (selectedAchievement !== null) {
      try {
        const response = await axiosInstance.post('/createTodo', {
          id: selectedAchievement,
        });
        console.log('Response:', response.data);
      } catch (error) {
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
        <div className='button'>
          <CreateButton onClick={handleCreateTodo}>생성하기</CreateButton>
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

  .button {
    display: flex;
    justify-content: center;
    margin-top: 20px;
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

  &:hover {
    background-color: #0056b3;
  }
`;

export default CreateTodo;
