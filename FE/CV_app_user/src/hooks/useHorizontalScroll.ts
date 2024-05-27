import { useEffect, useRef } from 'react';
const SCROLL_NEXT = 300;

export const useHorizontalScroll = (scrollWidth: number) => {
  const elRef = useRef<HTMLElement>();

  useEffect(() => {
    const element = elRef.current as HTMLElement;
    if (element) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        const width = element.scrollLeft + scrollWidth * (e.deltaY > 0 ? 1 : -1);
        const currentScrollWidth = Math.ceil(element.scrollLeft + element.clientWidth);
        /* If max scroll right then scroll next to SCROLL_NEXT */
        if (e.deltaY > 0 && element.scrollWidth - currentScrollWidth <= 0) {
          window.scrollTo(window.scrollX, window.scrollY + SCROLL_NEXT);
        }
        /* If max scroll left then scroll next to SCROLL_NEXT */
        if (element.scrollLeft === 0 && e.deltaY < 0) {
          window.scrollTo(window.scrollX, window.scrollY - SCROLL_NEXT);
        }

        element.scrollTo({
          left: width,
          behavior: 'smooth',
        });
      };
      element.addEventListener('wheel', onWheel);
      return () => element.removeEventListener('wheel', onWheel);
    }
  });

  return elRef;
};
