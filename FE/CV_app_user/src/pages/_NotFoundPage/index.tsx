import Link from 'next/link';

import { HtmlHeader } from '@/layouts/components';

const NotFoundPage = () => {
  return (
    <>
      <HtmlHeader title="The Page can't be found">
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat:200,400,700&display=swap"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" type="text/css" href="/css/404.css" />
      </HtmlHeader>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>Oops!</h1>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h2>404 - The Page can't be found</h2>
          </div>
          <Link href="/">
            <a>Go To Homepage</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
