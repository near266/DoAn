import { chunk } from 'lodash-es';
import IAssessmentV2 from '@/interfaces/ver2/IAssessmentV2';
import { HtmlHeader } from '@/layouts/components';
import AssesmentDetail from '@/modules/TestAssessment/pages/Detail';
import { testService } from '@/modules/TestAssessment/shared/testAssessmentService';
import { GetStaticPaths, GetStaticProps } from 'next';
const Page = ({ assessment }) => {
  const { name, avatar, assessmentType, description } = assessment;

  return (
    <>
      <HtmlHeader title={name}>
        <meta name="description" content={description} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/danh-gia-nang-luc/${description}`}
        />
        <meta property="og:site_name" content="Eztek" />
        <meta property="og:image" content={avatar} />
        <meta property="og:locale" content="vi_VN" />
      </HtmlHeader>

      <div className="container tw-mx-auto tw-h-full tw-min-h-screen tw-flex">
        <AssesmentDetail assessment={assessment} />
      </div>
    </>
  );
};

export default Page;

export const mapToIAssessmentV2Quest = (oldQuestionFormat) => {
  return (
    oldQuestionFormat &&
    oldQuestionFormat
      .map((item, index) => {
        return {
          id: item.id,
          question: item.content,
          answers: item.answers,
        };
      })
      .sort((a, b) => a.id - b.id)
  );
};

export const mapToAssessment = (data: any): IAssessmentV2 | undefined => {
  const {
    id,
    name,
    content,
    description,
    slug,
    avatar,
    test_time,
    original_price,
    sale_price,
    assessment_type,
    questions_count,
    questions,
    test_tutorial,
  } = data;

  return {
    id,
    name,
    content,
    description,
    slug,
    avatar,
    duration: test_time ?? 0,
    originPrice: original_price ?? 0,
    salePrice: sale_price ?? 0,
    assessmentType: assessment_type ?? '',
    questionCount: questions_count ?? 0,
    testTutorial: test_tutorial,
    questions: mapToIAssessmentV2Quest(questions),
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  try {
    const res = await testService.getAssessmentFree(slug);
    const assessment = mapToAssessment(res.payload);
    return {
      props: {
        assessment: assessment,
      },
      revalidate: 60 * 10,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        assessment: [],
      },
      revalidate: 60 * 10,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await testService.getAllAssessments();
  const paths = data.map((item) => {
    return {
      params: {
        slug: item.slug,
      },
    };
  });
  chunk(paths, 5);
  return {
    paths: paths,
    fallback: 'blocking',
  };
};

