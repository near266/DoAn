import { numberWithCommas } from '@/helpers/helper';
import { Button, Col, Rate, Row } from 'antd';
import Image from 'next/image';
import styles from './style.module.scss';

export const CourseCard = (props) => {
  const { data } = props;
  return (
    <div
      className={`${styles['course-card']} tw-min-w-[300px] tw-cursor-pointer`}
      onClick={() => {
        window.location.href = 'https://course.youth.com.vn';
      }}
    >
      <div className={`${styles['course-image']} tw-relative tw-min-h-[220px]`}>
        <Image
          src={data.image ?? '/images/avatar/default.png'}
          alt="course-image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={`${styles['info-container']}`}>
        <div className={`${styles['course-name']}`}>{data.name}</div>
        <Row className={`${styles['course-info']}`}>
          <Col className={`${styles['info-sec']}`}>
            <img
              src={'/images/icons/user-icon.png'}
              alt="user-icon"
              className={`${styles['info-icon']}`}
            />
            <div className={`${styles['course-member']}`}>{data.participants}</div>
          </Col>
          <Col className={`${styles['info-sec']}`} flex={1}>
            <img
              src={'/images/icons/timer-icon.png'}
              alt="timer-icon"
              className={`${styles['info-icon']}`}
            />
            <div className={`${styles['course-timer']}`}>{data.totalTime}</div>
          </Col>
          <Col>
            <Rate disabled defaultValue={data.rate} />
          </Col>
        </Row>
        <Row className={`${styles['action-container']}`} align="middle">
          <Col flex={1} className={`${styles['course-action']}`}>
            <Button className={`${styles['payoutButton']}`}>Học thử</Button>
          </Col>
          <Col className={`${styles['course-price']}`}>
            <img
              src={'/images/icons/price.png'}
              alt="price"
              className={`${styles['price-icon']}`}
            />
            {numberWithCommas(data.original_price)}
          </Col>
        </Row>
      </div>
    </div>
  );
};
