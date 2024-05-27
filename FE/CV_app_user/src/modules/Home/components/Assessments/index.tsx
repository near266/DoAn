import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { ContainerLoading } from '@/components';
import TestCard from '@/components/common/Cards/TestCard';
import ListCard from '@/components/common/ListCard';
import { testService } from '@/modules/TestAssessment/shared/testAssessmentService';
import useSWR from 'swr';
import { GET_ASSESSMENTS_QUERY } from '../../../Assessment/shared';
import styles from './styles.module.scss';
const Assessments = () => {
  const router = useRouter();
  const fixedResponse = {
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
  const resData = fixedResponse.data;
  const assessments = resData;

  // TODO: open comment for load all test from api
  // const getAllTest = async () => {
  //   const res = await testService.getAllAssessments();
  //   return res.data.filter((item) => item.status);
  // };
  // const { data } = useSWR('key-get-alltest', getAllTest);
  // useEffect(() => {
  //   if (data) {
  //     setAssessments(data);
  //   }
  // }, [data]);
  const scrollRef = useRef(null);
  const { loading } = useQuery(GET_ASSESSMENTS_QUERY, {
    onCompleted: (res) => {
      // const data = res.assessments.data.map((item) => item);
    },
  });
  return (
    <div className={`${''} xl:!tw-bg-contain`}>
      <div
        className={`${styles.bg_wrapper} !tw-bg-none lg:!tw-bg-[url('/images/homepage/test-section-bg.svg')]`}
      ></div>
      <section className={'container'}>
        <ContainerLoading loading={loading}>
          <div className="">
            <div className={styles.test_list}>
              <div className={styles.test_list_title}>
                <p className="tw-text-center section-title">Đánh giá</p>
              </div>
              <div
                className={`${styles.test_list_content} !tw-mb-4 md:!tw-mb-8 md:!tw-max-h-28 tw-text-base md:tw-text-[20px] md:tw-min-w-[640px]`}
              >
                <p className="tw-m-0">Khám phá bản thân bạn và sự nghiệp của bạn</p>
                {/* <ul className="tw-text-left tw-inline">
                  <li>
                    <p>Khám phá điểm yếu, đểm mạnh, sở thích</p>
                  </li>
                  <li>
                    <p>Khám phá mức độ tương thích phù hợp với mỗi ngành nghề</p>
                  </li>
                  <li>
                    <p>Khám phá năng lực cá nhân</p>
                  </li>
                </ul> */}
              </div>
              <div className="tw-max-w-[1300px] tw-max-h-[540px]  tw-p-0 tw-relative">
                {/* <ListCard>
                  {assessments.map((item, index) => (
                    <TestCard
                      id={item.id}
                      // TODO: fix discount for tests what have fee
                      // discount={item.discount ?? 0}
                      discount={0}
                      image={item.avatar}
                      price={item.original_price}
                      sumittedCount={item.submitted_count}
                      questionCount={item.questions_count.toString()}
                      title={item.name}
                      salePrice={item.sale_price}
                      description={item.content}
                      httpPath={'/danh-gia-nang-luc/'}
                      slug={item.slug}
                      key={item.id}
                    />
                  ))}
                </ListCard> */}
                <div className="-tw-translate-y-[65px]  tw-mx-auto tw-relative tw-w-full tw-h-[100px] tw-text-center">
                  <span
                    className="tw-text-center tw-text-[#403ECC] tw-text-xl tw-cursor-pointer"
                    onClick={() => {
                      router.push('/danh-gia-nang-luc');
                    }}
                  >
                    Xem tất cả
                  </span>
                  <img src="/images/icons/right_arrow.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </ContainerLoading>
      </section>
    </div>
  );
};

export default Assessments;
