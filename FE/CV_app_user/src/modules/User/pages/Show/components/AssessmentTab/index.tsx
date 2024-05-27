import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';

import { requestGetResultsCurrentUser } from '../../../../shared/assessmentResultService';
import { EmptyData, ContainerLoading } from '@/components';
import styles from './styles.module.scss';

const AssessmentTab = (props) => {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await requestGetResultsCurrentUser({
        fields: 'id,assessment_id',
        relationFields: 'assessment:id,slug,name',
      }).finally(() => props.onSetLoading(false));

      if (res?.code === 'SUCCESS') {
        setAssessments(res.payload);
      }
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render
  const EmptyContent = assessments.length === 0 && <EmptyData />;

  return (
    <ContainerLoading loading={props.loading}>
      <div className={styles.content}>
        {EmptyContent}

        {assessments.length !== 0 &&
          assessments.map((item) => (
            <div className={cx(styles.record)} key={item.id}>
              <div className="row">
                <div className="col-md-9">
                  <h3 className={styles.record__name}>{item?.assessment?.name}</h3>
                </div>
                <div className="col-md-3">
                  <Link href={`/danh-gia-nang-luc/ket-qua/${item?.assessment?.slug}`}>
                    <a className={cx('btn btn-common', styles.record__buttonView)}>
                      Xem kết quả
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </ContainerLoading>
  );
};

AssessmentTab.propTypes = {
  onSetLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AssessmentTab;
