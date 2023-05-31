import { Moment } from '@/components/atoms';
import tw from 'twin.macro';

export const SentTime = tw(Moment)`text-[10px] leading-3 text-gray-700 whitespace-nowrap`;

export const SentTimeType = (<SentTime />).type;
