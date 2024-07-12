import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Achievement } from '../../hooks/useAchievements';

type AchievementItemProps = {
  achievement: Achievement;
  onSelect: (achievement: Achievement) => void;
  isSelected: Achievement | null;
};

function AchievementItem({
  achievement,
  onSelect,
  isSelected,
}: AchievementItemProps) {
  const handleClick = () => {
    if (achievement.achieved === 0) {
      onSelect(achievement);
    }
  };

  return (
    <AchievementItemStyle
      isSelected={isSelected?.id === achievement.id}
      achieved={achievement.achieved}
      onClick={handleClick}>
      <div className='img'>
        <img src={achievement.img} alt={achievement.displayName} />
      </div>
      <div className='info'>
        <h3>{achievement.displayName}</h3>
        <p className='description'>{achievement.description}</p>
        <p className='completedRate'>
          전체 플레이어 달성률: {achievement.completedRate}%
        </p>
      </div>
      <div className={achievement.achieved === 1 ? 'achieved' : ''}>
        {achievement.achieved === 1 ? (
          <p>2022년 3월 26일 오후 11시 38분에 획득</p>
        ) : null}
      </div>
      {achievement.achieved === 1 && <div className='gradient_border' />}
    </AchievementItemStyle>
  );
}

const AchievementItemStyle = styled(motion.div)<{
  achieved: number;
  isSelected: boolean;
}>`
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.isSelected
      ? 'linear-gradient(135deg, rgba(74, 144, 226, 0.4), rgba(80, 160, 240, 0.4))'
      : props.achieved === 1
      ? 'linear-gradient(135deg, rgba(110, 142, 251, 0.4), rgba(167, 119, 227, 0.4))'
      : 'rgba(0, 0, 0, 0.5)'};

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, transform 0.3s ease;
  gap: 10px;
  height: 80px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  padding: 10px;

  @media (max-width: 768px) {
    height: 100px;
    .achieved {
      display: none;
    }
  }
  h3 {
    margin: 0;
    font-size: 0.9rem;
    color: #fff;
  }
  p {
    font-size: 0.8rem;
    color: #ccc;
  }

  &:hover {
    transform: translateY(-5px);
  }

  .img {
    width: 64px;
    height: 64px;
    background: rgba(0, 0, 0, 0.5);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    overflow: hidden; /* Ensure text doesn't overflow */
  }

  .description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  .completedRate {
    font-size: 0.71rem;
  }

  .achieved {
    p {
      font-size: 0.71rem;
      color: #fff;
    }
  }

  .gradient_border {
    clip-path: polygon(
      0% 100%,
      3px 100%,
      3px 3px,
      calc(100% - 3px) 3px,
      calc(100% - 3px) calc(100% - 3px),
      3px calc(100% - 3px),
      3px 100%,
      100% 100%,
      100% 0%,
      0% 0%
    );
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      left: -50%;
      top: -50%;
      width: 200%;
      height: 200%;
      background: conic-gradient(
        from 0deg,
        #dcdcdc,
        #c0c0c0,
        #a9a9a9,
        #808080,
        #dcdcdc,
        #c0c0c0
      );

      background-size: 200% 100%;
      background-position: 0 50%;
      animation: colorShift 2s linear infinite;
    }
  }

  @keyframes colorShift {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

export default AchievementItem;
