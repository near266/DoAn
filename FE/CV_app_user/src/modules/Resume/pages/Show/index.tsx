import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { IRootState } from '@/store';
import { resumeService } from '../../shared';
import { appLibrary, Common, FullContentLayout } from '@/shared';
import styles from './styles.module.scss';

const Show = ({ resume }) => {
  const me = useSelector((state: IRootState) => state.auth.me);
  const router = useRouter();

  const [blobUrl, setBlobUrl] = useState<string>('');

  useEffect(() => {
    // create blob url for html code
    const blobHTML = new Blob([resume.pageHtml], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blobHTML);

    setBlobUrl(blobUrl);
  }, [resume.pageHtml]);

  const resizeIframe = () => {
    const obj: any = document.getElementById('page-viewer');
    obj.style.height = `${obj.contentWindow.document.body.scrollHeight + 10}px`;
  };

  const downloadCV = async () => {
    appLibrary.showloading();
    const res = await resumeService
      .download(router.query.id)
      .finally(() => appLibrary.hideloading());

    Common.downloadFileNormally(res);
  };

  return (
    <FullContentLayout className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.toolbar__title}>{resume.title}</div>
        <div className={styles.toolbarButtons}>
          {me.id === resume.created_by && (
            <Link href={`/modify-cv/${resume.id}`}>
              <a className={styles.toolbarButtons__action} title="Edit">
                <i className="fas fa-pencil-alt"></i>
              </a>
            </Link>
          )}
          <div
            className={styles.toolbarButtons__action}
            title="Download"
            onClick={downloadCV}
          >
            <i className="fas fa-download"></i>
          </div>
        </div>
      </div>
      <div className={styles.contentPage}>
        <iframe
          id="page-viewer"
          className={styles.contentPage__viewer}
          src={blobUrl}
          frameBorder="0"
          scrolling="no"
          onLoad={resizeIframe}
        ></iframe>
      </div>
    </FullContentLayout>
  );
};

export default Show;
