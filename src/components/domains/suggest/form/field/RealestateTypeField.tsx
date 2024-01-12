import { ReactNode, memo } from 'react';

import Apart from '@/assets/icons/apart.svg';

import Officetel from '@/assets/icons/officetel.svg';

import Villa from '@/assets/icons/villa.svg';

import Dagagoo from '@/assets/icons/dagagoo.svg';

import Dandok from '@/assets/icons/dandok.svg';

import { RealestateType } from '@/constants/enums';

import checkSelected from '../../utils/checkSelected';

import RealestateTypeButton from '../ui/RealestateTypeButton';

import FIELD_ID from '../constants/fieldId';

const Icons: Record<RealestateType, ReactNode> = {
  10: <Apart />,
  20: <Officetel />,
  30: <Villa />,
  40: <Villa />,
  50: <Dandok />,
  60: <Dagagoo />,
};

const realestateTypesArray = [
  RealestateType.Apartment,
  RealestateType.Officetel,
  RealestateType.Dasaedae,
  RealestateType.Dagagoo,
  RealestateType.Dandok,
];

type RealestateTypeFieldProps = {
  isRender: boolean;
  needDiabledFields?: boolean;
  realestateTypes: number[];
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement> | undefined) => void;
};

function RealestateTypeField({ isRender, needDiabledFields, realestateTypes, handleClick }: RealestateTypeFieldProps) {
  if (isRender) return null;

  return (
    <div id={FIELD_ID.Realestate} tw="flex flex-row gap-2 pb-6 border-b border-b-gray-200">
      {realestateTypesArray.map((value) => (
        <RealestateTypeButton
          key={value}
          value={value}
          selected={checkSelected<RealestateType>(value, realestateTypes)}
          handleClick={handleClick}
          disabled={needDiabledFields && !checkSelected<RealestateType>(value, realestateTypes)}
          needDiabledFields={needDiabledFields}
        >
          {Icons[value]}
        </RealestateTypeButton>
      ))}
    </div>
  );
}

export default memo(RealestateTypeField);
