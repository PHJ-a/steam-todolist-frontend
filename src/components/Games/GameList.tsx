import styled from 'styled-components';

import GameItem from './GameItem';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Game } from '../../hooks/useGames';

export type GameListProps = {
  games: Game[];
};

const GameList = ({ games }: GameListProps) => {
  const [index, setIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [offset, setOffset] = useState<number>(9);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOffset(999);
      } else if (window.innerWidth <= 1200) {
        setOffset(6);
      } else {
        setOffset(9);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter((game) =>
      game.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [games, search]);

  const pageCount = Math.ceil(filteredGames.length / offset);

  useEffect(() => {
    setIndex(0);
  }, [search]);

  const handleDotClick = (i: number) => {
    setIndex(i);
  };

  return (
    <GameListStyle>
      <SearchBar>
        <input
          type='text'
          placeholder='게임 검색...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchBar>
      <Dots>
        {Array.from({ length: pageCount }, (_, i) => (
          <Dot
            key={i}
            $isActive={i === index}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </Dots>
      <Slider>
        <Column key={index}>
          {filteredGames
            .slice(index * offset, index * offset + offset)
            .map((game) => (
              <GameItem key={game.appid} game={game} />
            ))}
        </Column>
      </Slider>
    </GameListStyle>
  );
};

const GameListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const SearchBar = styled.div`
  margin-bottom: 20px;
  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 300px;
    font-size: 1em;
  }
`;

const Slider = styled(motion.div)`
  position: relative;
`;

const Column = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  background-color: rgba(0, 0, 0, 0.2);

  @media (max-width: 1300px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Dot = styled.div<{ $isActive: boolean }>`
  width: 70px;
  height: 5px;
  background-color: ${(props) => (props.$isActive ? '#007bff' : '#ccc')};
  margin: 0 5px;
  border-radius: 2px;
  cursor: pointer;
`;

export default GameList;
