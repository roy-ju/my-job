import { useRef, useState, useEffect } from 'react';

import Image from 'next/image';

import Phone1 from '@/../public/static/images/landing/intro_phone3.png';

import Phone2 from '@/../public/static/images/landing/intro_phone4.png';

export default function IntroSectionFive({ isMobileSize }: { isMobileSize: boolean }) {
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const carouselItemWidth = isMobileSize ? 320 : 540;
  const carouselItemGap = isMobileSize ? 0 : 72;

  const [carouselItemIndex, setCarouselItemIndex] = useState(0);

  const carouselX = -carouselItemIndex * (carouselItemWidth + carouselItemGap);

  const animationDuration = 500;

  useEffect(() => {
    const max = 3;

    const intervalId = setInterval(() => {
      setCarouselItemIndex((prev) => {
        if (prev < max) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (carouselItemIndex === 3) {
      setTimeout(() => setCarouselItemIndex(0), animationDuration);
    }
  }, [carouselItemIndex]);

  return (
    <div tw="bg-nego-100 py-[60px] md:pt-[120px]">
      <section tw="max-w-[1280px] xl:mx-auto  md:pb-0 md:px-10 xl:px-20  px-5 ">
        <div tw="mb-10 md:h-[705px] md:flex md:flex-col md:flex-wrap md:mb-0">
          <div tw="mb-10 md:order-1 md:mb-[120px]">
            <p tw="font-bold text-base md:text-2xl md:leading-[34px] leading-6 text-nego-800 mb-2 md:mb-3">
              #네고매물 #실매물
            </p>
            <h1 tw="font-bold text-2xl leading-[34px] text-gray-900 mb-4 md:mb-10 md:text-[44px] md:leading-[64px]">
              실시간 제안중인 <br />
              &apos;중복&apos;없는 &apos;진짜&apos; 매물
            </h1>
            <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] text-gray-900">
              허위매물/중복매물 걱정없이
              <br />
              가격비교하고, 제안해보세요.
            </p>
          </div>
          <div tw="mb-[60px] md:order-3">
            {isMobileSize ? (
              <Image width={340} height={520} alt="" src={Phone1} />
            ) : (
              <Image height={705} tw="ml-auto" alt="" src={Phone2} />
            )}
          </div>
          <div tw="md:order-2">
            <p tw="text-gray-900 font-bold text-2xl md:text-4xl md:leading-[52px] leading-[34px] mb-4 md:mb-10">
              네고시오만의 1매물 1등록 정책
            </p>
            <p tw="text-sm leading-[22px] md:text-2xl md:leading-10 text-gray-900">
              같은 매물을 다른 곳에서 가격 비교할 필요가 없어요
            </p>
          </div>
        </div>
      </section>
      <div className="carousel" tw="md:-translate-y-[calc(50% - 30px)] overflow-x-hidden" ref={constraintsRef}>
        <div
          tw="w-fit flex "
          style={{
            columnGap: carouselItemGap,
            transform: `translateX(calc(${carouselX}px - ${carouselItemWidth}px - ${carouselItemGap}px))`,
            transition: carouselItemIndex === 0 ? '' : `transform ${animationDuration}ms ease-in-out`,
          }}
        >
          <div
            className="item"
            tw="mx-auto p-5 md:p-10 w-[320px] md:w-[540px] [border-radius: 92px] [background: rgba(243, 240, 255, 0.8)] [backdrop-filter: blur(2px)]"
          >
            <p tw="text-sm md:text-base md:leading-6 leading-[22px] text-nego-1000">Dofe***@naver.com l 2022-06-10</p>
            <div role="presentation" tw="my-4 h-[1px] [background-color:  #5F3DC4] scale-y-50" />
            <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] font-light text-nego-1000">
              다른 서비스는 <span tw="font-medium">같은 매물이 여러개 올라와</span> 있어서 혼란스러운데 네고시오에서는{' '}
              <span tw="font-medium">바로 집주인이랑 가격 결정</span>을 하니
              <span tw="font-medium">이곳저곳 볼 필요가 없어요.</span>
            </p>
          </div>
          <div
            className="item"
            tw="mx-auto p-5 md:p-10 w-[320px] md:w-[540px] [border-radius: 92px] [background: rgba(243, 240, 255, 0.8)] [backdrop-filter: blur(2px)]"
          >
            <p tw="text-sm md:text-base md:leading-6 leading-[22px] text-nego-1000">
              rock******@gmail.com l 2022-08-09
            </p>
            <div role="presentation" tw="my-4 h-[1px] [background-color:  #5F3DC4] scale-y-50" />
            <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] font-light text-nego-1000">
              예전엔 <span tw="font-medium">광고에 낚이고, 중개비도 직접 합의</span>보느라
              <br />
              이사준비도 제대로 못했었는데, 네고시오에서 <span tw="font-medium">내 뜻대로 주도적으로 거래</span>할 수
              있어서 좋아요!
            </p>
          </div>
          <div
            className="item"
            tw="mx-auto p-5 md:p-10 w-[320px] md:w-[540px] [border-radius: 92px] [background: rgba(243, 240, 255, 0.8)] [backdrop-filter: blur(2px)]"
          >
            <p tw="text-sm md:text-base md:leading-6 leading-[22px] text-nego-1000">kjin****@nate.com l 2022-10-05</p>
            <div role="presentation" tw="my-4 h-[1px] [background-color:  #5F3DC4] scale-y-50" />
            <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] font-light text-nego-1000">
              어차피 현시세와 내가 원하는 가격은 어느정도 정해져 있잖아요. 내가{' '}
              <span tw="font-medium">직접 집주인에게 원하는 가격을</span>
              <span tw="font-medium">제시</span>할 수 있는건 정말 큰 이점인 것 같아요.
            </p>
          </div>
          <div
            className="item"
            tw="mx-auto p-5 md:p-10 w-[320px] md:w-[540px] [border-radius: 92px] [background: rgba(243, 240, 255, 0.8)] [backdrop-filter: blur(2px)]"
          >
            <p tw="text-sm md:text-base md:leading-6 leading-[22px] text-nego-1000">Dofe***@naver.com l 2022-06-10</p>
            <div role="presentation" tw="my-4 h-[1px] [background-color:  #5F3DC4] scale-y-50" />
            <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] font-light text-nego-1000">
              다른 서비스는 <span tw="font-medium">같은 매물이 여러개 올라와</span> 있어서 혼란스러운데 네고시오에서는{' '}
              <span tw="font-medium">바로 집주인이랑 가격 결정</span>을 하니
              <span tw="font-medium">이곳저곳 볼 필요가 없어요.</span>
            </p>
          </div>
          <div
            className="item"
            tw="mx-auto p-5 md:p-10 w-[320px] md:w-[540px] [border-radius: 92px] [background: rgba(243, 240, 255, 0.8)] [backdrop-filter: blur(2px)]"
          >
            <p tw="text-sm md:text-base md:leading-6 leading-[22px] text-nego-1000">
              rock******@gmail.com l 2022-08-09
            </p>
            <div role="presentation" tw="my-4 h-[1px] [background-color:  #5F3DC4] scale-y-50" />
            <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] font-light text-nego-1000">
              예전엔 <span tw="font-medium">광고에 낚이고, 중개비도 직접 합의</span>보느라
              <br />
              이사준비도 제대로 못했었는데, 네고시오에서 <span tw="font-medium">내 뜻대로 주도적으로 거래</span>할 수
              있어서 좋아요!
            </p>
          </div>
          <div
            className="item"
            tw="mx-auto p-5 md:p-10 w-[320px] md:w-[540px] [border-radius: 92px] [background: rgba(243, 240, 255, 0.8)] [backdrop-filter: blur(2px)]"
          >
            <p tw="text-sm md:text-base md:leading-6 leading-[22px] text-nego-1000">kjin****@nate.com l 2022-10-05</p>
            <div role="presentation" tw="my-4 h-[1px] [background-color:  #5F3DC4] scale-y-50" />
            <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] font-light text-nego-1000">
              어차피 현시세와 내가 원하는 가격은 어느정도 정해져 있잖아요. 내가{' '}
              <span tw="font-medium">직접 집주인에게 원하는 가격을</span>
              <span tw="font-medium">제시</span>할 수 있는건 정말 큰 이점인 것 같아요.
            </p>
          </div>
          <div
            className="item"
            tw="mx-auto p-5 md:p-10 w-[320px] md:w-[540px] [border-radius: 92px] [background: rgba(243, 240, 255, 0.8)] [backdrop-filter: blur(2px)]"
          >
            <p tw="text-sm md:text-base md:leading-6 leading-[22px] text-nego-1000">Dofe***@naver.com l 2022-06-10</p>
            <div role="presentation" tw="my-4 h-[1px] [background-color:  #5F3DC4] scale-y-50" />
            <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] font-light text-nego-1000">
              다른 서비스는 <span tw="font-medium">같은 매물이 여러개 올라와</span> 있어서 혼란스러운데 네고시오에서는{' '}
              <span tw="font-medium">바로 집주인이랑 가격 결정</span>을 하니
              <span tw="font-medium">이곳저곳 볼 필요가 없어요.</span>
            </p>
          </div>
          <div
            className="item"
            tw="mx-auto p-5 md:p-10 w-[320px] md:w-[540px] [border-radius: 92px] [background: rgba(243, 240, 255, 0.8)] [backdrop-filter: blur(2px)]"
          >
            <p tw="text-sm md:text-base md:leading-6 leading-[22px] text-nego-1000">
              rock******@gmail.com l 2022-08-09
            </p>
            <div role="presentation" tw="my-4 h-[1px] [background-color:  #5F3DC4] scale-y-50" />
            <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] font-light text-nego-1000">
              예전엔 <span tw="font-medium">광고에 낚이고, 중개비도 직접 합의</span>보느라
              <br />
              이사준비도 제대로 못했었는데, 네고시오에서 <span tw="font-medium">내 뜻대로 주도적으로 거래</span>할 수
              있어서 좋아요!
            </p>
          </div>
          <div
            className="item"
            tw="mx-auto p-5 md:p-10 w-[320px] md:w-[540px] [border-radius: 92px] [background: rgba(243, 240, 255, 0.8)] [backdrop-filter: blur(2px)]"
          >
            <p tw="text-sm md:text-base md:leading-6 leading-[22px] text-nego-1000">kjin****@nate.com l 2022-10-05</p>
            <div role="presentation" tw="my-4 h-[1px] [background-color:  #5F3DC4] scale-y-50" />
            <p tw="text-sm md:text-2xl md:leading-10 leading-[22px] font-light text-nego-1000">
              어차피 현시세와 내가 원하는 가격은 어느정도 정해져 있잖아요. 내가{' '}
              <span tw="font-medium">직접 집주인에게 원하는 가격을</span>
              <span tw="font-medium">제시</span>할 수 있는건 정말 큰 이점인 것 같아요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
