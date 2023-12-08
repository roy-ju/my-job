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

export function compareMessageTime(LastMessageTime: string): string {
  const messageTime = moment(LastMessageTime);

  return messageTime.format('YYYY.MM.DD A hh:mm');
}

export function formatCreatedTime(time: string): string {
  const now = moment();
  const createTime = moment(time);
  const diffMinutes = now.diff(createTime, 'minutes');

  const diffHours = now.diff(createTime, 'hours');

  if (diffMinutes < 1) {
    return '조금 전';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  if (diffMinutes < 1440) {
    // 24시간 = 1440분
    return `${diffHours}시간 전`;
  }
  return createTime.format('YYYY.MM.DD'); // YYYY.MM.DD 형태
}
