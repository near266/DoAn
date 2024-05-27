import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import CutTomCarousel from '../CarouselButton';
import ContainerLoading from '../ContainerLoading';

interface IProps {
  children: any;
  loading?: boolean;
}

const SCROLL_WIDTH = 500;
const ListCard: React.FC<IProps> = (props: IProps) => {
  const { children, loading } = props;

  const router = useRouter();
  const scrollRef = useRef(null);
  return (
    <>
      {loading ? (
        <ContainerLoading loading={loading} />
      ) : (
        <div className="tw-relative">
          <div className="container-lg tw-p-0">
            <CutTomCarousel scrollWidth={SCROLL_WIDTH} scrollRef={scrollRef}>
              <div
                ref={scrollRef}
                className={
                  'hide_scrollbar tw-flex  tw-flex-nowrap tw-snap-x tw-overflow-x-scroll tw-max-h-[600px] '
                }
              >
                {children}
              </div>
            </CutTomCarousel>
          </div>
        </div>
      )}
    </>
  );
};
ListCard.propTypes = {
  children: PropTypes.any.isRequired,
};
export default ListCard;
