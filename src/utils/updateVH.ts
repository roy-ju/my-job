export function updateVH() {
  if (typeof window === 'undefined') return;

  const windowInnerHeight = window.innerHeight;

  const actual100vh = `${windowInnerHeight < 500 ? 500 : windowInnerHeight}px`;

  // const actual100vh = `${window.innerHeight}px`;
  document.documentElement.style.setProperty('--100vh', actual100vh);
}
