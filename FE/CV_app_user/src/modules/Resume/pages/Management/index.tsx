import { useState, useEffect } from 'react';
import cx from 'classnames';
import Link from 'next/link';

import { appLibrary, Common, FullContentLayout } from '@/shared';
import { useSnackbar } from '@/shared/snackbar';
import { httpClient } from '@/core';
import { ContainerLoading, EmptyData } from '@/components';
import { resumeService } from '../../shared';
import styles from './styles.module.scss';

const Management = () => {
  const snackbar = useSnackbar();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await httpClient
        .get('cv-profiles')
        .finally(() => setIsLoading(false));
      const res = response.data;
      setProfiles(res.payload);
    }

    getData();
  }, []);

  const removeCV = async (id: string, index: number) => {
    const isConfirmed = await confirm('Bạn có chắc muốn xóa CV?');
    if (!isConfirmed) return;

    appLibrary.showloading();
    const res = await resumeService.delete(id).finally(() => appLibrary.hideloading());

    if (res?.code === 'SUCCESS') {
      const profilesClone = [...profiles];
      profilesClone.splice(index, 1);
      setProfiles(profilesClone);

      snackbar.showMessage('Xóa CV thành công', 'success');
    }
  };

  const downloadCV = async (id) => {
    appLibrary.showloading();
    const res = await resumeService.download(id).finally(() => appLibrary.hideloading());

    Common.downloadFileNormally(res);
  };

  // Render
  const EmptyCvData = !isLoading && profiles.length === 0 && (
    <EmptyData message="Bạn chưa tạo CV nào, tạo mới ngay!" />
  );

  return (
    <FullContentLayout className={styles.page}>
      <ContainerLoading loading={isLoading}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className={styles.content}>
                <div className={styles.head}>
                  <div className={styles.head__title}>Danh sách CV</div>
                  <div>
                    <Link href="/cv-templates">
                      <a className={cx(styles.head__addNew, 'btn btn-common')}>
                        <i className="fas fa-plus-circle"></i>
                        Tạo mới
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="cvs">
                  {EmptyCvData}
                  {profiles.map((item, index) => (
                    <article className={styles.record} key={item.id}>
                      <div className={styles.record__template}>
                        <img src={item.template.avatar} alt="Mẫu CV" />
                      </div>
                      <div className={styles.detail}>
                        <div className={styles.detail__title}>
                          <a
                            href={`/view-cv/${item.id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.title}
                          </a>
                        </div>
                        <div className={styles.detail__viewLink}>
                          {`${process.env.NEXT_PUBLIC_APP_URL}/view-cv/${item.id}`}
                        </div>
                        <div className={styles.controls}>
                          <ul className={styles.controls__btns}>
                            <li>
                              <span
                                className={styles.controlItem}
                                onClick={() => downloadCV(item.id)}
                              >
                                <i className="fas fa-download"></i> Tải xuống
                              </span>
                            </li>
                            <li>
                              <a
                                href={`/view-cv/${item.id}`}
                                className={styles.controlItem}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="far fa-eye"></i> Xem
                              </a>
                            </li>
                            <li>
                              <Link href={`/modify-cv/${item.id}`}>
                                <a className={styles.controlItem}>
                                  <i className="fas fa-pencil-alt"></i> Sửa
                                </a>
                              </Link>
                            </li>
                            <li>
                              <span
                                className={styles.controlItem}
                                onClick={() => removeCV(item.id, index)}
                              >
                                <i className="fas fa-trash"></i> Xóa
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerLoading>
    </FullContentLayout>
  );
};

export default Management;
