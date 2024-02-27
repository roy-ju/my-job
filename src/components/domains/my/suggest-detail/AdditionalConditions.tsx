import tw, { styled } from 'twin.macro';

import { BuyOrRent as BuyOrRentEnum } from '@/constants/enums';

import getSelectedAdditionConditions from './utils/getSelectedAdditionConditions';

type AdditionalCondtions = {
  buyOrRents: string;
  danjiOrRegion: number;
  realestateTypes: string;
  additionalConditions: string;
};

const Title = styled.p`
  ${tw`text-gray-800 text-subhead_02`}
`;

const Content = styled.p`
  ${tw`text-gray-700 text-body_02`}
`;

export default function AdditionalConditions({
  buyOrRents,
  danjiOrRegion,
  realestateTypes,
  additionalConditions,
}: AdditionalCondtions) {
  const list = getSelectedAdditionConditions({
    danjiOrRegion: danjiOrRegion || 0,
    buyOrRent: buyOrRents === BuyOrRentEnum.Buy.toString() ? BuyOrRentEnum.Buy : BuyOrRentEnum.Jeonsae,
    realestateType: realestateTypes.split(',').map((item) => Number(item)),
    selectedConditions: additionalConditions.split(','),
  });

  if (!danjiOrRegion) return null;

  return (
    <>
      {list?.map(({ title, list: condtions }) =>
        condtions ? (
          <div key={condtions}>
            {title ? <Title>{title}</Title> : <Title>추가조건</Title>}
            <Content>{condtions}</Content>
          </div>
        ) : null,
      )}
    </>
  );
}
