import styled from 'styled-components';
import GameList from '../components/CreateTodo/GameList';
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';

export interface Game {
  appid: number;
  name: string;
}
export interface Pagination {
  page_list_count: number;
  page: number;
  total_count: number;
}

export interface GameListProps {
  games: Game[];
}

const CreateTodo = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const data = await axiosInstance
        .get('/games')
        .then((res) => {
          setGames(res.data);
        })
        .catch((err) => console.log(err));

      return data;
    };
    fetchGames();
  }, []);

  return (
    <CreateTodoStyle>
      <div>
        <h2>Games</h2>
        <GameList games={games} />
      </div>
    </CreateTodoStyle>
  );
};

const CreateTodoStyle = styled.div`
  h2 {
    margin: 0;
    margin-bottom: 20px;
  }
  padding: 10px;
`;

export default CreateTodo;
