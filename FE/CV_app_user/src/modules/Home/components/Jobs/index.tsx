import { JobCard } from '@/components/common/Cards';
import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Search from './Search';
import styles from './styles.module.scss';
import useSWR from 'swr';
import axios from 'axios';
import { IPostJob } from '@/interfaces/IPostJob';
import { TruncateLines } from 'react-truncate-lines';
import { calculateDateDiff, convertToSimplifiedVND } from '@/helpers';
import { JobInfoEnum } from '@/modules/User/shared/enums';
const payloadList = {
  enterprise_id: null,
  page: 1,
  pageSize: 5,
};
const fetcher = async () => {
  const data = await axios.post(
    'http://localhost:8080/api/Cv/job-post/search',
    payloadList
  );
  return data.data.items as IPostJob[] | null;
};
const JobsView = (props) => {
  const { data, error } = useSWR('get-home-post-job', fetcher);
  console.log('JobsView ~ data:', data);
  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-lg">
      <div className="tw-my-14 ">
        <div className="col-12 tw-text-center tw-mb-6">
          <p className={`${styles.title} section-title `}>Việc làm</p>
        </div>

        <Search />
        <div className="container tw-px-0">
          <div className="col-12 tw-mt-[35px] tw-px-0 tw-flex">
            {/* special card */}
            <Link href={`/Post?id=${data[0].id}`} passHref>
              <div className="col-lg-6 d-none d-lg-block tw-pb-4 tw-cursor-pointer">
                <div className="tw-bg-white tw-rounded-[10px] tw-h-full tw-flex tw-justify-center tw-items-center tw-flex-col tw-shadow-md tw-p-[1rem] tw-gap-[1rem]">
                  <div className="tw-flex tw-justify-between tw-items-center tw-relative tw-w-full">
                    <div className="tw-rounded-[10px] tw-relative tw-h-[64px] tw-w-[64px] tw-overflow-hidden tw-object-cover tw-border-solid tw-border-[#F1F1F5] tw-border-[1px] tw-shadow-lg">
                      {/* <Image
                        src={
                          data[0]?.image_url || '/images/homepage/youth-hero-desktop.png'
                        }
                        alt={data[0]?.enterprise?.name}
                        layout="fill"
                      /> */}
                      <img
                        src={
                          data[0]?.image_url || '/images/homepage/youth-hero-desktop.png'
                        }
                        alt={data[0]?.enterprise?.name}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                    <p className="tw-cursor-pointer tw-text-right tw-absolute tw-top-0 tw-text-2xl tw-text-black tw-font-bold tw-leading-tight tw-right-6">
                      ...
                    </p>
                  </div>
                  <div className="tw-text-left tw-w-full">
                    <Link href={`/Post?id=${data[0].id}`}>
                      <a className="tw-text-gray-800 tw-font-bold tw-leading-tight tw-text-[28px] tw-inline tw-mr-6 hover:tw-text-black">
                        {data[0]?.title}
                      </a>
                    </Link>

                    <p className="tw-text-[#92929D] tw-font-normal tw-text-xl tw-leading-[30px] tw-tracking-[0.1px] tw-inline ">
                      {calculateDateDiff(data[0]?.created_date)} ngày trước
                    </p>
                  </div>
                  <div className="tw-w-full">
                    <p className="tw-text-[#696974] tw-text-[16px] tw-font-[300] tw-leading-[26px]">
                      <TruncateLines lines={6}>{data[0]?.overview}</TruncateLines>
                    </p>
                  </div>
                  <div className="tw-w-full tw-flex tw-justify-between">
                    <div className="col-4 tw-flex tw-flex-col tw-justify-start tw-text-[#696974] tw-text-[16px] tw-font-[300] tw-leading-[26px]">
                      <span>Lương</span>
                      <span className="tw-font-[600] tw-text-[16px] tw-leading-[26px] tw-text-[#44444F]">
                        {`${convertToSimplifiedVND(
                          data[0]?.salary_min
                        )} - ${convertToSimplifiedVND(data[0]?.salary_max)} `}
                        triệu / Tháng
                      </span>
                    </div>
                    <div className="col-7 tw-flex tw-flex-col tw-justify-start tw-text-[#696974] tw-text-[16px] tw-font-[300] tw-leading-[26px]">
                      <span>Công việc</span>
                      <span className="tw-font-[600] tw-text-[16px] tw-leading-[26px] tw-text-[#44444F]">
                        {data[0]?.career_field?.name}
                      </span>
                    </div>
                  </div>
                  <div className="tw-w-full tw-flex tw-gap-[1rem] tw-flex-row">
                    {JobInfoEnum.type_of_job.map((item) => {
                      if (item.value.toString() === data[0].form_of_work.toString()) {
                        return (
                          <div className={styles['card_footer__time']} key={item.value}>
                            <p>{item.label}</p>
                          </div>
                        );
                      }
                    })}
                    <div className={styles['card_footer__time']}>
                      <p>
                        {JobInfoEnum.exp[`${parseInt(data[0]?.experience) - 1}`]?.label}
                      </p>
                    </div>
                    <div className={styles['card_footer__time']}>
                      <p>{data[0]?.address}</p>
                    </div>
                  </div>
                  <div className="tw-w-full tw-flex tw-justify-between tw-items-end">
                    <div className="tw-flex tw-items-end">
                      {/* <div className="tw-flex tw-flex-wrap">
                        {Array.from({ length: 5 }, (_, index) => {
                          if (index < 3) {
                            return (
                              <div
                                className="tw-h-8 tw-w-8 tw-rounded-full tw-border-[1px] tw-border-solid tw-border-[#E2E2EA] tw-relative tw-overflow-hidden tw-bg-white"
                                style={{
                                  zIndex: 100 - index * 10,
                                  transform: `translateX(${-index * 8}px)`,
                                }}
                              >
                                <Image
                                  src="/images/homepage/youth-hero-desktop.png"
                                  layout="fill"
                                  alt="Principal UX Designer"
                                />
                              </div>
                            );
                          }
                          if (index === 3) {
                            return (
                              <div
                                className="tw-flex tw-h-8 tw-w-8 tw-rounded-full tw-border-[1px] tw-border-solid tw-border-[#E2E2EA] tw-relative tw-overflow-hidden tw-justify-center tw-items-center"
                                style={{
                                  zIndex: 0,
                                  transform: `translateX(${-index * 8}px)`,
                                }}
                              >
                                <span className="tw-text-[#696974] tw-text-[12px] tw-font-[400] tw-text-center">
                                  +{5 - index}
                                </span>
                              </div>
                            );
                          }
                        })}
                      </div>
                      <span className="tw-text-[#92929D] tw-leading-[26px] tw-text-[16px] tw-font-[300] tw-relative -tw-left-4">
                        5 người bạn làm việc ở đây
                      </span> */}
                    </div>
                    <Button
                      className={
                        'tw-normal-case tw-px-[13px] tw-py-[10px] !tw-bg-[#403ECC] tw-rounded-[10px]'
                      }
                      variant="contained"
                    >
                      <span
                        className={
                          'tw-text-[18px] tw-leading-[30px] tw-font-[700] tw-font-LexendDeca tw-tracking-[0.1px] tw-text-center'
                        }
                      >
                        Ứng tuyển
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
            <div
              className="col-lg-6 hide_scrollbar tw-justify-between
            tw-pb-4 tw-flex tw-px-0 tw-flex-row tw-flex-nowrap md:!tw-flex-wrap tw-overflow-x-auto tw-overflow-y-hidden tw-snap-x tw-snap-mandatory"
            >
              {data.slice(1).map((job, index) => (
                <JobCard
                  key={index}
                  description={job.overview}
                  id={job.id}
                  imgUrl={job.image_url || '/images/homepage/youth-hero-desktop.png'}
                  location={job.address}
                  slug={job.slug}
                  title={job.title}
                  updateAt={`${calculateDateDiff(job?.created_date)} ngày trước`}
                  workTime={job?.form_of_work}
                  salary={`${convertToSimplifiedVND(
                    job?.salary_min
                  )} - ${convertToSimplifiedVND(job?.salary_max)} Triệu/Tháng`}
                  lg={6}
                  md={6}
                  sm={6}
                  defaultSize={12}
                  className={
                    index === 0 || index === 1
                      ? '!tw-mb-0 tw-snap-start'
                      : index === 2
                      ? '!tw-mb-0 !tw-pl-0 md:tw-mt-[12px] tw-snap-start'
                      : '!tw-mb-0 md:tw-mt-[12px] tw-snap-start'
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsView;
