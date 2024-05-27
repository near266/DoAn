import { useState, useEffect } from 'react';
import Link from 'next/link';

import { httpClient } from '@/core';
import { FullContentLayout } from '@/shared';
import { ContainerLoading } from '@/components';
import styles from './styles.module.scss';

const Initialization = () => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const response = await httpClient.get('cv-templates').finally(() => {
        setIsLoading(false);
      });

      const res = response.data;
      if (res?.code === 'SUCCESS') {
        setTemplates(res.payload);
      }
    }
    getData();
  }, []);

  return (
    <FullContentLayout className={styles.page}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={styles.headline}>
              <h2 className={styles.headline__title}>Danh sách mẫu CV</h2>
              <p className={styles.headline__description}>
                Các mẫu CV đuợc thiết kế theo chuẩn, hãy lựa chọn mẫu CV phù hợp nhất với
                bạn.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <ContainerLoading loading={isLoading}>
            {templates.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4">
                <Link href={`/create-cv/${item.code}`}>
                  <a>
                    <div className={styles.templateItem}>
                      <div className={styles.templateItem__hoverContent}>
                        <div>
                          <p className={styles.templateItem__use}>Chọn mẫu</p>
                          <p className={styles.templateItem__description}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <img
                        className={styles.templateItem__cover}
                        src={item.avatar}
                        alt={item.name}
                      />
                    </div>
                    <div className={styles.templateName}>{item.name}</div>
                  </a>
                </Link>
              </div>
            ))}
          </ContainerLoading>
        </div>
      </div>
    </FullContentLayout>
  );
};

export default Initialization;
