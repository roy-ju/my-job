import { Moment } from '@/components/atoms';

export default function CreatedTime({ time }: { time: string }) {
  if (time) {
    return (
      <div tw="text-body_01 text-gray-600">
        <Moment format="relative">{time}</Moment>
      </div>
    );
  }

  return null;
}
