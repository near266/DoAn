import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import { MutableRefObject, ReactNode } from 'react';

/*
  This component is used to scroll the list of cards.
  It is used in ListCard component.
  Or you can use it in other components by wrap the list of Element and send props.
  @param {number} scrollWidth - The width of the window will scroll.
  @param {MutableRefObject} scrollRef - The ref of the list element (children).
  @param {ReactNode} children - The list of Element.
*/
interface IProps {
  scrollWidth?: number;
  children: ReactNode;
  scrollRef: MutableRefObject<HTMLElement>;
}

const DEFAULT_SCROLL_REF = 300;

const CutTomCarousel: React.FC<IProps> = (props: IProps) => {
  const { scrollWidth, children, scrollRef } = props;
  const onScroll = (event) => {
    const element = event.target;
    let isRigth = false;
    if (element.id === 'carousel-button-right') {
      isRigth = true;
    }
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + (isRigth ? +scrollWidth : -scrollWidth),
      behavior: 'smooth',
    });
  };
  const [listRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <div className="tw-relative">
      <div
        className="d-none d-lg-block prev-scrol tw-absolute tw-z-40 tw-top-1/2  tw-left-[-40px] tw-cursor-pointer"
        onClick={onScroll}
      >
        <Image
          src="/images/icons/arrow-left.svg"
          id="carousel-button-left"
          height={26}
          width={26}
        />
      </div>
      <div ref={listRef}>{children}</div>
      <div
        className="d-none d-lg-block next-scrol tw-absolute tw-z-40 tw-top-1/2  tw-right-[-40px] tw-cursor-pointer"
        onClick={onScroll}
      >
        <Image
          src="/images/icons/arrow-right.svg"
          id="carousel-button-right"
          height={26}
          width={26}
        />
      </div>
    </div>
  );
};

export default CutTomCarousel;
