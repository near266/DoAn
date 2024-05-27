import { numberWithCommas } from '@/helpers/helper';
import { Button, Checkbox, Col, Row } from 'antd';
import { useEffect } from 'react';
import { CartItem } from '../Cart/CartItem';
import styles from './style.module.scss';

export const PayoutMethod = (props) => {
  const {
    checkedList,
    vouchers,
    totalPrice,
    methods,
    checkedMethod,
    setCheckedMethod,
    moveToScan,
    discountAmount,
    setDiscountAmount,
  } = props;

  let width = 0;
  useEffect(() => {
    window.addEventListener('resize', () => {
      width = window.innerWidth;
    });
  }, []);

  const checkValue = (e) => {
    setCheckedMethod(e.target.value);
  };
  return (
    <div
      className={`${styles['container']} tw-flex tw-justify-between tw-flex-wrap  md:!tw-flex-nowrap tw-gap-[2rem]`}
    >
      <div className={`${styles['contentContainer']} tw-w-full`}>
        <div className={`${styles['headerTitle']}`}>Phương thức thanh toán</div>
        <div className={`${styles['methodContainer']}`}>
          {methods.map((method) => (
            <Row
              className={`${styles['methodItem']} ${
                checkedMethod.id === method.id ? styles['methodItem-chosed'] : ''
              }`}
              key={method.id}
              align="middle"
            >
              <Checkbox
                value={method}
                checked={checkedMethod.id === method.id}
                onChange={(e) => {
                  checkValue(e);
                }}
              />
              {method.image && (
                <img
                  src={method.image}
                  alt={method.name}
                  className={`${styles['methodImage']}`}
                />
              )}
              <div className={`${styles['methodName']}`}>{method.name}</div>
            </Row>
          ))}
          <Button className={`${styles['payoutButton']}`} onClick={moveToScan}>
            Tiếp tục
          </Button>
        </div>
      </div>
      <div
        className={`${styles['orderInfoContainer']} tw-w-full md:!tw-w-auto md:tw-min-w-[450px]`}
      >
        <div className={`${styles['headerTitle']}`}>Thông tin đơn thanh toán</div>
        <div className={`${styles['cartContainer']}`}>
          <div className={`${styles['cartTable']} cartList`}>
            <Row className={`${styles['cartTableHeader']}`} align="middle">
              <Col xs={14} span={16} className={`${styles['itemInfo']}`}>
                {width < 576 ? 'MỤC' : 'MỤC CẦN THANH TOÁN'}
              </Col>
              <Col xs={7} span={3}>
                GIÁ {'(VNĐ)'}
              </Col>
              <Col xs={0} span={2}></Col>
            </Row>
            <div>
              {checkedList.map((item) => (
                <CartItem data={item} key={item.id} isPayout />
              ))}
            </div>
          </div>
          <Row className={`${styles['voucherInput']}`} align="middle">
            {vouchers?.name !== '' && (
              <Col className={`${styles['voucherName']}`}>{vouchers?.name}</Col>
            )}

            {discountAmount && (
              <Col className={`${styles['notiText']}`}>
                Bạn đã được&nbsp;
                <span>
                  giảm&nbsp;
                  {`${discountAmount < 100 ? `${discountAmount}%` : discountAmount}`}
                </span>
              </Col>
            )}
          </Row>
          <div className={`${styles['total']}`}>
            <Row className={`${styles['totalAmount']}`}>
              <Col span={20} className={`${styles['title']}`}>
                Tổng số lượng
              </Col>
              <Col flex={1} className={`${styles['value']}`}>
                1
              </Col>
            </Row>
            <Row className={`${styles['totalPrice']}`}>
              <Col span={16} className={`${styles['title']}`}>
                THÀNH TIỀN
              </Col>
              <Col span={4} className={`${styles['value']}`}>
                {numberWithCommas(totalPrice ?? 0)} {'(VND)'}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
