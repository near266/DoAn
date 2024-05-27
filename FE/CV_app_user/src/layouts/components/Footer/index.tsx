const Footer = () => {
  return (
    <footer id="__footer">
      <div className="container">
        <div className="row">
          <div className="tw-flex col-12 tw-flex-col tw-gap-1 md:tw-gap-4 col-md-4 tw-mb-[44px]">
            <div className="tw-flex tw-items-center tw-gap-4">
              <img
                src="/images/logo/youth-logo.svg"
                alt="Nền tảng định hướng và kết nối việc làm dành cho giới trẻ"
                className="tw-h-9 md:!tw-h-[80px]"
              />
              <div className="tw-text-[#22216D]  tw-text-[30px] tw-w-[164px] tw-font-bold">
                Eztek
              </div>
            </div>
            <div className="description">
              <p>Nền tảng định hướng và kết nối việc làm dành cho giới trẻ</p>
            </div>
            <div className="address">
              <div className="tw-flex tw-items-start tw-gap-2">
                <img
                  className="tw-mt-2"
                  src="/images/icons/home_icon.svg"
                  alt="Ngách 32 Ngõ 54 Nguyễn Chí Thanh, Láng Thượng, Đống Đa, Hà Nội"
                />
                <p> Ngách 32 Ngõ 54 Nguyễn Chí Thanh, Láng Thượng, Đống Đa, Hà Nội</p>
              </div>
            </div>
            <div className="phone_number">
              <div className="tw-flex tw-items-start tw-gap-2">
                <img src="/images/icons/phone.svg" alt="0866 906 811" />
                <p>0866 906 811</p>
              </div>
            </div>
          </div>
          <div className="d-flex col-md-8 tw-gap-3 tw-flex-wrap lg:tw-flex-nowrap tw-justify-start md:tw-justify-between">
            <div className="youth_services col-md-12 col-lg-7 d-flex  tw-flex-wrap tw-mb-[44px] md:!tw-flex-nowrap !tw-p-0 tw-gap-[30px]  ">
              <div className="youth_job ">
                <p className="footer-title !tw-text-black !tw-font-[600]">Việc làm</p>
                <ul className="tw-p-0">
                  <li className="list-inline-item social">
                    <p>Nhân sự</p>
                    <p>Marketing</p>
                    <p>Kinh doanh</p>
                    <p>Thiết kế</p>
                    <p>Lập trình</p>
                  </li>
                </ul>
              </div>
              <div className="youth_mentor">
                <p className="footer-title !tw-text-black !tw-font-[600]">Mentor</p>
                <ul className="tw-p-0">
                  <li className="list-inline-item social">
                    <p>Tìm kiếm</p>
                    <p>Kết nối</p>
                  </li>
                </ul>
              </div>
              <div className="youth_course">
                <p className="footer-title !tw-text-black !tw-font-[600]">Khoá học</p>
                <ul className="tw-p-0">
                  <li className="list-inline-item social">
                    <p>Kỹ năng hướng nghiệp</p>
                    <p>Kỹ năng chuyên môn</p>
                    <p>Kỹ năng mềm</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="social-contact ">
              <p className="!tw-text-[20px] !tw-font-[600]  !tw-text-black tw-mb-[32px]">
                Theo dõi chúng tôi
              </p>
              <ul className="list-inline social-list-icon tw-gap-3">
                <li className="list-inline-item social">
                  <a
                    className="social-icon text-xs-center"
                    href="https://www.facebook.com/youthvn11"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/icons/facebook_v2.svg" alt="Facebook" />
                  </a>
                </li>
                <li className="list-inline-item social">
                  <a
                    className="social-icon text-xs-center"
                    href="https://www.instagram.com/youth.com.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/icons/instagram_v2.svg" alt="Instagram" />
                  </a>
                </li>
                <li className="list-inline-item social">
                  <a
                    className="social-icon text-xs-center"
                    href="https://www.instagram.com/youth.com.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/icons/tiktok.svg" alt="Tiktok Youth" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row infor-company">
          <div className="col-lg-12">
            <div className="copyright">
              <p>© 2020 Eztek. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
