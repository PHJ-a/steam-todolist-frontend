const calculateElapsedTime = (start: Date, end: Date | null) => {
  const endTime = end ? end : new Date();
  const elapsedMilliseconds = endTime.getTime() - start.getTime();
  const hours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (elapsedMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );
  return `${hours}시간 ${minutes}분`;
};

const formatToKoreanTime = (date: Date) => {
  const Kdate = new Date(date);
  return Kdate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
};

export { calculateElapsedTime, formatToKoreanTime };
