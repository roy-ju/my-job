import { ButtonV2 } from '@/components/atoms';

import { MarginTopSixteen, MarginTopTwenty } from '@/components/atoms/Margin';

import DownloadIcon from '@/assets/icons/download_20_2.svg';
import RefreshIcon from '@/assets/icons/refresh_20_2.svg';
import { Line } from '../realestate-document-address-detail/widget/RealestateDocumentAddressDetailWidget';

import { AddressContainer, AddressWrraper } from './widget/RealestateDocumentDetailWidget';

export default function Address() {
  return (
    <>
      <MarginTopTwenty />
      <AddressContainer>
        <AddressWrraper>
          <div tw="flex flex-col gap-0.5">
            <p tw="text-body_01 text-gray-700">건물 주소</p>
            <p tw="text-body_03 text-gray-800">서울시 강남구 선릉로 221</p>
          </div>

          <MarginTopTwenty />
          <Line />
          <MarginTopTwenty />

          <div tw="flex justify-between items-center">
            <p tw="text-gray-800 text-subhead_02">안내사항</p>
            <button type="button" tw="text-gray-600 underline text-body_01">
              이전 조회 이력
            </button>
          </div>

          <MarginTopSixteen />

          <div tw="flex flex-col gap-0.5">
            <div tw="flex items-center gap-1">
              <p tw="text-body_01 text-gray-700">-</p>
              <p tw="text-body_01 text-gray-700">
                <span tw="text-nego-800">2024-01-01</span>을 기준으로 가장 마지막에 조회한 내용입니다.
              </p>
            </div>

            <div tw="flex items-center gap-1">
              <p tw="text-body_01 text-gray-700">-</p>
              <p tw="text-body_01 text-gray-700">최신 등기부는 등기부 업데이트를 통해 확인해주세요.</p>
            </div>

            <div tw="flex gap-1">
              <p tw="text-body_01 text-gray-700">-</p>
              <p tw="text-body_01 text-gray-700">
                등기부 등본을 요약한 내용으로 자세한 사항은 <span tw="text-nego-800">등기부 PDF</span>를
                다운로드해주세요.
              </p>
            </div>
          </div>

          <MarginTopTwenty />

          <div tw="flex items-center gap-3">
            <ButtonV2 variant="secondary" size="medium" radius="r100" tw="flex-1 gap-0.5 px-0">
              <DownloadIcon />
              등기부 PDF
            </ButtonV2>
            <ButtonV2 variant="secondaryOutline" size="medium" radius="r100" tw="flex-1 gap-0.5 whitespace-nowrap px-0">
              <RefreshIcon />
              등기부 업데이트
            </ButtonV2>
          </div>
        </AddressWrraper>
      </AddressContainer>
      <MarginTopTwenty />
    </>
  );
}
