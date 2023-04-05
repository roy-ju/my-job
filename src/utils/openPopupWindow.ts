export default function openPopupWindow({
  url,
  title,
  width: w,
  height: h,
}: {
  url: string;
  title: string;
  width: number;
  height: number;
}) {
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : window.screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : window.screen.height;

  const left = (width - w) / 2 + dualScreenLeft;
  const top = (height - h) / 2 + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    `
    scrollbars=no,
    menubar=no,
    resizable=no,
    width=${w}, 
    height=${h}, 
    top=${top}, 
    left=${left}
    `,
  );
  return newWindow;
}
