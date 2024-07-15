import { motion } from 'framer-motion';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { Game } from '../../hooks/useGames';
import { formatLastPlayed, formatPlayTime } from '../../utils/format';

type GameItemProps = {
  game: Game;
};

const gameVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.03,
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

const GameItem = ({ game }: GameItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/create/achievements`, { state: game });
  };

  return (
    <GameItemStyle
      onClick={handleClick}
      whileHover='hover'
      initial='normal'
      variants={gameVariants}>
      <div className='img'>
        <img
          src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`}
          alt={game.name}
        />
      </div>
      <h3 className='title'>{game.name}</h3>
      <div className='playtime'>
        <span className='total-playtime'>
          <span className='label'>총 플레이 시간</span>
          {formatPlayTime(game.playTime)}
        </span>

        <span className='last-playtime'>
          <span className='label'>최근 플레이</span>
          {game.lastPlayedTime
            ? formatLastPlayed(game.lastPlayedTime)
            : '플레이 기록 없음'}
        </span>
      </div>
    </GameItemStyle>
  );
};

const GameItemStyle = styled(motion.div)`
  display: grid;
  position: relative;
  cursor: pointer;
  background-color: #1b2838;
  border-radius: 5px;
  color: #c7d5e0;
  padding: 10px;
  grid-template-areas:
    'img title title'
    'img playtime playtime'
    'img achievements achievements';
  grid-template-columns: 210px min-content auto;
  max-height: 170px;

  @media (max-width: 440px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'img'
      'title'
      'playtime';
  }
  .img {
    width: 200px;
    grid-area: img;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .title {
    grid-area: title;
    margin: 0;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
  }

  .playtime {
    grid-area: playtime;
    display: grid;
    grid-template-areas:
      'total-playtime last-playtime'
      'achievements achievements';
    row-gap: 10px;
    span {
      font-size: 0.8em;
    }

    .label {
      font-weight: bold;
      font-size: 0.9em;
      grid-area: label;
    }

    .total-playtime {
      grid-area: total-playtime;
      display: inline-flex;
      flex-direction: column;
      row-gap: 5px;
    }

    .last-playtime {
      grid-area: last-playtime;
      display: inline-flex;
      flex-direction: column;
      row-gap: 5px;
    }

    .achievements {
      grid-area: achievements;
      display: grid;
      grid-template-areas:
        'label fraction'
        'bar bar';
      row-gap: 5px;
      align-items: center;

      .fraction {
        grid-area: fraction;
        text-align: end;
      }
    }
  }
`;

export default GameItem;
