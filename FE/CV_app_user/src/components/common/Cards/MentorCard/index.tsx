import { Button } from '@mui/material';
import { TruncateLines } from 'react-truncate-lines';
import CustomNextImg from '../../CustomNextImg/indext';
import styles from './styles.module.scss';

interface IMetorCardProps {
  index?: number;
  slug: string;
  avatar: string;
  name: string;
  experience: string;
  level?: string;
  lg?: number;
  md?: number;
  sm?: number;
  defaultSize?: number;
}
const scrollWidth = 300;

export default function MetorCard(props: IMetorCardProps) {
  const { slug, avatar, name, experience, index, lg, defaultSize, md, sm, level } = props;

  return (
    <div
      key={index}
      className={`${styles.mentorItems} tw-snap-center col-${defaultSize ?? 9} col-md-${
        md ?? 4
      } col-lg-${lg ?? 3} tw-mb-8`}
    >
      <div className=" tw-bg-white tw-h-full !tw-rounded-3xl tw-pt-24 hover:tw-shadow-md !tw-overflow-hidden tw-transition tw-ease-linear tw-duration-150 md:tw-duration-500">
        <div className={styles.mentorInner}>
          <div className={styles.mentorInfo}>
            <a
              href={`${process.env.NEXT_PUBLIC_MENTOR_URL}/mentors/${slug}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.mentorPhoto}>
                <CustomNextImg
                  objectFit="cover"
                  layout="fill"
                  src={avatar}
                  alt={name}
                  className="hover:tw-scale-105 tw-transition tw-ease-linear tw-duration-150 md:tw-duration-400"
                />
              </div>
              {/* <img className={styles.mentorPhoto} src={avatar} alt={name} /> */}
            </a>
            <div className={styles.mentorContent}>
              <h4 className={styles.mentorName}>
                <TruncateLines
                  lines={3}
                  ellipsis={
                    <a
                      className="tw-text-[#22216D] tw-text-sm tw-text-bold "
                      href={`${process.env.NEXT_PUBLIC_MENTOR_URL}/mentors/${slug}`}
                    >
                      ...Xem thêm
                    </a>
                  }
                >
                  {name}
                </TruncateLines>
              </h4>
              {level && (
                <div className={styles.mentorProfession} title={experience}>
                  <TruncateLines
                    lines={3}
                    ellipsis={
                      <a
                        className="tw-text-[#22216D] tw-text-sm tw-text-bold "
                        href={`${process.env.NEXT_PUBLIC_MENTOR_URL}/mentors/${slug}`}
                      >
                        ...Xem thêm
                      </a>
                    }
                  >
                    level {level}
                  </TruncateLines>
                </div>
              )}
              <div className={styles.mentorProfession} title={experience}>
                <TruncateLines
                  lines={3}
                  ellipsis={
                    <a
                      className="tw-text-[#22216D] tw-text-sm tw-text-bold "
                      href={`${process.env.NEXT_PUBLIC_MENTOR_URL}/mentors/${slug}`}
                    >
                      ...Xem thêm
                    </a>
                  }
                >
                  {experience}
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
                href={`${process.env.NEXT_PUBLIC_MENTOR_URL}/mentors/${slug}`}
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
  );
}
