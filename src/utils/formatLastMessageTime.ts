export function formatLastMessageTime(timeString: string): string {
  const now = new Date();
  const time = new Date(timeString);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  const diff = now.getTime() - time.getTime();

  if (diff < minute) {
    return '조금 전';
  }
  if (diff < day) {
    const amPm = time.getHours() < 12 ? '오전' : '오후';
    const hours = time.getHours() % 12 || 12;
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${amPm} ${hours}:${minutes}`;
  }
  const year = time.getFullYear();
  const month = (time.getMonth() + 1).toString().padStart(2, '0');
  const date = time.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${date}`;
}
