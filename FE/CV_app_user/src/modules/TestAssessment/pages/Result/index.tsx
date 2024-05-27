import MetorCard from '@/components/common/Cards/MentorCard';
import CutTomCarousel from '@/components/common/CarouselButton';
import CustomModal from '@/components/common/ConfirmModal';
import { IMentor } from '@/interfaces';
import IAssessmentV2 from '@/interfaces/ver2/IAssessmentV2';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { JobCard } from '@/components/common/Cards';
import { Auth } from '@/core';
import { homeService } from '@/modules/Home/shared';
import { Button } from '@mui/material';
import { Empty } from 'antd';
import cx from 'classnames';
import { isEmpty } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import AssessmentInfo from '../../components/AssessmentInfo';
import VariantChart, { IChartData } from '../../components/Chart';
import MustPaidModalContent from '../../components/MustPaidModal';
import CustomPieChart from '../../components/PieChart';
import Suggestions from '../../components/Suggestions';
import TestSuggest from '../../components/TestSuggest';
import {
  AssessmentStatus,
  AssessmentType,
  SuggestionStatus,
} from '../../shared/variables';

const scrollWidth = 300;

const ViewMoreBlock = ({
  title,
  description,
  buttonText,
  onClick,
}: {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) => {
  return (
    <div className="col-12 tw-mt-[32px] sm:tw-mt-[48px] tw-bg-white tw-flex tw-flex-col tw-py-[20px] sm:tw-py-[30px] tw-justify-center tw-items-center tw-rounded-[10px] ">
      <h3>{title}</h3>
      <p className="tw-max-w-[296px] sm:tw-max-w-[614px] tw-leading-[26px] sm:tw-leading-[28px] tw-font-[600] tw-text-[16px] sm:tw-font-[500] sm:tw-text-[20px] tw-tracking-[0.1px] tw-text-center tw-mb-[24px]">
        {description ?? 'Bạn có thể xem thông tin về nghề nghiệp của bạn tại đây'}
      </p>
      <Button
        className="!tw-text-white tw-px-[16px] tw-py-[8px] tw-normal-case !tw-bg-[#403ECC] tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
        variant="contained"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

const dummyJobs = [
  {
    id: 1,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Lelia Mendoza',
    duration: 1,
    slug: 'hoc-lap-trinh-co-ban',
    price: 981590,
    startCount: 4,
    registeredUser: 10,
  },
  {
    id: 2,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Angel Ruiz',
    duration: 1,
    slug: 'hoc-lap-trinh-co-ban',
    price: 829509,
    startCount: 4,
    registeredUser: 10,
  },
  {
    id: 3,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Connor Wright',
    duration: 1,
    slug: 'hoc-lap-trinh-co-ban',
    price: 435760,
    startCount: 4,
    registeredUser: 10,
  },
  {
    id: 4,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Christine Dennis',
    duration: 1,
    slug: 'hoc-lap-trinh-co-ban',
    price: 968456,
    startCount: 4,
    registeredUser: 10,
  },
  {
    id: 5,
    imgUrl: '/images/homepage/youth-hero-desktop.png',
    title: 'Christine Dennis',
    duration: 1,
    slug: 'hoc-lap-trinh-co-ban',
    price: 968456,
    startCount: 4,
    registeredUser: 10,
  },
];
interface IProps {
  assessment: IAssessmentV2;
  suggestions: { data: any; status: SuggestionStatus };
  chartData: IChartData[];
}
const ViewResultVer1: React.FC<IProps> = (props: IProps) => {
  const { assessment, suggestions, chartData } = props;
  console.log(props);
  const [showModal, setShowModal] = useState(false);
  const scrollMentorRef = useRef(null);
  const scrollJobRef = useRef(null);
  const [mentors, setMentors] = useState<IMentor[]>(suggestions.data.mentors ?? []);
  const getMentors = async () => {
    const res = await homeService.getHomeMentors();
    return res;
  };
  const { data } = useSWR('get-mentor', getMentors);
  const [animateRef] = useAutoAnimate<HTMLDivElement>(/* optional config */);
  useEffect(() => {
    data && assessment.originPrice === 0 && setMentors(data.payload.data ?? []);
  }, [data]);

  return (
    <Auth>
      <div className="container">
        <div className="row tw-mb-[44px] tw-w-full tw-mx-0">
          <div ref={animateRef} className="d-block col-12 col-xl-9 tw-h-full tw-p-0">
            <AssessmentInfo
              name={assessment.name}
              duration={assessment.duration}
              originPrice={assessment.originPrice}
              questionCount={assessment.questionCount}
              description={assessment.description}
              slug={assessment.slug}
              assessmentStatus={AssessmentStatus.COMPLETED}
            />
            <div className="tw-text-[24px] tw-font-[600] tw-text-[#171725] tw-leading-[34px] tw-tracking-[0.1px] sm:tw-text-[28px] sm:tw-font-[600] sm:tw-text-[#171725] sm:tw-leading-[39px] tw-mb-4">
              {assessment.assessmentType === AssessmentType.CAREER
                ? 'Mức độ phù hợp của bạn là'
                : 'Kết quả'}
            </div>
            <div className="col-12 tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-[10px] sm:tw-rounded-[20px] tw-overflow-hidden ">
              {assessment.assessmentType === AssessmentType.CAREER ? (
                <CustomPieChart data={chartData} />
              ) : (
                <VariantChart chartData={chartData} />
              )}
            </div>
            {/* {assessment.originPrice === 0 && (
              <StaticSuggestion assessmentType={assessment.assessmentType} />
            )} */}
            <Suggestions
              assessmentType={assessment.assessmentType}
              suggestion={suggestions.data}
              isFree={assessment.originPrice === 0}
              shortDesc={assessment.short_desc}
            />
            {assessment.originPrice > 0 && (
              <div>
                <div className="tw-mt-5">
                  {assessment.originPrice !== 0 &&
                    suggestions.status !== SuggestionStatus.RESOLVE &&
                    suggestions.status === SuggestionStatus.PAID && (
                      <Empty description="Quản trị viên đang thêm đề xuất cho bạn " />
                    )}
                </div>
                {assessment.originPrice !== 0 &&
                  suggestions.status !== SuggestionStatus.RESOLVE &&
                  suggestions.status !== SuggestionStatus.PAID && (
                    <ViewMoreBlock
                      title={
                        assessment.assessmentType === AssessmentType.CAREER
                          ? 'Tư vấn cho bạn'
                          : 'Xem chi tiết của bạn'
                      }
                      description={
                        assessment.assessmentType !== AssessmentType.YOUR_SELF
                          ? `Bạn có thể xem thông tin về @${assessment.name}`
                          : assessment.description
                      }
                      buttonText="Xem thêm"
                      onClick={() => {
                        setShowModal(true);
                      }}
                    />
                  )}
                <CustomModal
                  onChange={(childState) => {
                    setShowModal(childState);
                  }}
                  isOpen={showModal}
                  onConfirm={() => {}}
                  onCancel={() => {}}
                  size="lg"
                  contentChild={
                    <MustPaidModalContent
                      title="Để được tư vấn và khuyến nghị từ chuyên gia, vui lòng thanh toán phí đánh giá"
                      description="Chúng tôi sẽ gửi thông tin qua hộp thư của bạn. Hãy kiểm tra Email thường xuyên nhé!"
                      imgUrl="/images/testpages/purchase-require.svg"
                      assessmentId={assessment.id}
                      assessmentName={assessment.name}
                      originalPrice={assessment.originPrice}
                      salePrice={assessment.salePrice}
                    />
                  }
                />
              </div>
            )}

            <div>
              <div>
                <h3 className="tw-mt-[50px] tw-text-[24px] tw-font-[600] tw-text-[#171725] tw-leading-[34px] tw-tracking-[0.1px] sm:tw-text-[28px] sm:tw-font-[600] sm:tw-text-[#171725] sm:tw-leading-[39px]">
                  Đề xuất cho bạn
                </h3>
              </div>

              {!isEmpty(mentors) && (
                <div>
                  <p className="tw-text-[20px] tw-font-[600] tw-text-[#44444F] tw-leading-[34px] tw-tracking-[0.1px] sm:tw-text-[22px] sm:tw-font-[600] sm:tw-leading-[39px]">
                    Mentors cho bạn:
                  </p>
                  <CutTomCarousel scrollWidth={scrollWidth} scrollRef={scrollMentorRef}>
                    <div
                      ref={scrollMentorRef}
                      className={cx(
                        ' hide_scrollbar row !tw-mx-0  !tw-flex-nowrap !tw-overflow-x-scroll  tw-py-3 tw-snap-x'
                      )}
                      style={{ scrollSnapType: 'x mandatory' }}
                    >
                      {mentors &&
                        mentors.map((item, index) => (
                          <MetorCard
                            avatar={item.avatar}
                            slug={item.slug}
                            index={index}
                            experience={item.experience}
                            name={item.name}
                            level={item.level ?? ''}
                            lg={4}
                            md={5}
                            sm={6}
                          />
                        ))}
                    </div>
                  </CutTomCarousel>
                </div>
              )}
              <p className="tw-text-[20px] tw-font-[600] tw-text-[#44444F] tw-leading-[34px] tw-tracking-[0.1px] sm:tw-text-[22px] sm:tw-font-[600] sm:tw-leading-[39px]">
                Việc làm cho bạn:
              </p>
              <CutTomCarousel scrollWidth={scrollWidth} scrollRef={scrollJobRef}>
                <div
                  ref={scrollJobRef}
                  className={cx(
                    'hide_scrollbar row !tw-mx-0  !tw-flex-nowrap !tw-overflow-x-scroll  tw-py-3 tw-snap-x'
                  )}
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {isEmpty(dummyJobs) ? (
                    <div className="tw-w-full">
                      <Empty description="Không có nghề nào được đề xuất cho bạn" />
                    </div>
                  ) : (
                    dummyJobs.map((course, index) => (
                      <JobCard
                        id={0}
                        title={course.title}
                        description={
                          'hope pound poet dirt flat build say bark coach fifth pocket hill magnet shoulder queen correctly influence rush seems happily properly but progress journey'
                        }
                        location={'Hà Nội'}
                        updateAt={'2020-01-01'}
                        workTime={'5 tiếng/ngày'}
                        salary={'5 triệu/tháng'}
                        defaultSize={9}
                        imgUrl={course.imgUrl}
                        slug={course.slug}
                        lg={4}
                        md={5}
                        sm={6}
                      />
                    ))
                  )}
                </div>
              </CutTomCarousel>
            </div>
          </div>
          <div className="col-md-1 d-none d-xl-block tw-ml-[40px]">
            <TestSuggest />
          </div>
        </div>
      </div>
    </Auth>
  );
};

export default ViewResultVer1;
