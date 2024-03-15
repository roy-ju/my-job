import moment from 'moment';

import { ButtonV2 } from '@/components/atoms';

import { MarginTopSixteen, MarginTopTwenty } from '@/components/atoms/Margin';

import DownloadIcon from '@/assets/icons/download_20_2.svg';

import RefreshIcon from '@/assets/icons/refresh_20_2.svg';

import { SubHomeRealestatedocumentDetailResponse } from '@/services/sub-home/types';

import useNativeFileDownload from '@/hooks/useNativeFileDownload';

import { Line } from '../realestate-document-address-detail/widget/RealestateDocumentAddressDetailWidget';

import { AddressContainer, AddressWrraper } from './widget/RealestateDocumentDetailWidget';

type AddressProps = {
  info?: SubHomeRealestatedocumentDetailResponse['realestate_document_info'];
  pdfInfo?: SubHomeRealestatedocumentDetailResponse['realestate_document_pdf'];
  handleViewPreviousHistories: () => void;
  handleCheckUpdateRealestateDocument: () => void;
};

type Item = {
  danji_name?: string;
  road_name_address?: string;
  dong?: string;
  ho?: string;
};

export default function Address({
  info,
  pdfInfo,
  handleViewPreviousHistories,
  handleCheckUpdateRealestateDocument,
}: AddressProps) {
  const { downloadFile } = useNativeFileDownload();

  function makeTitle(item: Item) {
    if (item?.danji_name) {
      if (item?.dong && item?.ho) {
        return `${item.road_name_address} ${item.danji_name} ${item.dong}동 ${item.ho}호`;
      }

      if (item?.dong && !item?.ho) {
        return `${item.road_name_address} ${item.danji_name} ${item.dong}동`;
      }

      if (!item?.dong && item?.ho) {
        return `${item.road_name_address} ${item.danji_name} ${item.ho}호`;
      }

      return `${item.road_name_address} ${item.danji_name}`;
    }

    if (item.dong && item.ho) {
      return `${item.road_name_address} ${item.dong}동 ${item.ho}호`;
    }

    if (item.dong && !item.ho) {
      return `${item.road_name_address} ${item.dong}동`;
    }

    if (!item.dong && item.ho) {
      return `${item.road_name_address} ${item.ho}호`;
    }

    return item?.road_name_address ?? '';
  }

  return (
    <>
      <MarginTopTwenty />
      <AddressContainer tw="px-5">
        <AddressWrraper>
          <div tw="flex flex-col gap-0.5">
            <p tw="text-body_01 text-gray-700">건물 주소</p>
            <p tw="text-body_03 text-gray-800">
              {makeTitle({
                danji_name: info?.danji_name,
                road_name_address: info?.road_name_address,
                dong: info?.dong,
                ho: info?.ho,
              })}
            </p>
          </div>

          <MarginTopTwenty />
          <Line />
          <MarginTopTwenty />

          <div tw="flex justify-between items-center">
            <p tw="text-gray-800 text-subhead_02">안내사항</p>
            <button type="button" tw="text-gray-600 underline text-body_01" onClick={handleViewPreviousHistories}>
              이전 조회 이력
            </button>
          </div>

          <MarginTopSixteen />

          <div tw="flex flex-col gap-0.5">
            <div tw="flex items-center gap-1">
              <p tw="text-body_01 text-gray-700">-</p>
              {info?.created_time && (
                <p tw="text-body_01 text-gray-700">
                  <span tw="text-nego-800">{moment(info.created_time).format('YYYY-MM-DD')}</span>을 기준으로 가장
                  마지막에 조회한 내용입니다.
                </p>
              )}
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
            <ButtonV2
              variant="secondary"
              size="medium"
              radius="r100"
              tw="flex-1 gap-0.5 px-0"
              disabled={!pdfInfo?.realestate_document_path}
              onClick={() => {
                if (pdfInfo?.realestate_document_path) {
                  downloadFile(pdfInfo.realestate_document_path);
                }
              }}
            >
              <a tw="flex gap-0.5" href={pdfInfo?.realestate_document_path}>
                <DownloadIcon />
                등기부 PDF
              </a>
            </ButtonV2>
            <ButtonV2
              variant="secondaryOutline"
              size="medium"
              radius="r100"
              tw="flex-1 gap-0.5 whitespace-nowrap px-0"
              onClick={handleCheckUpdateRealestateDocument}
            >
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
