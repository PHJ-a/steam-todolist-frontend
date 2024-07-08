import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AchievementItem from './AchievementItem';
import { Achievement } from '../../pages/CreateTodo';

type AchievementsListProps = {
  achievements: Achievement[];
  onSelectAchievement: (achievement: Achievement | null) => void;
  selectedAchievement: Achievement | null;
};

const AchievementsList = ({
  achievements,
  onSelectAchievement,
  selectedAchievement,
}: AchievementsListProps) => {
  const [activeTab, setActiveTab] = useState<'completed' | 'incomplete'>(
    'completed',
  );
  const [leaving, setLeaving] = useState(false);

  const completedAchievements = achievements.filter(
    (achievement) => achievement.achieved === 1,
  );
  const incompleteAchievements = achievements.filter(
    (achievement) => achievement.achieved === 0,
  );

  const handleClickTab = (tab: 'completed' | 'incomplete') => {
    if (leaving) return;

    if (tab === activeTab) return;
    setLeaving(true);
    setActiveTab(tab);
    onSelectAchievement(null);
  };

  const handleExitComplete = () => {
    setLeaving((prev) => !prev);
  };

  if (achievements.length === 0) {
    return <p>도전과제가 없습니다.</p>;
  }

  return (
    <Container>
      <TabContainer>
        <Tab
          isActive={activeTab === 'completed'}
          onClick={() => {
            handleClickTab('completed');
          }}>
          완료된 도전과제
        </Tab>
        <Tab
          isActive={activeTab === 'incomplete'}
          onClick={() => handleClickTab('incomplete')}>
          미완료된 도전과제
        </Tab>
      </TabContainer>

      <AnimatePresence mode='wait' onExitComplete={handleExitComplete}>
        {activeTab === 'completed' ? (
          <TabContent
            key='completed'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {completedAchievements.map((achievement) => (
              <AchievementItem
                key={achievement.id}
                achievement={achievement}
                onSelect={onSelectAchievement}
                isSelected={
                  selectedAchievement
                    ? achievement.id === selectedAchievement.id
                    : false
                }
              />
            ))}
          </TabContent>
        ) : (
          <TabContent
            key='incomplete'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {incompleteAchievements.map((achievement) => (
              <AchievementItem
                key={achievement.id}
                achievement={achievement}
                onSelect={onSelectAchievement}
                isSelected={
                  selectedAchievement
                    ? achievement.id === selectedAchievement.id
                    : false
                }
              />
            ))}
          </TabContent>
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 10px 20px;
  border: none;
  background-color: ${({ isActive }) => (isActive ? '#007bff' : '#ddd')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin: 0 10px;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#0056b3' : '#ccc')};
  }
`;

const TabContent = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
`;

export default AchievementsList;
