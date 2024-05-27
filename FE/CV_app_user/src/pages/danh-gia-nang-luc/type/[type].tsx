import TestCategoriesModule from '@/modules/TestAssessment/pages/TestCategories';
import { testService } from '@/modules/TestAssessment/shared/testAssessmentService';
import { isEmpty } from 'lodash-es';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function TestCategoriesPage({
  assessments,
  page,
  size,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <TestCategoriesModule
        assessments={assessments}
        page={page}
        size={size}
        total={total}
      />
    </>
  );
}

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const { type } = ctx.params;

//   const { data, page, size, total } = await testService.getAllAssessments(Number(type));
//   console.log(data);
//   return {
//     props: {
//       assessments: !isEmpty(data) ? data : [],
//       page,
//       size,
//       total,
//     },
//   };
// };
// // You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

// export const getStaticPaths: GetStaticPaths = async (ctx) => {
//   const paths = [
//     AssessmentTypeNumeric.YOUR_SELF,
//     AssessmentTypeNumeric.CAREER,
//     AssessmentTypeNumeric.COMPETENCY,
//   ].map((item) => {
//     return {
//       params: {
//         type: item.toString(),
//       },
//     };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { type } = ctx.params;

  const { data, page, size, total } = await testService.getAllAssessments(Number(type));
  console.log(data);
  return {
    props: {
      assessments: !isEmpty(data) ? data : [],
      page,
      size,
      total,
    },
  };
};
