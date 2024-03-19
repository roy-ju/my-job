import Image from 'next/image';

import moment from 'moment';

import { ButtonV2 } from '@/components/atoms';

import { MarginTopSixteen, MarginTopTwenty } from '@/components/atoms/Margin';

import RefreshIcon from '@/assets/icons/refresh_20_2.svg';

import { SubHomeRealestatedocumentDetailResponse } from '@/services/sub-home/types';

import useNativeFileDownload from '@/hooks/useNativeFileDownload';

import useIsNativeApp from '@/hooks/useIsNativeApp';

import TextButton from '@/components/atoms/TextButton';

import PdfIcon from '@/../public/static/images/pdf_20_2.png';

import { Line } from '../realestate-document-address-detail/widget/RealestateDocumentAddressDetailWidget';

import {
  AddressContainer,
  AddressTop,
  AddressWrraper,
  ColumnGapOneHalf,
  RowGapOne,
  CtaWrraper,
  Info,
  RowCenter,
  RowVerticalCenter,
  SmallTitle,
  StrikeText,
} from './widget/RealestateDocumentDetailWidget';

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
  const isNaitiveApp = useIsNativeApp();

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
          <AddressTop>
            <p>건물 주소</p>
            <p>
              {makeTitle({
                danji_name: info?.danji_name,
                road_name_address: info?.road_name_address,
                dong: info?.dong,
                ho: info?.ho,
              })}
            </p>
          </AddressTop>
          <MarginTopTwenty />
          <Line />
          <MarginTopTwenty />
          <RowCenter>
            <SmallTitle>안내사항</SmallTitle>
            <TextButton variant="underline" size="small" onClick={handleViewPreviousHistories} title="이전 조회 이력" />
          </RowCenter>
          <MarginTopSixteen />
          <ColumnGapOneHalf>
            <RowVerticalCenter>
              <Info>-</Info>
              {info?.created_time && (
                <Info>
                  <StrikeText>{moment(info.created_time).format('YYYY-MM-DD')}</StrikeText>을 기준으로 가장 마지막에
                  조회한 내용입니다.
                </Info>
              )}
            </RowVerticalCenter>
            <RowVerticalCenter>
              <Info>-</Info>
              <Info>최신 등기부는 등기부 업데이트를 통해 확인해주세요.</Info>
            </RowVerticalCenter>
            <RowGapOne>
              <Info>-</Info>
              <Info>
                등기부 등본을 요약한 내용으로 자세한 사항은 <StrikeText>등기부 PDF</StrikeText>를 참고해주세요.
              </Info>
            </RowGapOne>
          </ColumnGapOneHalf>
          <MarginTopTwenty />
          <CtaWrraper>
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
              {isNaitiveApp ? (
                <>
                  <Image alt="pdfIcon" src={PdfIcon.src} width={20} height={20} />
                  등기부 PDF
                </>
              ) : (
                <a tw="flex gap-0.5" href={pdfInfo?.realestate_document_path}>
                  <>
                    <Image alt="pdfIcon" src={PdfIcon.src} width={20} height={20} />
                    등기부 PDF
                  </>
                </a>
              )}
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
          </CtaWrraper>
        </AddressWrraper>
      </AddressContainer>
      <MarginTopTwenty />
    </>
  );
}
