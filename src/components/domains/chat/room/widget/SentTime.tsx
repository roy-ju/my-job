import tw from 'twin.macro';

import { Moment } from '@/components/atoms';

export const SentTime = tw(Moment)`text-caption_01 text-gray-700 whitespace-nowrap`;

export const SentTimeType = (<SentTime />).type;
