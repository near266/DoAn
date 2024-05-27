import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ContainerLoading } from '@/components';
import FeeLayout from './FeeLayout';
import { assessmentService } from '../../shared';
import { IAssessment } from '@/interfaces';
import styles from './styles.module.scss';

const ViewResult = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState<IAssessment>({});
  const [isFree, setIsFree] = useState(true);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function getData() {
      if (router.query.slug) {
        // get data
        const res = await assessmentService
          .getTestResult(router.query.slug)
          .finally(() => setLoading(false));

        if (res.sale_status === 'NEED_MEMBERSHIP') {
          setIsFree(false);
          return;
        }

        if (res?.code === 'SUCCESS') {
          setAssessment(res.payload.assessment);
          setGroups(res.payload.groups);
        }
      }
    }

    getData();
  }, [router.query.slug]);

  return (
    <ContainerLoading loading={loading}>
      {isFree ? (
        <section className={styles.page}>
          <div className="container">
            <div className={styles.page__title}>
              <h2>Kết quả: {assessment.name}</h2>
              <p style={{ fontStyle: 'italic' }}>
                * Bạn có thể xem lại kết quả đánh giá trong trang cá nhân của mình.
              </p>
              <Link href={`/danh-gia-nang-luc/${assessment.slug}?start=true`}>
                <a>Làm lại đánh giá</a>
              </Link>
            </div>

            {/* <div style={{ margin: '10px 0' }}>
              <AdSense adSlot="6856900542" />
            </div> */}

            {groups.map((item) => (
              <div className={styles.groupResult} key={item.id}>
                <div className={styles.groupResult__title}>
                  {item.name}: {item.point}đ
                </div>
                <div
                  className={styles.groupResult__view}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <FeeLayout />
      )}
    </ContainerLoading>
  );
};

ViewResult.propTypes = {};

export default ViewResult;
