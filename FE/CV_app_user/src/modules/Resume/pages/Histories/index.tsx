import { ContainerLoading, EmptyData } from '@/components';
import { httpClientV2 } from '@/modules/TestAssessment/shared/httpClientV2';
import TestSearchBar from '@/modules/TestAssessment/components/SearchBar';
import { findByVN } from '@/modules/TestAssessment/pages/AllTest';
import { FullContentLayout } from '@/shared';
import { DatePicker, Table, TablePaginationConfig, Tag } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { debounce } from 'lodash-es';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Button } from '@mui/material';

interface TableParams {
  pagination?: TablePaginationConfig;
}

const columns = [
  {
    title: 'Tên đơn hàng',
    dataIndex: 'request_id',
    key: 'request_id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Ngày mua',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Giá trị đơn hàng',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      let color = 'volcano';
      if (status === 'PAID') {
        color = 'green';
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: '',
    key: 'action',
    dataIndex: 'id',
    render: (_, { id }) => (
      <Link href={`/account/detail-payment/${id}`}>
        {id != '' ? (
          <div className="btn btn-primary">{'Xem Đánh Giá'}</div>
        ) : (
          <div></div>
        )}
      </Link>
    ),
  },
];

const History = () => {
  // id ordered
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [histories, setHistories] = useState([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const dateFormat = 'DD/MM/YYYY';
  const { RangePicker } = DatePicker;
  dayjs.extend(customParseFormat);

  const onType = (value) => {
    onSearch(value);
  };
  const onSearch = useCallback(
    debounce((value) => {
      setHistories(
        histories.filter((item) => {
          return findByVN(item.name, value);
        })
      );
    }, 300),
    []
  );
  useEffect(() => {
    async function getData() {
      try {
        const response = await httpClientV2
          .get('payment/histories')
          .finally(() => setIsLoading(false));

        setHistories(response.data.data);

        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }

      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: histories.length,
        },
      });
    }

    getData();
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });
  };
  // Render
  const EmptyHistoryData = !isLoading && histories.length === 0 && (
    <EmptyData message="Bạn chưa thanh toán giao dịch nào!" />
  );

  const GroupSearchHistory = !isLoading && (
    <div className={styles.tableHeaderSearch}>
      <div className="col-md-5 col-sm-2">
        <TestSearchBar placeholder={'Tìm kiếm'} onChange={onType} />
      </div>
      <div className="col-md-3 col-sm-8">
        <RangePicker className={styles.pickerRange} format={dateFormat} />
      </div>
    </div>
  );

  return (
    <FullContentLayout className={styles.page}>
      <ContainerLoading loading={isLoading}>
        <div className="container">
          <div className="col-md-12 col-lg-12 tw-p-0">
            (
            <button className={styles.btnBack}>
              <div className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="#403ECC"
                  className="tw-w-4 md:tw-w-6 tw-h-4 md:tw-h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </div>
              <span>Quay lại</span>
            </button>
            )
            <div className={styles.content}>
              <div className={styles.head}>
                <div className={styles.head__title}>
                  <h1>{'Lịch sử đơn hàng'}</h1>
                </div>
              </div>
              <div className={styles.head}>
                <div className={styles.head__title}>
                  <h2>Hiển thị thông tin các sản phẩm bạn đã thanh toán tại Eztek</h2>
                </div>
              </div>
              <div className={styles.cvs}>
                {GroupSearchHistory}
                <Table
                  columns={columns}
                  dataSource={histories}
                  pagination={tableParams.pagination}
                  onChange={handleTableChange}
                />
                {histories.length > 0 && (
                  <div className={styles.paginationInfo}>
                    Trang <span>{tableParams.pagination.current}</span> của{' '}
                    <span>
                      {Math.ceil(
                        tableParams.pagination.total / tableParams.pagination.pageSize
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ContainerLoading>
    </FullContentLayout>
  );
};

export default History;
