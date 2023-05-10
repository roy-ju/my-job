import { motion } from 'framer-motion';
import CharacterImage from '@/../public/static/images/character.png';
import MapSearchImage from '@/../public/static/images/map_search.png';
import LogoIcon from '@/assets/icons/header_logo.svg';

export default function Home() {
  return (
    <div>
      <div tw="pb-10" style={{ backgroundColor: '#F4F6FA' }}>
        <div tw="h-14 px-5 flex items-center">
          <LogoIcon tw="text-nego-1100" />
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
    </div>
  );
}
