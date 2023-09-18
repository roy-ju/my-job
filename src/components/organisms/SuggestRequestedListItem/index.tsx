import { GetMySuggestListResponse } from '@/apis/suggest/getMySuggestList';
import { Chip, Moment } from '@/components/atoms';
import { RealestateType } from '@/constants/enums';
import { RealestateTypeString } from '@/constants/strings';
import { useMemo } from 'react';
import tw from 'twin.macro';

const chipVariantByRealestateType: Record<number, 'nego' | 'green' | 'red' | 'blue' | 'orange'> = {
  [RealestateType.Apartment]: 'nego',
  [RealestateType.Officetel]: 'green',
  [RealestateType.Dandok]: 'red',
  [RealestateType.Dagagoo]: 'blue',
  [RealestateType.Yunrip]: 'orange',
  [RealestateType.Dasaedae]: 'orange',
};

interface Props {
  item?: NonNullable<GetMySuggestListResponse['list']>[0];

  onClick?: () => void;
}

export default function SuggestRequestedListItem({ item, onClick }: Props) {
  const realestateTypes = useMemo(
    () =>
      Array.from(
        new Set(
          item?.realestate_types
            ?.split(',')
            .map((d) => Number(d))
            .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d)) ?? [],
        ),
      ),
    [item?.realestate_types],
  );

  return (
    <div>
      <button type="button" tw="w-full text-start px-5 hover:bg-gray-100" onClick={onClick}>
        <div tw="py-5">
          <div tw="flex items-center gap-3">
            <div tw="flex gap-1 flex-1">
              {realestateTypes?.map((d) => (
                <Chip key={d} variant={chipVariantByRealestateType[d]}>
                  {RealestateTypeString[d]}
                </Chip>
              ))}
            </div>
          </div>
          <div tw="text-b1 font-bold my-1.5">{item?.title}</div>
          <div tw="flex justify-between">
            <div tw="text-info text-gray-700">
              <span tw="mr-1">요청일:</span>
              <Moment format="relative">{item?.created_time}</Moment>
            </div>
            <div tw="text-info text-gray-700">
              추천받은 매물수{' '}
              <span css={[Boolean(item?.suggest_recommended_count) && tw`font-bold text-nego-1000`]}>
                {item?.suggest_recommended_count ?? 0}
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
