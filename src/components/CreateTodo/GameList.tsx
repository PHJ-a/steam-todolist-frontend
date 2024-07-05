import styled from 'styled-components';
import { Game } from '../../pages/CreateTodo';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect, Dispatch } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import GameItem from './GameItem';

export interface GameListProps {
  games: Game[];
  onSelectGame: React.Dispatch<React.SetStateAction<Game | null>>;
  selectedGame: number | undefined;
}

const offset = 5;

const GameList = ({ games, onSelectGame, selectedGame }: GameListProps) => {
  const [index, setIndex] = useState<number>(0);
  const [leaving, setLeaving] = useState(false);
  const [onMouseOver, setOnMouseOver] = useState(false);
  const [direction, setDirection] = useState(1);
  const [search, setSearch] = useState('');

  // 검색 필터링
  const filteredGames = useMemo(() => {
    return games.filter((game) =>
      game.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [games, search]);

  const totalGames = filteredGames.length;
  const maxIndex = Math.ceil(totalGames / offset) - 1;

  // 슬라이드 이동
  const handleIndexChange = (newDirection: number) => {
    if (leaving) return;

    const totalGames = filteredGames.length;
    const maxIndex = Math.ceil(totalGames / offset) - 1;

    setLeaving(true);
    setDirection(newDirection);

    if (newDirection > 0) {
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    } else {
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  // 슬라이드 애니메이션
  const rowVariants = {
    // direction이 1이면 오른쪽으로 이동, -1이면 왼쪽으로 이동
    hidden: (direction: number) => ({
      x: direction > 0 ? window.innerWidth : -window.innerWidth,
    }),
    visible: { x: 0 },
    exit: (direction: number) => ({
      x: direction > 0 ? -window.innerWidth : window.innerWidth,
    }),
  };

  // 검색어 변경
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 애니메이션 종료
  const handleExitComplete = () => {
    setLeaving(false);
  };

  useEffect(() => {
    document.body.style.overflow = leaving ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [leaving]);

  useEffect(() => {
    setLeaving(false);
    setIndex(0);
  }, [search]);

  return (
    <>
      <SearchContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <input
          placeholder='Search games...'
          value={search}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      <GameListContainer>
        <AnimatePresence>
          {filteredGames.length > 0 ? (
            <Slider
              initial='hidden'
              animate='visible'
              exit='exit'
              onMouseEnter={() => setOnMouseOver(true)}
              onMouseLeave={() => setOnMouseOver(false)}>
              {onMouseOver && index !== 0 && (
                <div
                  className='icon left-icon'
                  onClick={() => handleIndexChange(-1)}>
                  <FaChevronLeft />
                </div>
              )}
              <AnimatePresence
                initial={false}
                custom={direction}
                onExitComplete={handleExitComplete}>
                <Row
                  custom={direction}
                  variants={rowVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  transition={{ type: 'tween', duration: 0.7 }}
                  key={index}>
                  {filteredGames
                    .slice(index * offset, index * offset + offset)
                    .map((game) => (
                      <GameItem
                        isSelected={game.appid === selectedGame}
                        key={game.appid}
                        game={game}
                        setGame={onSelectGame}
                      />
                    ))}
                </Row>
              </AnimatePresence>
              {onMouseOver && index !== maxIndex && (
                <div
                  className='icon right-icon'
                  onClick={() => handleIndexChange(1)}>
                  <FaChevronRight />
                </div>
              )}
            </Slider>
          ) : (
            <div>게임이 존재하지 않습니다.</div>
          )}
        </AnimatePresence>
      </GameListContainer>
    </>
  );
};

const SearchContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  input {
    padding: 10px;
    width: 300px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
  }
`;

const GameListContainer = styled.div`
  display: flex;
  position: relative;
  gap: 10px;
  height: 200px;
  width: 100%;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
    width: 40px;
    border-radius: 5px 0 0 5px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
      svg {
        font-size: 40px;
      }
    }
    svg {
      color: white;
      font-size: 30px;
    }
  }

  .left-icon {
    left: 0;
  }

  .right-icon {
    right: 0;
  }
`;

const Slider = styled(motion.div)`
  position: relative;
  width: 100%;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(${offset}, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
`;

export default GameList;
