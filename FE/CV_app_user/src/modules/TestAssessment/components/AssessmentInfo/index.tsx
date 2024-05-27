import CustomModal from '@/components/common/ConfirmModal';
import { IRootState } from '@/store';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AssessmentStatus } from '../../shared/variables';
interface IProps {
  name: string;
  questionCount: number;
  originPrice: number;
  duration: number;
  slug: string;
  description?: string;
  assessmentStatus: AssessmentStatus;
}
type Action = {
  status: string;
  slug: string;
  isFree: boolean;
  onClick?: () => void;
};
const AssessmentAction: React.FC<Action> = (props: Action) => {
  const { status, isFree, slug, onClick } = props;
  const [showModal, setShowModal] = useState(false);
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

  const router = useRouter();
  const onAddToCart = () => {};
  const onPurchase = () => {};

  const onTest = () => {
    setShowModal(!showModal);

    if (router.query.start === 'true') return;
    const currentUrl = router.asPath;
    router.push(`${currentUrl}/?start=true`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="tw-w-full tw-h-[40px] md:tw-max-w-[200px] tw-flex tw-items-center tw-justify-end">
      {/* Làm lại đánh giá */}
      {status === AssessmentStatus.COMPLETED ? (
        <Button
          className="!tw-text-white tw-p-[10px] tw-normal-case !tw-bg-[#403ECC] tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
          variant="contained"
          href={`/danh-gia-nang-luc/${slug}?start=true`}
        >
          Làm lại đánh giá
        </Button>
      ) : true ? (
        <>
          {status === AssessmentStatus.START && (
            <div>
              <Button
                className="!tw-text-white tw-px-[16px] tw-py-[8px] tw-normal-case !tw-bg-[#403ECC] tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
                variant="contained"
                onClick={() => {
                  setShowModal(true);
                }}
              ></Button>
              <CustomModal
                isOpen={showModal}
                onChange={(childState) => {
                  setShowModal(childState);
                }}
                size="sm"
                onCancel={(e) => {
                  setShowModal(false);
                }}
                onConfirm={(e) => {
                  setShowModal(false);
                }}
                contentChild={
                  <div className="tw-mt-3">
                    <p
                      className="tw-font-[500] tw-text-[18px] tw-leading-[24px] tw-text-[#000000]"
                      style={{ fontFamily: 'Lexend Deca , sans-serif' }}
                    >
                      {'Bạn có muốn thực hiện đánh giá ngay bây giờ ?'}
                    </p>
                  </div>
                }
                actionChild={
                  <div className="tw-px-4 tw-gap-4 tw-flex tw-m-4">
                    <Button
                      className="!tw-text-[#403ECC] tw-px-[10px] tw-py-[5px] tw-normal-case  !tw-bg-white tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
                      variant="outlined"
                      onClick={() => {
                        setShowModal(false);
                      }}
                      style={{ fontFamily: 'Lexend Deca , sans-serif' }}
                    >
                      Hủy
                    </Button>
                    <Button
                      className="!tw-text-white tw-px-[20px] tw-py-[5px] tw-normal-case  !tw-bg-[#403ECC] tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
                      variant="contained"
                      onClick={onTest}
                      style={{ fontFamily: 'Lexend Deca , sans-serif' }}
                    >
                      Tiếp tục
                    </Button>
                  </div>
                }
              />
            </div>
          )}
        </>
      ) : (
        <div className=" tw-h-[40px] tw-flex tw-gap-[12px] tw-min-w-[295px]">
          <Button
            className="!tw-text-white tw-px-[10px] tw-py-[8px] tw-normal-case  !tw-bg-[#403ECC] tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
            variant="contained"
            onClick={onPurchase}
          >
            Thanh toán ngay
          </Button>
          <Button
            className="!tw-text-[#403ECC] tw-px-[10px] tw-py-[8px] tw-normal-case  !tw-bg-white tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
            variant="outlined"
            onClick={onAddToCart}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      )}
      {/* Modal confirm bắt đầu đánh giá */}
    </div>
  );
};

const AssessmentInfo: React.FC<IProps> = (props: IProps) => {
  const router = useRouter();
  const {
    name,
    questionCount,
    originPrice,
    duration,
    description,
    slug,
    assessmentStatus,
  } = props;
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (router.query.start === 'true') {
      setIsStarted(true);
    }
  }, [router]);
  return (
    <div>
      <div className="tw-mt-16" style={{ transition: 'all 300ms ease' }}>
        <div className="title">
          <h1 className="tw-text-[28px] tw-text-[#22216D] tw-font-[600] tw-tracking-[0.117px] tw-w-full md:-tw-tracking-[-0.005em] tw-leading-[39px] md:tw-leading-[57px] md:tw-text-[38px] lg:tw-text-[48px]">
            {name}
          </h1>
        </div>
        <div className="tw-flex tw-flex-wrap md:tw-flex-nowrap tw-gap-[14px]">
          <div className="tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-[16px] md:tw-gap-[45px] ">
            <div className="tw-flex tw-min-w-[66px] tw-items-center">
              <Image
                width={24}
                height={24}
                src="/images/icons/question_count.svg"
                alt=""
              />
              &nbsp;
              <span className="tw-whitespace-nowrap tw-text-[#696974]">
                {questionCount} Câu
              </span>
            </div>
            {/* <div className="tw-flex tw-min-w-[66px] tw-items-center">
              <Image width={24} height={24} src="/images/icons/price_tag.svg" alt="" />
              &nbsp;
              <span className="tw-whitespace-nowrap">
                {originPrice > 0 ? originPrice : 'Miễn phí'}
              </span>
            </div> */}
            <div className="tw-flex tw-min-w-[66px] tw-items-center">
              <Image
                width={24}
                height={24}
                src="/images/icons/course_duration.svg"
                alt=""
              />
              &nbsp;
              <span className="tw-whitespace-nowrap tw-text-[#696974]">
                {duration} phút
              </span>
            </div>
          </div>
          {/* buttons TODO: change this shit originPrice === 0 */}
          <AssessmentAction status={assessmentStatus} slug={slug} isFree />
        </div>
        <div className="tw-w-full tw-mt-[20px] tw-text-base tw-font-[300] tw-leading-[26px] md:tw-font-[400] md:tw-text-[18px] lg:tw-text-[20px] md:tw-leading-[28px] tw-tracking-[0.1px] tw-mb-5">
          <div
            style={{
              textAlign: 'justify',
              transition: 'all 100ms ease',
              fontSize: 16,
              fontWeight: 300,
            }}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default memo(AssessmentInfo);
