import { GetStaticProps } from 'next';

import IAssessmentV2 from '@/interfaces/ver2/IAssessmentV2';
import { HtmlHeader } from '@/layouts/components';
import AssessmentView from '@/modules/TestAssessment/pages/AllTest';
import { testService } from '@/modules/TestAssessment/shared/testAssessmentService';
const TestAssessment = ({ assessments }) => {
  return (
    <>
      <HtmlHeader title={'Tất cả đánh giá - Eztek'} />
      <AssessmentView assessments={assessments} />
    </>
  );
};

export const generateAssessment = (assessments): IAssessmentV2[] => {
  return assessments
    .map((item) => {
      if (item && item?.status) {
        return {
          id: item.id ?? 1,
          slug: item.slug ?? '',
          name: item.name ?? '',
          duration: item.test_time ?? 0,
          originPrice: item.original_price ?? 0,
          salePrice: item.sale_price ?? 0,
          questionCount: item.questions_count ?? 0,
          testTutorial: item.test_tutorial ?? '',
          sumittedCount: item.submitted_count ?? 0,
          assessmentType: item.assessment_type ?? '',
          avatar: item.avatar ?? '',
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          questions: [],
        };
      }
    })
    .filter((item) => item);
};
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { data } = await testService.getAllAssessments();
    const assessments = generateAssessment(data);
    return {
      props: {
        assessments: assessments,
      },
      revalidate: 60 * 10,
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        assessments: [],
      },
      revalidate: 60 * 10,
    };
  }
};

export default TestAssessment;
