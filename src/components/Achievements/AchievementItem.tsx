import styled from 'styled-components';
import { Achievement } from '../../pages/CreateTodo/CreateTodo';
import { motion } from 'framer-motion';

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
      className={achievement.achieved === 1 ? 'achieved' : ''}
      isSelected={isSelected?.id === achievement.id}
      achieved={achievement.achieved}
      onClick={handleClick}>
      <div className='img'>
        <img src={achievement.img} alt={achievement.displayName} />
      </div>
      <div className='info'>
        <h3>{achievement.displayName}</h3>
        <p>{achievement.description}</p>
        <p>전체 플레이어 달성률: {achievement.completedRate}%</p>
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
  height: 64px;
  cursor: pointer;

  .achieved {
    width: 100px;
  }

  &:hover {
    transform: translateY(-5px);
  }

  .img {
    width: 64px;
    height: 64px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    flex: 1;
    h3 {
      margin: 0;
      font-size: 0.9rem;
      color: #fff;
    }
    p {
      font-size: 0.8rem;
      color: #ccc;
    }
  }
`;

export default AchievementItem;
