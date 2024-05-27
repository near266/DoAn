import { DoubleRightOutlined, EditOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef } from 'react';

const ManagementCV = () => {
  const switchRef = useRef<HTMLElement>();

  const onChange = (checked: boolean) => {
    const buttonSwitch = switchRef?.current;
    if (checked) {
      buttonSwitch.style.backgroundColor = '#30AB7E';
    } else {
      buttonSwitch.style.backgroundColor = '#cbc7c7';
    }
  };
  useEffect(() => {
    const buttonSwitch = switchRef?.current;

    if (buttonSwitch) {
      if (buttonSwitch?.classList.contains('ant-switch-checked')) {
        buttonSwitch.style.backgroundColor = '#30AB7E';
      } else {
        buttonSwitch.style.backgroundColor = '#cbc7c7';
      }
    }
  }, []);
  return (
    <>
      <div>
        <div className="bg-[url('/images/CV-management/Youth/trang-ca-nhan/123.png')] w-full bg-cover h-[216px]">
          <div className="ps-[60px] tw-py-4">
            <p className="flex tw-items-center tw-text-white tw-gap-2">
              <span>Trang chủ</span>{' '}
              <span>
                <DoubleRightOutlined className="flex tw-items-center" />
              </span>{' '}
              <span>Trang cá nhân</span>{' '}
            </p>
          </div>
        </div>

        <div className="bg-[#D6D6FD] px-[60px] py-[20px] ">
          <div className="flex tw-justify-between">
            <div className="flex tw-gap-5 tw-items-center">
              <div>
                <img
                  className="rounded-[50%] w-[143px] border-[2px] tw-border-solid border-[#0062FF]"
                  src="/images/CV-management/avatar/Initial.png"
                  alt=""
                />
              </div>

              <div className="py-3">
                <div className="text-[#22216D] tw-mb-2 text-[40px] font-semibold">
                  Nguyễn Văn A
                </div>
                <p className="text-[#403ECC] text-[20px] tw-py-2">
                  Senior tại ABC, 10 năm kinh nghiệm tư vấn
                </p>
                <div className="bg-[#30AB7E] tw-text-white tw-rounded-[8px] p-2 w-[75px]">
                  Mentee
                </div>
              </div>
            </div>

            <div className="pt-[30px]">
              <button className="bg-[#403ECC] tw-me-3 tw-text-white tw-py-2 w-[190px] tw-rounded-[8px]">
                Viết bài
              </button>
              <button className="text-[#403ECC] tw-bg-white tw-py-2 w-[226px] tw-rounded-[8px]">
                Chỉnh sửa trang cá nhân
              </button>
            </div>
          </div>

          <div className="border-b-[1px] border-[#7271DE] py-3"></div>

          <div className="flex tw-justify-between pt-[20px]">
            <Link
              className="text-[#7271DE] hover:bg-gray-700"
              href={'/Quan-Ly-Ho-So/Ve-toi'}
            >
              <p className="text-[#7271DE]">VỀ TÔI</p>
            </Link>

            <Link className="text-[#7271DE] hover:bg-gray-700" href={'/Quan-Ly-Ho-So/CV'}>
              <p className="text-[#7271DE]">HỒ SƠ (CV)</p>
            </Link>

            <Link className="text-[#7271DE] hover:bg-gray-700" href={'/Quan-Ly-Ho-So/CV'}>
              <p className="text-[#7271DE]">ĐÁNH GIÁ</p>
            </Link>

            <Link className="text-[#7271DE] hover:bg-gray-700" href={'/Quan-Ly-Ho-So/CV'}>
              <p className="text-[#7271DE]">BÀI VIẾT</p>
            </Link>

            <Link className="text-[#7271DE] hover:bg-gray-700" href={'/Quan-Ly-Ho-So/CV'}>
              <p className="text-[#7271DE]">MENTORS</p>
            </Link>

            <Link className="text-[#7271DE] hover:bg-gray-700" href={'/Quan-Ly-Ho-So/CV'}>
              <p className="text-[#7271DE]">SỰ KIỆN</p>
            </Link>

            <Link className="text-[#7271DE] hover:bg-gray-700" href={'/Quan-Ly-Ho-So/CV'}>
              <p className="text-[#7271DE]">KHOÁ HỌC</p>
            </Link>

            <Link className="text-[#7271DE] hover:bg-gray-700" href={'/Quan-Ly-Ho-So/CV'}>
              <p className="text-[#7271DE]">THEO DÕI</p>
            </Link>

            <div className="flex tw-gap-3 text-[#22216D] tw-items-center">
              <ShareAltOutlined />
              <EditOutlined />
            </div>
          </div>
        </div>

        <div className="bg-[#F6F6FF] px-[60px] py-[20px] flex tw-gap-4">
          <div className="w-[70%]">
            <div className="flex tw-justify-between pb-[50px] tw-mb-5 tw-border-b-2 border-[#E2E2EA]">
              <p className="text-[#22216D] text-[20px] tw-font-semibold">
                Hồ sơ đã tạo trên Eztek
              </p>

              <button className="bg-[#403ECC] tw-text-white tw-p-2 tw-rounded-[8px]">
                Thêm mới
              </button>
            </div>

            <div className="flex tw-justify-between">
              <p className="text-[#22216D] text-[20px] tw-font-semibold">
                Hồ sơ đã tải lên Eztek
              </p>

              <button className="bg-[#403ECC] tw-text-white tw-p-2 tw-rounded-[8px]">
                Tải lên
              </button>
            </div>
          </div>

          <div className="w-[30%]">
            <div className="bg-white tw-rounded-[10px] tw-p-3">
              <div className="flex tw-items-center tw-gap-2">
                <img src="./images/CV-management/wave/Frame.png" alt="" />
                <p>Chào bạn A trở lại,</p>
              </div>
              <div className="flex tw-gap-2 tw-items-center">
                <div>
                  <Switch
                    ref={switchRef}
                    defaultChecked
                    className="bg-[#30AB7E]"
                    onChange={onChange}
                  />
                </div>

                <div>
                  <p className="text-[#30AB7E]">Trạng thái tìm việc đang bật</p>
                  <p>
                    Bật tìm việc để nhận được nhiều cơ hội việc làm tốt nhất từ Eztek
                  </p>
                  <p>
                    Cho phép các Nhà tuyển dụng đã được Eztek xác thực xem CV Online để
                    có thể liên hệ với bạn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementCV;
