import { MarginTopEight } from '@/components/atoms/Margin';

import ErrorIcon from '@/assets/icons/error_20_filled.svg';

import { InfoTitle, Row, Column } from './widget/RealestateDocumentDetailWidget';

export default function Caution({ message }: { message: string }) {
  return (
    <Column>
      <InfoTitle>요약 정보</InfoTitle>
      <MarginTopEight />
      <Row>
        <ErrorIcon />
        <span>{message}</span>
      </Row>
    </Column>
  );
}
