import { Label, Checkbox } from '@/components/atoms';
import { makeDisabled } from '@/utils/fotmat';

interface Props {
  interviewAvailabletimes?: string[];
  onChangeInterviewAvailabletimes?: (value: string) => void;
}

const list = [
  '시간대 상관 없어요',
  '10:00 ~ 12:00 에 인터뷰 가능해요.',
  '14:00 ~ 16:00 에 인터뷰 가능해요.',
  '16:00 ~ 18:00 에 인터뷰 가능해요.',
];

export default function Inverview({ interviewAvailabletimes, onChangeInterviewAvailabletimes }: Props) {
  return (
    <div>
      <div tw="mb-5 flex flex-col justify-between gap-1">
        <div tw="font-bold">인터뷰 가능 시간대를 선택해주세요.</div>
        <div tw="text-info text-gray-700">인터뷰 가능한 시간대를 선택하시면 네고시오 전담매니저가 연락드려요.</div>
      </div>

      <div tw="flex flex-col gap-4">
        {list.map((item, idx) => (
          <Label
            key={item}
            checked={interviewAvailabletimes?.includes(item)}
            onChange={(e) => onChangeInterviewAvailabletimes?.(e.target.value)}
            label={item}
            value={item}
            control={<Checkbox name={item} disabled={makeDisabled(idx, list[0], interviewAvailabletimes)} />}
          />
        ))}
      </div>
    </div>
  );
}
