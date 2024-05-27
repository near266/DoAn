import IAssessmentV2 from '@/interfaces/ver2/IAssessmentV2';
import { appLibrary, Common } from '@/shared';
import { useSnackbar } from '@/shared/snackbar';
import { IRootState } from '@/store';
import { isEmpty } from 'lodash-es';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AssessmentInfo from '../../components/AssessmentInfo';
import MustPaidModalContent from '../../components/MustPaidModal';
import { testService } from '../../shared/testAssessmentService';
import { AssessmentStatus } from '../../shared/variables';
import dynamic from 'next/dynamic';
import { getDataAssessment } from '@/store/modules/assessment';

const TestSuggest = dynamic(() => import('../../components/TestSuggest'), { ssr: false });
const CustomModal = dynamic(() => import('@/components/common/ConfirmModal'), {
  ssr: false,
});
const QuestionCard = dynamic(() => import('../../components/QuestionCard'), {
  ssr: false,
});

interface IProps {
  assessment: IAssessmentV2;
}

const AssesmentDetail: React.FC<IProps> = ({ assessment }: IProps) => {
  const {
    name,
    avatar,
    assessmentType,
    description,
    questions,
    questionCount,
    duration,
    id,
    originPrice,
    salePrice,
    slug,
    content,
    saleCode,
    testTutorial,
  } = assessment;
  const router = useRouter();
  const Dispatch = useDispatch();
  const [questionState, setQuestionState] = useState(questions);
  const [assessmentStatus, setAssessmentStatus] = useState(AssessmentStatus.START);
  const snackbar = useSnackbar();
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
  const [showModal, setShowModal] = useState(false);

  const removeQueryParam = useCallback(() => {
    const { pathname, query } = router;
    router.replace({ pathname, query: `slug=${slug}` }, undefined, {
      shallow: true,
    });
  }, []);

  const [isStarted, setIsStarted] = useState(false);

  const startTest = () => {
    setAssessmentStatus(AssessmentStatus.IN_PROGRESS);
    setIsStarted(true);
  };

  const checkLogin = () => {
    /* check login */
    if (isAuthenticated === false) {
      return Common.redirectToAuthenticate();
    }
    return true;
  };

  const getRestQuestion = async (slug: string) => {
    try {
      const { payload } = await testService.getAssessmentInfo(slug);
      const newQues = payload.questions
        .map((item, index) => {
          return {
            id: item.id,
            question: item.content,
            answers: item.answers,
          };
        })
        .sort((a, b) => a.id - b.id);
      if (!isEmpty(newQues)) {
        setQuestionState([...newQues]);
        startTest();
      }
      return true;
    } catch (error) {
      snackbar.showMessage(
        `${
          error.response.status === 400
            ? 'Mỗi đánh giá chỉ được thực hiện 1 lần!'
            : 'Có lỗi xảy ra, vui lòng thử lại!'
        } `,
        'error'
      );
      return false;
    }
  };
  /* Listen when router change  */
  useEffect(() => {
    if (router.query.start === 'true') {
      checkLogin() && questionState.length < 2 && getRestQuestion(slug);
    }
  }, [router]);

  const onSubmit = useCallback(async (childData) => {
    try {
      appLibrary.showloading();
      const res = await testService.submitTest(id, { answers: childData });
      snackbar.showMessage('Nộp bài thành công', 'success');
      const { slug } = router.query;
      router
        .push(`/danh-gia-nang-luc/ket-qua/${slug}`)
        .finally(() => appLibrary.hideloading());
      console.log('Thưởng lấy ID: ', assessment.id);
      Dispatch(getDataAssessment(assessment.id));
    } catch (error) {
      appLibrary.hideloading();
      snackbar.showMessage('Đã có lỗi xảy ra!', 'error');
    }
  }, []);

  return (
    <>
      <div className="row tw-flex-wrap md:tw-flex-nowrap tw-mb-[44px] tw-w-full tw-mx-0 tw-gap-[2rem]">
        <div
          className={`d-block col-12 tw-px-0 ${isStarted ? '' : 'col-xl-9'} `}
          style={{ transition: 'all 600ms ease' }}
        >
          <AssessmentInfo
            key={id}
            name={name}
            duration={duration}
            originPrice={originPrice}
            questionCount={questionCount}
            description={description}
            slug={slug}
            assessmentStatus={assessmentStatus}
          />
          {questionState && (
            <QuestionCard
              onSubmit={onSubmit}
              assessmentStatus={assessmentStatus}
              questions={questionState}
              slug={slug}
              tutorial={testTutorial}
            />
          )}
        </div>
        {!isStarted && (
          <div className="d-block d-md-none d-xl-block tw-w-full !tw-px-0">
            <TestSuggest />
          </div>
        )}
      </div>
      {showModal && (
        <CustomModal
          onChange={(childState) => {
            setShowModal(childState);
          }}
          isOpen={showModal}
          onConfirm={() => {}}
          onCancel={() => {
            removeQueryParam();
          }}
          size="lg"
          contentChild={
            <MustPaidModalContent
              assessmentId={id}
              assessmentName={name}
              originalPrice={originPrice}
              salePrice={salePrice}
              title="Để được tư vấn và khuyến nghị từ chuyên gia, vui lòng thanh toán phí đánh giá"
              description="Chúng tôi sẽ gửi thông tin qua hộp thư của bạn. Hãy kiểm tra Email thường xuyên nhé!"
              imgUrl="/images/testpages/purchase-require.svg"
            />
          }
        />
      )}
    </>
  );
};

export default AssesmentDetail;
