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
import { useRouter } from "next/router";
import styles from './styles.module.scss';
import { Button } from '@mui/material';
import { DetailOrderPayment } from '../../models/detail-payment';
import { IOrderItem } from '@/interfaces/IDetailPayment';

const DetailPayment = () => {
    const router = useRouter();
    const [detail, setDetail] = useState(new DetailOrderPayment());
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getData() {
            try {
                const { id } = router?.query;
                console.log(id);
                const response = await httpClientV2
                    .get('payment/history-detail/' + id)
                    .finally(() => setIsLoading(false));
                setDetail(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    });

    // Render
    const EmptyHistoryData = !isLoading && detail && (
        <EmptyData message="Không có thông tin giao dịch!" />
    );

    const results = []

    const ListItemPayment = !isLoading && detail.order && (
        detail.order.order_item.forEach((item, index) => {
            if(item) {
                results.push(<div
                    className={`${styles.orderItem}
             tw-flex tw-items-start
             md:tw-items-center tw-justify-between tw-pb-2 md:tw-pb-6
             tw-flex-col tw-gap-2 md:tw-gap-0 md:tw-flex-row`}
                >
                    <div className={`${styles.detailOrdered} tw-flex tw-flex-col tw-gap-2`}>
                        <h3>Thông tin đơn hàng</h3>
                        <h6>Tên đơn hàng: {item.product.name}</h6>
                        <h6>Ngày tạo: {detail.created_at}</h6>
                        <h6>
                            Trạng thái đơn hàng:{''}
                            {/* <p className="tw-text-[#EB4C4C] tw-inline-block tw-mb-0">Đã huỷ</p> */}
                            <p className="tw-text-[#30AB7E] tw-inline-block tw-mb-0">{detail.status}</p>
                        </h6>
                        <h6>Người nhận: {detail.user.username}</h6>
                    </div>
                    <div
                        className={`${styles.detailOrdered}
                tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-[375px] md:tw-self-start`}
                    >
                        <h3>Giá trị đơn hàng</h3>
                        <div className={styles.detailOrderedPrice}>
                            <h6>Giá gốc:</h6>
                            <span className="tw-text-[#92929D] tw-line-through">{item.price_each}</span>
                        </div>
                        <div className={styles.detailOrderedPrice}>
                            <h6>Giá khuyến mãi::</h6>
                            <span>{0}</span>
                        </div>
                        <div className={styles.detailOrderedPrice}>
                            <h6>Tổng giá trị sản phẩm:</h6>
                            <span>{item.price_each * item.quantity}</span>
                        </div>
                    </div>
                    <Link
                        className="nav-button tw-normal-case tw-w-[144px]
                  tw-font-bold tw-text-4 tw-shadow-none
                 tw-text-[#696974] tw-px-2 tw-py-2 tw-bg-[#F1F1F5]
                  tw-rounded-[10px] hover:!tw-text-white hover:tw-bg-[#403ECC] tw-self-center"
                        href={'/danh-gia-nang-luc/ket-qua/'+item.product.slug}
                    >
                        Xem đánh giá
                    </Link>
                </div>
                )
            }
        })
    )

    return (
        <FullContentLayout className={styles.page}>
            <ContainerLoading loading={isLoading}>
                <div className="container">
                    <div className="col-md-12 col-lg-12 tw-p-0">
                        {(
                            <button className={styles.btnBack} onClick={() => router.back()}>
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
                        )}
                        {results}
                    </div>
                </div>
            </ContainerLoading>
        </FullContentLayout>
    );
};
export default DetailPayment;
