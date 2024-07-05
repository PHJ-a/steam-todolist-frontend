import { useState } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import TodoModal from '../components/modal/TodoModal';
import { ModalData } from '../models/type';
import AchievementList from '../components/List/List';
import { useAuth } from '../context/AuthContext';
import Empty from '../components/Empty';
import useTodos from '../hooks/useTodos';

moment.locale('ko-KR');

const localizer = momentLocalizer(moment);

type CustomEvent = Event & {
  id: number;
};

const MyCalendar = () => {
  const { isLoggedIn } = useAuth();
  const { open, openModal, closeModal } = useModal();
  const { todos, getModalData } = useTodos();

  const [eventData, setEventData] = useState<ModalData | null>(null);

  const colors = ['#FF6347', '#4682B4', '#6A5ACD', '#FFD700', '#6A5ACD'];

  const colorsTodo: CustomEvent[] = todos.map((todo, index) => ({
    id: todo.id,
    title: todo.achievementTitle,
    start: todo.start,
    end: todo.end || new Date(),
    resource: { color: colors[index % colors.length] },
  }));

  const eventStyleGetter = (event: CustomEvent) => {
    const backgroundColor = event.resource.color;
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      margin: '3px',
    };
    return { style };
  };

  const handleSelectEvent = async (event: CustomEvent) => {
    const data2: ModalData = {
      id: 1,
      gameName: `엘든링`,
      gameId: 123,
      achieveName: '엘든링 도전과제',
      achieveDescription: '엘든링 도전과제 설명',
      start: event.start!,
      end: event.end!,
      completedRate: 85,
      achieveId: 1,
      achieveIcon: '',
    };
    // const data = await getModalData(event.id);
    setEventData(data2); //data || data2
    openModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <CalendarContainer>
      {isLoggedIn ? (
        <Calendar
          className='my-calendar'
          localizer={localizer}
          events={colorsTodo}
          startAccessor='start'
          endAccessor='end'
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          messages={{
            previous: '이전',
            next: '다음',
            today: '오늘',
            month: '월',
            week: '주',
            day: '일',

            agenda: '일정',
          }}
        />
      ) : (
        <Empty
          onLoginClick={() =>
            (window.location.href = `http://localhost:9999/login?returnTo=${encodeURIComponent(
              'http://localhost:5173',
            )}`)
          }
        />
      )}
      <AchievementListContainer>
        <AchievementList todos={todos} />
      </AchievementListContainer>
      <TodoModal open={open} close={handleClose} data={eventData} />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;

  .my-calendar {
    flex: 3;
  }
`;

const AchievementListContainer = styled.div`
  flex: 1;
  height: 100vh;
  padding: 20px;
`;

export default MyCalendar;
