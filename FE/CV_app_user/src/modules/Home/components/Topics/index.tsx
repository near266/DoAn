import { Button } from '@mui/material';
import styles from './style.module.scss';

const testListItem = [
  {
    id: 5,
    name: 'Business',
    iconUrl: '/images/icons/business_orange.svg',
  },
  {
    id: 10,
    name: 'Kỹ năng',
    iconUrl: '/images/icons/skill.svg',
  },
  {
    id: 9,
    name: 'Graphics Design',
    iconUrl: '/images/icons/graphic_design.svg',
  },
  {
    id: 6,
    name: 'UX/UI Design',
    iconUrl: '/images/icons/skill.svg',
  },
  {
    id: 8,
    name: 'Business',
    iconUrl: '/images/icons/business_yellow.svg',
  },
];
const Topics = (props) => {
  return (
    <div className={styles.topic}>
      <div className="container-lg tw-p-0">
        <div className={styles.topic_title}>
          <p className="tw-text-center section-title ">Chủ đề</p>
        </div>
        {/* <div className={styles.topic_content}>
          <p>
            Eztek Vietnam cung cấp cho các bạn trẻ một không gian đọc – học, tìm kiếm –
            kết nối và chia sẻ – hỏi đáp với lăng kính đa chiều, nhiều màu sắc trong nhiều
            lĩnh vực.
          </p>
        </div> */}
        <div className="tw-flex tw-gap-5 tw-flex-wrap tw-justify-center">
          {testListItem.map((item) => (
            <>
              <div key={item.id + item.name}>
                <Button
                  className="!tw-text-[#22216D] !tw-bg-[#D6D6FD] tw-border-[#D6D6FD] md:tw-text-base tw-text-sm !tw-shadow-sm tw-border-solid tw-border !tw-rounded-[10px] hover:!tw-bg-[#403ECC] hover:!tw-text-white tw-flex tw-gap-4 tw-items-center tw-justify-center"
                  variant="contained"
                >
                  <img className="tw-h-8 tw-w-8" src={item.iconUrl} alt={item.name} />
                  <span className="!tw-normal-case">{item.name}</span>
                </Button>
              </div>
              &nbsp; &nbsp;
            </>
          ))}
        </div>

        <a href="#">
          <div className="d-flex tw-my-9 tw-text-center tw-justify-center tw-items-center">
            <span className="tw-text-center tw-text-[#403ECC] tw-text-xl">
              Xem tất cả
            </span>
            <img src="/images/icons/right_arrow.svg" alt="" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Topics;
