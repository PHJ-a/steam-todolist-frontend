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
import { motion } from 'framer-motion'; // Import motion from Framer Motion

moment.locale('ko-KR');

const localizer = momentLocalizer(moment);

type CustomEvent = Event & {
  id: number;
};

const MyCalendar = () => {
  const { isLoggedIn } = useAuth();
  const { open, openModal, closeModal, getModalData } = useModal();
  const { todos } = useTodos();

  const [eventData, setEventData] = useState<ModalData | null>(null);

  const colors = ['#FF6347', '#4682B4', '#6A5ACD', '#FFD700', '#6A5ACD'];

  const colorsTodo: CustomEvent[] = todos.map((todo, index) => ({
    id: todo.todoId,
    title: todo.achieveName,
    start: todo.start,
    end: todo.end || new Date(),
    resource: { color: colors[index % colors.length] },
  }));

  const eventStyleGetter = (event: CustomEvent) => {
    const backgroundColor = event.resource.color;
    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.9,
      color: 'white',
      border: '1px solid #2a475e',
      display: 'block',
    };
    return { style };
  };

  const handleSelectEvent = async (event: CustomEvent) => {
    const data2: ModalData = {
      todoId: 1,
      gameName: `엘든링`,
      gameId: 123,
      achieveName: '엘든링 도전과제',
      achieveDescription: '엘든링 도전과제 설명',
      start: event.start!,
      end: event.end!,
      completedRate: '85',
      achieveId: 1,
      achieveIcon: '',
      achieveTag: '',
      isFinished: false,
    };
    // const data = await getModalData(event.id);
    setEventData(data2); //data || data2
    openModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // opcity 속도 조절
      transition={{ duration: 1.2 }}>
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
            views={['month']}
            formats={{
              monthHeaderFormat: (date: Date) =>
                `${date.getFullYear()}년 ${date.getMonth() + 1}월`,

              weekdayFormat: (date: Date) =>
                ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
            }}
            messages={{
              previous: '이전',
              next: '다음',
              today: '오늘',
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
    </motion.div>
  );
};

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  padding: 10px 18px;
  gap: 20px;

  .my-calendar {
    border-radius: 10px;
    background-color: #2a475e;
    padding: 12px;
    flex: 3;
  }

  // 달력 헤더
  .rbc-toolbar {
    background-color: #202531;
    color: #c7d5e0;
    border-bottom: 1px solid #2a475e;
    border-radius: 10px 10px 0 0;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .rbc-toolbar-label {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.2rem;
    font-weight: bold;
  }

  .rbc-btn-group {
    button {
      background-color: transparent;
      border: 1px solid #c7d5e0;
      color: #c7d5e0;
      padding: 5px 10px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
      }

      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
  .rbc-month-view,
  .rbc-time-view,
  .rbc-agenda-view {
    background-color: #1b2838;
    color: #c7d5e0;
    border: 1px solid white;
  }

  // 캘린더 "일" 목록
  .rbc-time-view {
    .rbc-events-container,
    .rbc-time-content,
    .rbc-timeslot-group {
      border: none;

      .rbc-time-slot {
        border: 1px solid #2a475e;
      }
    }
  }

  // 캘린더 일정 목록
  .rbc-agenda-view {
    .rbc-agenda-table {
      background-color: #1b2838;
      color: #c7d5e0;
      border: none;
    }

    .rbc-agenda-content {
      background-color: #1b2838;
      color: #c7d5e0;
    }
  }

  .rbc-day-bg + .rbc-day-bg,
  .rbc-month-row + .rbc-month-row {
    border-left: 0.5px solid #2a475e;
    border-top: 0.5px solid #2a475e;
  }

  // 현재 날짜 배경
  .rbc-today {
    background-color: #66c0f4;
    color: #ffffff;
  }

  // 현재 날짜 폰트
  .rbc-now {
    color: #ffffff;
  }

  // 달력 일 폰트 사이즈
  .rbc-button-link {
    font-size: 1rem;
  }

  // 이번달 아닌 날짜 배경
  .rbc-off-range-bg {
    background-color: rgba(47, 50, 56, 0.5);
  }
`;

const AchievementListContainer = styled.div`
  flex: 1;
`;

export default MyCalendar;
