import Image from 'next/image';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import styles from './styles.module.scss';
type IProps = {
  currentStep: number;
  percent: number;
  tooltip?: string;
};

type IProgress = {
  name: string;
  isActive?: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
};
const ProgressItem: React.FC<IProgress> = (props: IProgress) => {
  const { name, icon, onClick, isActive } = props;

  return (
    <div
      className={`${styles.progress_item} ${
        isActive ? styles.progress_item_active : ''
      } tw-mx-auto md:tw-mx-0`}
      onClick={onClick}
    >
      <div
        className="tw-relative tw-h-[32px] tw-w-[32px]  "
        style={{ pointerEvents: 'none' }}
      >
        {icon}
      </div>
      <p
        className="tw-m-0 tw-uppercase tw-text-[#403ECC] tw-font-[500] tw-leading-[14px] tw-text-[12px] md:tw-text-[18px] tw-whitespace-nowrap"
        style={{ pointerEvents: 'none' }}
      >
        {name}
      </p>
    </div>
  );
};

const TestProgress: React.FC<IProps> = (props: IProps) => {
  const { currentStep, percent, tooltip } = props;
  const latopProgressRef = useRef(null);
  const mobieProgressRef = useRef(null);

  return (
    <div
      className={`${styles.progress} container md:!tw-relative tw-min-h-[80px] tw-bg-white tw-flex`}
    >
      <div className={`${styles.mobie_progress}`}>
        <div
          className={`${styles.tooltip}`}
          style={{
            left: `${
              percent < 10
                ? `${0}%`
                : percent > 90
                ? `calc(${92}% - 45px)`
                : `calc(${percent}% - 45px)`
            }`,
          }}
        >
          Bạn đã hoàn thành {percent > 100 ? '100' : percent}%
        </div>
        <div
          ref={mobieProgressRef}
          className={styles.mobie_progress__slide}
          style={{ width: `${percent > 100 ? '100' : percent}%` }}
        ></div>
      </div>
      <ProgressItem
        name={'Bắt đầu'}
        icon={<Image src={'/images/icons/kickoff.svg'} layout="fill" />}
        isActive={currentStep === 0}
      />
      <div className={`${styles.laptop_progress} tw-h-[70%]`}>
        <div
          ref={latopProgressRef}
          className={styles.laptop_progress__slide}
          style={{ height: `${percent > 100 ? '100' : percent}%` }}
        ></div>
        <div
          className={`${styles.tooltip}`}
          style={{
            top: `calc(${percent > 90 ? 90 : percent > 10 ? percent : 10}% - 32px)`,
          }}
        >
          Bạn đã hoàn thành {percent > 100 ? '100' : percent}%
        </div>
      </div>
      <ProgressItem
        name={'Kết quả'}
        icon={<Image src={'/images/icons/goal.svg'} layout="fill" />}
        isActive={currentStep === 1}
      />
      <div className={`${styles.laptop_progress} tw-h-[30%] tw-overflow-hidden`}>
        <div className={styles.laptop_progress_slide}></div>
      </div>
      <ProgressItem
        name={'Đề xuất'}
        icon={<Image src={'/images/icons/share-test-result.svg'} layout="fill" />}
        isActive={currentStep === 2}
      />
    </div>
  );
};

TestProgress.propTypes = {
  currentStep: PropTypes.number,
  percent: PropTypes.number,
};
TestProgress.defaultProps = {
  currentStep: 0,
  percent: 0,
};
export default TestProgress;
