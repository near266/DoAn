import styles from './style.module.scss';
import ListCard from '@/components/common/ListCard';
import TestCard from '@/components/common/Cards/TestCard';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Events from '@/modules/Home/components/Events';
import { isEmpty } from 'lodash-es';
import { Row, Col } from 'antd';
import { formatServerDate } from '@/helpers';

import { BookmarkButton, LikeButton } from '@/components';
import cx from 'classnames';
import CutTomCarousel from '@/components/common/CarouselButton';
import { TruncateLines } from 'react-truncate-lines';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';

const mockup = [
  {
    id: 'dc1b6877602840698a9b6840e8206d6a',
    name: 'THẾ VẬN HỘI MÙA HÈ - OLYMPIC PARIS 2024 TUYỂN TÌNH NGUYỆN VIÊN',
    description:
      'THẾ VẬN HỘI MÙA HÈ - OLYMPIC PARIS 2024 TUYỂN TÌNH NGUYỆN VIÊN?Thế vận hội mùa hè 2024 tại Paris là một sự kiện thể thao đa môn quốc tế ',
    avatar:
      'https://storage.googleapis.com/youth-media/post-thumbnails/mG5fVJk9MmbfgeQGJXLo0a1gNKLNuuIgu3s8VXZM.png',
    slug: 'the-van-hoi-mua-he-olympic-paris-2024-tuyen-tinh-nguyen-vien',
    category_id: 'bf38efa1d6fe47d0a0fdda9b0e3fd8cc',
    created_at: '2022-05-17 21:59:18',
    updated_at: '2022-05-18 10:19:33',
    created_by: 'd81d7baa58a84f408c02867df26cd6eb',
    updated_by: 'c4ca4238a0b923820dcc509a6f75849b',
    view_number: 79,
    likes_count: 0,
    comments_count: 0,
    creator: {
      id: 'd81d7baa58a84f408c02867df26cd6eb',
      name: 'Youth Opportunities Vietnam',
      username: 'youthopportunitiesvietnam',
      avatar:
        'https://storage.googleapis.com/youth-media/user-avatars/Diaxh2b1LpryJashW7PsrEBSDa3WoGsqq7pqWrX7.png',
      identity_verified: null,
    },
    category: {
      id: 'bf38efa1d6fe47d0a0fdda9b0e3fd8cc',
      name: 'Cơ hội - Việc làm',
      slug: 'viec-lam',
    },
    liked: [],
    bookmarked: null,
  },
  {
    id: '25681b08b0e04b86b3a01d27f98bf4dc',
    name: '[PSYCHOHUB] FIRST IMPRESSION - ẤN TƯỢNG BAN ĐẦU LIỆU CÓ CHÍNH XÁC KHÔNG?',
    description:
      'FIRST IMPRESSION - ẤN TƯỢNG BAN ĐẦU LIỆU CÓ CHÍNH XÁC KHÔNG?Ấn tượng ban đầu là gì?Ấn tượng ban đầu là những đánh giá, suy nghĩ của chúng ',
    avatar:
      'https://storage.googleapis.com/youth-media/post-thumbnails/N86jSiRheVpx51aLoA33eJEQYEkSlsGk66WlmQGN.png',
    slug: 'psychohub-first-impression-an-tuong-ban-dau-lieu-co-chinh-xac-khong',
    category_id: '54229abfcfa5649e7003b83dd4755294',
    created_at: '2022-05-17 20:07:42',
    updated_at: '2022-05-18 10:19:37',
    created_by: '198550d1b491416e8386cd7782a17f6e',
    updated_by: 'c4ca4238a0b923820dcc509a6f75849b',
    view_number: 36,
    likes_count: 0,
    comments_count: 0,
    creator: {
      id: '198550d1b491416e8386cd7782a17f6e',
      name: 'PsychoHub',
      username: 'hoanguyen.2',
      avatar:
        'https://storage.googleapis.com/youth-media/user-avatars/WoU2a9AkrmP2gvvVKUEdxXiGYl73UtGS6teZHJ9K.png',
      identity_verified: null,
    },
    category: {
      id: '54229abfcfa5649e7003b83dd4755294',
      name: 'Tâm lý học',
      slug: 'psychology',
    },
    liked: [],
    bookmarked: null,
  },
  {
    id: 'bbb08ba2447e4437bcb6f532888c40f9',
    name: '[SYE] CÁC TIPS ĐỂ THUYẾT TRÌNH TỐT HƠN',
    description:
      'Chưa bao giờ việc tạo ra các bài thuyết trình hấp dẫn lại trở nên quan trọng đến vậy. Kể từ khi đại dịch xảy ra, hầu hết mọi người ',
    avatar:
      'https://storage.googleapis.com/youth-media/post-thumbnails/lGIDSMHrMRlOOx9T2MyGin9ihfnuZ6YzaIYjUiLM.jpg',
    slug: 'sye-cac-tips-de-thuyet-trinh-tot-hon',
    category_id: 'd3d9446802a44259755d38e6d163e820',
    created_at: '2022-05-17 12:40:22',
    updated_at: '2022-05-18 10:19:41',
    created_by: '2fc2adf2fd27437c88026b7302b5c6f6',
    updated_by: 'c4ca4238a0b923820dcc509a6f75849b',
    view_number: 41,
    likes_count: 0,
    comments_count: 0,
    creator: {
      id: '2fc2adf2fd27437c88026b7302b5c6f6',
      name: 'SUB Youth Editor',
      username: 'subyoutheditor',
      avatar:
        'https://storage.googleapis.com/youth-media/user-avatars/da529046-1946-4b75-a220-dca747c801cb.jpg',
      identity_verified: null,
    },
    category: {
      id: 'd3d9446802a44259755d38e6d163e820',
      name: 'Kỹ năng',
      slug: 'ky-nang',
    },
    liked: [],
    bookmarked: null,
  },
  {
    id: 'fc40b1b6ae724d338f98d613308652ff',
    name: 'CHĂM SÓC SỨC KHỎE TINH THẦN SAU ĐẠI DỊCH',
    description:
      'Sau ba năm ứng phó với đại dịch COVID-19, đối với rất nhiều bạn trẻ, sức khoẻ đã trở thành mối quan tâm hàng đầu. Chúng ta không chỉ cần ',
    avatar:
      'https://storage.googleapis.com/youth-media/post-thumbnails/mkn2lFHYhYpyTJDjPDft0tl81AAmdFRNlCTlm6sk.jpg',
    slug: 'cham-soc-suc-khoe-tinh-than-sau-dai-dich',
    category_id: '54229abfcfa5649e7003b83dd4755294',
    created_at: '2022-05-16 15:00:24',
    updated_at: '2022-05-18 10:19:47',
    created_by: 'bd456163b9994b68b4ad351d2ec863f1',
    updated_by: 'c4ca4238a0b923820dcc509a6f75849b',
    view_number: 36,
    likes_count: 0,
    comments_count: 0,
    creator: {
      id: 'bd456163b9994b68b4ad351d2ec863f1',
      name: 'Hanoi Youthplus',
      username: 'hanoiyouthplus',
      avatar:
        'https://storage.googleapis.com/youth-media/user-avatars/e1011bb6-63f9-4903-b42f-ca5bc8a29642.jpg',
      identity_verified: null,
    },
    category: {
      id: '54229abfcfa5649e7003b83dd4755294',
      name: 'Tâm lý học',
      slug: 'psychology',
    },
    liked: [],
    bookmarked: null,
  },
  {
    id: 'd577508acc714c5eaa37a8d1be47bb42',
    name: '[THANH XUÂN ĐỐI VỚI BẠN LÀ GÌ NHỈ? ]',
    description:
      '|| SERIES: THANH XUÂN VƯỜN TRƯỜNG ||[THANH XUÂN ĐỐI VỚI BẠN LÀ GÌ NHỈ? ]———————————————————————Đối với bạn, Thanh xuân là gì nhỉ Còn với mình ????? ???̂? là một chốc trôi ',
    avatar:
      'https://storage.googleapis.com/youth-media/post-thumbnails/O1MhJRP990oer0KRtOnkVcmrYt7HZWBc8rS2oMqm.png',
    slug: 'thanh-xuan-doi-voi-ban-la-gi-nhi',
    category_id: 'e2c420d928d4bf8ce0ff2ec19b371514',
    created_at: '2022-05-14 23:34:21',
    updated_at: '2022-05-16 08:44:44',
    created_by: '80b07082ce5246e489d5bcd636ed93e6',
    updated_by: 'c4ca4238a0b923820dcc509a6f75849b',
    view_number: 66,
    likes_count: 0,
    comments_count: 0,
    creator: {
      id: '80b07082ce5246e489d5bcd636ed93e6',
      name: 'Tạ Huyền Trang',
      username: 'huyentrang.9',
      avatar:
        'https://storage.googleapis.com/youth-media/user-avatars/AMcNkdkMQZGruljVhjmqY5FlzbGQLMVikKUOTDhn.jpg',
      identity_verified: null,
    },
    category: {
      id: 'e2c420d928d4bf8ce0ff2ec19b371514',
      name: 'Quan điểm',
      slug: 'quan-diem',
    },
    liked: [],
    bookmarked: null,
  },
  {
    id: '33653c9181424699b4a1c78ffdac4240',
    name: '[PSYCHOHUB] CAPGRAS - LỜI GIẢI CHO CÂU HỎI: BẠN LÀ AI?',
    description:
      'CAPGRAS - LỜI GIẢI CHO CÂU HỎI: BẠN LÀ AI? Nếu bạn là một tín đồ phim kinh dị Mỹ, bạn chắc chắn đã xem qua bộ phim “Us”, một ',
    avatar:
      'https://storage.googleapis.com/youth-media/post-thumbnails/0A3vEJG4aZ4C7iuLlPT7BezRHVmhOkzHS9ccCA1L.png',
    slug: 'psychohub-capgras-loi-giai-cho-cau-hoi-ban-la-ai',
    category_id: '54229abfcfa5649e7003b83dd4755294',
    created_at: '2022-05-14 16:06:59',
    updated_at: '2022-05-14 16:10:57',
    created_by: '198550d1b491416e8386cd7782a17f6e',
    updated_by: 'c4ca4238a0b923820dcc509a6f75849b',
    view_number: 86,
    likes_count: 0,
    comments_count: 0,
    creator: {
      id: '198550d1b491416e8386cd7782a17f6e',
      name: 'PsychoHub',
      username: 'hoanguyen.2',
      avatar:
        'https://storage.googleapis.com/youth-media/user-avatars/WoU2a9AkrmP2gvvVKUEdxXiGYl73UtGS6teZHJ9K.png',
      identity_verified: null,
    },
    category: {
      id: '54229abfcfa5649e7003b83dd4755294',
      name: 'Tâm lý học',
      slug: 'psychology',
    },
    liked: [],
    bookmarked: null,
  },
  {
    id: 'da893c29f9ea49cb8e4aa445d5ea1326',
    name: 'BẠN ĐÃ CÓ LỘ TRÌNH CHO CON ĐƯỜNG HỌC TẬP CỦA MÌNH CHƯA?',
    description:
      'BẠN ĐÃ CÓ LỘ TRÌNH CHO CON ĐƯỜNG HỌC TẬP CỦA MÌNH CHƯA?Các bạn học sinh THPT, các bạn chuẩn bị hành trang cho những bước đi đầu tiên ',
    avatar:
      'https://storage.googleapis.com/youth-media/post-thumbnails/w86rU9uOIfTaqr2Yq4iqr4nwByLhZaded59K2bS6.png',
    slug: 'ban-da-co-lo-trinh-cho-con-duong-hoc-tap-cua-minh-chua-2',
    category_id: null,
    created_at: '2022-05-12 19:29:31',
    updated_at: '2022-05-14 16:11:02',
    created_by: '7e85eef8dc7e45b0be51c516bffe2575',
    updated_by: 'c4ca4238a0b923820dcc509a6f75849b',
    view_number: 79,
    likes_count: 0,
    comments_count: 0,
    creator: {
      id: '7e85eef8dc7e45b0be51c516bffe2575',
      name: 'Hạnh',
      username: 'hanh.1',
      avatar:
        'https://storage.googleapis.com/youth-media/user-avatars/f1976d6e-a07b-44c6-87e2-5664538f1e58.jpg',
      identity_verified: null,
    },
    category: null,
    liked: [],
    bookmarked: null,
  },
];
const Posts = dynamic(() => import('@/modules/Home/components/Posts'), { ssr: false });

export const SuccessfulOrder = ({ assessments, posts, isFetchingPosts }) => {
  const [mockupData, setMockupData] = useState([]);
  const scrollRef = React.useRef(null);
  const me = useSelector((state: IRootState) => state.auth.me);

  useEffect(() => {
    if (!assessments) return;
    const data = assessments?.map((item, index) => {
      if (index % 2 === 0) {
        return {
          ...item,
          discount: 50,
          // discount: Math.round(Math.random() * 100),
        };
      }
      return {
        ...item,
        discount: 0,
      };
    });
    data.push(...data);
    setMockupData(data);
  }, [assessments]);

  const EmptyPost = () => (
    <div className={styles.emptyPost}>Chưa có bài biết nổi bật</div>
  );
  const scrollWidth = 300;

  const ListPost = () => (
    <CutTomCarousel scrollRef={scrollRef} scrollWidth={scrollWidth}>
      <div
        ref={scrollRef}
        className={cx(
          `${
            mockup.length < 4 ? 'lg:!tw-justify-center' : ''
          } row hide_scrollbar !tw-flex-nowrap !tw-overflow-x-scroll `
        )}
        style={{
          scrollSnapType: 'x mandatory',
          scrollSnapPointsX: 'repeat(auto-fit)',
        }}
      >
        {mockup.map((post, index) => (
          <article
            key={index}
            className={cx(
              'col-3  col-sm-6 col-12 col-md-4 col-lg-4 tw-mt-4',
              styles.listPost__article
            )}
          >
            <figure className={styles.postItem}>
              <div className={styles.block_image}>
                <a href={`/posts/${post.slug}`}>
                  <img
                    src={post.avatar ?? '/images/homepage/youth-hero-desktop.png'}
                    className={cx('img-fluid', styles.listPost__image)}
                    alt={post.avatar}
                  />
                </a>
              </div>
              <div className={styles.block_content}>
                <div className={styles.postItem__subContent}>
                  <Link href={`/posts/${post.slug}`}>
                    <h4 className="figure-title">
                      <TruncateLines
                        lines={3}
                        ellipsis={<Link href={`/posts/${post.slug}`}>...Đọc thêm</Link>}
                      >
                        {post.name}
                      </TruncateLines>
                    </h4>
                  </Link>
                  <figcaption className={cx('figure-caption', styles.listPost__time)}>
                    {post.created_at}
                  </figcaption>
                  <figcaption
                    className={`${styles.figure_caption}`}
                    title="{{ $post->description }}"
                  >
                    <TruncateLines
                      lines={4}
                      ellipsis={<Link href={`/posts/${post.slug}`}>...Đọc thêm</Link>}
                    >
                      {post.description}
                    </TruncateLines>
                  </figcaption>
                </div>
                <div className="action">
                  <div className={styles.card_footer}>
                    <div className={styles.action__time}>
                      {formatServerDate(post.created_at, 'dd/MM/yyyy')}
                    </div>
                    <div className={styles.actionInfo}>
                      <div className={styles.actionInfo__item}>
                        <LikeButton
                          textSize="14px"
                          liked={post.liked.length}
                          likeCount={post.likes_count}
                          postId={post.id}
                        />
                      </div>
                      <div className={styles.actionInfo__item}>
                        <i className="bi bi-eye"></i>
                        <span className={styles.actionInfo__iconLabel}>
                          {post.view_number.toLocaleString()}
                        </span>
                      </div>
                      <div className={styles.actionInfo__item}>
                        <BookmarkButton bookmarked={post.bookmarked} postId={post.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </article>
        ))}
      </div>
    </CutTomCarousel>
  );

  return (
    <div className={`${styles['container']}`}>
      <div className={`${styles['headerTitle']}`}>Thanh toán thành công</div>
      <Row className={`${styles['thanksLetter']}`}>
        <Col xs={24} sm={12} className={`${styles['content']}`}>
          <Col className={`${styles['letterTitle']}`}>Cám ơn bạn đã tin tưởng!</Col>
          <Col className={`${styles['letterContent']}`}>
            Chúng tôi sẽ gửi thông báo qua email{' '}
            <span className={`${styles['email']}`}>{me.email}</span> và nền tảng Eztek
            khi thanh toán được xác nhận. Vui lòng kiểm tra hộp thư và thông báo thường
            xuyên
          </Col>
        </Col>
        <Col xs={24} sm={12} className={`${styles['image']}`}>
          <img src={'/images/teamwork.svg'} alt="teamwork" />
        </Col>
      </Row>

      <div className="tw-mt-[52px] tw-max-h-[550px] ">
        <div
          className={`${styles.card_title} tw-text-[#22216D] tw-text-2xl tw-font-semibold tw-mb-[16px]`}
        >
          SỰ KIỆN DÀNH CHO BẠN
        </div>
        <div className=" tw-mt-4">
          <Events />
        </div>
      </div>

      <div className="tw-mt-[52px] tw-max-h-[550px] ">
        <div
          className={`${styles.card_title} tw-text-[#22216D] tw-text-2xl tw-font-semibold tw-mb-[16px]`}
        >
          BÀI VIẾT DÀNH CHO BẠN
        </div>
        {/* <Posts posts={posts} isFetching={isFetchingPosts} /> */}
        {isEmpty(mockup) ? <EmptyPost /> : <ListPost />}
      </div>

      <div className="tw-mt-[52px] tw-max-h-[550px] ">
        <div
          className={`${styles.card_title} tw-text-[#22216D] tw-text-2xl tw-font-semibold tw-mb-[16px]`}
        >
          BÀI VIẾT HIỂU NGHỀ
        </div>
        <ListCard>
          {mockupData.map((item, index) => (
            <TestCard
              id={item.id}
              discount={item.discount ?? 0}
              image={item.avatar}
              price={item.price}
              sumittedCount={item.purchaseCount}
              questionCount={item.questionCount}
              title={item.name}
              description={item.description}
              httpPath={'/test-assessment/'}
              slug={item.slug}
              key={item.id}
              priorityView={index < 4}
            />
          ))}
        </ListCard>
      </div>
    </div>
  );
};

SuccessfulOrder.propTypes = {
  assessments: PropTypes.array.isRequired,
};
