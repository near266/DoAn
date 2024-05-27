import { Auth } from '@/core';
import { assessmentService } from '@/modules/Assessment/shared';
import { homeService } from '@/modules/Home/shared';
import { Breadcrumb, Steps } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { PaymentMethodCode } from '../../shared/enums';
import { Cart } from './components/Cart';
import { FailedOrder } from './components/FailedOrder';
import { PayoutMethod } from './components/PayoutMethod';
import { ProgressBar } from './components/ProgressBar';
import { ScanToPay } from './components/ScanToPay';
import { SuccessfulOrder } from './components/SuccessfulOrder';
import styles from './style.module.scss';
const SUSSECCESSFUL_ORDER_CODE = 'step3';
const paymentMethods = [
  // {
  //   id: 1,
  //   paymentCode: PaymentMethodCode.VNPAY,
  //   name: 'VNPay',
  //   description:'Thanh toán qua VNPAY',

  //   image: '/images/logo/vnpay.png',
  //   longImage: '/images/logo/vnpay-long.svg',
  // },
  // {
  //   id: 2,
  //   paymentCode: PaymentMethodCode.MOMO,
  //   name: 'Ví Momo',
  //   description: 'Thanh toán qua mã QR MoMo',
  //   image: '/images/logo/momo.png',
  //   longImage: '/images/logo/momo.png',
  // },
  // {
  //   id: 3,
  //   paymentCode: PaymentMethodCode.ATM,
  //   name: 'Chuyển khoản ngân hàng',
  //   description: 'Thanh toán qua ATM',
  //   longImage: '/images/icons/atm-icon.svg',
  // },
  {
    id: 4,
    paymentCode: PaymentMethodCode.ALEPAY,
    name: 'Alepay',
    description: 'Thanh toán qua alepay',
    image: '/images/logo/alego.png',
    longImage: '/images/logo/alego.png',
  },
];

export const Purchase = ({ assessments, step }) => {
  const [currentStep, setCurrentStep] = useState(step);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(false);

  const getPostData = async () => {
    /* migrate to realtime data fetching */
    const res = await homeService.getHomePosts();
    return res;
  };
  const getCartItems = async () => {
    const result = await assessmentService.getCart();
    return result;
  };
  const { data: result = { items: [] } } = useSWR('get-cart-item', getCartItems);
  const { data } = useSWR('get-home-post', getPostData);
  useEffect(() => {
    result && setCourseList(result.items);
  }, [result]);
  useEffect(() => {
    setIsFetchingPosts(true);
    if (data) {
      setPosts(data);
      setIsFetchingPosts(false);
    }
  }, [data]);
  const [vouchers, setVouchers] = useState({ name: '' });

  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const [bankList, setBankList] = useState([
    { id: 1, name: 'Vietcombank' },
    { id: 2, name: 'Vietinbank' },
    { id: 3, name: 'BIDV' },
    { id: 4, name: 'VPbank' },
  ]);
  const [checkedMethod, setCheckedMethod] = useState(paymentMethods[0]);
  const router = useRouter();
  const checkPayProcess = () => {
    const { resultCode, message, extraData, orderInfo, amount, signature, responseTime } =
      router.query;
    if (resultCode === '0') {
      return setCurrentStep(3);
    }
    if (resultCode) {
      setTotalPrice(Number(amount));
      return setCurrentStep(4);
    }
  };

  useEffect(() => {
    checkPayProcess();
  }, []);

  const moveToScan = async () => {
    try {
      switch (checkedMethod.id) {
        case 4: {
          const response = await assessmentService.checkoutAlepay({
            redirectUrl: window.location.href,
            coupon: vouchers?.name,
            orderInfo: checkedMethod.description,
            requestType: checkedMethod.paymentCode,
            extraData: SUSSECCESSFUL_ORDER_CODE,
            items: checkedList.map((item) => item.id),
          });

          if (response.data.url) {
            window.location = response.data.url;
          } else {
            alert(response.message);
          }
          break;
        }

        default:
          setCurrentStep(2);
      }
    } catch (error) {
      return error;
    }
  };
  const moveToCart = () => {
    setCurrentStep(0);
  };
  const moveToSuccess = () => setCurrentStep(3);
  const payOut = () => {
    if (checkedList.length > 0) {
      setCurrentStep(1);
    } else return;
  };

  const [courseList, setCourseList] = useState([]);

  const [errMsg, setErrMsg] = useState('');
  const addCoupon = async (coupon) => {
    try {
      const {
        data: { usable, message, discount: discount_amount },
      } = await assessmentService.addCoupon(coupon);

      if (usable) {
        setDiscountAmount(discount_amount);
        return setVouchers({ name: coupon });
      } else {
        return setErrMsg(message);
      }
    } catch (error) {
      setErrMsg('Bạn cần nhập mã giảm giá hợp lệ');
    }
  };

  return (
    <Auth>
      <div className="container">
        <div className=" tw-fixed  tw-bottom-0 md:!tw-bottom-auto tw-w-full tw-left-0 tw-right-0 tw-z-30 ">
          <ProgressBar currentStep={currentStep} />
        </div>
        <div className="md:tw-mt-[110px]">
          <div className="container tw-w-full !tw-mt-5 !tw-p-0">
            <Breadcrumb
              separator={<span className={`${styles['breadcrumbItem']}`}>{'>>'}</span>}
              className={`${styles['breadcrumbContainer']}`}
            >
              <Breadcrumb.Item className={`${styles['breadcrumbItem']}`} href="/">
                Trang chủ
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className={`${styles['breadcrumbItem']}`}
                href="/danh-gia-nang-luc"
              >
                Đánh giá
              </Breadcrumb.Item>
              <Breadcrumb.Item
                onClick={moveToCart}
                className={`${currentStep === 0 && styles['boldItem']} ${
                  styles['breadcrumbItem']
                }`}
              >
                Giỏ hàng
              </Breadcrumb.Item>
              {currentStep >= 1 && (
                <Breadcrumb.Item
                  className={`${styles['breadcrumbItem']} ${styles['boldItem']}`}
                >
                  Thanh toán
                </Breadcrumb.Item>
              )}
            </Breadcrumb>
          </div>
          {currentStep === 0 && (
            <Cart
              {...(discountAmount && {
                discountAmount: discountAmount,
                setDiscountAmount: setDiscountAmount,
              })}
              courseList={courseList}
              checkedList={checkedList}
              errMsg={errMsg}
              setErrMsg={setErrMsg}
              setCheckedList={setCheckedList}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              payOut={payOut}
              onInputCoupon={addCoupon}
            />
          )}
          {currentStep === 1 && (
            <PayoutMethod
              {...(discountAmount && {
                discountAmount: discountAmount,
                setDiscountAmount: setDiscountAmount,
              })}
              checkedList={checkedList}
              vouchers={vouchers}
              totalPrice={totalPrice}
              methods={paymentMethods}
              checkedMethod={checkedMethod}
              setCheckedMethod={setCheckedMethod}
              moveToScan={moveToScan}
            />
          )}
          {currentStep === 2 && (
            <ScanToPay
              checkedList={checkedList}
              bankList={bankList}
              vouchers={vouchers}
              totalPrice={totalPrice}
              methods={paymentMethods}
              checkedMethod={checkedMethod}
              setCheckedMethod={setCheckedMethod}
              moveToScan={moveToScan}
              moveToSuccess={moveToSuccess}
            />
          )}
          {currentStep === 3 && (
            <SuccessfulOrder
              isFetchingPosts={isFetchingPosts}
              posts={posts}
              assessments={assessments}
            />
          )}
          {currentStep === 4 && (
            <FailedOrder totalPrice={totalPrice} checkedMethod={checkedMethod} />
          )}
        </div>
      </div>
    </Auth>
  );
};
