import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { appLibrary, FullContentLayout } from '@/shared';
import { useSnackbar } from '@/shared/snackbar';
import { ContainerLoading } from '@/components';
import AppContext from '../../context/AppContext';
import StandardPage from '../../templates/StandardPage';
import { useProfileData } from '../../hooks/useProfileData';
import { usePageBuilders } from '../../hooks/usePageBuilders';
import { PageTitle, ErrorMessage, ControlMenu } from '../../components';
import { resumeService } from '../../shared';
import styles from '../../assets/addEditStyles.module.scss';

const Edit = () => {
  const router = useRouter();
  const snackbar = useSnackbar();

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState({});
  const [profileData, dispatchProfileData] = useProfileData();
  const [builders, dispatchBuilder] = usePageBuilders();

  useEffect(() => {
    async function getData() {
      const res = await resumeService.show(router.query.id);

      if (res?.code === 'SUCCESS') {
        setIsLoading(false);

        const data = res.payload;
        dispatchProfileData({ payload: data });

        if (data.builder) {
          dispatchBuilder({ payload: data.builder });
        }
      }
    }

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Save form data in CV.
   */
  async function saveCV() {
    const stateClone = { ...profileData };
    stateClone.page_builders = builders;

    appLibrary.showloading();
    const res = await resumeService
      .update(router.query.id, stateClone)
      .finally(() => appLibrary.hideloading());

    if (res?.code === 'SUCCESS') {
      setErrorMessages({});
      snackbar.showMessage('Lưu CV thành công', 'success');
    } else {
      setErrorMessages(res?.errors);
      snackbar.showMessage('Vui lòng kiểm tra lại dữ liệu trong CV của bạn', 'error');
    }
  }

  return (
    <ContainerLoading loading={isLoading}>
      <AppContext.Provider
        value={{
          profileData,
          dispatchProfileData,
          builders,
          dispatchBuilder,
        }}
      >
        <FullContentLayout className={styles.page}>
          <div className="container">
            <div className={styles.controlMenu}>
              <ControlMenu onSaveCV={() => saveCV()} />
            </div>
            <PageTitle />
            <div className={styles.content}>
              <div className={styles.content__cvDocument}>
                <StandardPage />
              </div>
              <div className={styles.content__errorBox}>
                <ErrorMessage messages={errorMessages} />
              </div>
            </div>
          </div>
        </FullContentLayout>
      </AppContext.Provider>
    </ContainerLoading>
  );
};

export default Edit;
