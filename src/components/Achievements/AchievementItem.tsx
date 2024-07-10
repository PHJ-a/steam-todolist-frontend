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
      ? 'linear-gradient(135deg, #4a90e2, #50a0f0)'
      : props.achieved === 1
      ? 'linear-gradient(135deg, #6e8efb, #a777e3)'
      : 'rgba(0, 0, 0, 0.5)'};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, transform 0.3s ease;
  gap: 10px;
  height: 80px;
  cursor: pointer;
  overflow: hidden; /* Ensure content doesn't overflow */
  position: relative;
  padding: 10px;

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
`;

export default AchievementItem;
