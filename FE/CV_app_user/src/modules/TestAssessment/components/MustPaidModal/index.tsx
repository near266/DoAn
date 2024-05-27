import CustomNextImg from '@/components/common/CustomNextImg/indext';
import { numberWithCommas } from '@/helpers';
import { assessmentService } from '@/modules/Assessment/shared';
import { useSnackbar } from '@/shared/snackbar';
import { Button } from '@mui/material';
import { debounce } from 'lodash-es';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

type TModalContent = {
  assessmentId: any;
  originalPrice: number;
  salePrice: number;
  assessmentName: string;
  title: string;
  description: string;
  imgUrl: string;
};

const MustPaidModalContent: React.FC<TModalContent> = (props: TModalContent) => {
  const {
    title,
    description,
    imgUrl,
    assessmentId,
    assessmentName,
    originalPrice,
    salePrice,
  } = props;

  const snackbar = useSnackbar();
  const addToCart = async () => {
    try {
      const { data } = await assessmentService.addToCart(assessmentId, assessmentName);
      snackbar.showMessage('Đã thêm vào giỏ hàng', 'success');
      return (window.location.href = '/cart');
    } catch (error) {
      const { status } = error.response;
      snackbar.showMessage(
        status === 409 ? 'Sản phẩm đã có trong giỏ hàng!' : 'Đã có lỗi sảy ra!',
        status === 409 ? 'warning' : 'error'
      );
    }
  };
  return (
    <div
      className="tw-flex tw-flex-col sm:tw-flex-row tw-p-[10px]"
      style={{ fontFamily: 'Lexend Deca' }}
    >
      <div className="right_block tw-flex tw-flex-col tw-items-center sm:tw-items-start tw-justify-center">
        <h3 className="tw-font-[600] tw-text-[24px] tw-leading-[34px] tw-tracking-[0.1 px] sm:tw-text-[36px] sm:tw-leading-[39px] sm:tw-tracking-[0.12px] tw-text-[#171725]">
          {title}
        </h3>
        <div className="tw-flex tw-items-start tw-mb-2">
          <div className="tw-mt-[4px] tw-mr-[4px]">
            <Image width={20} height={20} src="/images/icons/price_tag.svg" alt="" />
          </div>
          <div
            className={`${
              salePrice > 0 ? '' : ''
            } tw-flex-col tw-flex tw-justify-end tw-items-end`}
          >
            {salePrice > 0 ? (
              <div className="tw-flex-col tw-flex tw-justify-end tw-items-end">
                <span>{numberWithCommas(salePrice)}đ</span>
                <span className=" tw-text-red tw-font-[400] tw-text-[18px] tw-text-[#D5D5DC] tw-leading-[12px] tw-line-through	">
                  {numberWithCommas(originalPrice)}đ
                </span>
              </div>
            ) : (
              <span className="tw-text-[24px]">
                {originalPrice > 0 ? `${numberWithCommas(originalPrice)}đ` : 'Miễn phí'}
              </span>
            )}
          </div>
        </div>
        <p className="tw-m-0 tw-font-[300] sm:tw-font-[400] tw-text-[16px] tw-leading-[26px] tw-tracking-[0.1px] sm:tw-text-[18px] sm:tw-leading-[28px] tw-text-[#44444F] tw-mb-[24px] sm:tw-mb-[40px]">
          {description}
        </p>

        <div className="tw-flex tw-gap-[12px] tw-flex-nowrap tw-justify-center sm:tw-justify-start tw-mb-[24px] sm:tw-mb-[40px]">
          <Link href="/cart">
            <Button
              className="!tw-text-white tw-px-[10px] tw-py-[8px] tw-normal-case  !tw-bg-[#403ECC] tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
              variant="contained"
              style={{ fontFamily: 'Lexend Deca' }}
              onClick={debounce(addToCart, 500)}
            >
              Thanh toán ngay
            </Button>
          </Link>
          <Button
            className="!tw-text-[#403ECC] tw-px-[10px] tw-py-[8px] tw-normal-case  !tw-bg-white tw-font-[600] tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] "
            variant="outlined"
            style={{ fontFamily: 'Lexend Deca' }}
            onClick={debounce(addToCart, 500)}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
        <p className="tw-m-0 tw-text-base tw-font-[600] leading-[24px] tw-tracking-[0.1px] tw-text-[18px] leading-[28px] tw-text-[#403ECC] tw-underline tw-text-center sm:tw-text-left">
          Liên hệ hỗ trợ
        </p>
      </div>
      <div className="left_block tw-relative tw-h-[289px] sm:tw-h-[400px] tw-w-full sm:tw-min-w-[465.41px]">
        <CustomNextImg
          src={imgUrl}
          alt={title}
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
    </div>
  );
};

export default MustPaidModalContent;
