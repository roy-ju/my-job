import { Fragment, useMemo } from 'react';

import { KakaoMapCategoryCode } from '@/lib/kakao/kakao_map_category';

import { customAlphabet } from 'nanoid';

import BUSANFOUR from '@/assets/mapsubwayicons/busan_four.svg';
import BUSANONE from '@/assets/mapsubwayicons/busan_one.svg';
import BUSANTHREE from '@/assets/mapsubwayicons/busan_three.svg';
import BUSANTWO from '@/assets/mapsubwayicons/busan_two.svg';
import DAEJEONGWANGYEOK from '@/assets/mapsubwayicons/chooncheong_gwangyeok.svg';
import DAEGUGWANGYEOK from '@/assets/mapsubwayicons/daegu_gwangyeok.svg';
import DAEGUTHREE from '@/assets/mapsubwayicons/daegu_three.svg';
import DAEJEONONE from '@/assets/mapsubwayicons/daejeon_one.svg';
import DAEJEONTWO from '@/assets/mapsubwayicons/daejeon_two.svg';
import DAEGUONE from '@/assets/mapsubwayicons/dague_one.svg';
import DAEGUTWO from '@/assets/mapsubwayicons/dague_two.svg';
import DONGBOOK from '@/assets/mapsubwayicons/dongbook.svg';
import BUSANDONGHAE from '@/assets/mapsubwayicons/donghae.svg';
import SEOULEIGHT from '@/assets/mapsubwayicons/eight.svg';
import EUIJUNGBOO from '@/assets/mapsubwayicons/euijungboo.svg';
import DAEGUEXCO from '@/assets/mapsubwayicons/exco.svg';
import SEOULFIVE from '@/assets/mapsubwayicons/five.svg';
import SEOULFOUR from '@/assets/mapsubwayicons/four.svg';
import BUSANGIMHAE from '@/assets/mapsubwayicons/gimhae.svg';
import GIMPO from '@/assets/mapsubwayicons/gimpo.svg';
import GONGHANG from '@/assets/mapsubwayicons/gonghang.svg';
import GONGHANGDIRECT from '@/assets/mapsubwayicons/gonghangj_direct.svg';
import GTXA from '@/assets/mapsubwayicons/gtx_a.svg';
import GTXB from '@/assets/mapsubwayicons/gtx_b.svg';
import GTXC from '@/assets/mapsubwayicons/gtx_c.svg';
import GWANGJUONE from '@/assets/mapsubwayicons/gwangju_one.svg';
import GWANGJUTWO from '@/assets/mapsubwayicons/gwangju_two.svg';
import GYEONGANG from '@/assets/mapsubwayicons/gyeongang.svg';
import GYEONGCHOON from '@/assets/mapsubwayicons/gyeongchoon.svg';
import GYEONGEUIJOONGANG from '@/assets/mapsubwayicons/gyeongeuij.svg';
import BUSANGYEONGJEON from '@/assets/mapsubwayicons/gyeongjeon.svg';
import INCHEONONE from '@/assets/mapsubwayicons/incheon_1.svg';
import INCHEONTWO from '@/assets/mapsubwayicons/incheon_2.svg';
import JAGIBOOSANG from '@/assets/mapsubwayicons/jagiboosang.svg';
import SEOULNINE from '@/assets/mapsubwayicons/nine.svg';
import SEOULONE from '@/assets/mapsubwayicons/one.svg';
import BUSANORYUKDO from '@/assets/mapsubwayicons/oryukdo.svg';
import BUSANSASANG from '@/assets/mapsubwayicons/sasang.svg';
import SEOHAE from '@/assets/mapsubwayicons/seohae.svg';
import SEOULSEVEN from '@/assets/mapsubwayicons/seven.svg';
import SHINANSAN from '@/assets/mapsubwayicons/shin_ansan.svg';
import SHINBOONDANG from '@/assets/mapsubwayicons/shin_boondang.svg';
import SINRIM from '@/assets/mapsubwayicons/sinrim.svg';
import SEOULSIX from '@/assets/mapsubwayicons/six.svg';
import SOOINBOONDANG from '@/assets/mapsubwayicons/sooinboondang.svg';
import SEOULTHREE from '@/assets/mapsubwayicons/three.svg';
import SEOULTWO from '@/assets/mapsubwayicons/two.svg';
import WERAE from '@/assets/mapsubwayicons/werae.svg';
import WERAESINSA from '@/assets/mapsubwayicons/weraesinsa.svg';
import WOOI from '@/assets/mapsubwayicons/wooi.svg';
import BUSANYANGSAN from '@/assets/mapsubwayicons/yangsan.svg';
import YONGIN from '@/assets/mapsubwayicons/yongin.svg';

const IconStyleNormal = {
  height: '100%',
};

const convertNumberToStringSubway = ({ categoryGroupName }: { categoryGroupName: string }) => {
  if (categoryGroupName && categoryGroupName.includes('수도권1호선')) {
    return (
      <div>
        <SEOULONE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('수도권2호선')) {
    return (
      <div>
        <SEOULTWO style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('수도권3호선')) {
    return (
      <div>
        <SEOULTHREE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('수도권4호선')) {
    return (
      <div>
        <SEOULFOUR style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('수도권5호선')) {
    return (
      <div>
        <SEOULFIVE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('수도권6호선')) {
    return (
      <div>
        <SEOULSIX style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('수도권7호선')) {
    return (
      <div>
        <SEOULSEVEN style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('수도권8호선')) {
    return (
      <div>
        <SEOULEIGHT style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('수도권9호선')) {
    return (
      <div>
        <SEOULNINE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('우이신설')) {
    return (
      <div>
        <WOOI style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('신림선')) {
    return (
      <div>
        <SINRIM style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('동북')) {
    return (
      <div>
        <DONGBOOK style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('위례신사')) {
    return (
      <div>
        <WERAESINSA style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('위례')) {
    return (
      <div>
        <WERAE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('인천1호선')) {
    return (
      <div>
        <INCHEONONE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('인천2호선')) {
    return <INCHEONTWO style={IconStyleNormal} />;
  }

  if (categoryGroupName && categoryGroupName.includes('경의중앙선')) {
    return (
      <div>
        <GYEONGEUIJOONGANG style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('경춘선')) {
    return (
      <div>
        <GYEONGCHOON style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('수인분당선')) {
    return (
      <div>
        <SOOINBOONDANG style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('경강선')) {
    return (
      <div>
        <GYEONGANG style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('서해선')) {
    return (
      <div>
        <SEOHAE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('공항직통')) {
    return (
      <div>
        <GONGHANGDIRECT style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('공항철도')) {
    return (
      <div>
        <GONGHANG style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('신분당선')) {
    return (
      <div>
        <SHINBOONDANG style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('신안산선')) {
    return (
      <div>
        <SHINANSAN style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('gtx_a')) {
    return (
      <div>
        <GTXA style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('gtx_b')) {
    return (
      <div>
        <GTXB style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('gtx_c')) {
    return (
      <div>
        <GTXC style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('의정부경전철')) {
    return (
      <div>
        <EUIJUNGBOO style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('용인')) {
    return (
      <div>
        <YONGIN style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('김포')) {
    return (
      <div>
        <GIMPO style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('자기부상')) {
    return (
      <div>
        <JAGIBOOSANG style={IconStyleNormal} />
      </div>
    );
  }

  // 부산
  if (categoryGroupName && categoryGroupName.includes('부산1호선')) {
    return (
      <div>
        <BUSANONE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('부산2호선')) {
    return (
      <div>
        <BUSANTWO style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('부산3호선')) {
    return (
      <div>
        <BUSANTHREE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('부산4호선')) {
    return (
      <div>
        <BUSANFOUR style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('사상하단선')) {
    return (
      <div>
        <BUSANSASANG style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('김해')) {
    return (
      <div>
        <BUSANGIMHAE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('동해')) {
    return (
      <div>
        <BUSANDONGHAE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('경전')) {
    return (
      <div>
        <BUSANGYEONGJEON style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('양산')) {
    return (
      <div>
        <BUSANYANGSAN style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('오륙도')) {
    return (
      <div>
        <BUSANORYUKDO style={IconStyleNormal} />
      </div>
    );
  }

  // 대구
  if (categoryGroupName && categoryGroupName.includes('대구1호선')) {
    return (
      <div>
        <DAEGUONE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('대구2호선')) {
    return (
      <div>
        <DAEGUTWO style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('대구3호선')) {
    return (
      <div>
        <DAEGUTHREE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('대구엑스코')) {
    return (
      <div>
        <DAEGUEXCO style={IconStyleNormal} />
      </div>
    );
  }
  if (categoryGroupName && categoryGroupName.includes('대구광역')) {
    return (
      <div>
        <DAEGUGWANGYEOK style={IconStyleNormal} />
      </div>
    );
  }

  // 광주
  if (categoryGroupName && categoryGroupName.includes('광주1호선')) {
    return (
      <div>
        <GWANGJUONE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('광주2호선')) {
    return (
      <div>
        <GWANGJUTWO style={IconStyleNormal} />
      </div>
    );
  }

  // 대전
  if (categoryGroupName && categoryGroupName.includes('대전1호선')) {
    return (
      <div>
        <DAEJEONONE style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('대전2호선')) {
    return (
      <div>
        <DAEJEONTWO style={IconStyleNormal} />
      </div>
    );
  }

  if (categoryGroupName && categoryGroupName.includes('충청광역')) {
    return (
      <div>
        <DAEJEONGWANGYEOK style={IconStyleNormal} />
      </div>
    );
  }

  return null;
};

const SubwayFormatUI = ({
  categoryGroupName,
  categoryGroupCode,
}: {
  categoryGroupName: string | string[];
  categoryGroupCode: string;
}) => {
  const nanoId = customAlphabet('1234567890abcedfgh');

  const subwayComponent = useMemo(() => {
    if (categoryGroupCode !== KakaoMapCategoryCode.SUBWAY) {
      return null;
    }

    if (typeof categoryGroupName === 'string') {
      return convertNumberToStringSubway({
        categoryGroupName,
      });
    }

    return (
      <div tw="flex items-center gap-1">
        {categoryGroupName.map((item) => (
          <Fragment key={nanoId()}>{convertNumberToStringSubway({ categoryGroupName: item })}</Fragment>
        ))}
      </div>
    );
  }, [categoryGroupCode, categoryGroupName, nanoId]);

  return subwayComponent;
};

export default SubwayFormatUI;
