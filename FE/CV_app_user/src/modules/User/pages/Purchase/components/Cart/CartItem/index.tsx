import { numberWithCommas } from '@/helpers';
import { cartServices } from '@/modules/Home/shared/cartService';
import { Checkbox, Col, Dropdown, Form, Menu, Row } from 'antd';
import { useState } from 'react';
import styles from './style.module.scss';

export const CartItem = (props) => {
  const { data, isPayout, checkAll } = props;
  const [checked, setChecked] = useState(false);
  const deleteCartItem = (id: string) => {
    cartServices.updateCart({ items: [], deleted: [id] });
  };
  const menu = (
    <Menu
      onClick={(e) => {
        if (e.key) {
          deleteCartItem(e.key);
          window.location.reload();
        }
      }}
      items={[
        {
          label: 'Xoá',
          key: data.id,
        },
      ]}
    />
  );
  return (
    <Form.Item name="checkbox-group">
      <Row
        className={`${styles['cartItemContainer']} tw-flex-nowrap ${
          checked || checkAll ? styles['chosed'] : ''
        }`}
        align="middle"
      >
        {!isPayout && (
          <Col
            span={1}
            className={`${styles['cartCheckBox']} ${styles['tableCheckbox']}`}
          >
            <Checkbox
              value={data}
              style={{
                lineHeight: '32px',
              }}
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            ></Checkbox>
          </Col>
        )}
        <div className={`${styles['itemInfo']} tw-ml-2 tw-mr-auto`}>
          <img
            src={data.image ?? '/images/avatar/default.png'}
            alt="test-img"
            width={42}
            height={42}
            className={`${styles['testImg']}`}
          />
          <div className={`${styles['title']}`}>{data.name}</div>
        </div>
        <div className="tw-flex tw-flex-nowrap tw-justify-between ">
          <Col xs={4} span={3} className={`${styles['price']}`}>
            {numberWithCommas(data?.sale_price ?? data.original_price)}
          </Col>
          <Dropdown
            overlay={menu}
            placement="bottomLeft"
            arrow
            className="tw-ml-2 tw-cursor-pointer"
          >
            {
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.58506 12C7.58506 10.8954 6.66778 10 5.53625 10C4.40471 10 3.48743 10.8954 3.48743 12C3.48743 13.1046 4.40471 14 5.53625 14C6.66778 14 7.58506 13.1046 7.58506 12Z"
                  fill="#92929D"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.7559 12C14.7559 10.8954 13.8386 10 12.7071 10C11.5756 10 10.6583 10.8954 10.6583 12C10.6583 13.1046 11.5756 14 12.7071 14C13.8386 14 14.7559 13.1046 14.7559 12Z"
                  fill="#92929D"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.9268 12C21.9268 10.8954 21.0095 10 19.878 10C18.7464 10 17.8292 10.8954 17.8292 12C17.8292 13.1046 18.7464 14 19.878 14C21.0095 14 21.9268 13.1046 21.9268 12Z"
                  fill="#92929D"
                />
              </svg>
            }
          </Dropdown>
        </div>
      </Row>
    </Form.Item>
  );
};
