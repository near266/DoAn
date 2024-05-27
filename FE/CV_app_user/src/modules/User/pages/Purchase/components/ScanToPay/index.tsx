import { BankTag } from '@/components/common/BankTag';
import { numberWithCommas } from '@/helpers/helper';
import { BankTransferPayload, purchaseAPI } from '@/modules/User/shared/purchase-api';
import { appLibrary } from '@/shared';
import { Col, Dropdown, Menu, message, Row, Statistic } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

const { Countdown } = Statistic;

export const ScanToPay = (props) => {
  const {
    checkedMethod,
    totalPrice,
    bankList,
    methods,
    setCheckedMethod,
    checkedList,
    moveToSuccess,
  } = props;

  const switchMethod = (method) => {
    setCheckedMethod(method);
  };

  const menu = (
    <Menu
      items={methods.map((method) => {
        return {
          label: (
            <div
              onClick={() => {
                method.id !== checkedMethod.id && switchMethod(method);
              }}
              className={`${styles['switchOption']}`}
            >
              {method.name}
            </div>
          ),
          value: method,
          key: method.id,
          disabled: method.id === checkedMethod.id,
        };
      })}
    />
  );
  const router = useRouter();
  const deadline = Date.now() + 60000 * 10;
  const handleCheckout = () => {
    if (checkedList?.length > 0) {
      const params: BankTransferPayload = { items: checkedList.map((item) => item.id) };
      onCheckoutFinish(params);
    }
  };
  const onCheckoutFinish = async (params: BankTransferPayload) => {
    try {
      console.log(params);
      appLibrary.showloading();
      const res = await purchaseAPI.requestBankTransfer(params);
      console.log(res);
      if (res.code === 'SUCCESS') {
        moveToSuccess();
      }
      appLibrary.hideloading();
    } catch (error) {
      appLibrary.hideloading();
      message.error('Đã có lỗi sảy ra! Vui lòng thử lại sau');
    }
  };
  const guide = [
    'Vào ứng dụng ngân hàng của bạn trên điện thoại và chọn chức năng quét mã QR',
    'Quét mã QR bên cạnh',
    'Nhập số tiền bạn chuyển',
    'Nội dung chuyển tiền: Họ và tên + số điện thoại + tên sản phẩm bạn muốn mua',
    'Hoàn tất quá trình chuyển tiền (tên người nhận tiền là CT CP CONG NGHE GIAO DUC YOUTHPLUS) Sau khoảng 1, 2 phút, tài khoản bạn trên web sẽ được cộng tiền.',
  ];
  return (
    <div className={`${styles['container']}`}>
      <div className={`${styles['headerTitle']}`}>
        {/* {`Thanh toán bằng \n${checkedMethod?.name.toUpperCase()}-QR`} */}
        Thanh toán chuyển khoản
      </div>
      <div
        className={`${styles['qrContainer']} tw-flex tw-flex-wrap md:tw-flex-nowrap tw-gap-[2rem]`}
      >
        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-full md:!tw-w-auto">
          <div
            className={`${styles['imageContainer']} tw-mx-auto tw-min-h-[300px] tw-min-w-[300px] `}
          >
            <div
              className={
                'tw-relative tw-w-full tw-min-h-[300px] tw-min-w-[257px] tw-aspect-square tw-bg-white tw-rounded-[10px] tw-mx-auto'
              }
            >
              <Image
                src="/images/homepage/QR-YOUTH.png"
                alt="qr"
                priority
                layout="fill"
                objectFit="fill"
              />
            </div>
            <div className="tw-flex tw-flex-col tw-mt-3">
              <div className="">CT CP CONG NGHE GIAO DUC YOUTHPLUS </div>
              <div className="tw-text-center tw-text-[#403ECC]">109890696</div>
            </div>
            <Row className={`${styles['totalContainer']} tw-mt-2`}>
              <Col flex={1} className={`${styles['qrTotal']} `}>
                Tổng tiền
              </Col>
              <Col className={`${styles['qrPrice']}`}>
                {numberWithCommas(totalPrice)}đ
              </Col>
            </Row>
          </div>

          <Dropdown overlay={menu} className={`${styles['switchMethodContainer']}`}>
            <div className={`${styles['switchButton']}`} onClick={(e) => {}}>
              Đổi phương thức thanh toán
            </div>
          </Dropdown>
        </div>
        <div className={`${styles['guildContainer']} tw-w-full`}>
          <div className="tw-font-[500px] tw-text-[32px] tw-leading-10">
            Quét mã QR để thanh toán
          </div>
          {guide.map((step, index) => (
            <div className={`${styles['guildItem']}`} key={index}>
              <div className={`${styles['guildIndex']}`}>{index + 1}</div>
              <div className={`${styles['guildContent']}`}>{step}</div>
            </div>
          ))}
          <div className="tw-mt-5 tw-font-[300] tw-text-[16px] tw-text-[#696974]">
            <ul className="tw-flex tw-flex-col tw-gap-2">
              <li>
                Ngân hàng Thương mại Cổ phần Quân đội (MB Bank) Số tài khoản: 109890696
              </li>
              <li>
                Tên người nhận: CT CP CONG NGHE GIAO DUC YOUTHPLUS Nội dung chuyển tiền:
              </li>
              <li>Họ và tên + số điện thoại + tên sản phẩm bạn muốn mua</li>
              <li>
                Nội dung chuyển tiền: Họ và tên + số điện thoại + tên sản phẩm bạn muốn
                mua
              </li>
            </ul>
          </div>
          {/* <div className={styles['timerContainer']}>
            <div className={styles['timerTitle']}>Giao dịch sẽ kết thúc sau</div>
            <Countdown value={deadline} onFinish={onFinish} format={'mm:ss'} />
          </div> */}

          <div className="tw-w-full tw-mx-auto tw-flex tw-justify-center">
            <button
              className="!tw-text-white tw-px-[20px] tw-py-[8px] tw-normal-case  !tw-bg-[#403ECC] tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
              type="button"
              onClick={handleCheckout}
              style={{ fontFamily: 'Lexend Deca , sans-serif' }}
            >
              Đã thanh toán
            </button>
          </div>
        </div>
      </div>
      <div className={`${styles['bankContainer']}`}>
        <div className={`${styles['bankTitle']}`}>
          Ngân hàng hỗ trợ {checkedMethod?.name.toUpperCase()}-QR
        </div>
        <Row gutter={[21, 21]}>
          {bankList.map((bank) => (
            <Col sm={6} xs={12} key={bank.id}>
              <BankTag id={bank.id} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
