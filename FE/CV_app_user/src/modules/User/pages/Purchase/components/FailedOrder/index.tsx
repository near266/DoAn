import { numberWithCommas } from '@/helpers/helper';
import { Button, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

export const FailedOrder = (props) => {
  const { totalPrice, checkedMethod } = props;
  const onReCheckout = () => {
    // ko dung route vi no van giu lai state cua checkout
    window.location.href = '/cart';
  };
  return (
    <div className={`${styles['container']}`}>
      <div className={`${styles['headerTitle']}`}>{'Thanh toán không\nthành công'} </div>
      <div className={`${styles['failedContainer']}`}>
        <div className={`${styles['failedTitle']}`}>
          Thanh toán thất bại. Vui lòng thanh toán lại hoặc chọn phương thức thanh toán
          khác
        </div>
        <div className={`${styles['failedInfo']}`}>
          <Row className={`${styles['checkedMethod']}`} justify="space-between">
            <Col>Phương thức thanh toán</Col>
            <Col>
              <img src={checkedMethod.longImage} alt="checkedMethod" />
            </Col>
          </Row>
          <Row className={`${styles['totalPrice']} tw-mt-2`} justify="space-between">
            <Col>Tổng tiền</Col>
            <Col>{numberWithCommas(totalPrice)} đ</Col>
          </Row>
          <Row justify="center">
            <Button className={`${styles['repayBtn']}`} onClick={onReCheckout}>
              Thanh toán lại
            </Button>
          </Row>
        </div>
      </div>
    </div>
  );
};
