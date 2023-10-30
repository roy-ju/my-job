import { Button } from '@/components/atoms';

import useForm from '../hooks/useForm';

import useFormHandler from '../hooks/useFormHandler';

export default function Region() {
  const form = useForm();

  const region = form?.formData?.bubjungdong?.name || '';

  const { handleOpenPopup } = useFormHandler();

  return (
    <>
      <div>
        <div tw="mb-4">
          <div tw="font-bold mb-1">추천 받고 싶은 위치를 선택해 주세요.</div>
          <div tw="text-info text-gray-700">추천은 법정동을 기준으로 합니다.</div>
        </div>

        {region ? (
          <div tw="flex flex-row items-center justify-between">
            <div tw="font-bold">선택한 지역: {region}</div>{' '}
            <Button
              variant="primary"
              size="small"
              onClick={() => {
                handleOpenPopup('bubjungdongChange');
              }}
              tw="max-w-[96px] min-h-[36px] shrink-0"
            >
              지역 재선택
            </Button>
          </div>
        ) : (
          <Button tw="w-full" variant="primary" size="big" onClick={() => handleOpenPopup('bubjungdongChange')}>
            지역 선택
          </Button>
        )}

        <div tw="text-info text-gray-700 mt-4">
          특정 단지의 매물만 추천받기를 원하시면 지도에서 단지를 선택하신 후 추천받기를 하실 수도 있습니다.
        </div>
      </div>
    </>
  );
}
