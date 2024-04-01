import {
  Wrraper,
  Column,
  NoticeContainer,
} from '../../realestate-helper/realestate-document-address-detail/widget/RealestateDocumentAddressDetailWidget';

export default function Notice() {
  const firstMessage = '- 신축/재건축으로 등기부가 조회되지 않는 주택은 등록할 수 없어요.';
  const secondMessage = '- 상세 주소 정보가 없다면 비워두고 다음 버튼을 눌러주세요.';

  return (
    <NoticeContainer>
      <Wrraper>
        <span>안내사항</span>
        <Column>
          <p>{firstMessage}</p>
          <p>{secondMessage}</p>
        </Column>
      </Wrraper>
    </NoticeContainer>
  );
}
