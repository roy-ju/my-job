import { RegisterSuccessType } from './types';

import SuccessAnimation from './SuccessAnimation';

import RequireVerifyAnimation from './RequireVerifyAnimation';

type ImageContentsProps = { type: RegisterSuccessType };

export default function ImageContents({ type }: ImageContentsProps) {
  if (!type) return null;

  return type === 'onlyLogin' ? <SuccessAnimation /> : <RequireVerifyAnimation />;
}
