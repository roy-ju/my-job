import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import SuggestRecommendedList from '.';

export default {
  title: 'templates/SuggestRecommendedList',
  component: SuggestRecommendedList,
} as ComponentMeta<typeof SuggestRecommendedList>;

export const Default: ComponentStory<typeof SuggestRecommendedList> = (args) => (
  <Panel>
    <SuggestRecommendedList {...args} />
  </Panel>
);

Default.args = {
  suggestRecommendedList: [
    {
      suggest_item: {
        user_nickname: '샘리카카오로그인',
        user_profile_image_url:
          'https://negocio-user-photos.s3.ap-northeast-2.amazonaws.com/2023-8/249jYQSPoVvmsMcQTVr.PNG',
        created_time: '2023-08-30T15:45:35+09:00',
        realestate_types: '20',
        suggest_id: 38,
        suggest_status: 1,
        buy_or_rents: '1',
        trade_or_deposit_price: 20000000,
        monthly_rent_fee: 0,
        pyoung_text: '10~20평',
        purpose: '실거주',
        invest_amount: 0,
        quick_sale: null,
        negotiable: false,
        move_in_date: '2023-08-31T00:00:00+09:00',
        move_in_date_type: 1,
        note: '원해요',
        request_target_text: '삼평동',
      },
      suggest_recommend_item: {
        suggest_recommend_id: 35,
        created_time: '2023-09-01T11:29:02+09:00',
        suggest_recommend_status: 1,
        with_address: false,
        address_free_text: '',
        trade_or_deposit_price: 30000000,
        monthly_rent_fee: 0,
        jeonyong_areas: '38',
        floor: '2',
        direction: '남서',
        buy_or_rent: 1,
        note: '제가 직접 살고 있는 집을 추천 합니다. 제발 구매해주세요~',
        chat_room_id: null,
      },
    },
    {
      suggest_item: {
        user_nickname: '샘리카카오로그인',
        user_profile_image_url:
          'https://negocio-user-photos.s3.ap-northeast-2.amazonaws.com/2023-8/249jYQSPoVvmsMcQTVr.PNG',
        created_time: '2023-09-06T18:15:32+09:00',
        realestate_types: '10',
        suggest_id: 64,
        suggest_status: 1,
        buy_or_rents: '1',
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        pyoung_text: '24평, 46평',
        purpose: '투자',
        invest_amount: 100000000,
        quick_sale: true,
        negotiable: false,
        move_in_date: null,
        move_in_date_type: null,
        note: '',
        request_target_text: '샘마을한양',
      },
      suggest_recommend_item: {
        suggest_recommend_id: 71,
        created_time: '2023-09-11T11:34:43+09:00',
        suggest_recommend_status: 4,
        with_address: false,
        address_free_text: '경기 안양시 동안구 흥안대로223번길 47',
        trade_or_deposit_price: 100000000,
        monthly_rent_fee: 0,
        jeonyong_areas: '15',
        floor: '13',
        direction: '북동',
        buy_or_rent: 1,
        note: '추천합니다',
        chat_room_id: null,
      },
    },
    {
      suggest_item: {
        user_nickname: '샘리카카오로그인',
        user_profile_image_url:
          'https://negocio-user-photos.s3.ap-northeast-2.amazonaws.com/2023-8/249jYQSPoVvmsMcQTVr.PNG',
        created_time: '2023-09-06T18:15:32+09:00',
        realestate_types: '10',
        suggest_id: 64,
        suggest_status: 3,
        buy_or_rents: '1',
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        pyoung_text: '24평, 46평',
        purpose: '투자',
        invest_amount: 100000000,
        quick_sale: true,
        negotiable: false,
        move_in_date: null,
        move_in_date_type: null,
        note: '',
        request_target_text: '샘마을한양',
      },
      suggest_recommend_item: {
        suggest_recommend_id: 87,
        created_time: '2023-09-11T17:52:00+09:00',
        suggest_recommend_status: 1,
        with_address: false,
        address_free_text: '경기 안양시 동안구 흥안대로223번길 47',
        trade_or_deposit_price: 100000000,
        monthly_rent_fee: 0,
        jeonyong_areas: '13',
        floor: '10',
        direction: '북동',
        buy_or_rent: 1,
        note: '추천합니다.',
        chat_room_id: null,
      },
    },
    {
      suggest_item: {
        user_nickname: '샘리카카오로그인',
        user_profile_image_url:
          'https://negocio-user-photos.s3.ap-northeast-2.amazonaws.com/2023-8/249jYQSPoVvmsMcQTVr.PNG',
        created_time: '2023-09-06T18:15:32+09:00',
        realestate_types: '10',
        suggest_id: 64,
        suggest_status: 1,
        buy_or_rents: '1',
        trade_or_deposit_price: 0,
        monthly_rent_fee: 0,
        pyoung_text: '24평, 46평',
        purpose: '투자',
        invest_amount: 100000000,
        quick_sale: true,
        negotiable: false,
        move_in_date: null,
        move_in_date_type: null,
        note: '',
        request_target_text: '샘마을한양',
      },
      suggest_recommend_item: {
        suggest_recommend_id: 88,
        created_time: '2023-09-12T14:43:24+09:00',
        suggest_recommend_status: 5,
        with_address: false,
        address_free_text: '샘마을아파트 112동',
        trade_or_deposit_price: 100000000,
        monthly_rent_fee: 0,
        jeonyong_areas: '13',
        floor: '16',
        direction: '남동',
        buy_or_rent: 2,
        note: '9월 12일 추천할게요',
        chat_room_id: 111,
      },
    },
    {
      suggest_item: {
        user_nickname: '샘리카카오로그인',
        user_profile_image_url:
          'https://negocio-user-photos.s3.ap-northeast-2.amazonaws.com/2023-8/249jYQSPoVvmsMcQTVr.PNG',
        created_time: '2023-09-12T14:45:06+09:00',
        realestate_types: '10',
        suggest_id: 117,
        suggest_status: 1,
        buy_or_rents: '2,3',
        trade_or_deposit_price: 100000000,
        monthly_rent_fee: 100000,
        pyoung_text: '20평, 24평, 34평, 35평, 46평',
        purpose: '',
        invest_amount: 0,
        quick_sale: null,
        negotiable: true,
        move_in_date: '2023-09-30T00:00:00+09:00',
        move_in_date_type: 3,
        note: '추가조건 없습니다.',
        request_target_text: '샘마을한양',
      },
      suggest_recommend_item: {
        suggest_recommend_id: 89,
        created_time: '2023-09-12T14:46:26+09:00',
        suggest_recommend_status: 1,
        with_address: false,
        address_free_text: '샘마을아파트 112동',
        trade_or_deposit_price: 100000000,
        monthly_rent_fee: 1000000,
        jeonyong_areas: '-20',
        floor: '16',
        direction: '북',
        buy_or_rent: 3,
        note: '추천할게요',
        chat_room_id: null,
      },
    },
    {
      suggest_item: {
        user_nickname: '샘리카카오로그인',
        user_profile_image_url:
          'https://negocio-user-photos.s3.ap-northeast-2.amazonaws.com/2023-8/249jYQSPoVvmsMcQTVr.PNG',
        created_time: '2023-09-12T14:45:06+09:00',
        realestate_types: '10',
        suggest_id: 117,
        suggest_status: 1,
        buy_or_rents: '2,3',
        trade_or_deposit_price: 100000000,
        monthly_rent_fee: 100000,
        pyoung_text: '20평, 24평, 34평, 35평, 46평',
        purpose: '',
        invest_amount: 0,
        quick_sale: null,
        negotiable: true,
        move_in_date: '2023-09-30T00:00:00+09:00',
        move_in_date_type: 3,
        note: '추가조건 없습니다.',
        request_target_text: '샘마을한양',
      },
      suggest_recommend_item: {
        suggest_recommend_id: 90,
        created_time: '2023-09-12T16:42:36+09:00',
        suggest_recommend_status: 1,
        with_address: false,
        address_free_text: '매물 주소를 공개하지 않겠습니다 이유는 딱히 없고요 테스트를 위해서입니다.',
        trade_or_deposit_price: 200000000,
        monthly_rent_fee: 1000000,
        jeonyong_areas: '35',
        floor: '23',
        direction: '북',
        buy_or_rent: 3,
        note: '200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기',
        chat_room_id: null,
      },
    },
    {
      suggest_item: {
        user_nickname: '샘리카카오로그인',
        user_profile_image_url:
          'https://negocio-user-photos.s3.ap-northeast-2.amazonaws.com/2023-8/249jYQSPoVvmsMcQTVr.PNG',
        created_time: '2023-09-12T14:45:06+09:00',
        realestate_types: '10',
        suggest_id: 117,
        suggest_status: 1,
        buy_or_rents: '2,3',
        trade_or_deposit_price: 100000000,
        monthly_rent_fee: 100000,
        pyoung_text: '20평, 24평, 34평, 35평, 46평',
        purpose: '',
        invest_amount: 0,
        quick_sale: null,
        negotiable: true,
        move_in_date: '2023-09-30T00:00:00+09:00',
        move_in_date_type: 3,
        note: '추가조건 없습니다.',
        request_target_text: '샘마을한양',
      },
      suggest_recommend_item: {
        suggest_recommend_id: 91,
        created_time: '2023-09-12T16:44:00+09:00',
        suggest_recommend_status: 1,
        with_address: false,
        address_free_text: '샘마을아파트 112동',
        trade_or_deposit_price: 200000000,
        monthly_rent_fee: 1000000,
        jeonyong_areas: '35',
        floor: '16',
        direction: '북서',
        buy_or_rent: 3,
        note: '200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기200자채우기',
        chat_room_id: null,
      },
    },
    {
      suggest_item: {
        user_nickname: '샘리카카오로그인',
        user_profile_image_url:
          'https://negocio-user-photos.s3.ap-northeast-2.amazonaws.com/2023-8/249jYQSPoVvmsMcQTVr.PNG',
        created_time: '2023-09-12T14:45:06+09:00',
        realestate_types: '10',
        suggest_id: 117,
        suggest_status: 1,
        buy_or_rents: '2,3',
        trade_or_deposit_price: 100000000,
        monthly_rent_fee: 100000,
        pyoung_text: '20평, 24평, 34평, 35평, 46평',
        purpose: '',
        invest_amount: 0,
        quick_sale: null,
        negotiable: true,
        move_in_date: '2023-09-30T00:00:00+09:00',
        move_in_date_type: 3,
        note: '추가조건 없습니다.',
        request_target_text: '샘마을한양',
      },
      suggest_recommend_item: {
        suggest_recommend_id: 92,
        created_time: '2023-09-12T16:45:39+09:00',
        suggest_recommend_status: 1,
        with_address: false,
        address_free_text: '샘마을아파트 112동',
        trade_or_deposit_price: 10000000,
        monthly_rent_fee: 0,
        jeonyong_areas: '13',
        floor: '16',
        direction: '서',
        buy_or_rent: 1,
        note: 'test',
        chat_room_id: null,
      },
    },
    {
      suggest_item: {
        user_nickname: '샘리카카오로그인',
        user_profile_image_url:
          'https://negocio-user-photos.s3.ap-northeast-2.amazonaws.com/2023-8/249jYQSPoVvmsMcQTVr.PNG',
        created_time: '2023-09-12T14:45:06+09:00',
        realestate_types: '10',
        suggest_id: 117,
        suggest_status: 1,
        buy_or_rents: '2,3',
        trade_or_deposit_price: 100000000,
        monthly_rent_fee: 100000,
        pyoung_text: '20평, 24평, 34평, 35평, 46평',
        purpose: '',
        invest_amount: 0,
        quick_sale: null,
        negotiable: true,
        move_in_date: '2023-09-30T00:00:00+09:00',
        move_in_date_type: 3,
        note: '추가조건 없습니다.',
        request_target_text: '샘마을한양',
      },
      suggest_recommend_item: {
        suggest_recommend_id: 93,
        created_time: '2023-09-12T17:12:17+09:00',
        suggest_recommend_status: 1,
        with_address: false,
        address_free_text: '샘마을아파트 112동',
        trade_or_deposit_price: 10000000,
        monthly_rent_fee: 0,
        jeonyong_areas: '100',
        floor: '16',
        direction: '동',
        buy_or_rent: 1,
        note: '평수면적 test',
        chat_room_id: null,
      },
    },
    {
      suggest_item: {
        user_nickname: '샘리카카오로그인',
        user_profile_image_url:
          'https://negocio-user-photos.s3.ap-northeast-2.amazonaws.com/2023-8/249jYQSPoVvmsMcQTVr.PNG',
        created_time: '2023-09-12T14:45:06+09:00',
        realestate_types: '10',
        suggest_id: 117,
        suggest_status: 1,
        buy_or_rents: '2,3',
        trade_or_deposit_price: 100000000,
        monthly_rent_fee: 100000,
        pyoung_text: '20평, 24평, 34평, 35평, 46평',
        purpose: '',
        invest_amount: 0,
        quick_sale: null,
        negotiable: true,
        move_in_date: '2023-09-30T00:00:00+09:00',
        move_in_date_type: 3,
        note: '추가조건 없습니다.',
        request_target_text: '샘마을한양',
      },
      suggest_recommend_item: {
        suggest_recommend_id: 95,
        created_time: '2023-09-13T10:03:19+09:00',
        suggest_recommend_status: 1,
        with_address: false,
        address_free_text: 'test',
        trade_or_deposit_price: 10000000,
        monthly_rent_fee: 0,
        jeonyong_areas: '',
        floor: '',
        direction: '',
        buy_or_rent: 1,
        note: 'test',
        chat_room_id: null,
      },
    },
  ],
};