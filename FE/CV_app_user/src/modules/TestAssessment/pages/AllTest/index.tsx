import { useRouter } from 'next/router';
import TestCard from '@/components/common/Cards/TestCard';
import ListCard from '@/components/common/ListCard';
import CustomSelector from '@/components/common/Selector';
import { removeVietnameseTones } from '@/shared/utils/common';
import { NoSsr } from '@mui/material';
import { Empty } from 'antd';
import { debounce } from 'lodash-es';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import TestSearchBar from '../../components/SearchBar';
import {
  AssessmentType,
  AssessmentTypeNumeric,
  FILTER_OPTS,
} from '../../shared/variables';
import styles from './styles.module.scss';
import Link from 'next/link';
import Loading from '@/components/common/ContainerLoading/Loading';

type ListCardProps = {
  title: string;
  listItem: any;
};
const ListCardItem: React.FC<ListCardProps> = (props: ListCardProps) => {
  const { title, listItem } = props;

  return (
    <div className="tw-mt-[52px] tw-max-h-[550px] ">
      <div className={styles.card_title}>{title}</div>
      {listItem.length === 0 ? (
        <div className="col-12 tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-[10px] sm:tw-rounded-[20px] tw-overflow-hidden tw-py-[100px]">
          <Empty
            image="/images/icons/sunny-loading.svg"
            description="Đang tải dữ liệu..."
          />
        </div>
      ) : (
        <>
          <ListCard>
            {listItem.map((item, index) => (
              <TestCard
                id={item.id}
                discount={item.discount ?? 0}
                image={item.avatar}
                price={item.originPrice}
                sumittedCount={item.sumittedCount}
                questionCount={item.questionCount}
                title={item.name}
                salePrice={item.salePrice}
                description={item.description}
                httpPath={'/danh-gia-nang-luc/'}
                slug={item.slug}
                key={item.id}
                priorityView={index < 4}
              />
            ))}
          </ListCard>
          <Link
            href={`danh-gia-nang-luc/type/${
              listItem[0].assessmentType === AssessmentType.CAREER
                ? AssessmentTypeNumeric.CAREER
                : listItem[0].assessmentType === AssessmentType.YOUR_SELF
                ? AssessmentTypeNumeric.YOUR_SELF
                : AssessmentTypeNumeric.COMPETENCY
            }`}
          >
            <div className="-tw-translate-y-[60px]  tw-mx-auto tw-relative tw-w-full tw-h-[10px] tw-text-center xl:tw-text-right">
              <span
                className={`${styles.view_more} tw-text-right tw-text-[#403ECC] tw-text-xl tw-cursor-pointer`}
              >
                Xem thêm
              </span>
              <img src="/images/icons/right_arrow.svg" className="tw-mb-1" alt="" />
            </div>
          </Link>
        </>
      )}
    </div>
  );
};
const options = [
  { value: FILTER_OPTS.ALL, label: 'Tất cả' },
  { value: FILTER_OPTS.LASTEST, label: 'Mới nhất' },
  { value: FILTER_OPTS.POPULAR, label: 'Phổ biến' },
];
export const filteringAssessment = (data, filter) => {
  if (filter === FILTER_OPTS.ALL) {
    return data;
  }
  if (filter === FILTER_OPTS.LASTEST) {
    return data.sort((pre, next) => {
      return new Date(next.updatedAt).getTime() > new Date(pre.updatedAt).getTime()
        ? -1
        : 1;
    });
  }
  if (filter === FILTER_OPTS.POPULAR) {
    return data.sort((pre, next) => {
      return next.sumittedCount > pre.sumittedCount ? 1 : -1;
    });
  }
};

export const findByVN = (name, value) => {
  return removeVietnameseTones(name)
    .toLowerCase()
    .includes(removeVietnameseTones(value).toLowerCase());
};

export default function AssessmentView({ assessments }) {
  const [yourSelf, setYourSelf] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const [potential, setPotential] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(options[0].value);
  const ref = useRef(null);
  const router = useRouter();
  const generateAssessment = useCallback(() => {
    setYourSelf(
      assessments.filter((item) => item.assessmentType === AssessmentType.YOUR_SELF)
    );
    setOccupation(
      assessments.filter((item) => item.assessmentType === AssessmentType.CAREER)
    );
    setPotential(
      assessments.filter((item) => item.assessmentType === AssessmentType.COMPETENCY)
    );
  }, [assessments]);

  useEffect(() => {
    generateAssessment();
  }, [assessments]);

  const onSelectFilter = (selected: [{ value: FILTER_OPTS; label: string }]) => {
    const { value, label } = selected[0];
    if (value === FILTER_OPTS.ALL) {
      return generateAssessment();
    }
    console.log(value);
    setSelectedFilter(value);
    setYourSelf((pre) => filteringAssessment(pre, value));
    setOccupation((pre) => filteringAssessment(pre, value));
    setPotential((pre) => filteringAssessment(pre, value));
  };
  useEffect(() => {
    if (Object.keys(router.query).includes(FILTER_OPTS.POPULAR)) {
      onSelectFilter([{ value: FILTER_OPTS.POPULAR, label: '' }]);
    }
  }, [router.query]);
  const onSearch = useCallback(
    debounce((value) => {
      setYourSelf(
        assessments.filter((item) => {
          if (item.assessmentType === AssessmentType.YOUR_SELF) {
            return findByVN(item.name, value);
          }
        })
      );
      setOccupation(
        assessments.filter((item) => {
          if (item.assessmentType === AssessmentType.CAREER) {
            return findByVN(item.name, value);
          }
        })
      );
      setPotential(
        assessments.filter((item) => {
          if (item.assessmentType === AssessmentType.COMPETENCY) {
            return findByVN(item.name, value);
          }
        })
      );
    }, 300),
    []
  );
  const onType = (value) => {
    if (value.trim() === '') return generateAssessment();
    onSearch(value);
  };
  return (
    <>
      <NoSsr>
        <div className="container " ref={ref}>
          <div className="tw-mt-[72px] tw-mb-28">
            <div className="row tw-m-0 ">
              <h1 className={styles.pageTitle}>Đánh giá</h1>
            </div>
            <div className="row tw-m-0 ">
              <div className="tw-ml-auto tw-flex tw-gap-[15px] tw-z-0 tw-flex-wrap md:tw-flex-nowrap  tw-w-full md:tw-justify-end tw-mr-9 md:tw-mr-0 ">
                <div className="tw-w-full md:tw-max-w-[500px] sm:tw-max-w-full tw-min-w-[245px] ">
                  <TestSearchBar placeholder={'Nhập tên đánh giá'} onChange={onType} />
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
                      alt="Youth Tìm kiếm đánh giá"
                    />
                  </div>
                </div>
              </div>
            </div>
            <ListCardItem listItem={yourSelf} title="Đánh giá thấu hiểu bản thân" />
            <ListCardItem listItem={potential} title="Đánh giá năng lực" />
            <ListCardItem listItem={occupation} title="Đánh giá mức độ phù hợp nghề" />
          </div>
        </div>
      </NoSsr>
    </>
  );
}

AssessmentView.propTypes = {
  assessments: PropTypes.array.isRequired,
};
