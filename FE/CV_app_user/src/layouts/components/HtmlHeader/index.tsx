import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { isEmpty } from 'lodash-es';
import { useRouter } from 'next/router';

interface IProps {
  title?: string;
  keepMetaData?: boolean;
  children?: ReactNode;
}

const defaultSiteTitle = 'Eztek Nền tảng Đọc và chia sẻ, kết nối dành cho giới trẻ';

/**
 * Usage note
 *
 * If `children` existed, should add `keepMetaData` to make the default meta is
 * present.
 */
const HtmlHeader: FC<IProps> = ({ title, children, keepMetaData }) => {
  const router = useRouter();
  const MetaData = (
    <>
      <meta
        name="description"
        content="Eztek là nơi đọc học, chia sẻ, kết nối dành cho giới trẻ"
      />
      <meta name="keywords" content="youth, Eztek, youth plus, sinh viên, giới trẻ" />
      <meta property="og:title" content={title || defaultSiteTitle} />
      {!router.pathname.includes('post') && (
        <meta property="og:url" content="https://youth.com.vn/" />
      )}
      <meta
        property="og:description"
        content="Eztek là nơi đọc học, chia sẻ, kết nối dành cho giới trẻ"
      />
      {!router.pathname.includes('post') && (
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/images/thumbnail.png`}
        />
      )}
      <meta
        property="og:keywords"
        content="youth, Eztek, youth plus, sinh viên, giới trẻ"
      />
      <meta property="og:type" content="website" />
    </>
  );

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="author" content="Eztek" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />

      <title>{title || defaultSiteTitle}</title>

      {/* Google bot noindex, nofollow */}
      {Boolean(process.env.NEXT_PUBLIC_GOOGLE_NO_INDEX) && (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex" />
        </>
      )}

      {keepMetaData && MetaData}

      {!isEmpty(children) && children}

      {isEmpty(children) && MetaData}
    </Head>
  );
};

export default HtmlHeader;
