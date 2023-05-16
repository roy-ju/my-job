import { Panel } from '@/components/atoms';
import ListingDetailSection from '.';

const meta = {
  title: 'organisms/ListingDetailSection',
};

export default meta;

export const Summary = () => (
  <Panel>
    <div tw="px-5 py-10">
      <ListingDetailSection.Summary
        price={100000000}
        buyOrRent={1}
        listingTitle="테스트 매물 타이틀"
        address="경기도 용인시 기흥구 구갈로 71-18"
        createdTime="2023-04-19T01:26:54.676Z"
        direction="남향"
        floor="10"
        floorDescription="고층"
        realestateType={10}
        jeonyongArea="100"
        gonggeupArea="200"
        viewCount={100}
        participatorCount={5}
      />
    </div>
  </Panel>
);

export const Biddings = () => (
  <Panel>
    <div tw="px-5 py-10">
      <ListingDetailSection.Biddings
        showBiddingPrice
        biddingsChatRoomCreated={[
          {
            nickname: '일이삼사오육칠팔구십',
            createdTime: 'asdf',
            price: 100000000000,
            monthlyRentFee: 10000000000,
            isMyBidding: false,
          },
        ]}
        biddingsChatRoomNotCreated={[
          {
            nickname: 'heloo',
            createdTime: 'asdf',
            price: 100000000000,
            monthlyRentFee: 10000000000,
            isMyBidding: true,
          },
        ]}
      />
    </div>
  </Panel>
);

export const Conditions = () => (
  <Panel>
    <div tw="px-5 py-10">
      <ListingDetailSection.Conditions
        listing={{
          id: 1550,
          user_id: null,
          agent_id: 14,
          assigned_agent_id: 14,
          trade_id: 'T2212010006',
          status: 20,
          listing_title: '시레벨 테스트3',
          internal_listing_title: '',
          gap_investment: false,
          owner_name: '',
          owner_phone: '',
          realestate_unique_number: '',
          pnu: '4113510900107380000',
          bubjungdong_code: '4113510900',
          road_name_address: '',
          jibun_address: '',
          address_detail: '',
          dong: '',
          ho: '',
          floor: '',
          sido: '경기',
          sigungu: '성남시 분당구',
          eubmyundong: '삼평동',
          li: '',
          road_name_bonbun: '155',
          road_name_bubun: '0',
          jibun_bonbun: '738',
          jibun_bubun: '0',
          building_name: '봇들마을7단지아파트',
          long: 0,
          lat: 0,
          token: '',
          realestate_type: 10,
          officetel_type: null,
          buy_or_rent: 1,
          quick_sale: null,
          quick_sale_comparative: '',
          trade_price: 1150000000,
          deposit: 0,
          monthly_rent_fee: 0,
          negotiation_target: 0,
          negotiation_or_auction: 1,
          auction_end_days: null,
          auction_end_time: null,
          auction_batch_processed_time: null,
          negotiation_conversion_time: null,
          administrative_fee: 0,
          special_terms: '',
          contract_amount: 115000000,
          contract_amount_negotiable: false,
          interim_amount1: 1000000000,
          interim_amount_negotiable1: false,
          interim_amount_payment_time1: '2023-01-04T10:13:37+09:00',
          interim_amount_payment_time1_type: 1,
          interim_amount2: 2000000000,
          interim_amount_negotiable2: true,
          interim_amount_payment_time2: null,
          interim_amount_payment_time2_type: 1,
          interim_amount3: 3000000000,
          interim_amount_negotiable3: false,
          interim_amount_payment_time3: null,
          interim_amount_payment_time3_type: 1,
          remaining_amount: 1035000000,
          remaining_amount_payment_time: '2023-01-04T10:13:37+09:00',
          remaining_amount_payment_time_type: 1,
          rent_contract_term_year: 0,
          rent_contract_term_month: 0,
          rent_contract_term_negotiable: true,
          rent_end_date: null,
          move_in_date: null,
          move_in_date_type: 2,
          rent_area: '',
          jeonsae_loan: false,
          veranda_extended: false,
          veranda_remodelling: false,
          description: '',
          jeonyong_area: '108.34',
          gonggeup_area: '137.74',
          direction: '남향',
          floor_description: '저층',
          total_floor: '30',
          toogi_region: '',
          toji_trade_eligible: false,
          room_count: '3',
          bathroom_count: '3',
          storey: '단층',
          agent_selection_expire_time: null,
          agent_assigned_view_time: null,
          agent_completion_expire_time: null,
          cancelled_time: null,
          cancelled_reason: '',
          cancellation_type: 0,
          view_count: 119,
          updated_time: '2023-01-04T10:13:37+09:00',
          created_time: '2022-12-01T10:20:24+09:00',
        }}
      />
    </div>
  </Panel>
);

export const Qna = () => (
  <Panel>
    <div tw="px-5 py-10">
      <ListingDetailSection.Qna
        qnaList={[
          {
            id: 326,
            user_id: 112,
            user_nickname: '김지효효효효',
            message: 'dwqdqwdwq',
            agent_message: null,
            agent_response_time: null,
            owner: true,
            created_time: '2023-04-25T15:19:42+09:00',
          },
          {
            id: 325,
            user_id: 64,
            user_nickname: '검성김지효2',
            message: 'dwqdqwdwq',
            agent_message: null,
            agent_response_time: null,
            owner: false,
            created_time: '2023-04-21T09:00:36+09:00',
          },
        ]}
      />
    </div>
  </Panel>
);

export const Faq = () => (
  <Panel>
    <div tw="px-5 py-10">
      <ListingDetailSection.Faq />
    </div>
  </Panel>
);

export const RealestateDocument = () => (
  <Panel>
    <div tw="px-5 py-10">
      <ListingDetailSection.RealestateDocument
        data={{
          created_time: '2023-05-15T16:20:16+09:00',
          owner_list: [
            {
              owner: '김*애 (소유자)',
              registration_number: '58****-*******',
              share: '공동소유',
              address: '서울특별시 강남구 ******',
              number: '4',
            },
            {
              owner: '이*삼 (소유자)',
              registration_number: '84****-*******',
              share: '공동소유',
              address: '경기도 성남시 분당******',
              number: '2',
            },
          ],
          debt_list1: [
            {
              number: '5',
              purpose: '압류',
              application_info: '2018년9월7일 제164857호',
              description: '권리자  국',
              owner: '김*애',
            },
            {
              number: '5-1',
              purpose: '공매공고',
              application_info: '2019년6월20일 제89240호',
              description: '',
              owner: '김*애',
            },
            {
              number: '13',
              purpose: '임의경매개시결정',
              application_info: '2021년12월28일 제247976호',
              description: '채권자  두리에이엠씨대부 주식회사',
              owner: '김*애',
            },
            {
              number: '14',
              purpose: '압류',
              application_info: '2022년6월7일 제83418호',
              description: '권리자  국',
              owner: '김*애',
            },
            {
              number: '15',
              purpose: '임의경매개시결정',
              application_info: '2023년3월6일 제27620호',
              description: '채권자  이영화',
              owner: '김*애',
            },
          ],
          debt_list2: [
            {
              number: '3',
              purpose: '근저당권설정',
              application_info: '2017년5월31일 제97526호',
              description: '채권최고액  금420,000,000원 &근저당권자  &&주식회사한국스탠다드차타드은행&&  &',
              owner: '김*애',
            },
            {
              number: '3-1',
              purpose: '근저당권이전',
              application_info: '2021년10월15일 제201688호',
              description: '근저당권자  두리에이엠씨대부주식회사',
              owner: '김*애',
            },
            {
              number: '3-2',
              purpose: '질권',
              application_info: '2021년10월15일 제201689호',
              description: '채권액  금420,000,000원 채권자  주식회사디지비캐피탈',
              owner: '김*애',
            },
            {
              number: '7',
              purpose: '근저당권설정',
              application_info: '2021년10월6일 제195732호',
              description: '채권최고액  금488,000,000원 근저당권자  이영화',
              owner: '김*애',
            },
          ],
        }}
      />
    </div>
  </Panel>
);
