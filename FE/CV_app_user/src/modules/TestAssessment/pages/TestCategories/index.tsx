import { TestCard } from '@/components/common/Cards';
import CustomSelector from '@/components/common/Selector';
import { assessmentService } from '@/modules/Assessment/shared';
import TestAssessment from '@/pages/danh-gia-nang-luc';
import { appLibrary } from '@/shared';
import { message } from 'antd';
import { cloneDeep, debounce, isEmpty } from 'lodash-es';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import TestSearchBar from '../../components/SearchBar';
import { testService } from '../../shared/testAssessmentService';
import { AssessmentTypeNumeric, FILTER_OPTS } from '../../shared/variables';
import { filteringAssessment, findByVN } from '../AllTest';

const Pagination = dynamic(() => import('@mui/material/Pagination'));
type Props = {
  assessments: any[];
  page?: number;
  size?: number;
  total?: number;
};
const PAGE_PAGI_SIZE = 12;
const options = [
  { value: FILTER_OPTS.ALL, label: 'Tất cả' },
  { value: FILTER_OPTS.LASTEST, label: 'Mới nhất' },
  { value: FILTER_OPTS.POPULAR, label: 'Phổ biến' },
];
const TestCategoriesModule = (props: Props) => {
  const { assessments, page, size, total } = props;
  const router = useRouter();
  const [assessmentState, setAssessmentState] = useState(assessments);
  const [showFilter, setShowFilter] = useState(false);

  const onType = (value) => {
    onSearch(value);
  };
  const onSearch = useCallback(
    debounce((value) => {
      if (isEmpty(value)) return setAssessmentState(assessments);

      const newState = cloneDeep(
        assessments.filter((item) => findByVN(item.name, value))
      );
      setAssessmentState(newState);
    }, 300),
    []
  );

  const onSelectFilter = (selected: [{ value: FILTER_OPTS; label: string }]) => {
    const { value, label } = selected[0];
    if (value === FILTER_OPTS.ALL) {
      setAssessmentState(assessments);
    }

    if (value === FILTER_OPTS.LASTEST) {
      const newArr = cloneDeep(
        assessments.sort((pre, next) => {
          return new Date(next.updated_at).getTime() > new Date(pre.updated_at).getTime()
            ? -1
            : 1;
        })
      );
      setAssessmentState(newArr);
    }
    if (value === FILTER_OPTS.POPULAR) {
      const newData = cloneDeep(
        assessmentState.sort((pre, next) => {
          return next.sumitted_count > pre.sumitted_count ? 1 : -1;
        })
      );
      setAssessmentState(newData);
    }
  };
  const getPagyData = async (type: number, page: number) => {
    try {
      appLibrary.showloading();
      const { data, total, size } = await testService.getAllAssessments(type, page);
      if (isEmpty(data))
        return message.error('Lấy dữ liệu thất bại! Vui lòng tải lại trang');
      setAssessmentState(data);

      appLibrary.hideloading();
    } catch (error) {
      appLibrary.hideloading();

      message.error(error.message.toString());
    }
  };
  const handlePagyChange = (page) => {
    const { type } = router.query;
    console.log(router.query);

    if (!page) return message.warning('Có lỗi không mong muốn đã sảy ra!');
    getPagyData(Number(type), page);
  };
  return (
    <div>
      <div className="container ">
        <div className="tw-mt-[72px] tw-mb-28">
          <div className="row tw-m-0 ">
            <h1 className="tw-text-[#22216d]">Đánh giá</h1>
          </div>

          <div className="row tw-m-0  ">
            <div className="tw-ml-auto tw-flex tw-gap-[15px] tw-z-0 tw-flex-wrap md:tw-flex-nowrap  tw-w-full md:tw-justify-end tw-mr-9 md:tw-mr-0 ">
              <div className="tw-w-full md:tw-max-w-[500px] sm:tw-max-w-full tw-min-w-[245px] ">
                <TestSearchBar placeholder={'Nhập tên bài test'} onChange={onType} />
              </div>
              <div
                className={`${
                  showFilter ? '' : ''
                } tw-gap-[15px] tw-z-[-1] filter tw-flex tw-flex-wrap tw-items-end md:tw-items-start tw-flex-col-reverse md:tw-flex-row md:tw-flex-nowrap tw-absolute tw-right-[10px] md:tw-right-auto md:tw-relative  md:tw-pt-1`}
              >
                <div
                  className={`${
                    showFilter ? 'tw-w-[210px] tw-h-[38px]' : 'tw-w-[0px] tw-h-[0px] '
                  }  d-flex sm:tw-h-[38px] tw-overflow-hidden tw-bg-white tw-rounded-[10px] `}
                  style={{ transition: 'all 600ms ease' }}
                >
                  {/* <SearchFilter /> */}
                  <CustomSelector
                    options={options}
                    withCheckbox
                    defaultLabel={' Sort by: Lựa chọn'}
                    checkBoxStyle={{ color: '#30AB7E' }}
                    renderSelectedItem={(selected: string[]) => {
                      return (
                        <div className="tw-text-[#696974] tw-text-sm tw-mr-2">
                          Sort by:&nbsp;
                          <strong className="tw-text-sm tw-text-[#44444F]">
                            {selected}
                          </strong>
                        </div>
                      );
                    }}
                    onChange={onSelectFilter}
                  />
                </div>
                <div
                  className="tw-relative tw-cursor-pointer tw-flex tw-items-center tw-justify-center md:tw-items-start"
                  onClick={() => {
                    setShowFilter(!showFilter);
                  }}
                >
                  <img
                    src="/images/icons/filter.svg"
                    className="tw-w-[32px] tw-h-[32px] md:!tw-w-[40px] tw-mt-[2px] md:tw-mt-0 md:!tw-h-[40px]"
                    alt="Youth Tìm kiếm bài test"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="tw-text-[#22216d] tw-mt-4 tw-leading-9 tw-text-[24px] md:tw-text-[30px] xl:tw-text-[36px] tw-font-[600]">
            Đánh giá{' '}
            {assessments[0]?.type_code === AssessmentTypeNumeric.YOUR_SELF
              ? 'thấu hiểu bản thân'
              : assessments[0]?.type_code === AssessmentTypeNumeric.CAREER
              ? 'phù hợp nghề'
              : 'năng lực'}
          </div>
          <div className="row tw-mt-9 tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 !tw-mx-auto tw-gap-5">
            {assessmentState.map((item, index) => (
              <TestCard
                id={item.id}
                discount={item.discount ?? 0}
                image={item.avatar}
                price={item.originPrice}
                sumittedCount={item.submitted_count}
                questionCount={item.questions_count}
                title={item.name}
                salePrice={item.salePrice}
                description={item.description}
                httpPath={'/danh-gia-nang-luc/'}
                slug={item.slug}
                key={item.id}
                priorityView={index < 4}
                assessmentClassName="!tw-p-0 col-12"
                cardClassName="col-sm-12"
              />
            ))}
          </div>
          <div className="tw-flex tw-justify-center !tw-bg-transparent">
            {total >= PAGE_PAGI_SIZE && (
              <Pagination
                count={Math.ceil(total / PAGE_PAGI_SIZE)}
                shape="rounded"
                sx={{
                  '& Mui-selected': 'color:red',
                }}
                className="tw-text-sm tw-font-[600] tw-text-[#403ECC]"
                onChange={(event, page) => handlePagyChange(page)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCategoriesModule;
