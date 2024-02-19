const ErrorCodes = {
  // 1000~
  DUPLICATED_NICKNAME: 1009, // 중복된 닉네임
  UNDER_NINETEEN: 1011, // 19세이하 회원가입 불가
  USER_IS_INACTIVE: 1013, // 휴면처리된 계정
  USER_IS_SUSPENDED: 1014, // 정지된 계정
  CI_DOESNT_MATCH: 1016, // 본인인증 실패
  USER_IS_ALREADY_REGISTERED_WITH_KAKAO: 1017, // 카카오 간편로그인으로 이미 가입된 계정
  USER_IS_ALREADY_REGISTERED_WITH_APPLE: 1018, // 애플 간편로그인으로 이미 가입된 계정
  MAX_SMS_ATTEMPS_REACHED: 1019, // 문자인증 발송 횟수 초과
  PHONE_VERIFICATION_NUMBER_EXPIRED: 1020, // 문자인증코드 유효기간 만료
  PHONE_VERIFICATION_NUMBER_NOT_MATCH: 1021, // 문자인증코드 유효기간 맞지않음
  DUPLCATED_CI: 1022, // 이미 본인인증됐음
  DUPLICATED_EMAIL: 1023, // 이미 사용중인 이메일
  USER_IS_NOT_REGISTERED_WITH_CI: 1024, // 본인인증이 되지 않은 계정
  CANNOT_UPDATE_NAME: 1025, // 이름을 업데이트할 수 없음
  CANNOT_UPDATE_NICKNAME: 1025, // 닉네임을 업데이트할 수 없음
  PIN_VERIFICATION_FAILED: 1026, // 핀번호 인증 실패
  PIN_IS_LOCKED: 1027, // 핀번호 입력횟수 초과로 잠겨있음
  WITHDRAW_FAILED: 1028, // 출금실패
  LISTING_IS_CANCELLED: 1030, // 등록취소된 매물
  FAILED_TO_VERIFY_OWNERSHIP: 1031, // 소유자 인증실패 및 등기부 사이트 주소 조회 서비스 불가 에러
  FAILED_TO_INVALID_ADDRESSDETAIL: 2005, // 소유자 인증실패 및 등기부 사이트 주소 조회 서비스 불가 에러
  ALREADY_ANSWERED_SURVEY: 1032, // 이미 설문조사에 참여했음
  NEGOTIATOR_ALREADY_EXISTS: 1033, // 우선협상자 존재함
  AUCTION_ENDED: 1034, // 입찰이 종료됨
  CANNOT_CREATE_BIDDING_AFTER_10: 1035, // 입찰일 경우 10시 이후에는 참여불가
  ALREADY_SELECTED_AGENT: 1037, // 하루에 5번 카운트
  INVALID_SELECT_AGENT: 1038, // 유효하지않은 중개사 선택일때

  SYSTEM_ERROR_OUTERAPI: 1031, // 시스템 점검중
  SYSTEM_ERROR_OUTERAPI2: 1030, // 시스템 점검중
  CANNOT_VERIFIED_COUNT_REACHED_LIMIT: 1036, // 하루에 5번 카운트
  ALREADY_REGISTERED_ADDRESS: 1040, // 하루에 5번 카운트

  // 1100~
  AGENT_IS_NOT_BEING_ASSIGNED: 1118,
  ALREADY_REGISTER_LISTING: 1120,

  // 1200~
  OPINION_HAS_LEFT: 1200, // 이미 작성한 게시글일때
  OPINION_LISTING_INACTIVATED: 1201, // 매물이 활성화되지 않았을 때
  OPINION_DUPLICATED: 1202, // 이미 같은 가격의 오피니언이 존재함
  OPINION_SUSPENDED_GLOBAL: 1203, // 오피니언 활동 제한 안내
  OPINION_TODAY_END: 1204, // 유저 하루동안 최초 참여 10개 미만
  OPINION_FULL: 1205, // 매물 오피니언 100개 초과
  OPINION_MAX: 1206, // 오피니언 최대치 초과
  OPINION_MIN: 1207, // 오피니언이 0보다 작거나 같음
  OPINION_REPORT_DUPLICATED: 1209, // 이미 신고한 오피니언
  OPINION_CANNOT_UPDATED: 1210, // 특정매물의 오피니언에만 글을 수정 못할때
  OPINION_SUSPENDED_USER: 1211, // 일정기간 글로벌 제한
  OPINION_TARGET_PRICE_CHANGE: 1212, // 가격정보가 변경되었을 때

  // 2000~
  DUPLICATED_LISTING: 2001, // 이미 등록된 매물
  LISTING_DOES_NOT_EXIST: 2002, // 존재하지 않는 매물
  INACCURATE_ADDRESS_DETAIL: 2005, // 잘못된 주소
  MAX_OWNERSHIP_VERIFICATION_ATTEMPS: 2006, // 최대 등기부 조회 가능한 횟수 초과
  UNABLE_TO_VALIDATE_OWNER: 2007, // 매물소유자 명의로 본인인증이 필요함
  ALREADY_VERIFIED: 2009, // 이미 소유자 인증이 완료됨
  BIDDING_DEPOSIT_DEPOSITED: 2012, // 제안보증금이 이미 납부됨
  SMS_COUNT_REACHED_LIMIT: 2015, // 하루 최대 발송가능횟수 초과
  ALREADY_VERIFIED_BY_THE_OTHER_OWNER: 2020, // 다른 소유자가 매물등록을 동의했음
  CANNOT_DELETE_MY_LISTING: 2021, // 매물등록신청 삭제 불가
  CHATROOM_CLOSE_FAILED: 2027, // 채팅방 나가기 실패

  // 2200~
  INVALID_BIDDING_PRICE: 2203, // 변경가능한 제안가격이 아님
  INVALID_TARGET_PRICE: 2206, // 변경가능한 희망가격이 아님
  HIGHEST_BIDDING_PRICE_DOES_NOT_MATCH: 2207, // 제안가 수락할때 최고제안가 변동이 있어서 다시시도해야함
  SAME_TARGET_PRICE: 2208, // 변동사항이 없음
  TARGET_PRICE_IS_HIGHEST_BIDDING_PRICE: 2209, // 변경하려는 희망가가 최고제안가랑 같아서 제안가수락을 해야함
  BIDDING_PRICE_IS_TARGET_PRICE: 2210, // 변경하려는 제안가가 희망가랑 같아서 희망가 수락을 해야함
  CANNOT_ACCEPT_BIDDING_WAITING_FOR_LISTING_UPDATE_AGREEMENT: 2211, // 최고제안자가 변경조건동의 대기중일경우 최고가 수락을 할 수 없음
  CANNOT_VIEW_ESCROW_INFO_WHEN_DEPOSIT_IS_COMPLETED: 2212, // 이미 입금된 케이스
  EXPIRED_ESCROW_ACCOUNT: 2214, // 가상 계좌 만료되었을때 (2214)
  SAME_BIDDING_PRICE: 2213, // 변동사항이 없음
  ESCROW_ACCOUNT_HAS_NOT_BEEN_CREATED: 2215, // 가상계좌 생성전이기 때문에 새로운 결제창 보여주는 경우기 때문에 parameter들을 가져와서 결제창 띄운다.
  ESCROW_DEPOSIT_ALREADY_MADE: 2216, // 이미 납부 완료됨

  // 3000~
  DANJI_NOT_FOUND: 3000, // 단지정보를 가지고올수없음

  // 4000~
  NOTEXIST_LAWQNA: 4004, // 게시물이 없을때

  // 5000~
  NEGOPOINT_UNABLE_TO_CONVERT: 5000, // 네고포인트를 네고머니로 전환할 수 없음
  NEGOPOINT_LACK_OF_BALANCE: 5001, // 현재 보유 네고포인트가 부족함

  // 클라이언트 전용 에러코드
  MULTIPLE_ADDRESSES_FOUND: 10000,
};

export default ErrorCodes;
