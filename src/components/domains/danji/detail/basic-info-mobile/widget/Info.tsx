import { Table } from '@/components/molecules';

import { describeRealestateType } from '@/constants/enums';

import { formatUseAcceptedYear } from '@/utils/fotmat';

import falsy from '@/utils/falsy';

import TableField from './TableField';

import useConvertedFormat from '../hooks/useConvertedFormat';

import { CommonDanjiDetailProps } from '../../types';

function Info({ danji }: CommonDanjiDetailProps) {
  const { address, joinSaedaeDong, joinSaedaeDongValue } = useConvertedFormat({ danji });

  return (
    <Table>
      <Table.Body>
        <TableField title="주소" data={<span>{address}</span>} />
        <TableField
          title="건물형태"
          data={
            <>
              {describeRealestateType(danji?.type)} <span tw="text-info text-gray-700">{danji?.hall_type}</span>
            </>
          }
        />
        <TableField
          isRender={!(!danji?.total_dong_count && (!danji?.total_saedae_count || danji?.total_saedae_count === '0'))}
          title={joinSaedaeDong}
          data={joinSaedaeDongValue}
        />
        <TableField isRender={!!danji?.highest_floor} title="층수" data={`최고 ${danji?.highest_floor}층`} />
        <TableField isRender={!!danji?.heat_type} title="난방" data={danji?.heat_type} />
        <TableField
          isRender={!!(danji?.yongjuk_rate || danji?.gunpae_rate)}
          title="용적 / 건폐율"
          data={
            <>
              {danji?.yongjuk_rate && danji?.gunpae_rate && `${danji.yongjuk_rate}% / ${danji.gunpae_rate}%`}
              {danji?.yongjuk_rate && !danji?.gunpae_rate && `${danji.yongjuk_rate}%`}
              {!danji?.yongjuk_rate && danji?.gunpae_rate && `${danji.gunpae_rate}%`}
            </>
          }
        />
        <TableField isRender={!!danji?.sigong_company} title="건설사" data={danji?.sigong_company} />
        <TableField
          isRender={!!danji?.use_accepted_year}
          title="사용승인일"
          data={`${formatUseAcceptedYear(danji?.use_accepted_year)}`}
        />
        <TableField
          isRender={Number(danji?.daeji_area) > 0}
          title="대지면적"
          data={`${Number(danji?.daeji_area).toLocaleString()}㎡`}
        />
        <TableField
          isRender={Number(danji?.architecture_area) > 0}
          title="건축면적"
          data={`${Number(danji?.architecture_area).toLocaleString()}㎡`}
        />
        <TableField
          isRender={!!(danji?.parking_per_saedae || danji?.total_parking_count)}
          title="총 / 세대당"
          data={`${falsy(danji?.total_parking_count, '-')}대 / ${falsy(danji?.parking_per_saedae, '-')}대`}
        />
      </Table.Body>
    </Table>
  );
}

export default Info;
