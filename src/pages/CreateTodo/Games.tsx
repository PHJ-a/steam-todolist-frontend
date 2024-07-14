import styled from 'styled-components';
import GameList from '../../components/Games/GameList';
import useGames from '../../hooks/useGames';
import { motion } from 'framer-motion';
import Loading from '../../components/common/Loading';

function Games() {
  const { games, isLoading, error } = useGames();

  if (error) {
    return (
      <GamesStyle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}>
        <h2>게임 목록을 불러오는 중 문제가 발생했습니다.</h2>
      </GamesStyle>
    );
  }

  if (games.length === 0 && !isLoading) {
    // 가지고 있는 게임이 없을 때
    return (
      <GamesStyle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}>
        <h2>보유하신 게임이 없습니다.</h2>
      </GamesStyle>
    );
  }

  return (
    <GamesStyle
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}>
      <h2>게임을 선택해 주세요.</h2>
      {isLoading ? (
        <div className='loading'>
          <Loading />
        </div>
      ) : (
        <GameList games={games} />
      )}
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
