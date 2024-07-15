import styled from 'styled-components';
import AchievementItem from './AchievementItem';
import { motion } from 'framer-motion';
import { Achievement } from '../../hooks/useAchievements';

type AchievementsListProps = {
  achievements: Achievement[];
  onSelect: (achievement: Achievement) => void;
  isSelected: Achievement | null;
};

function AchievementsList({
  achievements,
  onSelect,
  isSelected,
}: AchievementsListProps) {
  return (
    <AchievementsListStyle
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Row>
        {achievements.map((achievement) => (
          <AchievementItem
            key={achievement.id}
            achievement={achievement}
            onSelect={onSelect}
            isSelected={isSelected}
          />
        ))}
      </Row>
    </AchievementsListStyle>
  );
}

const AchievementsListStyle = styled(motion.div)`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    width: 100%;
  }

  gap: 12px;
  background-color: #272b36;
  padding: 20px;
  overflow-y: auto;
  width: 1200px;
  height: 330px;
`;

export default AchievementsList;
