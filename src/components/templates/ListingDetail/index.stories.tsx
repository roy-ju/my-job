import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import ListingDetail from '.';

export default {
  title: 'templates/ListingDetail',
  component: ListingDetail,
} as ComponentMeta<typeof ListingDetail>;

export const Default: ComponentStory<typeof ListingDetail> = (args) => (
  <Panel>
    <ListingDetail {...args} />
  </Panel>
);

Default.args = {
  listingDetail: {
    listing: {
      id: 1550,
      user_id: null,
      danji_id: 3,
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
      contract_amount_negotiable: true,
      interim_amount1: 0,
      interim_amount_negotiable1: true,
      interim_amount_payment_time1: null,
      interim_amount_payment_time1_type: 1,
      interim_amount2: 0,
      interim_amount_negotiable2: true,
      interim_amount_payment_time2: null,
      interim_amount_payment_time2_type: 1,
      interim_amount3: 0,
      interim_amount_negotiable3: true,
      interim_amount_payment_time3: null,
      interim_amount_payment_time3_type: 1,
      remaining_amount: 1035000000,
      remaining_amount_payment_time: null,
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
    },
    is_owner: false,
    chat_room_id: 3051,
    bidding_id: null,
    bidding_status: null,
    visit_user_type: 2,
    display_address: '경기 성남시 분당구 동판교로 155',
    quick_sale_comparative: '',
    trade_or_deposit_price: 1150000000,
    monthly_rent_fee: 0,
    agent_summary: {
      profile_image_full_path: 'https://agent-test.negocio.kr/static/media/random_profile_7.80061fd9531104552702.png',
      name: '김지효',
      office_name: 'e편한공인중개사사무소',
      address: '경기 용인시 기흥구 구갈로 71-18 106동 404호',
      cell_phone: '010-9459-2441',
      office_phone: '02-222-2228',
      registration_number: '4203-1309',
      distance_from_listing: 12.733268494723784,
    },
    participator_count: 10,
    is_favorite: false,
    total_parking_count: '923',
    parking_per_saedae: '1.58',
    active_status_time: '2023-01-04T10:13:37+09:00',
    photos: [
      {
        id: 2598,
        listing_id: 3062,
        danji_id: 3,
        token: null,
        document_type: 2,
        full_file_path: 'https://negocio-listing-photos.s3.ap-northeast-2.amazonaws.com/2023-4/3062Wl3eQZkDpS6gE5Go',
        thumb_file_path:
          'https://negocio-listing-photos.s3.ap-northeast-2.amazonaws.com/2023-4/3062Wl3eQZkDpS6gE5Go_thumb',
        created_time: '2023-04-18T17:42:53+09:00',
      },
      {
        id: 2599,
        listing_id: 3062,
        danji_id: 3,
        token: null,
        document_type: 2,
        full_file_path: 'https://negocio-listing-photos.s3.ap-northeast-2.amazonaws.com/2023-4/3062dm17RskAeLtqaL3u',
        thumb_file_path:
          'https://negocio-listing-photos.s3.ap-northeast-2.amazonaws.com/2023-4/3062dm17RskAeLtqaL3u_thumb',
        created_time: '2023-04-18T17:42:53+09:00',
      },
    ],
    danji_photos: [],
    debt_successions: [],
    collaterals: [],
    tags: [
      {
        id: 1,
        name: '신축급',
        created_time: '2022-12-01T10:20:24+09:00',
      },
      {
        id: 6,
        name: '주차기능',
        created_time: '2022-12-01T10:20:24+09:00',
      },
    ],
    options: [],
    biddings_chat_room_created: [
      {
        bidding_id: 0,
        is_my_bidding: false,
        nickname: '삼승환',
        bidding_status: 2,
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        created_time: '2023-03-29T09:54:31+09:00',
      },
      {
        bidding_id: 0,
        is_my_bidding: false,
        nickname: '김아진',
        bidding_status: 2,
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        created_time: '2023-03-22T14:14:39+09:00',
      },
      {
        bidding_id: 0,
        is_my_bidding: false,
        nickname: '탈퇴한 회원',
        bidding_status: 6,
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        created_time: '2023-03-16T11:25:03+09:00',
      },
      {
        bidding_id: 0,
        is_my_bidding: false,
        nickname: 'SamLee메인',
        bidding_status: 2,
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        created_time: '2023-03-15T10:22:01+09:00',
      },
      {
        bidding_id: 0,
        is_my_bidding: false,
        nickname: '삼승환',
        bidding_status: 6,
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        created_time: '2023-03-14T09:38:14+09:00',
      },
      {
        bidding_id: 0,
        is_my_bidding: false,
        nickname: '탈퇴한 회원',
        bidding_status: 6,
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        created_time: '2023-03-09T10:47:29+09:00',
      },
      {
        bidding_id: 0,
        is_my_bidding: false,
        nickname: '웬즈웬',
        bidding_status: 2,
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        created_time: '2023-02-22T17:04:47+09:00',
      },
      {
        bidding_id: 0,
        is_my_bidding: false,
        nickname: 'ㅎ',
        bidding_status: 2,
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        created_time: '2023-02-09T14:44:49+09:00',
      },
      {
        bidding_id: 0,
        is_my_bidding: false,
        nickname: 'ㅎ',
        bidding_status: 6,
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        created_time: '2022-12-08T13:41:04+09:00',
      },
      {
        bidding_id: 0,
        is_my_bidding: false,
        nickname: 'JOELKIM',
        bidding_status: 2,
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        created_time: '2022-12-07T14:20:00+09:00',
      },
    ],
    biddings_chat_room_not_created: null,
    suggest_recommend_id: null,
  },
};
