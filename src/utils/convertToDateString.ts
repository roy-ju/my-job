import moment from 'moment';

export default function convertToDateString(value: string) {
  return moment(value).format('YYYY-MM-DD');
}
