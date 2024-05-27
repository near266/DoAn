import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import BreadCumb from '@/components/common/Breadcrumb';
import { Common } from '@/shared';
import { IRootState } from '@/store';
import { Button, NoSsr } from '@mui/material';
import { useRouter } from 'next/router';
import NotificationButton from '../NotificationButton';
import NavMenu from './NavMenu';
import SideBarLaptop from './SideBarLaptop';
// import SideBarMobie from './SidebarMobie';
import UserAvatar from './UserAvatar';
const SideBarMobie = dynamic(() => import('./SidebarMobie'), {
  ssr: false,
});
const RenderWithCondition = dynamic(
  () => import('@/components/common/RenderWithCondition'),
  {
    ssr: false,
  }
);

const smBootsrapBreakPoint = 576;
const lgBootsrapBreakPoint = 992;

const Header = () => {
  const router = useRouter();
  const auth = useSelector((state: IRootState) => state.auth);
  const [checkAuth, setcheckAuth] = useState();
  const { isFetch, loading, data, succeeded } = useSelector((state: any) => state.login);

  const headerRef = useRef(null);
  const handleLogin = () => {
    window.location.href = '/Login';
    // Common.redirectToAuthenticate();
  };
  const toogleSidebar = () => {
    const expandedClassName = 'expanded';

    const isExpanded = headerRef.current.classList.contains(expandedClassName);
    if (isExpanded) {
      headerRef.current.classList.remove(expandedClassName);
    } else {
      headerRef.current.classList.add(expandedClassName);
    }
  };

  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);
  // remove expanded class when window size is smaller than smBootsrapBreakPoint (576px)
  useEffect(() => {
    if (size[0] > smBootsrapBreakPoint) {
      headerRef.current.classList.remove('expanded');
    }
  }, [size]);

  return (
    <>
      <header id="__header" ref={headerRef}>
        <div className="container !tw-max-w-[1607px] !z-2 d-flex tw-items-center !tw-h-full">
          <div className="menu-toggler d-flex d-lg-none">
            <div className="toggler">
              <i
                id="__menu_burger_bar"
                onClick={toogleSidebar}
                className="fa-solid fa-bars tw-cursor-default tw-relative tw-text-3xl tw-text-[#6563c6]"
              >
                {size[0] < lgBootsrapBreakPoint && <SideBarMobie />}
              </i>
              {/* <i className="fas fa-times hide-icon tw-text-3xl tw-text-[#6563c6]"></i> */}
            </div>
          </div>
          <div className="first-header lg:tw-ml-[80px]">
            <Link href="/">
              <a className="d-xl-none tw-pr-[17px] tw-flex tw-items-center tw-justify-center tw-h-full">
                <div className="logo">
                  <div className="logo-image">
                    <Image
                      src="/images/logo/youth-logo1.svg"
                      alt="Logo"
                      width={40}
                      height={40}
                      priority
                    />
                  </div>
                  <h2 className="company-name d-flex tw-uppercase tw-text-base tw-text-[#22216D] md:tw-w-[117px]">
                    Eztek
                  </h2>
                </div>
              </a>
            </Link>
            <NavMenu />
          </div>
          <div className="second-header !tw-h-full align-items-center">
            <div className=" d-flex tw-pr-3 !tw-items-center">
              <a href="/cart" className="!tw-h-7">
                <Image
                  className="tw-mr-4 md:tw-mr-0 tw-cursor-pointer"
                  src="/images/icons/shopping-cart.svg"
                  alt="shopping-cart"
                  height={24}
                  width={24}
                  priority
                />
              </a>
            </div>
            <nav className="user-infor">
              <div className="tw-min-w-[90px] !tw-h-full d-flex tw-justify-center tw-items-center">
                <RenderWithCondition show={isFetch}>
                  {succeeded ? (
                    <ul className="user-logged">
                      <li className="toolitem">
                        {/* sadfsa
                        <NotificationButton /> */}
                      </li>
                      <li className="toolitem">
                        <UserAvatar />
                      </li>
                    </ul>
                  ) : (
                    <div className="tw-flex tw-gap-4">
                      <Button
                        className="nav-button d-none d-lg-block d-xl-flex !px-2 !tw-py-2 !tw-rounded-[10px] "
                        variant="outlined"
                        onClick={Common.redirectToSignUp}
                      >
                        Đăng ký
                      </Button>
                      <Button
                        className="nav-button !tw-text-white !px-2 !tw-py-2 !tw-bg-[#403ECC] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] hover:!tw-bg-white hover:!tw-text-[#403ECC]"
                        variant="contained"
                        onClick={handleLogin}
                      >
                        Đăng nhập
                      </Button>
                    </div>
                  )}
                </RenderWithCondition>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <div className="container ">
        <div className="tw-m-0 tw-absolute tw-top-[94px] tw-z-1">
          <BreadCumb />
        </div>
      </div>
      <NoSsr>
        <SideBarLaptop />
      </NoSsr>
    </>
  );
};

export default Header;
