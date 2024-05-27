import { numberWithCommas } from '@/helpers/helper';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { isEmpty } from 'lodash-es';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartItem } from './CartItem';
import { CourseCard } from './CourseCard';
import styles from './style.module.scss';

export const Cart = (props) => {
  const {
    courseList,
    checkedList,
    setCheckedList,
    totalPrice,
    setTotalPrice,
    payOut,
    onInputCoupon,
    errMsg,
    setErrMsg,
    setDiscountAmount,
    discountAmount,
  } = props;
  const CheckboxGroup = Checkbox.Group;
  const [checkAll, setCheckAll] = useState(false);
  const [listRef] = useAutoAnimate<HTMLDivElement>();

  useEffect(() => {
    let price = 0;
    checkedList.map((item) => {
      item.sale_price ? (price += item.sale_price) : 0;
    });
    if (discountAmount && price > 0) {
      if (discountAmount < '100') {
        price = price - (price * Number(discountAmount)) / 100;
      } else {
        price = price - Number(discountAmount);
      }
    }
    setTotalPrice(price);
  }, [checkedList, discountAmount]);

  const onChange = (list) => {
    setCheckedList(list);
    setCheckAll(list.length === courseList.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? courseList : []);
    setCheckAll(e.target.checked);
  };

  const [couponString, setCouponString] = useState('');

  const onInputChange = (e) => {
    setErrMsg('');
    setDiscountAmount && setDiscountAmount(0);
    setCouponString(e.target.value);
  };

  return (
    <div className="container tw-flex tw-flex-wrap md:!tw-flex-nowrap tw-p-0 tw-min-h-screen tw-gap-[2rem]">
      <Col className="tw-w-full">
        <Form>
          <div className={`${styles['container']}`}>
            <div className={`${styles['contentContainer']} !tw-w-full`}>
              <div className={`${styles['headerTitle']}`}>Giỏ hàng của bạn</div>
              <div className={`${styles['subTitle']}`}>Chọn mục bạn muốn thanh toán</div>
              <div className={`${styles['cartContainer']}`}>
                <table className={`${styles['cartTable']} cartList`}>
                  <Row
                    className={`${styles['cartTableHeader']} tw-flex-nowrap`}
                    align="middle"
                  >
                    <Col span={1} className={`${styles['tableCheckbox']}`}>
                      <Checkbox
                        checked={checkAll}
                        onChange={onCheckAllChange}
                        style={{
                          lineHeight: '32px',
                        }}
                      ></Checkbox>
                    </Col>
                    <Col className={`${styles['itemInfo']} tw-w-full`}>
                      MỤC CẦN THANH TOÁN
                    </Col>
                    <Col className={`${styles['itemInfo']} tw-whitespace-nowrap`}>
                      GIÁ {'(VNĐ)'}
                    </Col>
                    <Col xs={1} span={2}></Col>
                  </Row>
                  <div style={{ height: '10px' }}></div>
                  <CheckboxGroup value={checkedList} onChange={onChange}>
                    {courseList.map((item) => (
                      <CartItem data={item} key={item.id} checkAll={checkAll} />
                    ))}
                  </CheckboxGroup>
                </table>
                <Row className={`${styles['voucherInput']}`}>
                  <Col>
                    <label htmlFor="voucher" className={`${styles['labelTitle']}`}>
                      Nhập mã giảm giá
                    </label>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      id="voucher"
                      placeholder="Enter để áp mã"
                      value={couponString}
                      className={`${styles['inputBox']}`}
                      onChange={onInputChange}
                      onPressEnter={(event: any) => {
                        onInputCoupon(couponString);
                        setCouponString(event.target.value.toString());
                      }}
                      onBlur={(event: any) => {
                        onInputCoupon(couponString);
                        setCouponString(event.target.value.toString());
                      }}
                    />
                  </Col>
                  <Col flex={1}>
                    <div className={`${styles['errBox']} `}>{errMsg}</div>
                  </Col>

                  {discountAmount && (
                    <Col className={`${styles['notiText']}`}>
                      Bạn đã được&nbsp;
                      <span>
                        giảm&nbsp;
                        {`${
                          discountAmount < 100 ? `${discountAmount}%` : discountAmount
                        }`}
                      </span>
                    </Col>
                  )}
                </Row>
                <div className={`${styles['total']}`}>
                  <Row className={`${styles['totalAmount']}`}>
                    <Col xs={16} span={20} className={`${styles['title']}`}>
                      Tổng số lượng
                    </Col>
                    <Col xs={8} span={4} className={`${styles['value']} tw-pr-5`}>
                      {checkedList.length}
                    </Col>
                  </Row>
                  <Row className={`${styles['totalPrice']}`}>
                    <Col xs={16} span={20} className={`${styles['title']}`}>
                      THÀNH TIỀN
                    </Col>
                    <Col xs={8} span={4} className={`${styles['value']}`}>
                      {numberWithCommas(totalPrice)} {'(VND)'}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <Form.Item className={`${styles['buttonContainer']}`}>
              <Button
                className={`${styles['payoutButton']}`}
                disabled={isEmpty(checkedList)}
                onClick={payOut}
              >
                Thanh toán ngay
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Col>
      <Col className={`${styles['course-list']}`}>
        <span className={`${styles['title']}`}>{'KHÓA HỌC\nDÀNH CHO BẠN'}</span>
        <div
          ref={listRef}
          className="custom_scrollbar tw-flex md:tw-flex-col md:tw-h-full md:tw-max-h-[950px] tw-overflow-auto"
        >
          {[
            {
              id: '8b91bfb9-b64c-43e3-a1ed-75d01b58e1a3',
              product_id: 'e8cec556-0468-4ffb-a241-6b607c5e68e2',
              quantity: 1,
              name: 'KỸ NĂNG QUẢN LÝ THỜI GIAN',
              original_price: 395000,
              image:
                'https://course.youth.com.vn/wp-content/uploads/2022/02/QUAN-LY-THOI-GIAN-01-2.png',
            },
            {
              id: '93202216-aa18-4d64-a54e-590a2d9fc2a8',
              product_id: '3fd461c4-80fa-489d-b828-cb7a47e597c6',
              quantity: 1,
              name: 'KỸ NĂNG THUYẾT TRÌNH ẤN TƯỢNG',
              original_price: 395000,
              image:
                'https://course.youth.com.vn/wp-content/uploads/2022/02/KY-NANG-LANG-NGHE-VA-DAT-CAU-HOI-01-1.png',
            },
          ].map((item, index) => {
            return <CourseCard key={item.id} data={item}></CourseCard>;
          })}
        </div>
      </Col>
    </div>
  );
};
