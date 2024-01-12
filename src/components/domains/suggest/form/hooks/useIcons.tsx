import React, { ReactNode } from 'react';

import Image from 'next/image';

import BuyPurpose from '@/../public/static/images/suggests/Direct_Hit.png';
import WantedHome from '@/../public/static/images/suggests/House_With_Garden.png';
import AdditionalConditions from '@/../public/static/images/suggests/Light_Bulb.png';
import Location from '@/../public/static/images/suggests/Round_Pushpin.png';
import Interview from '@/../public/static/images/suggests/Telephone.png';
import Area from '@/../public/static/images/suggests/Triangular_Ruler.png';
import Sun from '@/../public/static/images/suggests/Sun.png';
import ShushingFace from '@/../public/static/images/suggests/Shushing_Face.png';
import Elevator from '@/../public/static/images/suggests/Elevator.png';
import Bed from '@/../public/static/images/suggests/Bed.png';
import Worker from '@/../public/static/images/suggests/Man_Construction_Worker_Light_Skin_Tone.png';
import Hammer from '@/../public/static/images/suggests/Hammer_And_Wrench.png';
import PawPrints from '@/../public/static/images/suggests/Paw_Prints.png';
import MoneyBag from '@/../public/static/images/suggests/Money_Bag.png';
import DollarBanknote from '@/../public/static/images/suggests/Dollar_Banknote.png';
import Bank from '@/../public/static/images/suggests/Bank.png';
import BustInSilhouette from '@/../public/static/images/suggests/Bust_In_Silhouette.png';
import BustsInSilhouette from '@/../public/static/images/suggests/Busts_In_Silhouette.png';
import Automobile from '@/../public/static/images/suggests/Oncoming_Automobile.png';
import School from '@/../public/static/images/suggests/School.png';
import Tram from '@/../public/static/images/suggests/Tram.png';
import Tent from '@/../public/static/images/suggests/Tent.png';
import Castle from '@/../public/static/images/suggests/Castle.png';
import DeciduousTree from '@/../public/static/images/suggests/Deciduous_Tree.png';
import ShoppingBags from '@/../public/static/images/suggests/Shopping_Bags.png';
import Sparkles from '@/../public/static/images/suggests/Sparkles.png';
import Toilet from '@/../public/static/images/suggests/Toilet.png';
import Television from '@/../public/static/images/suggests/Television.png';
import Houses from '@/../public/static/images/suggests/Houses.png';
import House from '@/../public/static/images/suggests/House.png';
import Calendar from '@/../public/static/images/suggests/Spiral_Calendar.png';

export default function useIcons() {
  const iconObj: Record<string, ReactNode> = {
    /** 요약페이지에서 사용됨 */
    위치: <Image src={Location} width={20} height={20} alt="location" />,
    '원하는 집': <Image src={WantedHome} width={20} height={20} alt="wantedHome" />,
    '거래 목적': <Image src={BuyPurpose} width={20} height={20} alt="buyPurpose" />,
    '희망 입주 날짜': <Image src={Calendar} width={20} height={20} alt="calendar" />,
    평수: <Image src={Area} width={20} height={20} alt="area" />,
    인터뷰: <Image src={Interview} width={20} height={20} alt="interview" />,

    /** 해시태그 고르는 곳에서 사용됨 */
    '추가 조건': <Image src={AdditionalConditions} width={20} height={20} alt="additionalConditions" />,
    앞동: <Image src={Sun} width={20} height={20} alt="sun" />,
    조용한동: <Image src={ShushingFace} width={20} height={20} alt="shushingFace" />,

    '1층': <Image src={Elevator} width={20} height={20} alt="elevator" />,
    로열층: <Image src={Elevator} width={20} height={20} alt="elevator" />,
    낮은층: <Image src={Elevator} width={20} height={20} alt="elevator" />,
    높은층: <Image src={Elevator} width={20} height={20} alt="elevator" />,
    중간층: <Image src={Elevator} width={20} height={20} alt="elevator" />,
    탑층: <Image src={Elevator} width={20} height={20} alt="elevator" />,
    저층: <Image src={Elevator} width={20} height={20} alt="elevator" />,
    단층: <Image src={Elevator} width={20} height={20} alt="elevator" />,
    '2층이상': <Image src={Elevator} width={20} height={20} alt="elevator" />,

    방2개: <Image src={Bed} width={20} height={20} alt="bed" />,
    방3개: <Image src={Bed} width={20} height={20} alt="bed" />,
    방4개: <Image src={Bed} width={20} height={20} alt="bed" />,

    인테리어예정: <Image src={Worker} width={20} height={20} alt="worker" />,

    올수리되어있는: <Image src={Hammer} width={20} height={20} alt="hammer" />,

    반려동물가능: <Image src={PawPrints} width={20} height={20} alt="pawPrints" />,

    반전세가능: <Image src={MoneyBag} width={20} height={20} alt="moneyBag" />,

    보증금조정가능: <Image src={DollarBanknote} width={20} height={20} alt="dollarBanknote" />,

    전세자금대출: <Image src={Bank} width={20} height={20} alt="bank" />,

    '500세대~': <Image src={BustInSilhouette} width={20} height={20} alt="bustInSilhouette" />,

    '1000세대~': <Image src={BustsInSilhouette} width={20} height={20} alt="bustsInSilhouette" />,

    주차가능: <Image src={Automobile} width={20} height={20} alt="automobile" />,
    주차1대: <Image src={Automobile} width={20} height={20} alt="automobile" />,
    주차2대: <Image src={Automobile} width={20} height={20} alt="automobile" />,
    주차3대이상: <Image src={Automobile} width={20} height={20} alt="automobile" />,

    학군: <Image src={School} width={20} height={20} alt="school" />,
    역세권: <Image src={Tram} width={20} height={20} alt="tram" />,
    편의시설: <Image src={ShoppingBags} width={20} height={20} alt="shoppingBags" />,

    소단지: <Image src={Tent} width={20} height={20} alt="tent" />,
    대단지: <Image src={Castle} width={20} height={20} alt="castle" />,

    자연환경: <Image src={DeciduousTree} width={20} height={20} alt="deciduousTree" />,

    '신축(~5년)': <Image src={Sparkles} width={20} height={20} alt="sparkles" />,
    '신축(~10년)': <Image src={Sparkles} width={20} height={20} alt="sparkles" />,

    개별단독: <Image src={House} width={20} height={20} alt="house" />,

    타운하우스: <Image src={Houses} width={20} height={20} alt="houses" />,

    화장실2개: <Image src={Toilet} width={20} height={20} alt="toilet" />,
    화장실3개이상: <Image src={Toilet} width={20} height={20} alt="toilet" />,

    풀옵션필수: <Image src={Television} width={20} height={20} alt="television" />,
    풀옵션선호: <Image src={Television} width={20} height={20} alt="television" />,
  };

  return { iconObj };
}
