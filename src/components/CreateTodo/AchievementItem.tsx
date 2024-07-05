import styled from 'styled-components';
import { Achievement } from '../../pages/CreateTodo';

type AchievementItemProps = {
  achievement: Achievement;
  onSelect: (id: number) => void;
  isSelected: boolean;
};

const AchievementItem = ({
  achievement,
  onSelect,
  isSelected,
}: AchievementItemProps) => {
  const handleClick = () => {
    onSelect(achievement.id);
  };

  return (
    <AchievementItemStyle onClick={handleClick} isSelected={isSelected}>
      <img src={achievement.img} alt={achievement.displayName} />
      <div>
        <h3>{achievement.displayName}</h3>
        <p>{achievement.description}</p>
        <p>달성률: {achievement.completedRate}%</p>
      </div>
    </AchievementItemStyle>
  );
};

const AchievementItemStyle = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  width: 400px;
  padding: 10px;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#007bff' : '#ddd')};
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#e0f3ff' : '#fff')};

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 5px;
  }

  h3 {
    font-size: 16px;
    margin-bottom: 5px;
  }

  p {
    font-size: 12px;
    color: #555;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export default AchievementItem;
