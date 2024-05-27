import { GetServerSideProps } from 'next';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Thay đổi đường dẫn tùy thuộc vào vị trí thư mục của Form

type Props = {
  id: any;
};

const DetailPostModule = dynamic(() => import('@/modules/Home/components/DetailPost'));

const DetailRecruitmentPage: NextPage<Props> = (props) => {
  const { id } = props;
  return (
    <>
      <DetailPostModule id={id} />
    </>
  );
};

export default DetailRecruitmentPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_LOCAL;
    const { id: id } = ctx.query;

    console.log('Fetching recruitment data');

    return {
      props: { id },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {},
    };
  }
};
