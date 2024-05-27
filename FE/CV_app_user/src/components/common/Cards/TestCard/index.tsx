import { Button } from '@mui/material';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { TruncateLines } from 'react-truncate-lines';
import CustomNextImg from '../../CustomNextImg/indext';
import styles from './styles.module.scss';

/* Interface for test card component
  @param {string} questionCount - number of questions in test
  @param {string} httpPath - https:www.domain.com/httpPath
  @param {string} slug - slug of the test
  @param {string} purchasedUser - number of user had purchased the test
*/
interface ITestCardProps {
  id: string | number;
  title: string;
  description?: string;
  sumittedCount: number;
  image: string;
  httpPath: string;
  slug: string;
  questionCount: string;
  price: number;
  salePrice?: number;
  discount?: string | number;
  priorityView?: boolean;
  assessmentClassName?: string;
  cardClassName?: string;
}

/* A custom link for test
  @param {string} link - href of the link
  @param {string} content - text of the link
 */
const CustomLink = (link: string, content: any) => (
  <Link href={link}>
    <a className={styles.link}>{content}</a>
  </Link>
);

const TestCard: React.FC<ITestCardProps> = (props: ITestCardProps) => {
  const [showOptions, setShowOptions] = useState(false);

  const {
    id,
    title,
    description,
    sumittedCount,
    image,
    httpPath,
    slug,
    questionCount,
    price,
    priorityView,
    salePrice,
    discount,
    assessmentClassName,
    cardClassName,
  } = props;

  return (
    <div
      key={id}
      className={cx(
        'col-3 col-sm-6 col-12 col-md-4 col-lg-4 !tw-p-0 !tw-min-w-[310px] tw-snap-start',
        cardClassName
      )}
    >
      <div className="!tw-h-full">
        <div className={cx(styles.assessment, assessmentClassName)}>
          <div className={`${styles.block_image}  tw-h-full tw-items-center tw-relative`}>
            {price > 0 && price > salePrice ? (
              <div className="tw-absolute tw-left-2 tw-py-0 tw-px-[5px] tw-h-[26px] tw-bg-[#EB4C4C] tw-rounded-[10px] tw-w-[70px]  tw-top-[17px] tw-text-white tw-flex tw-justify-center tw-items-center tw-z-50">
                <Image src="/images/icons/sale.svg" height={20} width={20} alt="" />
                <span className="tw-text-base tw-font-[700] tw-leading-[26px] tw-text-white ">
                  {`${100 - Math.round((salePrice / price) * 100)}`}%
                </span>
              </div>
            ) : null}
            <div className="tw-relative tw-w-full tw-h-[310px] ">
              <CustomNextImg
                src={image}
                layout="fill"
                placeholder="blur"
                blurDataURL="/images/homepage/youth-hero-desktop.png"
                alt={title}
                objectFit="cover"
                priority={priorityView}
              />
              &nbsp;
            </div>
            <div
              className="tw-absolute tw-top-[17px] tw-right-[20px] tw-w-[32px] tw-cursor-pointer"
              onClick={() => {
                setShowOptions(!showOptions);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setShowOptions(false);
                }, 300);
              }}
            >
              <Image src="/images/icons/options.svg" alt="" height={32} width={32} />
              {showOptions ? (
                <div className={`${styles.options}`}>
                  <div className={`${styles.options__item}`}>
                    <i className="bi bi-bookmark" title="Bỏ lưu" />
                    <span className="tw-text-sm tw-text-[#696974] tw-leading-[24px] tw-font-normal">
                      Lưu đánh giá
                    </span>
                  </div>
                  <div className={`${styles.options__item}`}>
                    <i className="bi bi-x-circle" title="Bỏ lưu"></i>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={`${styles.block_content} tw-shadow-md`}>
            <div className={styles.assessment__box}>
              {CustomLink(
                httpPath + slug,
                <p className={styles.assessment__name}>
                  <TruncateLines
                    lines={3}
                    ellipsis={
                      <a
                        className="tw-text-[#22216D] tw-text-sm tw-text-bold "
                        href={`${httpPath + slug}`}
                      >
                        ...Đọc thêm
                      </a>
                    }
                  >
                    {title}
                  </TruncateLines>
                </p>
              )}
              {/* <p className={styles.assessment__description}>
                <TruncateLines
                  lines={2}
                  ellipsis={
                    <a
                      className="tw-text-[#22216D] tw-text-sm tw-text-bold "
                      href={`${httpPath + slug}`}
                    >
                      ...Đọc thêm
                    </a>
                  }
                >
                  {description}
                </TruncateLines>
              </p> */}
            </div>
            <div
              className={cx(
                'd-flex justify-content-between align-items-center',
                styles.footerBox,
                styles.assessment__box
              )}
            >
              <div className={`${styles.full_w}`}>
                <span
                  className={`${styles.default_content} tw-text-sm tw-text-[#92929D]  tw-h-[20px] tw-w-full  tw-flex tw-items-center tw-justify-start`}
                >
                  <Image
                    width={16}
                    height={16}
                    src="/images/icons/question_count.svg"
                    alt=""
                  />
                  &nbsp;{questionCount} Câu
                </span>
                <Link href={`/danh-gia-nang-luc/${slug}`} prefetch={false}>
                  <Button className={`${styles.hide_button} !tw-w-1/2`}>Test ngay</Button>
                </Link>
              </div>
              <div>
                <span
                  className={`${styles.default_content} tw-text-[#111033] tw-text-sm`}
                >
                  <span className="tw-text-[#D5D5DC] tw-font-normal tw-text-sm tw-leading-[20px] tw-h-[20px] tw-flex tw-items-center tw-justify-start">
                    <Image
                      width={16}
                      height={16}
                      src="/images/icons/purchase-count.svg"
                      alt=""
                    />
                    Đã làm test:&nbsp;{sumittedCount}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TestCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  httpPath: PropTypes.string.isRequired,
  questionCount: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discount: PropTypes.string,
  sumittedCount: PropTypes.number.isRequired,
};

TestCard.defaultProps = {
  discount: 0,
  description: '',
  httpPath: '',
};
export default TestCard;
