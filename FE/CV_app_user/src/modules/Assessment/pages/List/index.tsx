import { ContainerLoading } from '@/components';
import { useSnackbar } from '@/shared/snackbar';

import { useQuery } from '@apollo/client';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GET_ASSESSMENTS_QUERY, GET_SIL_EVENT_QUERY } from '../../shared';
import styles from './styles.module.scss';

const List = (props) => {
  const snackbar = useSnackbar();
  const router = useRouter();
  const [assessments, setAssessments] = useState([]);

  // call multiple query then handle all data
  const getData = () => {
    const res1 = useQuery(GET_SIL_EVENT_QUERY, {});
    const res2 = useQuery(GET_ASSESSMENTS_QUERY, {});
    return [res1, res2];
  };

  const [silsRes, assessmentRes] = getData();

  const addIsEventAttr = (eventArr) => {
    return eventArr.map((event) => {
      // deep copy event
      const newEvent = { ...event };
      // add isEvent attr
      newEvent.isEvent = true;
      return newEvent;
    });
  };

  useEffect(() => {
    if (!(silsRes.loading || assessmentRes.loading)) {
      // add is_event attribute to all sils data
      if (silsRes.data) {
        const newSils = addIsEventAttr(silsRes.data.sils.data);
        setAssessments([...assessmentRes.data.assessments.data, ...newSils]);
      } else {
        snackbar.showMessage('Không tìm thấy dữ liệu', 'error');
      }
    }
    // add is_event attribute to all sils data
    let newSils = [];
    let assessmentQuestions = [];
    if (silsRes.data) {
      newSils = addIsEventAttr(silsRes.data.sils.data);
    }
    if (assessmentRes.data && assessmentRes.data.assessments) {
      assessmentQuestions = assessmentRes.data.assessments.data;
    }
    setAssessments([...assessmentQuestions, ...newSils]);
  }, [silsRes, assessmentRes]);

  const onClickTryTest = (slug: string) => {
    const isConfirmed = confirm('Bạn có muốn làm bài ngay không?');
    if (isConfirmed) {
      router.push(`/try-test/${slug}`);
    }
  };
  // render
  const TestLink = (link, content) => (
    <Link href={`/danh-gia-nang-luc/${link}`} prefetch={false}>
      <a className={styles.comomLink}>{content}</a>
    </Link>
  );

  return (
    <div className="container">
      <div className={styles.pageHeadline}>
        <h3 className={styles.pageHeadline__title}>Danh sách bài test online</h3>
        <p className={styles.pageHeadline__des}>
          {/* eslint-disable-next-line max-len */}
          Các bài đánh giá đang được sử dụng phổ biến, giúp định hướng nghề nghiệp tương
          lai cho bạn
        </p>
      </div>
      <ContainerLoading loading={silsRes.loading && assessmentRes.loading}>
        <div className="tw-grid xl:tw-grid-cols-4 md:tw-grid-cols-3 sm:tw-grid-cols-2 tw-gap-4 tw-mb-8">
          {assessments.map((item) => (
            <div key={item.id} className="">
              <div className={styles.assessment}>
                {TestLink(
                  item.isEvent ? `${item.slug}?event=true` : item.slug,
                  <img
                    className={styles.assessment__avatar}
                    src={item.avatar}
                    alt="Assessment"
                  />
                )}

                <div className={styles.assessment__box}>
                  {TestLink(
                    item.slug,
                    <p className={styles.assessment__name}>{item.name}</p>
                  )}
                  <p className={styles.assessment__description}>{item.description}</p>
                </div>

                <div
                  className={cx(
                    'd-flex justify-content-between align-items-center',
                    styles.footerBox,
                    styles.assessment__box
                  )}
                >
                  <div className={cx('text-success', styles.footerBox__price)}>
                    Miễn phí
                  </div>
                  <div className={styles.footerBox__tryTest}>
                    <div
                      className="btn btn-outline-info"
                      onClick={() =>
                        onClickTryTest(`${item.slug}${item.isEvent ? '?event=true' : ''}`)
                      }
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContainerLoading>
    </div>
  );
};

List.propTypes = {};

export default List;
