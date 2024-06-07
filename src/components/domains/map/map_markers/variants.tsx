import { theme } from 'twin.macro';

const variants = {
  blue: {
    bgColor: theme`colors.blue.700`,
    textColor: theme`colors.blue.1000`,
  },
  nego: {
    bgColor: theme`colors.nego.800`,
    textColor: theme`colors.nego.1000`,
  },
};

export type VariantKey = keyof typeof variants;

export default variants;
