import { RealestateType } from '@/constants/enums';

const ChipVariantByRealestateType: Record<number, 'primary' | 'green' | 'red' | 'blue' | 'yellow'> = {
  [RealestateType.Apartment]: 'primary',

  [RealestateType.Officetel]: 'green',

  [RealestateType.Dandok]: 'red',

  [RealestateType.Dagagoo]: 'blue',

  [RealestateType.Yunrip]: 'yellow',

  [RealestateType.Dasaedae]: 'yellow',
};

export default ChipVariantByRealestateType;
