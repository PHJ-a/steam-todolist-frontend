import styled from 'styled-components';
import GameList from '../../components/Games/GameList';
import useGames from '../../hooks/useGames';
import { motion } from 'framer-motion';

function Games() {
  const { games, selectedGame, setSelectedGame } = useGames();
  return (
    <GamesStyle
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}>
      <h2>게임을 선택해 주세요.</h2>
      <GameList
        onSelectGame={setSelectedGame}
        games={games}
        selectedGame={selectedGame?.appid}
      />
    </GamesStyle>
  );
}

const GamesStyle = styled(motion.div)`
  display: flex;
  flex-direction: column;
  h2 {
    margin: 0 auto;
    margin-bottom: 20px;
    color: #fff;
  }
`;

export default Games;
