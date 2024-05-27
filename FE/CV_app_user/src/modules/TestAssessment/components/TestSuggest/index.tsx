import CustomNextImg from '@/components/common/CustomNextImg/indext';
import CustomSelector from '@/components/common/Selector';
import { callGraphQL } from '@/core/utils/fetchSSR';
import IAssessmentV2 from '@/interfaces/ver2/IAssessmentV2';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { throttle } from 'lodash-es';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useState } from 'react';
import { TruncateLines } from 'react-truncate-lines';
import useSWR from 'swr';
import { testService } from '../../shared/testAssessmentService';
import { AssessmentType } from '../../shared/variables';
import styles from './styles.module.scss';
interface ITestItem {
  name: string;
  description?: string;
  price: number;
  duration: number;
  questionCount: number;
  slug: string;
  imgUrl: string;
  sumittedCount: number;
}
interface IListTestProps {
  title: string;
  children: React.ReactNode;
}

const rotate = (event) => {
  const target = event.target as HTMLImageElement;
  // get current rotation angle
  const angle = target.style.transform.replace(/[^0-9]/g, '');
  if (angle) {
    target.style.transform = `rotate(${-angle - 360}deg)`;
  } else {
    target.style.transform = 'rotate(-360deg)';
  }
};

interface IOptions {
  options: { label: string; value: any }[];
  onChange: (value: any) => void;
  onReload: () => void;
}
const TestFilter: React.FC<IOptions> = (props: IOptions) => {
  const { options, onChange, onReload } = props;
  const handleReaload = (event) => {
    rotate(event);
    onReload();
  };
  return (
    <div className="tw-flex tw-items-center tw-justify-between tw-gap-9">
      <div className="tw-flex tw-bg-white tw-h-[38px] tw-z-50 tw-w-full tw-rounded-[10px] tw-border-solid tw-border-[#E2E2EA] tw-border-[1px]">
        <CustomSelector
          iconStyles="tw-border-l-0"
          mutiple={false}
          defaultLabel={
            <div className="tw-text-[#44444F] tw-text-[14px] tw-leading-[24px] tw-tracking-[0.1px]">
              Loại đánh giá
            </div>
          }
          withCheckbox={false}
          options={options}
          onChange={onChange}
        />
      </div>
      <div className="tw-cursor-pointer ">
        <Image
          height={24}
          width={24}
          priority
          src={'/images/icons/reload.svg'}
          // className="hover:-tw-rotate-[360deg]"
          onClick={throttle(handleReaload, 1000)}
          style={{
            transition: 'transform 1s ease-in-out',
          }}
        />
      </div>
    </div>
  );
};

const mockupData = [
  {
    name: 'ĐÁNH GIÁ THẤU HIỂU BẢN THÂN',
    type: AssessmentType.YOUR_SELF,
  },
  {
    name: 'ĐÁNH GIÁ NĂNG LỰC',
    type: AssessmentType.COMPETENCY,
  },
  {
    name: 'ĐÁNH GIÁ MỨC ĐỘ PHÙ HỢP NGHỀ',
    type: AssessmentType.CAREER,
  },
];
const ListTest: React.FC<IListTestProps> = (props: IListTestProps) => {
  const { title, children } = props;

  const [animatedRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <div ref={animatedRef}>
      <div
        className="tw-uppercase tw-text-[#22216D] tw-text-[24px]
       tw-leading-[34px] tw-mb-3 tw-tracking-[0.1px] tw-mt-10 tw-font-[600]"
      >
        {title}
      </div>
      {children}
    </div>
  );
};

const TestItem: React.FC<ITestItem> = (props: ITestItem) => {
  const {
    name,
    description,
    imgUrl,
    price,
    duration,
    sumittedCount,
    questionCount,
    slug,
  } = props;
  const router = useRouter();
  // get slug from url
  const slugFromUrl = router.query.slug as string;
  return (
    <div
      className={`${styles.testItem} ${
        slugFromUrl === slug && styles.testItem_active
      } tw-w-full hover:tw-bg-[#403ECC] tw-p-[10px]`}
    >
      <div className="tw-flex tw-gap-[16px] hover:tw-text-white">
        <div className="tw-relative tw-h-[80px] tw-w-full tw-max-w-[80px] tw-rounded-[10px] tw-flex-shrink-0">
          <CustomNextImg src={imgUrl} layout="fill" priority />
        </div>
        <div className="tw-w-full tw-flex tw-flex-col tw-items-start tw-justify-between">
          <div className="title tw-w-full">
            <div className="tw-flex tw-w-full tw-flex-row tw-items-start tw-justify-between tw-gap-4 tw-text-[1rem] tw-text-[#171725] tw-font-[600] tw-leading-[20px] tw-tracking-[-0.005em] tw-relative tw-max-h-[40px] hover:tw-text-white tw-overflow-ellipsis ">
              <Link href={`/danh-gia-nang-luc/${slug}`} prefetch={false}>
                <span className="tw-cursor-pointer tw-transition-color tw-duration-500 tw-inline tw-overflow-ellipsis tw-pr-[10px] tw-max-w-[225px] tw-overflow-hidden tw-tracking-[-0.5%]">
                  <TruncateLines
                    lines={2}
                    ellipsis={
                      <Link href={`/danh-gia-nang-luc/${slug}`} prefetch={false}>
                        ...
                      </Link>
                    }
                  >
                    {name}
                  </TruncateLines>
                </span>
              </Link>
              <span className="tw-absolute tw-cursor-pointer tw-top-0 tw-right-0 tw-text-[#92929D]">
                ...
              </span>
            </div>
          </div>

          <div className="description tw-w-full tw-flex tw-flex-col tw-gap-[4px]">
            <div className="tw-flex  tw-w-full tw-justify-between">
              <div className="tw-flex tw-items-center">
                <Image
                  width={16}
                  height={16}
                  src="/images/icons/question_count.svg"
                  alt={name}
                  className={` ${''} tw-mb-[3px] tw-mr-[4px] tw-cursor-pointer`}
                />
                &nbsp;
                <span className="hover:tw-text-white">{questionCount} Câu</span>
              </div>
              <span className="tw-text-[#D5D5DC] tw-font-normal tw-text-sm tw-leading-[20px]  tw-h-[20px] tw-flex tw-items-center tw-justify-start">
                <Image
                  width={16}
                  height={16}
                  src="/images/icons/purchase-count.svg"
                  alt={name}
                  priority
                />{' '}
                &nbsp; Đã làm test:&nbsp;{sumittedCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const options = mockupData.map((item, index) => {
  return {
    value: item.type,
    label: item.name,
  };
});

export const rawToSuggestItem = (
  raw: any
): {
  name: string;
  type: AssessmentType;
  assessment: IAssessmentV2[];
}[] => {
  if (raw.length === 0) return [];
  const yourSelf = raw.filter(
    (item) => item.assessment_type === AssessmentType.YOUR_SELF
  );
  const occupation = raw.filter((item) => item.assessment_type === AssessmentType.CAREER);
  const potential = raw.filter(
    (item) => item.assessment_type === AssessmentType.COMPETENCY
  );
  return [
    {
      name: 'ĐÁNH GIÁ THẤU HIỂU BẢN THÂN',
      type: AssessmentType.YOUR_SELF,
      assessment: yourSelf,
    },
    {
      name: 'ĐÁNH GIÁ MỨC ĐỘ PHÙ HỢP NGHỀ',
      type: AssessmentType.CAREER,
      assessment: occupation,
    },
    {
      name: 'ĐÁNH GIÁ NĂNG LỰC',
      type: AssessmentType.COMPETENCY,
      assessment: potential,
    },
  ];
};
const getAllTest = async () => {
  // TODO: When load all test from api, uncomment the following line
  // const res = await testService.getAllAssessments();
  // return res.data;
  const res = {
    data: [
      {
        id: 2,
        name: 'Trắc nghiệm John Holland',
        content:
          '<p>Bộ trắc nghiệm này giúp các bạn tự phát hiện các kiểu người trội nhất đang tiềm ẩn trong con người mình để tự định hướng con đường nghề nghiệp mà bạn muốn theo đuổi trong tương lai.</p>',
        description:
          'Bộ trắc nghiệm này giúp các bạn tự phát hiện các kiểu người trội nhất đang tiềm ẩn trong con người mình để tự định hướng con đường nghề nghiệp mà bạn muốn theo đuổi trong tương lai.',
        test_tutorial:
          '<p>Các ý liệt kê trong mỗi bảng hướng đến các tố chất và năng lực cá nhân. Với mỗi ý sẽ có nhiều mức độ phù hợp, tương ứng với mỗi mức độ phù hợp, sẽ được quy định một điểm số tương ứng. Điểm số tương ứng này do người làm trắc nghiệm đánh giá và tự cho điểm theo quy ước sau.</p><p><strong>1.</strong> Bạn thấy ý đó <strong>chưa bao giờ đúng</strong> với bạn – tương ứng 1<strong>đ</strong></p><p><strong>2.</strong> Bạn thấy ý đó c<strong>hỉ đúng trong một vài</strong> trường hợp &nbsp;– &nbsp;tương ứng 2<strong>đ</strong></p><p><strong>3.</strong> Bạn thấy ý đó <strong>chỉ một nửa là đúng</strong> với bạn – tương ứng 3<strong>đ</strong></p><p><strong>4.</strong> Bạn thấy ý đó <strong>gần như là đúng</strong> với bạn trong hầu hết mọi trường hợp, chỉ có một vài trường hợp là chưa đúng lắm – tương ứng 4<strong>đ</strong></p><p><strong>5.</strong> Bạn thấy ý đó là <strong>hoàn toàn đúng</strong> với bạn, không thể nào khác đi được – tương ứng 5<strong>đ</strong></p>',
        slug: 'trac-nghiem-john-holland',
        avatar:
          'https://storage.googleapis.com/youth-media/assessments/avatars/3AmRo9X0ncTUlr8ufTdMggmVIraXuWmITjyGvhHi.png',
        columns: {
          groups: [
            {
              id: 1,
              name: 'Kiểu người R (Realistic - Người thực tế)',
              content:
                '<p>Người thuộc nhóm sở thích nghề nghiệp này thường có khả năng về kỹ thuật, công nghệ, hệ thống; ưa thích làm việc với đồ vật, máy móc, động thực vật; thích làm các công việc ngoài trời.</p> <p><strong>Ngành nghề phù hợp với nhóm này bao gồm:</strong></p> <p>- Những nghề về kiến trúc, an toàn lao động, nghề mộc, xây dựng, thủy sản, kỹ thuật, máy tàu thủy, lái xe, huấn luyện viên.</p> <p>- Nông - lâm nghiệp: quản lý trang trại, nhân giống cá, lâm nghiệp...</p> <p>- Cơ khí: chế tạo máy, bảo trì và sửa chữa thiết bị, luyện kim, cơ khí ứng dụng, tự động...</p> <p>- Địa lý - địa chất: đo đạc, vẽ bản đồ địa chính</p> <p>- Điện - điện tử, dầu khí, hải dương học, quản lý công nghiệp</p>',
            },
            {
              id: 2,
              name: 'Kiểu người I (Investigative - Người nghiên cứu)',
              content:
                '<p>Bạn có khả năng về quan sát, khám phá, phân tích đánh giá và giải quyết các vấn đề.</p> <p><strong>Ngành nghề phù hợp với nhóm này bao gồm:</strong></p> <p>- Các ngành thuộc lĩnh vực khoa học tự nhiên: toán, lý, hóa, sinh, địa lý, địa chất, thống kê...</p> <p>- Khoa học xã hội: nhân học, tâm lý, địa lý...</p> <p>- Y - dược: bác sĩ gây mê, hồi sức, bác sĩ phẫu thuật, nha sĩ...</p> <p>- Khoa học công nghệ: công nghệ thông tin, môi trường, điện, vật lý kỹ thuật, xây dựng...</p> <p>- Nông lâm: nông học, thú y...</p>',
            },
            {
              id: 3,
              name: 'Kiểu người A (Artistic - Nghệ sỹ)',
              content:
                '<p>Bạn có khả năng về nghệ thuật, khả năng về trực giác, khả năng tưởng tượng cao, thích làm việc trong các môi trường mang tính ngẫu hứng, không khuôn mẫu.</p> <p><strong>Ngành nghề phù hợp với nhóm này bao gồm: </strong></p> <p>- Các ngành về văn chương, báo chí: bình luận viên, dẫn chương trình...</p> <p>- Điện ảnh, sân khấu, mỹ thuật, ca nhạc, múa, kiến trúc, thời trang, hội họa, giáo viên dạy sử/Anh văn, bảo tàng, bảo tồn...</p>',
            },
            {
              id: 4,
              name: 'Kiểu người S (Social - Xã hội)',
              content:
                '<p>Bạn có khả năng về nghệ thuật, khả năng về trực giác, khả năng tưởng tượng cao, thích làm việc trong các môi trường mang tính ngẫu hứng, không khuôn mẫu.</p> <p><strong>Ngành nghề phù hợp với nhóm này bao gồm: </strong></p> <p>- Các ngành về văn chương, báo chí: bình luận viên, dẫn chương trình...</p> <p>- Điện ảnh, sân khấu, mỹ thuật, ca nhạc, múa, kiến trúc, thời trang, hội họa, giáo viên dạy sử/Anh văn, bảo tàng, bảo tồn...</p>',
            },
            {
              id: 5,
              name: 'Kiểu người E (Enterprise - Thiên phú lãnh đạo)',
              content:
                '<p>Bạn có khả năng về kinh doanh, mạnh bạo, dám nghĩ dám làm, có thể gây ảnh hưởng, thuyết phục người khác, có khả năng quản lý.</p> <p><strong>Ngành nghề phù hợp với nhóm này bao gồm:</strong></p> <p>- Các ngành về quản trị kinh doanh :quản lý khách sạn, quản trị nhân sự...</p> <p>- Thương mại, marketing, kế toán – tài chính, luật sư, dịch vụ khách hàng, tiếp viên hàng không, thông dịch viên, pha chế rượu</p> <p>- Kỹ sư công nghiệp (ngành kỹ thuật hệ thống công nghiệp)</p> <p>- Bác sĩ cấp cứu, quy hoạch đô thị, bếp trưởng (nấu ăn), ...</p> <p>- Báo chí (phóng viên, biên tập viên...)</p>',
            },
            {
              id: 6,
              name: 'Kiểu người C (Conventional - Mẫu người công chức)',
              content:
                '<p>Bạn có khả năng về số học, thích thực hiện những công việc chi tiết, thích làm việc với những số liệu, theo chỉ dẫn của người khác hoặc các công việc văn phòng.</p> <p><strong>Ngành nghề phù hợp với nhóm này bao gồm:</strong></p> <p>Các ngành nghề về hành chính, thống kê, thanh tra ngành, người giữ trẻ, điện thoại viên...</p>',
            },
          ],
        },
        type_code: 1,
        sale_code: 1,
        status: 1,
        created_at: '2020-12-01 10:01:32',
        updated_at: '2022-10-21 17:05:04',
        test_time: 7,
        original_price: 0,
        sale_price: 0,
        assessment_type: 'ASSESSMENT_YOURSELF',
        questions_count: 53,
        submitted_count: 4146,
      },
      {
        id: 9,
        name: 'Đánh giá kỹ năng giao tiếp',
        content:
          '<p>Bài đánh giá năng lực về kỹ năng giao tiếp sẽ giúp bạn nhận định được khả năng giao tiếp của bản thân đang ở mức độ nào để có thể khám phá và hoàn thiện bản thân.</p>',
        description:
          '<p>Kỹ năng giao tiếp là quá trình sử dụng các phương tiện ngôn ngữ và phi ngôn ngữ để định hướng, điều chỉnh và điều khiển quá trình giao tiếp đạt tới mục đích nhất định. Kỹ năng của con người thường được đánh giá qua các thao tác, các hoạt động cụ thể và hiệu quả thực tiễn.&nbsp;<br>&nbsp;</p>',
        test_tutorial:
          '<p>Có tổng cộng 6 bảng tương ứng với 6 yếu tố ảnh hưởng đến kỹ năng Giao tiếp.</p><p>Bước 1: Đọc mỗi mô tả và cho điểm từ 1 đến 5.</p><p>Hãy chọn thật nhanh và đừng suy nghĩ quá lâu, nếu bạn suy nghĩ quá lâu sẽ dễ khiến bản thân lực chọn đáp án theo lý trí chứ không đúng với bản năng của bản thân, điều đó có thể khiến bài khảo sát thiếu tính chính xác.</p><p>Bước 2: Sau đó, tính tổng điểm, đối chiếu với kết quả đã có.</p><figure class="table"><table><tbody><tr><td colspan="3" rowspan="1"><i><strong>Cách cho điểm từng mô tả</strong></i></td></tr><tr><td>Điểm</td><td colspan="2" rowspan="1">Nếu như</td></tr><tr><td>1</td><td colspan="2" rowspan="1">Mô tả chưa bao giờ đúng với bạn</td></tr><tr><td>2</td><td colspan="2" rowspan="1">Mô tả đúng một phần với bạn</td></tr><tr><td>3</td><td colspan="2" rowspan="1">Mô tả khoảng một nửa với bạn</td></tr><tr><td>4</td><td colspan="2" rowspan="1">Mô tả đúng đa số với bạn</td></tr><tr><td>5</td><td colspan="2" rowspan="1">Mô tả đúng với bạn</td></tr></tbody></table></figure>',
        slug: 'ky-nang-giao-tiep',
        avatar:
          'https://storage.googleapis.com/youth-media/assessments/avatars/7Di20VcgpukqSjSx1cuU8Ii18EDmvDta2qZiWln8.png',
        columns: null,
        type_code: 1,
        sale_code: 1,
        status: 1,
        created_at: '2022-08-24 23:11:36',
        updated_at: '2022-10-04 17:09:54',
        test_time: 5,
        original_price: 0,
        sale_price: 0,
        assessment_type: 'ASSESSMENT_COMPETENCY',
        questions_count: 30,
        submitted_count: 85,
      },
      {
        id: 12,
        name: 'Chuyên Viên Tuyển Dụng',
        content:
          '<p>Bài đánh giá chính là cơ sở để bạn đối chiếu sở thích, năng lực tự nhiên và kiến thức chuyên môn của mình với yêu cầu của nghề Chuyên Viên Tuyển Dụng. Từ đây giúp bạn có thể giúp bạn định hướng và xây dựng lộ trình phát triển cụ thể.&nbsp;</p>',
        description:
          '<p>Chuyên Viên Tuyển Dụng là người phụ trách mảng tuyển dụng nhân sự bao gồm việc xác định nhu cầu tuyển dụng, đề xuất các phương án và tìm kiếm, tuyển dụng nhân sự phù hợp với nhu cầu công việc của doanh nghiệp.</p><p>Chuyên Viên Tuyển Dụng đóng vai trò quan trọng, góp phần cải thiện hiệu quả cho doanh nghiệp, tổ chức thông qua việc đáp ứng các nhu cầu về nhân sự.&nbsp;</p>',
        test_tutorial:
          '<p>Bô câu hỏi đánh giá gồm 3 phần:</p><ul><li>Phần 1: Đánh giá Thái độ</li><li>Phần 2: Đánh giá Kỹ năng</li><li>Phần 3: Đánh giá Kiến thức chuyên môn</li></ul><p>Mỗi câu hỏi gồm 5 phương án tương ứng với 5 mức độ đánh giá. Chọn mô tả đúng nhất với bạn hiện tại bằng cách đánh dấu vào câu đó.</p>',
        slug: 'danh-gia-nghe-chuyen-vien-tuyen-dung',
        avatar:
          'https://storage.googleapis.com/youth-media/assessments/avatars/w3E6ceUK2dLnnz1Yf6pSJp7ftc93HiycYwYUsBuP.jpg',
        columns: null,
        type_code: 1,
        sale_code: 1,
        status: 1,
        created_at: '2022-08-30 12:56:35',
        updated_at: '2022-09-21 19:12:30',
        test_time: 20,
        original_price: 0,
        sale_price: 0,
        assessment_type: 'ASSESSMENT_CAREER',
        questions_count: 27,
        submitted_count: 28,
      },
      {
        id: 16,
        name: 'Chuyên Viên Truyền Thông Nội Bộ',
        content:
          '<p>Bài đánh giá này để đánh giá mức độ tương thích của bạn với nghề truyền thông nội bộ</p>',
        description:
          '<p style="text-align:justify;">Chuyên viên truyền thông nội bộ là người phụ trách việc cung cấp các thông tin bên trong nội bộ như thông tin tuyển dụng, thay đổi về quy chế, chính sách, tài trợ, đóng góp từ thiện,… Hiệu quả của công việc truyền thông nội bộ được đo bởi số thành viên trong doanh nghiệp nhận và nắm được thông tin.</p><p>Các công việc chính</p><ul><li style="text-align:justify;">Quản lý việc giao tiếp nội bộ cho các nhân viên trong công ty.&nbsp;</li><li style="text-align:justify;">Đảm bảo vận hành các công cụ giao tiếp nội bộ như phần mềm trao đổi thông tin, làm việc nhóm, bảng thông báo, …</li><li style="text-align:justify;">Đo lường và thu thập các số liệu chi tiết về hiệu quả của phần mềm thông tin nội bộ.</li><li style="text-align:justify;">Đảm bảo truyền tải thông tin xuyên suốt các bộ phận, nhằm giúp từng nhân viên nắm được mọi thông điệp của ban quản trị và ngược lại.</li><li style="text-align:justify;">Quản lý Website và Blog của công ty.</li><li style="text-align:justify;">Đưa ra ý tưởng, dự trù kinh phí và tổ chức các sự kiện nội bộ: tổng kết hằng tháng, các ngày lễ, các hội chơi, đi du lịch, nghỉ mát, các trò chơi Team-Building, …</li><li style="text-align:justify;">Giúp gắn kết từng cá nhân trong doanh nghiệp lại với nhau.</li></ul><p>KPI công việc</p><ul><li style="text-align:justify;">Hiệu quả của phần mềm thông tin nội bộ</li><li style="text-align:justify;">Số sự kiện nội bộ hằng tháng</li><li style="text-align:justify;">Chỉ số hài lòng của nhân viên (Employee Satisfaction Index)</li><li style="text-align:justify;">Mức độ cam kết của nhân viên (Employee Engagement Level)</li><li style="text-align:justify;">Điểm số động viên/ủng hộ nhân viên tích cực (Staff Advocacy Score)</li></ul><p>&nbsp;</p><p>&nbsp;</p>',
        test_tutorial:
          '<p>Bộ câu hỏi đánh giá gồm 3 phần:</p><p>Phần 1: Đánh giá Thái độ</p><p>Phần 2: Đánh giá Kỹ năng</p><p>Phần 3: Đánh giá Kiến thức chuyên môn</p><p>&nbsp;</p>',
        slug: 'danh-gia-muc-do-phu-hop-nghe-truyen-thong-noi-bo',
        avatar:
          'https://storage.googleapis.com/youth-media/assessments/avatars/I9BIpmp0CmcepLWRbVcqS56evNBIAmF2nm8hObV6.png',
        columns: null,
        type_code: 1,
        sale_code: 1,
        status: 1,
        created_at: '2022-09-05 22:31:35',
        updated_at: '2022-11-09 16:57:39',
        test_time: 5,
        original_price: 0,
        sale_price: 0,
        assessment_type: 'ASSESSMENT_CAREER',
        questions_count: 21,
        submitted_count: 12,
      },
      {
        id: 26,
        name: 'Đánh giá kỹ năng học và tự học',
        content:
          '<p>Bài đánh giá năng lực về kỹ năng học và tự học sẽ giúp bạn nhận định được khả năng học và tự học của bản thân đang ở mức độ nào để có thể khám phá và hoàn thiện bản thân.</p>',
        description:
          '<p>Học là quá trình đạt được sự hiểu biết, kiến thức, hành vi, kỹ năng, giá trị, thái độ và sở thích mới. &nbsp;Học không chỉ gói gọn trong việc tiếp thu kiến thức từ sách vở, học còn là việc góp nhặt và thu nhận kiến thức từ bên ngoài, từ người khác truyền lại, rèn luyện thành kỹ năng, nhận thức.&nbsp;<br>Học có nhiều hình thức khác nhau, trong đó có tự học là hình thức học tập rất quan trọng đối với con người. Vậy tự học là gì? Tự học là việc chủ động tự mình tìm tòi nghiên cứu, thu nhặt các kiến thức tự luyện tập để có kỹ năng. Tự học có thể hình thành từ việc tự bản thân nghiên cứu tìm hiểu mà không nhờ vả hay trông chờ vào bất cứ ai. Hoặc tự học còn có thể được hiểu là chúng ta dựa vào kiến thức được thầy cô giáo hoặc người đi trước cung cấp để dựa vào đó hình thành những bài học cho riêng mình.<br>&nbsp;</p>',
        test_tutorial:
          '<p>Bước 1: Đọc mỗi mô tả và cho điểm từ 1 đến 5. Hãy chọn thật nhanh và đừng suy nghĩ quá lâu, nếu bạn suy nghĩ quá lâu sẽ dễ khiến bản thân lực chọn đáp án theo lý trí chứ không đúng với bản năng của bản thân, điều đó có thể khiến bài khảo sát thiếu tính chính xác.<br>Bước 2: Sau đó, tính tổng điểm, đối chiếu với kết quả đã có.</p><p>1 - Mô tả chưa bao giờ đúng với bạn</p><p>2 - Mô tả đúng một phần với bạn</p><p>3 - Mô tả đúng khoảng một nửa với bạn</p><p>4 - Mô tả đúng đa số với bạn</p><p>5 - Mô tả đúng hầu hết với bạn</p>',
        slug: 'hoc-va-tu-hoc',
        avatar:
          'https://storage.googleapis.com/youth-media/assessments/avatars/iP4tQl0epnZ0tu3yXMk1J7BBp8ZCOlgjIhSRXTZL.png',
        columns: null,
        type_code: 1,
        sale_code: 1,
        status: 1,
        created_at: '2022-09-08 15:55:57',
        updated_at: '2022-10-10 09:55:32',
        test_time: 15,
        original_price: 0,
        sale_price: 0,
        assessment_type: 'ASSESSMENT_COMPETENCY',
        questions_count: 28,
        submitted_count: 41,
      },
      {
        id: 27,
        name: 'Đánh Giá Kỹ Năng Làm Việc Nhóm',
        content:
          '<p>Bài đánh giá năng lực về kỹ năng làm việc nhóm sẽ giúp bạn nhận định được khả năng làm việc nhóm của bản thân đang ở mức độ nào để có thể khám phá và hoàn thiện bản thân.</p>',
        description:
          '<p>- Kỹ năng làm việc nhóm là khả năng hợp tác, làm việc chung với một nhóm người có thể là bạn bè, đồng nghiệp,... nhằm mục tiêu đạt được kết quả tốt nhất cho công việc chung.<br>- Kỹ năng làm việc nhóm là khả năng thiết lập và duy trì mối quan hệ hợp tác tích cực với các thành viên khác để hoàn thành tốt đẹp các mục tiêu chung.<br>- Cụ thể kỹ năng làm việc nhóm sẽ bao gồm việc các thành viên đóng góp ý kiến, giúp đỡ, hỗ trợ nhau khi thực hiện công việc. Hiện nay, kỹ năng làm việc nhóm là một trong những kỹ năng mềm quan trọng nhất mà các công ty quan tâm khi tuyển dụng nhân viên.&nbsp;</p>',
        test_tutorial:
          '<p>Bước 1: Đọc mỗi mô tả và cho điểm từ 1 đến 5. Hãy chọn thật nhanh và đừng suy nghĩ quá lâu, nếu bạn suy nghĩ quá lâu sẽ dễ khiến bản thân lực chọn đáp án theo lý trí chứ không đúng với bản năng của bản thân, điều đó có thể khiến bài khảo sát thiếu tính chính xác.<br>Bước 2: Sau đó, tính tổng điểm, đối chiếu với kết quả đã có.</p><p>1 - Mô tả chưa bao giờ đúng với bạn</p><p>2 - Mô tả đúng một phần với bạn</p><p>3 - Mô tả đúng khoảng một nửa với bạn</p><p>4 - Mô tả đúng đa số với bạn</p><p>5 - Mô tả đúng hầu hết với bạn</p>',
        slug: 'ky-nang-lam-viec-nhom',
        avatar:
          'https://storage.googleapis.com/youth-media/assessments/avatars/k3BrzK5Al40koUGzIa4IVKbEvgiCc2LBDY0AfRTC.jpg',
        columns: null,
        type_code: 1,
        sale_code: 1,
        status: 1,
        created_at: '2022-09-08 16:47:34',
        updated_at: '2022-12-03 10:22:32',
        test_time: 15,
        original_price: 0,
        sale_price: 0,
        assessment_type: 'ASSESSMENT_COMPETENCY',
        questions_count: 46,
        submitted_count: 8,
      },
      {
        id: 29,
        name: 'Đánh Giá Kỹ Năng Quản Lý Bản Thân',
        content:
          '<p>Bài đánh giá năng lực về kỹ năng quản lý bản thân sẽ giúp bạn nhận định được khả năng quản lý bản thân của bạn đang ở mức độ nào.</p>',
        description:
          '<p>Đó là những cách thức (phương thức, chiến thuật) của cá nhân. Tạo điều kiện cho cá nhân đó có cuộc sống tốt đẹp hơn. Gồm có việc đặt mục đích, xây dựng kế hoạch, lập chương trình thực hiện mục tiêu. Tự tiến hành công việc và tự đánh giá mục đích.<br>Một người làm chủ bản thân, có kĩ năng quản lý bản thân biết: Mình mong muốn gì, không mong muốn gì, thuận lợi và khó khăn có thể gặp khi thực hiện mục tiêu. Sự kiên định mục tiêu đã đề ra, biết điều chỉnh mục đích cho phù hợp khi cần thiết, lường trước những kết quả xấu có thể xuất hiện. Và tìm được giải pháp khắc phục, nhận xét kết quả đạt được so với mục đích xác định.<br>&nbsp;</p>',
        test_tutorial:
          '<p>Bước 1: Đọc mỗi mô tả và cho điểm từ 1 đến 5. Hãy chọn thật nhanh và đừng suy nghĩ quá lâu, nếu bạn suy nghĩ quá lâu sẽ dễ khiến bản thân lực chọn đáp án theo lý trí chứ không đúng với bản năng của bản thân, điều đó có thể khiến bài khảo sát thiếu tính chính xác.<br>Bước 2: Sau đó, tính tổng điểm của cả 5 bảng, đối chiếu với kết quả đã có.</p><p>1 - Mô tả chưa bao giờ đúng với bạn</p><p>2 - Mô tả đúng một phần với bạn</p><p>3 - Mô tả đúng khoảng một nửa với bạn</p><p>4 - Mô tả đúng đa số với bạn</p><p>5 - Mô tả đúng hầu hết với bạn</p>',
        slug: 'ky-nang-quan-ly-ban-than',
        avatar:
          'https://storage.googleapis.com/youth-media/assessments/avatars/q1N1DfBtGGyDbYVFlcf9sXBeRSNn4DdWjeuDVlDE.png',
        columns: null,
        type_code: 1,
        sale_code: 1,
        status: 1,
        created_at: '2022-09-10 09:33:45',
        updated_at: '2022-12-03 10:19:35',
        test_time: 15,
        original_price: 0,
        sale_price: 0,
        assessment_type: 'ASSESSMENT_COMPETENCY',
        questions_count: 24,
        submitted_count: 7,
      },
      {
        id: 30,
        name: 'Đánh Giá Kỹ Năng Tư Duy Phản Biện',
        content:
          '<p>Bài đánh giá năng lực về kỹ năng tư duy phản biện sẽ giúp bạn nhận định được khả năng tư duy phản biện của bản thân đang ở mức độ nào để có thể khám phá và hoàn thiện bản thân.</p>',
        description:
          '<p>- Tư duy phản biện (Critical thinking) là quá trình phân tích, đánh giá, chất vấn các giả định hoặc giả thiết, giúp bạn hình thành cách suy nghĩ và đưa ra quan điểm khi đứng trước vấn đề nào đó.<br>- Kỹ năng tư duy phản biện là kỹ năng đưa ra quan điểm về một vấn đề và chứng minh, bảo vệ cho luận điểm của mình sao cho nhất quán, logic, đồng thời phản bác những ý kiến trái ngược với nó.<br>&nbsp;</p>',
        test_tutorial:
          '<p>Bước 1: Đọc mỗi mô tả và cho điểm từ 1 đến 5. Hãy chọn thật nhanh và đừng suy nghĩ quá lâu, nếu bạn suy nghĩ quá lâu sẽ dễ khiến bản thân lực chọn đáp án theo lý trí chứ không đúng với bản năng của bản thân, điều đó có thể khiến bài khảo sát thiếu tính chính xác.<br>Bước 2: Sau đó, tính tổng điểm, đối chiếu với kết quả đã có.</p><p>1 - Mô tả chưa bao giờ đúng với bạn</p><p>2 - Mô tả đúng một phần với bạn</p><p>3 - Mô tả đúng khoảng một nửa với bạn</p><p>4 - Mô tả đúng đa số với bạn</p><p>5 - Mô tả đúng hầu hết với bạn</p>',
        slug: 'kha-nang-tu-duy-phan-bien',
        avatar:
          'https://storage.googleapis.com/youth-media/assessments/avatars/AcwwS8h7Tn54wQHNNK52meEtRTNiCPVqzh2Jlugh.jpg',
        columns: null,
        type_code: 1,
        sale_code: 1,
        status: 1,
        created_at: '2022-09-10 10:16:08',
        updated_at: '2022-12-03 10:20:54',
        test_time: 15,
        original_price: 0,
        sale_price: 0,
        assessment_type: 'ASSESSMENT_COMPETENCY',
        questions_count: 40,
        submitted_count: 14,
      },
    ],
    page: 1,
    size: 12,
    total: 0,
  };
  return res.data;
};
const TestSuggest = () => {
  const { data } = useSWR('key-get-alltest', getAllTest);
  const [rootData, setRootData] = useState([]);
  const [selected, setSelected] = useState('');
  const onFilter = useCallback(
    (filterOption) => {
      const { label, value } = filterOption[0];
      setSelected(value);
    },
    [rootData]
  );
  const [filteredData, setFilteredData] = useState([]);
  const [listRef] = useAutoAnimate<HTMLDivElement>();
  useEffect(() => {
    if (data) {
      const newData = rawToSuggestItem(data);
      setRootData(newData);
      setFilteredData(newData);
    }
  }, [data]);

  useEffect(() => {
    if (selected) {
      setFilteredData(rootData.filter((item) => item.type === selected));
    }
  }, [selected, rootData]);
  const onReload = useCallback(() => {
    setFilteredData(rootData);
  }, [rootData]);
  return (
    <div
      ref={listRef}
      className={`${styles.test_scrollbar} tw-h-fit tw-right-[0] tw-bg-white tw-shadow-md tw-min-w-[400px] tw-p-5 tw-ml-auto tw-z-[0] tw-overflow-y-scroll tw-overflow-x-hidden tw-rounded-[20px] md:tw-rounded-b-[10px] md:tw-rounded-t-none tw-max-h-[748px]  `}
    >
      <TestFilter options={options} onChange={onFilter} onReload={onReload} />
      {filteredData.map((item, index) => {
        return (
          <ListTest title={item.name} key={index}>
            <div className=" tw-flex tw-flex-col tw-gap-3 ">
              {item.assessment.map((assessment, index) => {
                return (
                  <TestItem
                    description={assessment.description}
                    name={assessment.name}
                    duration={assessment.test_time}
                    price={assessment.original_price}
                    questionCount={assessment.questions_count}
                    slug={assessment.slug}
                    sumittedCount={assessment.submitted_count}
                    key={index}
                    imgUrl={assessment.avatar}
                  />
                );
              })}
            </div>
          </ListTest>
        );
      })}
    </div>
  );
};

export default memo(TestSuggest);
