import { Footer, Header, HtmlHeader } from './components';

const AppLayout = ({ children }) => {
  return (
    <>
      <HtmlHeader />
      <Header />
      <main id="__main">{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
