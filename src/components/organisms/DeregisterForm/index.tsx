import { Checkbox, Label } from '@/components/atoms';
import { TextField } from '@/components/molecules';

export default function DeregisterForm() {
  return (
    <div tw="flex flex-col gap-8">
      <Label label="집을 보러오는 매수(임차)인이 없어요" control={<Checkbox />} />
      <Label label="원하는 매물이 없어요" control={<Checkbox />} />
      <Label label="비매너 이용자가 있어요" control={<Checkbox />} />
      <Label label="중개사가 불만이에요" control={<Checkbox />} />
      <Label label="서비스 이용이 불편해요" control={<Checkbox />} />
      <Label label="잦은 오류가 발생해요" control={<Checkbox />} />
      <Label label="대체할 만한 서비스를 찾았어요" control={<Checkbox />} />
      <div tw="flex flex-col gap-4">
        <Label label="기타" control={<Checkbox />} />
        <TextField variant="outlined" size="medium">
          <TextField.TextArea placeholder="내용을 입력하세요" tw="min-h-[160px] max-h-[160px]" />
        </TextField>
      </div>
    </div>
  );
}
