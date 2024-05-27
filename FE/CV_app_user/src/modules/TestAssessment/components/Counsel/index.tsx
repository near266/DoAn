import React from 'react';
import { AssessmentType } from '../../shared/variables';

type YourSelfCounselType = {
  id: number | string;
  title: string;
  content: React.ReactNode;
  mark: number;
  suggestMajor: string[];
};
const mockup1: YourSelfCounselType[] = [
  {
    id: 1,
    title: 'Kiểu người C (Conventional - Mẫu người công chức)',
    content:
      'Bạn có khả năng về số học, thích thực hiện những công việc chi tiết, thích làm việc với những số liệu, theo chỉ dẫn của người khác hoặc các công việc văn phòng.',
    mark: 24,
    suggestMajor: [
      'Các ngành về quản trị kinh doanh :quản lý khách sạn, quản trị nhân sự...',
      'Thương mại, marketing, kế toán – tài chính, luật sư, dịch vụ khách hàng, tiếp viên hàng không, thông dịch viên, pha chế rượu',
      'Kỹ sư công nghiệp (ngành kỹ thuật hệ thống công nghiệp)',
      'Bác sĩ cấp cứu, quy hoạch đô thị, bếp trưởng (nấu ăn), ...',
      'Báo chí (phóng viên, biên tập viên...)',
    ],
  },
  {
    id: 2,
    title: 'Kiểu người E (Enterprise - Thiên phú lãnh đạo)',
    content:
      'Bạn có khả năng về kinh doanh, mạnh bạo, dám nghĩ dám làm, có thể gây ảnh hưởng, thuyết phục người khác, có khả năng quản lý.',
    mark: 12,
    suggestMajor: [
      'Các ngành về quản trị kinh doanh :quản lý khách sạn, quản trị nhân sự...',
      'Thương mại, marketing, kế toán – tài chính, luật sư, dịch vụ khách hàng, tiếp viên hàng không, thông dịch viên, pha chế rượu',
      'Kỹ sư công nghiệp (ngành kỹ thuật hệ thống công nghiệp)',
      'Bác sĩ cấp cứu, quy hoạch đô thị, bếp trưởng (nấu ăn), ...',
      'Báo chí (phóng viên, biên tập viên...)',
    ],
  },
];
interface Props {
  type: AssessmentType;
  data: any;
}

const YourSelfCounsel: React.FC<YourSelfCounselType[]> = (
  props: YourSelfCounselType[]
) => {
  return <div></div>;
};

const PotentialCounsel: React.FC = (props: any) => {
  return <div></div>;
};

const OccupationCounsel: React.FC = (props: any) => {
  return <div></div>;
};

const Counsel = (props: Props) => {
  const { type, data } = props;
  return (
    <div>
      {/* {type === AssessmentType.YOUR_SELF && <YourSelfCounsel />} */}
      {type === AssessmentType.COMPETENCY && <PotentialCounsel />}
      {type === AssessmentType.CAREER && <OccupationCounsel />}
    </div>
  );
};

export default Counsel;
