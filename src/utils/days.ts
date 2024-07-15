const calculateElapsedTime = (start: string, end: string | null) => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const elapsedMilliseconds = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (elapsedMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );
  return `${hours}시간 ${minutes}분`;
};

const formatToKoreanTime = (date: string) => {
  const Kdate = new Date(date);
  return Kdate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
};

export { calculateElapsedTime, formatToKoreanTime };
