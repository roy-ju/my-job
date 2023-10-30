import { Button } from '@/components/atoms';

import useForm from '../hooks/useForm';

import useFormHandler from '../hooks/useFormHandler';

export default function Purpose() {
  const form = useForm();

  const { handleUpdatePurpose } = useFormHandler();

  const selected = (value: '실거주' | '투자') => form?.formData?.purpose === value;

  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold">매매거래의 목적은 무엇인가요?</div>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            value="실거주"
            selected={selected('실거주')}
            onClick={(e) => handleUpdatePurpose(e)}
          >
            실거주
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            value="투자"
            selected={selected('투자')}
            onClick={(e) => handleUpdatePurpose(e)}
          >
            투자
          </Button>
        </div>
      </div>
    </div>
  );
}
