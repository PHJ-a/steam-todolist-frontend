import { delay, motion } from 'framer-motion';
import styled from 'styled-components';
import { Game } from '../../pages/CreateTodo';

type GameItemProps = {
  game: Game;
};

const gameVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    transition: {
      delay: 0.2,
    },
  },
};

const GameItem = ({ game }: GameItemProps) => {
  return (
    <GameItemStyle whileHover='hover' initial='normal' variants={gameVariants}>
      <img
        src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`}
        alt={game.name}
      />
    </GameItemStyle>
  );
};
const GameItemStyle = styled(motion.div)`
  cursor: pointer;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export default GameItem;
