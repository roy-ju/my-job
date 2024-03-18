import Card from './Card';

type CardListProps = {
  list: any[];
  handleClickItem: (v: string) => void;
};

export default function CardList({ list, handleClickItem }: CardListProps) {
  return (
    <>
      {list.map((item) => (
        <Card
          key={item}
          handleClickItem={handleClickItem}
          title="등기부 조회 상식 2편"
          subTitle="등기부의 상세 내용인 표제부, 갑구, 을구 보는 방법은 무엇일까?"
          link=""
          thumbnailImgPath=""
        />
      ))}
    </>
  );
}
