export default function kakaoShare({
  width,
  height,
  objectType,
  title,
  description,
  imgUrl,
  buttonTitle,
  link,
}: {
  width: number;
  height: number;
  objectType: string;
  title: string;
  description: string;
  imgUrl: string;
  buttonTitle: string;
  link: string;
}) {
  window.Kakao.Share.sendDefault({
    objectType,
    installTalk: true,
    content: {
      title,
      description,
      imageUrl: imgUrl,
      link: {
        mobileWebUrl: link,
        webUrl: link,
      },
      imageWidth: width,
      imageHeight: height,
    },
    buttons: [
      {
        title: buttonTitle,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
    ],
  });
}
