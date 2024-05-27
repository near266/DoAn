import { ContainerLoading } from '@/components';
import { IMentor } from '@/interfaces';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { TruncateLines } from 'react-truncate-lines';
import { homeService } from '../../shared';
import styles from './styles.module.scss';

import CutTomCarousel from '@/components/common/CarouselButton';
import Image from 'next/image';
import * as React from 'react';
import useSWR from 'swr';
import Courses from '../Courses';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: '8px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const scrollWidth = 300;
const Mentors = () => {
  const scrollRef = useRef(null);

  const [mentors, setMentors] = useState<IMentor[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  const getMentors = async () => {
    const res = await homeService.getHomeMentors();
    return res;
  };
  const { data } = useSWR('get-mentor', getMentors);

  useEffect(() => {
    setIsFetching(true);
    if (data) {
      setMentors(data.payload.data);
      setIsFetching(false);
    }
  }, [data]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <section className="tw-mb-4">
      <div className={`${styles.bg_wrapper}`}></div>

      <div className="container md:tw-pt-[1rem] tw-pt-12 ">
        <p className={`${styles.mentorTitle} section-title tw-mb-2 md:!tw-mb-[32px] `}>
          Kết nối và hoàn thiện
        </p>
        <div className={`${styles.mentorDescription} md:!tw-inline  md:!tw-max-h-28 `}>
          <p className="md:tw-max-w-4xl tw-mx-auto">
            Phát triển những kỹ năng, hoàn thiện bản thân thông qua kết nối với Mentor và
            Khóa học
          </p>
        </div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Hoạt động nổi bật"
              centered
              classes={{
                indicator: styles.indicator,
                flexContainer: styles.tabs__flexContainer,
              }}
            ></Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <CutTomCarousel scrollWidth={scrollWidth} scrollRef={scrollRef}>
              <div
                ref={scrollRef}
                className={`hide_scrollbar row !tw-mx-0  ${
                  mentors.length < 4 ? 'lg:!tw-justify-center' : ''
                }!tw-flex-nowrap !tw-overflow-x-scroll  tw-py-3 tw-snap-x `}
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {mentors.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles.mentorItems} tw-snap-center col-9 col-md-4 col-lg-3 tw-mb-8`}
                  >
                    <div className=" tw-bg-white tw-h-full !tw-rounded-3xl tw-pt-24 hover:tw-shadow-md !tw-overflow-hidden tw-transition tw-ease-linear tw-duration-150 md:tw-duration-500 hover:tw-scale-105 ">
                      <div className={styles.mentorInner}>
                        <div className={styles.mentorInfo}>
                          <a
                            href={`${process.env.NEXT_PUBLIC_MENTOR_URL}/mentors/${item.slug}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div className={cx(styles.mentorPhoto, 'tw-relative')}>
                              <Image
                                layout="fill"
                                objectFit="cover"
                                src={item.avatar}
                                alt={item.name}
                              />
                            </div>
                          </a>
                          <div className={styles.mentorContent}>
                            <h4 className={styles.mentorName}>
                              <TruncateLines
                                lines={3}
                                ellipsis={
                                  <a
                                    className="tw-text-[#22216D] tw-text-sm tw-text-bold "
                                    href={`${process.env.NEXT_PUBLIC_MENTOR_URL}/mentors/${item.slug}`}
                                  >
                                    ...Xem thêm
                                  </a>
                                }
                              >
                                {item.name}
                              </TruncateLines>
                            </h4>
                            <div
                              className={styles.mentorProfession}
                              title={item.experience}
                            >
                              <TruncateLines
                                lines={3}
                                ellipsis={
                                  <a
                                    className="tw-text-[#22216D] tw-text-sm tw-text-bold "
                                    href={`${process.env.NEXT_PUBLIC_MENTOR_URL}/mentors/${item.slug}`}
                                  >
                                    ...Xem thêm
                                  </a>
                                }
                              >
                                {item.experience}
                              </TruncateLines>
                            </div>
                          </div>
                          <div className="d-flex tw-justify-between tw-gap-3 tw-max-h-11">
                            <Button
                              variant="contained"
                              href={'https://bit.ly/mentoring_youthplus'}
                              target="_blank"
                              className={`${styles.viewResume} !tw-bg-[#403ECC] tw-normal-case tw-flex-1 tw-w-1/5 !tw-rounded-[10px] tw-text-white tw-text-base !tw-shadow-none !tw-p-[10px] !tw-min-w-[75px]
                          `}
                            >
                              Kết nối
                            </Button>
                            <Button
                              className="tw-w-3/5 tw-flex-[2]
                          !tw-px-[5px] tw-normal-case  !tw-text-[#403ECC] !tw-bg-white tw-border-[#403ECC] !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px]
                          !tw-min-w-[100px]                        "
                              href={`${process.env.NEXT_PUBLIC_MENTOR_URL}/mentors/${item.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              // hover:!tw-bg-[#403ECC] hover:!tw-text-white
                              variant="outlined"
                              // onClick={}
                            >
                              Xem thông tin
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CutTomCarousel>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="tw-mt-3">
              <Courses />
            </div>
          </TabPanel>
        </Box>
        <ContainerLoading loading={isFetching}>
          <a href="https://mentor.youth.com.vn/mentors">
            <div className="d-flex tw-mb-9 tw-text-center tw-justify-center tw-items-center">
              <span className="tw-text-center tw-font-LexendDeca tw-text-[#403ECC] tw-text-xl">
                Xem tất cả
              </span>
              <img src="/images/icons/right_arrow.svg" alt="" />
            </div>
          </a>
        </ContainerLoading>
      </div>
    </section>
  );
};

Mentors.propTypes = {};

export default Mentors;
