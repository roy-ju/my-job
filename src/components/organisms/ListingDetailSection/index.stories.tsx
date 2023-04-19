import ListingDetailSection from '.';

const meta = {
  title: 'organisms/ListingDetailSection',
};

export default meta;

export const Summary = () => (
  <ListingDetailSection.Summary createdTime="2023-04-19T01:26:54.676Z" viewCount={100} participatorCount={5} />
);

const deafultBiddingsProps = {
  showBiddingPrice: true,
  biddingsChatRoomCreated: [
    {
      nickname: 'heloo',
      createdTime: 'asdf',
      price: 100000000000,
      monthlyRentFee: 10000000000,
      isMyBidding: false,
    },
  ],
  biddingsChatRoomNotCreated: [
    {
      nickname: 'heloo',
      createdTime: 'asdf',
      price: 100000000000,
      monthlyRentFee: 10000000000,
      isMyBidding: true,
    },
  ],
};

export const Biddings = () => <ListingDetailSection.Biddings {...deafultBiddingsProps} />;
