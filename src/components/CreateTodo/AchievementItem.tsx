import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Achievement } from '../../pages/CreateTodo';
import { FaCheckCircle } from 'react-icons/fa';

type AchievementItemProps = {
  achievement: Achievement;
  onSelect: (achievement: Achievement) => void;
  isSelected: boolean;
};

const achievementVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      delay: 0.2,
    },
  },
  selected: {
    scale: 1.05,
    transition: {
      duration: 0.3,
    },
  },
};

const AchievementItem = ({
  achievement,
  onSelect,
  isSelected,
}: AchievementItemProps) => {
  const handleClick = () => {
    if (achievement.achieved === 0) {
      onSelect(achievement);
    }
  };

  return (
    <AchievementItemStyle
      onClick={handleClick}
      whileHover='hover'
      initial='normal'
      animate={isSelected ? 'selected' : 'normal'}
      variants={achievementVariants}
      isSelected={isSelected}
      achieved={achievement.achieved}>
      {achievement.achieved === 1 && (
        <div className='icon'>
          <FaCheckCircle />
        </div>
      )}
      <div className='img'>
        <img src={achievement.img} alt={achievement.displayName} />
      </div>
      <div>
        <h3>{achievement.displayName}</h3>
        <p>{achievement.description}</p>
        <p>전체 플레이어 달성률: {achievement.completedRate}%</p>
      </div>
    </AchievementItemStyle>
  );
};

const AchievementItemStyle = styled(motion.div)<{
  isSelected: boolean;
  achieved: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  background: ${({ isSelected, achieved }) =>
    isSelected
      ? '#0056b3'
      : achieved === 1
      ? 'linear-gradient(135deg, #6e8efb, #a777e3)'
      : '#ddd'};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')};
  cursor: ${({ achieved }) => (achieved === 1 ? 'default' : 'pointer')};
  pointer-events: ${({ achieved }) => (achieved === 1 ? 'none' : 'auto')};
  box-shadow: ${({ achieved }) =>
    achieved === 1 ? '0 4px 15px rgba(0, 0, 0, 0.2)' : 'none'};
  position: relative;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

  .img {
    width: 64px;
    margin-bottom: 10px;
  }
  img {
    width: 100%;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: ${({ isSelected }) => (isSelected ? '#fff' : '#333')};
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #4caf50;
    font-size: 24px;
  }
`;

export default AchievementItem;
