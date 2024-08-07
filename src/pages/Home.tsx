import { useEffect, useState } from 'react';
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
import useTodos from '../hooks/useTodos';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import nyanCat from '../assets/nyan-cat-nyan.gif';
import useSnackBar from '../hooks/useSnackBar';
import axios from 'axios';

moment.locale('ko-KR');

const localizer = momentLocalizer(moment);
const BASE_URL = import.meta.env.VITE_API_URL;

type CustomEvent = Event & {
  id: number;
};

const MyCalendar = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const { open, openModal, closeModal, getModalData } = useModal();
  const { todos, updateTodoItem, removeTodoMutation } = useTodos();
  const { snackbar, open: openSnackbar } = useSnackBar();

  const handleRemove = async (id: number) => {
    try {
      await removeTodoMutation.mutateAsync(id);
      openSnackbar('삭제가 완료되었습니다');
    } catch (error) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        openSnackbar('삭제에 실패했습니다');
      }
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await updateTodoItem(id);
      openSnackbar('도전과제가 완료되었습니다');
    } catch (error) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        if (error.response?.status === 409) {
          openSnackbar('도전과제를 완료해주세요');
        }
      }
    }
  };
  const checkAndHandleLoginStatus = () => {
    const loginCookie = document.cookie
      .split(';')
      .find((row) => row.trim().startsWith('isLoggedIn='));
    const newIsLoggedIn = loginCookie
      ? loginCookie.split('=')[1] === 'true'
      : false;

    if (!newIsLoggedIn) {
      Swal.fire({
        allowOutsideClick: false,
        title: '로그인이 필요합니다.',
        text: '저희 서비스는 로그인을 하셔야만 사용가능합니다.',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff  url("../assets/nyan-cat.gif")',
        backdrop: `
          rgba(0,0,123,0.4)
          url(${nyanCat})
          left top / 500px 300px
          no-repeat
        `,
        showConfirmButton: true,
        confirmButtonText: '로그인하러 가기',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = BASE_URL + `/login`;
        }
      });
    }
  };

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      checkAndHandleLoginStatus();
    }

    window.addEventListener('focus', checkAndHandleLoginStatus);
    window.addEventListener('popstate', checkAndHandleLoginStatus);

    return () => {
      window.removeEventListener('focus', checkAndHandleLoginStatus);
      window.removeEventListener('popstate', checkAndHandleLoginStatus);
    };
  }, [isLoading, isLoggedIn]);

  // useEffect(() => {
  //   if (!isLoading && !isLoggedIn) {
  //     Swal.fire({
  //       allowOutsideClick: false,
  //       title: '로그인이 필요합니다.',
  //       text: '저희 서비스는 로그인을 하셔야만 사용가능합니다.',
  //       width: 600,
  //       padding: '3em',
  //       color: '#716add',
  //       background: '#fff  url("../assets/nyan-cat.gif")',
  //       backdrop: `
  //         rgba(0,0,123,0.4)
  //         url(${nyanCat})
  //         left top / 500px 300px
  //         no-repeat
  //       `,

  //       showConfirmButton: true,
  //       confirmButtonText: '로그인하러 가기',
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         window.location.href = BASE_URL + `/login`;
  //       }
  //     });
  //   }
  // }, [isLoggedIn, isLoading]);

  const [eventData, setEventData] = useState<ModalData | null>(null);

  const colors = ['#FF6347', '#4682B4', '#6A5ACD', '#FFD700', '#6A5ACD'];

  if (!todos) return;

  const colorsTodo: CustomEvent[] = todos.map((todo, index) => ({
    id: todo.todoId,
    title: todo.achieveName,
    start: new Date(todo.start),
    end: new Date(),
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
    // const data2: ModalData = {
    //   todoId: 1,
    //   gameName: `엘든링`,
    //   gameId: 123,
    //   achieveName: '엘든링 도전과제',
    //   achieveDescription: '엘든링 도전과제 설명',
    //   start: event.start!,
    //   end: event.end!,
    //   completedRate: '85',
    //   achieveId: 1,
    //   achieveIcon: '',
    //   achieveTag: '',
    //   isFinished: false,
    // };
    const data = await getModalData(event.id);
    setEventData(data); //data || data2
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
        {
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
        }

        <AchievementListContainer>
          <AchievementList
            todos={todos}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
          />
        </AchievementListContainer>
        <TodoModal open={open} close={handleClose} data={eventData} />
        {snackbar}
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
