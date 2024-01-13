import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export default function useScrollLock(trigger = true) {
  useIsomorphicLayoutEffect(() => {
    let scrollPosition = 0;
    const html = document.documentElement;
    const { body } = document;
    if (trigger) {
      // if scroll has already been locked, don't lock it again
      if (body.style.overflow === 'hidden') {
        return () => {};
      }

      scrollPosition = window.scrollY;

      /**
       * 1. Fixes a bug in iOS and desktop Safari whereby setting
       *    `overflow: hidden` on the html/body does not prevent scrolling.
       * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
       *    scroll if an `overflow-x` style is also applied to the body.
       * 3. Fixes a bug in latest iOS where overflow hidden does not prevent scrolling.
       */
      html.style.position = 'relative'; /* [1] */
      html.style.overflow = 'hidden'; /* [2] */
      body.style.position = 'relative'; /* [1] */
      body.style.overflow = 'hidden'; /* [2] */
      body.style.height = 'var(--100vh)'; /* [3] */
      body.style.pointerEvents = 'none';
      body.scrollTo({ top: scrollPosition });
      return () => {
        html.style.position = '';
        html.style.overflow = '';
        body.style.position = '';
        body.style.overflow = '';
        body.style.height = '';
        body.style.pointerEvents = '';
        window.scrollTo({ top: scrollPosition });
      };
    }

    return () => {};
  }, [trigger]);
}
