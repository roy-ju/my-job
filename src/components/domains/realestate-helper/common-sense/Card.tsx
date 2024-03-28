import tw, { styled } from 'twin.macro';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import Sample from '@/../public/static/images/sample_image.png';

type CardProps = {
  thumbnailImgPath?: string;
  title?: string;
  subTitle?: string;
  link?: string;
  handleClickItem?: (v: string) => void;
};

const Wrraper = styled.button`
  ${tw`[width: calc(100% - 40px)] mx-5 text-left rounded-2xl [box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.08), 0px 2px 10px 0px rgba(0, 0, 0, 0.04)] mt-5`}
`;

const ImageWrraper = styled.div`
  ${tw`w-full [border-top-left-radius: 16px] [border-top-right-radius: 16px]`}
`;

const BackgroundImage = styled.div`
  ${tw`[border-top-left-radius: 16px] [border-top-right-radius: 16px] w-full h-[184px] bg-no-repeat bg-center bg-cover`}
`;

const Description = styled.div`
  ${tw`flex flex-col gap-1 p-5 pt-0`}

  span {
    ${tw`text-heading_01`}
  }

  p {
    ${tw`text-gray-800 text-body_02`}
  }
`;

export default function Card({ thumbnailImgPath, title, subTitle, link, handleClickItem }: CardProps) {
  return (
    <Wrraper
      onClick={() => {
        if (link) {
          handleClickItem?.(link);
        }
      }}
    >
      <ImageWrraper>
        <BackgroundImage
          style={{
            backgroundImage: thumbnailImgPath ? `url('${thumbnailImgPath}')` : `url('${Sample.src}')`,
          }}
        />
      </ImageWrraper>
      <MarginTopTwenty />
      <Description>
        <span>{title}</span>
        <p tw="line-clamp-2">{subTitle}</p>
      </Description>
    </Wrraper>
  );
}
