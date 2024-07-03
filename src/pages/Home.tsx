import { useState } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import useModal from '../hooks/useModal';
import TodoModal from '../components/modal/TodoModal';
import { ModalData, Todo } from '../models/type';

moment.locale('ko-KR');

const localizer = momentLocalizer(moment);

type CustomEvent = Event & {
  id: number;
  achievementId: number;
  gameId: number;
};

const MyCalendar = () => {
  const { open, openModal, closeModal } = useModal();
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      achievementTitle: '엘든링 도전과제 1',
      achievementId: 101,
      gameId: 201,
      gameName: '엘든링',
      startDate: new Date('2024-06-22T00:00:00'),
      endDate: new Date('2024-07-01T00:00:00'),
    },
    {
      id: 2,
      achievementTitle: '나의 도전과제 2',
      achievementId: 102,
      gameId: 202,
      gameName: '엘든링',
      startDate: new Date('2024-06-28T00:00:00'),
      endDate: null,
    },
  ]);

  const [eventData, setEventData] = useState<ModalData | null>(null);

  const colors = ['#FF6347', '#4682B4', '#6A5ACD', '#FFD700', '#6A5ACD'];

  const colorsTodo: CustomEvent[] = todos.map((todo, index) => ({
    id: todo.id,
    title: todo.achievementTitle,
    achievementId: todo.achievementId,
    gameId: todo.gameId,
    start: todo.startDate,
    end: todo.endDate || new Date(),
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

  const handleSelectEvent = (event: CustomEvent) => {
    const data: ModalData = {
      gameName: `엘든링`,
      gameImage: '../images/eldenring.jpg',
      achievementTitle: '엘든링 도전과제',
      achievementDesc: '엘든링 도전과제 설명',
      startDate: event.start!,
      endDate: event.end!,
      isCompleted: true,
      progress: 85,
      icon: '',
    };
    setEventData(data);
    openModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <CalendarContainer>
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
    flex: 1;
  }
`;

export default MyCalendar;
