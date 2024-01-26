export default function adjustWindowPopup({ w, h }: { w: number; h?: number }) {
  const width = w;

  const height = h || document.documentElement.scrollHeight;

  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;

  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const screenWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;

  const screenHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;

  const left = (screenWidth - width) / 2 + dualScreenLeft;

  const top = (screenHeight - height) / 2 + dualScreenTop;

  return { width, height, left, top };
}
