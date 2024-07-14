export const formatPlayTime = (playTime: number) => {
  const hours = (playTime / 60).toFixed(1); // 분을 시간으로 변환 후 소수점 둘째 자리에서 반올림
  return `${hours}시간`;
};

export const formatLastPlayed = (lastPlayedTime: string) => {
  const date = new Date(lastPlayedTime);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 표현
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
};
