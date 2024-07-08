import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Game } from '../../pages/CreateTodo';

type GameItemProps = {
  game: Game;
  setGame: React.Dispatch<React.SetStateAction<Game | null>>;
  isSelected: boolean;
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
  selected: {
    scale: 1.1,
    borderColor: '#007bff',
    transition: {
      duration: 0.3,
    },
  },
};

const GameItem = ({ game, setGame, isSelected }: GameItemProps) => {
  return (
    <GameItemStyle
      onClick={() => {
        if (setGame) {
          setGame(game);
        }
      }}
      whileHover='hover'
      initial='normal'
      animate={isSelected ? 'selected' : 'normal'}
      variants={gameVariants}>
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
  border: 2px solid transparent;
  border-radius: 5px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export default GameItem;
