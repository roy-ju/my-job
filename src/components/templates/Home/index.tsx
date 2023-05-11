import { motion } from 'framer-motion';
import CharacterImage from '@/../public/static/images/character.png';
import MapSearchImage from '@/../public/static/images/map_search.png';
import LogoIcon from '@/assets/icons/header_logo.svg';
import { Button, Separator } from '@/components/atoms';
import { Accordion, Table } from '@/components/molecules';
import ChevronDown from '@/assets/icons/chevron_down_24.svg';
import tw, { styled } from 'twin.macro';
import InstagramIcon from '@/assets/icons/instagram.svg';
import YoutubeIcon from '@/assets/icons/youtube.svg';
import NaverBlogIcon from '@/assets/icons/naver_blog.svg';
import HouseIcon from '@/assets/icons/house.svg';
import DocumentIcon from '@/assets/icons/document.svg';
import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';
import AppleIcon from '@/assets/icons/apple_store.svg';
import GooglePlayIcon from '@/assets/icons/google_store.svg';

const StyledTable = styled.table`
  table-layout: fixed;
  td,
  th {
    ${tw`h-5 py-1 leading-5 text-info`}
    width: initial;
  }
  td {
    padding-left: 16px;
  }
  th {
    white-space: nowrap;
  }

  & > table > tr:not(:first-of-type) {
    ${tw`border-none`}
  }
`;

interface Props {
  loggedIn?: boolean;

  onClickLogin?: () => void;
  onClickSuggestion?: () => void;
  onClickBidding?: () => void;
  onClickListingCreate?: () => void;
  onClickHomeRegister?: () => void;
  onClickAppStore?: () => void;
  onClickGooglePlay?: () => void;
}

export default function Home({
  loggedIn,
  onClickLogin,
  onClickSuggestion,
  onClickBidding,
  onClickListingCreate,
  onClickHomeRegister,
}: Props) {
  return (
    <div>
      <div tw="pb-10" style={{ backgroundColor: '#F4F6FA' }}>
        <div tw="h-14 px-5 flex items-center justify-between">
          <LogoIcon tw="text-nego-1100" />
          {!loggedIn && (
            <Button
              size="none"
              variant="ghost"
              tw="h-6 px-2.5 rounded-lg border border-nego-1000 text-nego-1000 text-info hover:bg-nego-100"
              onClick={onClickLogin}
            >
              로그인
              <span tw="h-2 w-px bg-nego-1000 mx-1" />
              회원가입
            </Button>
          )}
        </div>
        <div tw="pt-4 px-6">
          <p tw="text-h1 font-bold mb-2">
            부동산 네고 전문가
            <br />
            네고시오
          </p>
          <p tw="text-b1">원하는 가격에 거래하세요.</p>
        </div>
        <div tw="flex gap-3 px-5 mt-4">
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            type="button"
            tw="relative text-start flex-1 rounded-lg h-[164px] px-2 shadow"
            style={{
              backgroundImage: `linear-gradient(90deg, #9368EF -31.1%, #5F52F6 100%)`,
            }}
            onClick={onClickSuggestion}
          >
            <p tw="absolute text-h3 leading-[26px] font-bold text-nego-300 top-4 left-4">
              원하는 가격에
              <br />
              <span tw="text-white">매물 추천</span>받기
            </p>
            <div
              tw="w-full h-full bg-[length:88px_88px] bg-right-bottom bg-no-repeat"
              style={{ backgroundImage: `url('${CharacterImage.src}')` }}
            />
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            type="button"
            tw="relative text-start flex-1 rounded-lg h-[164px] px-2 py-4 shadow"
            style={{
              background: 'linear-gradient(90deg, #9368EF -31.1%, #5F52F6 100%)',
            }}
            onClick={onClickBidding}
          >
            <p tw="absolute text-h3 leading-[26px] font-bold text-nego-300 top-4 left-4">
              매물 찾아서
              <br />
              <span tw="text-white">가격제안</span>하러 가기
            </p>
            <div
              tw="w-full h-full bg-[length:75px_50px] bg-right-bottom bg-no-repeat"
              style={{ backgroundImage: `url('${MapSearchImage.src}')` }}
            />
          </motion.button>
        </div>
      </div>
      <Separator tw="bg-gray-300" />
      <div tw="py-10 px-5">
        <div tw="mb-6">
          <div tw="pl-1 text-info leading-4 mb-2">우리집 서비스</div>
          <div tw="flex gap-3">
            <Button tw="flex-1" variant="outlined" size="bigger" onClick={onClickHomeRegister}>
              <div tw="flex items-center w-full gap-2">
                <HouseIcon />
                <span tw="whitespace-nowrap">집주소 등록</span>
                <ChevronLeftIcon tw="text-gray-700 w-4 h-4 ml-auto rotate-180" />
              </div>
            </Button>
            <Button tw="flex-1" variant="outlined" size="bigger" onClick={onClickListingCreate}>
              <div tw="flex items-center w-full gap-2">
                <DocumentIcon />
                <span tw="whitespace-nowrap">매물등록 신청</span>
                <ChevronLeftIcon tw="text-gray-700 w-4 h-4 ml-auto rotate-180" />
              </div>
            </Button>
          </div>
        </div>
        <div tw="mb-10">
          <div tw="pl-1 text-info leading-4 mb-2">앱 다운로드</div>
          <div tw="flex gap-3">
            <Button tw="flex-1 p-0" variant="outlined" size="bigger">
              <AppleIcon tw="w-6 h-6 mr-2" />
              <span tw="whitespace-nowrap">앱스토어에서 설치</span>
            </Button>
            <Button tw="flex-1 p-0" variant="outlined" size="bigger">
              <GooglePlayIcon tw="w-6 h-6 mr-2" />
              <span tw="whitespace-nowrap">구글플레이에서 설치</span>
            </Button>
          </div>
        </div>
        <div tw="flex items-center mb-2">
          <Button size="none" variant="ghost" tw="text-info font-bold text-gray-700">
            이용약관
          </Button>
          <span tw="h-2 w-px bg-gray-300 mx-2" />
          <Button size="none" variant="ghost" tw="text-info font-bold text-gray-700">
            개인정보처리방침
          </Button>
        </div>
        <Accordion>
          <Accordion.Summary hideArrow tw="w-fit">
            <div tw="flex items-center gap-2">
              <span tw="text-info text-gray-700 font-bold">네고시오 사업자정보</span>
              <ChevronDown tw="w-4 h-4 text-gray-700" />
            </div>
          </Accordion.Summary>
          <Accordion.Details>
            <StyledTable tw="mt-1">
              <Table.Body>
                <Table.Row>
                  <Table.Head>회사명</Table.Head>
                  <Table.Data>주식회사 네고시오</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>대표</Table.Head>
                  <Table.Data>우성남</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>개인정보 관리 책임자</Table.Head>
                  <Table.Data>Lee Sam</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>사업자 등록번호</Table.Head>
                  <Table.Data>130-88-02097</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>통신판매업 신고번호</Table.Head>
                  <Table.Data>2021-서울강남-04487 호</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>주소</Table.Head>
                  <Table.Data>서울 강남구 선릉로94번길 11, 4층 (삼성동, 삼성2빌딩)</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>이메일</Table.Head>
                  <Table.Data>info@negocio.co.kr</Table.Data>
                </Table.Row>
                <Table.Row>
                  <Table.Head>전화</Table.Head>
                  <Table.Data>02-6956-0155</Table.Data>
                </Table.Row>
              </Table.Body>
            </StyledTable>
          </Accordion.Details>
        </Accordion>
        <div tw="mt-2 text-b2 font-bold">
          <span tw="mr-2">고객센터</span>
          <span>02-6956-0155</span>
        </div>
        <div tw="flex mt-2 items-center justify-between">
          <Button variant="outlined" size="medium" tw="text-info">
            네고시오 중개사
          </Button>
          <div tw="flex gap-3">
            <Button size="none" variant="ghost">
              <InstagramIcon />
            </Button>
            <Button size="none" variant="ghost">
              <YoutubeIcon />
            </Button>
            <Button size="none" variant="ghost">
              <NaverBlogIcon />
            </Button>
          </div>
        </div>
        <div tw="mt-2 text-[10px] leading-4 text-gray-700">ⓒ 2023. Negocio All rights reserved.</div>
      </div>
    </div>
  );
}
