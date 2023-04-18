import moment from 'moment';

export function formatLastMessageTime(LastMessageTime: string): string {
  const now = moment();
  const messageTime = moment(LastMessageTime);
  const diffMinutes = now.diff(messageTime, 'minutes');

  if (diffMinutes < 1) {
    return '조금 전';
  }
  if (diffMinutes < 1440) {
    // 24시간 = 1440분
    return messageTime.format('A hh:mm'); // 오후 혹은 오전 hh:mm 형태
  }
  return messageTime.format('YYYY.MM.DD'); // YYYY.MM.DD 형태
}
