import { NavigationHeader } from '@/components/molecules';

const oss = `
"@emotion/css": "^11.10.5",
"@emotion/react": "^11.10.5",
"@emotion/server": "^11.10.0",
"@emotion/styled": "^11.10.5",
"@next/font": "13.1.2",
"@popperjs/core": "^2.11.6",
"@svgr/webpack": "^6.5.1",
"@tailwindcss/line-clamp": "^0.4.4",
"@types/d3": "^7.4.0",
"@types/d3-array": "^3.0.4",
"@types/d3-path": "^3.0.0",
"@types/node": "18.11.18",
"@types/react": "18.0.26",
"@types/react-dom": "18.0.10",
"@types/react-swipeable-views": "^0.13.1",
"@visx/axis": "2.11.1",
"@visx/curve": "3.0.0",
"@visx/event": "3.0.1",
"@visx/gradient": "2.10.0",
"@visx/grid": "2.11.1",
"@visx/group": "2.10.0",
"@visx/responsive": "2.10.0",
"@visx/scale": "2.2.2",
"@visx/shape": "2.11.1",
"@visx/tooltip": "3.0.0",
"axios": "^1.3.4",
"csv-parse": "^5.3.9",
"d3": "7.8.2",
"d3-array": "^3.2.3",
"d3-path": "^3.1.0",
"downshift": "^7.2.2",
"eslint": "^8.2.0",
"eslint-config-next": "13.1.2",
"framer-motion": "^9.0.0",
"lodash": "^4.17.21",
"moment": "^2.29.4",
"nanoid": "^4.0.2",
"next": "13.1.2",
"nprogress": "^0.2.0",
"react": "18.2.0",
"react-datepicker": "^4.11.0",
"react-dom": "18.2.0",
"react-number-format": "^5.1.4",
"react-popper": "^2.3.0",
"react-slider": "^2.0.4",
"react-swipeable-views": "^0.14.0",
"react-toastify": "^9.1.2",
"react-virtuoso": "^4.1.0",
"recoil": "^0.7.6",
"requestidlecallback-polyfill": "^1.0.2",
"swr": "^2.1.0",
"typescript": "4.9.4",
"uuid": "^9.0.0"  
`;

interface Props {
  onClickBack?: () => void;
}

export default function OpenSourceLicenses({ onClickBack }: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>오픈소스 라이센스</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 overflow-auto px-5 py-10">
        <p>
          <span tw="font-bold text-b1 uppercase">OSS NOTICE</span>
          <br />
          <br />
          <span tw="font-bold uppercase text-info text-gray-700">
            The following sets forth attribution notices for third party software that may be contatined in this
            application.
          </span>
          <br />
          <span tw="text-info text-gray-700">
            We thank the open source community for all of their efforts. If you have any questions about these notices,
            please email us at info@negocio.co.kr
          </span>
        </p>
        <div tw="py-6 text-info">
          <p tw="whitespace-pre-wrap">{oss}</p>
        </div>
      </div>
    </div>
  );
}
