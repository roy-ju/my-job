import { Button } from '@/components/atoms';

type MessagesProps = {
  tab: number;
  suggestCount: number;
  listingCount: number;
  handleSuggestListAll: () => void;
  handleListingListAll: () => void;
};

export default function Messages({
  tab,
  suggestCount,
  listingCount,
  handleSuggestListAll,
  handleListingListAll,
}: MessagesProps) {
  return (
    <div tw="flex pt-7 px-5 items-center justify-between">
      {tab === 1
        ? suggestCount > 0 && (
            <h2 tw="text-info text-gray-700">
              중개사와 집주인의 연락을
              <br />
              기다리고 있는 요청이에요.
            </h2>
          )
        : listingCount > 0 && (
            <h2 tw="text-info text-gray-700">
              매수인, 임차인의 가격 제안을
              <br />
              기다리고 있는 매물이에요.
            </h2>
          )}

      {tab === 1
        ? suggestCount > 3 && (
            <Button variant="outlined" tw="h-9" onClick={handleSuggestListAll}>
              전체보기
            </Button>
          )
        : listingCount > 3 && (
            <Button variant="outlined" tw="h-9" onClick={handleListingListAll}>
              전체보기
            </Button>
          )}
    </div>
  );
}
