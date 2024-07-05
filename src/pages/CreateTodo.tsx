import styled from 'styled-components';
import GameList from '../components/CreateTodo/GameList';
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import AchievementsList from '../components/CreateTodo/AchievementsList';

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

export interface fetchAchievementsResponse {
  achievements: Achievement[];
  gameId: number;
}

const CreateTodo = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedAchievementId, setSelectedAchievementId] = useState<
    number | null
  >(null);

  // 게임 목록 불러오기
  useEffect(() => {
    const fetchGames = async () => {
      const data = await axiosInstance
        .get('/game')
        .then((res) => {
          setGames(res.data);
        })
        .catch((err) => console.log(err));

      return data;
    };
    fetchGames();
  }, []);

  // 게임 선택 시 해당 게임의 업적을 불러오기
  useEffect(() => {
    const fetchAchievements = async () => {
      const data = await axiosInstance
        .get<fetchAchievementsResponse>(`/achievements/${game?.appid}`)
        .then((res) => {
          setAchievements(res.data.achievements);
        })
        .catch((err) => {
          setAchievements([]);
          console.log(err);
        });

      return data;
    };
    // 게임이 선택되었을 때만 업적을 불러옴
    if (game) {
      fetchAchievements();
      setSelectedAchievementId(null);
    }
  }, [game]);

  // 업적 선택
  const handleAchievementSelect = (id: number | null) => {
    setSelectedAchievementId(id);
  };

  // Todo 생성
  const handleCreateTodo = async () => {
    if (selectedAchievementId !== null) {
      try {
        const response = await axiosInstance.post('/createTodo', {
          id: selectedAchievementId,
        });
        console.log('Response:', response.data);
        // TODO: 성공 메시지 또는 처리 로직 추가
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
          onSelectGame={setGame}
          games={games}
          selectedGame={game?.appid}
        />
      </div>
      {achievements.length > 0 && (
        <div>
          <h2>Achievements</h2>
          <AchievementsList
            achievements={achievements}
            onSelectAchievement={handleAchievementSelect}
            selectedAchievementId={selectedAchievementId}
          />
        </div>
      )}
      {selectedAchievementId !== null && (
        <CreateButton onClick={handleCreateTodo}>생성하기</CreateButton>
      )}
    </CreateTodoStyle>
  );
};

const CreateTodoStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  h2 {
    margin: 0;
    margin-bottom: 20px;
  }
  padding: 10px;
`;

const CreateButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default CreateTodo;
