import { Wrraper, Column, NoticeContainer } from './widget/RealestateDocumentAddressDetailWidget';

export default function Notice() {
  const firstMessage = "- 단독주택, 다가구는 상세 주소를 비워두고 ‘조회하기' 버튼을 눌러주세요.";
  const secondMessage = '- 신축/재건축에 해당하는 주택은 등기부 조회가 불가할 수 있습니다.';

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
