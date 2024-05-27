import Loading from '@/components/common/ContainerLoading/Loading';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const KetQua = () => {
  const router = useRouter();
  useEffect(() => {
    const { slug } = router.query;
    slug &&
      setTimeout(() => {
        router.push(`/danh-gia-nang-luc/ket-qua/${slug}`);
      }, 100);
  }, [router]);
  return (
    <>
      <div className="tw-flex">
        <Loading />
      </div>
    </>
  );
};

export default KetQua;
